"use server";

import { Resend } from "resend";
import {
  escapeHtml,
  isWithinLength,
  isHoneypotTriggered,
  isValidExtension,
  isValidMagicBytes,
  ALLOWED_VISIT_EXTENSIONS,
} from "@/core/lib/security";
import {
  renderMasterEmail,
  renderMetricsSection,
  renderBrochureDownloadCard,
  renderDetailCard,
  renderCalloutBox,
  renderInternalContactActions,
  EMAIL_ASSETS,
} from "@/core/lib/emailLayout";

export async function sendVisitRequest(formData: FormData) {
  try {
    const website = formData.get("website") as string;

    // Honeypot anti-spam
    if (isHoneypotTriggered(website)) {
      return { success: true };
    }

    const fullName = (formData.get("fullName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const rawEmail = (formData.get("email") as string)?.trim();
    const email = rawEmail || "No proporcionado";
    const equipment = ((formData.get("equipment") as string)?.trim()) || "No especificado";
    const year = ((formData.get("year") as string)?.trim()) || "No especificado";
    const serviceType = (formData.get("serviceType") as string)?.trim();
    const preferredDate = (formData.get("preferredDate") as string)?.trim();
    const preferredTime = ((formData.get("preferredTime") as string)?.trim()) || "No especificada";
    const comments = ((formData.get("comments") as string)?.trim()) || "Sin comentarios adicionales";
    const file = formData.get("file") as File | null;

    // Validar campos obligatorios
    if (!fullName || !phone || !serviceType || !preferredDate) {
      return { success: false, error: "Por favor complete todos los campos obligatorios (*)." };
    }

    // Validar límites de longitud server-side
    if (
      !isWithinLength(fullName, 150) ||
      !isWithinLength(phone, 30) ||
      !isWithinLength(rawEmail, 254) ||
      !isWithinLength(equipment, 150) ||
      !isWithinLength(year, 10) ||
      !isWithinLength(serviceType, 50) ||
      !isWithinLength(preferredDate, 30) ||
      !isWithinLength(preferredTime, 20) ||
      !isWithinLength(comments, 2000)
    ) {
      return {
        success: false,
        error: "Uno o más campos exceden la longitud máxima permitida.",
      };
    }

    const attachments = [];
    let attachedFileName = "";

    // Validación server-side estricta de archivo adjunto
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: "El archivo adjunto supera el límite máximo permitido de 5 MB.",
        };
      }

      if (!isValidExtension(file.name, ALLOWED_VISIT_EXTENSIONS)) {
        return {
          success: false,
          error: "El tipo de archivo no está permitido. Formatos aceptados: PDF, DOC, DOCX, JPG, PNG o WEBP.",
        };
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (!isValidMagicBytes(buffer, file.name)) {
        return {
          success: false,
          error: "El archivo adjunto no posee un formato válido o está dañado.",
        };
      }

      const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      attachedFileName = safeFilename;
      attachments.push({
        filename: safeFilename,
        content: buffer,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_API_KEY no configurada. Simulando solicitud de visita en desarrollo.");
        return { success: true };
      }
      return {
        success: false,
        error: "El servicio no está disponible temporalmente. Por favor intente más tarde.",
      };
    }

    const resend = new Resend(apiKey);

    // Map service type to readable string
    const serviceTypeMap: Record<string, string> = {
      preventivo: "Mantenimiento Preventivo",
      reparacion: "Reparación de Componentes",
      soldadura: "Mecanizado y Soldadura",
      diagnostico: "Evaluación y Diagnóstico",
      repuestos: "Suministro de Repuestos",
    };
    const serviceTypeReadable = serviceTypeMap[serviceType] || serviceType;

    // Sanitización y escape HTML de todos los datos interpolados en el correo
    const safeFullName = escapeHtml(fullName);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeEquipment = escapeHtml(equipment);
    const safeYear = escapeHtml(year);
    const safeServiceType = escapeHtml(serviceTypeReadable);
    const safePreferredDate = escapeHtml(preferredDate);
    const safePreferredTime = escapeHtml(preferredTime);
    const safeComments = escapeHtml(comments);
    const safeAttachmentName = escapeHtml(attachedFileName);
    const cleanSubjectName = fullName.replace(/[\r\n]+/g, " ").trim().slice(0, 100);
    const cleanSubjectEquipment = equipment !== "No especificado" ? equipment.replace(/[\r\n]+/g, " ").trim().slice(0, 50) : "";
    const emailSubject = cleanSubjectEquipment
      ? `🚨 Visita Técnica: ${cleanSubjectEquipment} - ${cleanSubjectName}`
      : `🚨 Nueva Solicitud de Visita Técnica - ${cleanSubjectName}`;

    const cleanDigits = phone.replace(/\D/g, "");
    const hasRealComments = comments && comments !== "Sin comentarios adicionales" && comments.trim().length > 0;

    // 1. Correo interno para el equipo comercial / técnico
    const companyContentHtml = `
      <div style="text-align: left; margin-bottom: 22px;">
        <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
          Requerimiento de Servicio &amp; Visita Técnica
        </h1>
        <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Solicitud de inspección técnica en campo registrada desde la web oficial.
        </p>
      </div>

      ${renderDetailCard("Datos de Contacto del Cliente", [
        { label: "Nombre / Razón Social", value: safeFullName },
        { label: "Teléfono", value: safePhone, isLink: true, href: `tel:${cleanDigits}` },
        { label: "Correo Electrónico", value: safeEmail, isLink: email !== "No proporcionado", href: `mailto:${safeEmail}` },
      ], {
        maxWidth: "520px",
        centered: true,
        innerTableMaxWidth: "440px",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderDetailCard("Ficha del Equipo y Cita Solicitada", [
        { label: "Maquinaria / Equipo", value: safeEquipment },
        { label: "Año de Fabricación", value: safeYear },
        { label: "Tipo de Servicio", value: safeServiceType },
        { label: "Fecha Sugerida", value: safePreferredDate },
        { label: "Horario Preferido", value: safePreferredTime },
      ], {
        maxWidth: "520px",
        centered: true,
        innerTableMaxWidth: "440px",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${hasRealComments ? renderCalloutBox(
        "Síntoma o Detalle Reportado por el Cliente:",
        safeComments,
        "gold",
        { maxWidth: "520px", centered: true }
      ) : ""}

      ${safeAttachmentName ? `
      <table align="center" cellpadding="0" cellspacing="0" border="0" class="callout-table" style="max-width: 520px; width: 100%; background-color: #f1f5f9; border-radius: 8px; margin: 0 auto 0 auto;">
        <tr>
          <td class="callout-cell" style="padding: 12px 16px; font-size: 13px; color: #475569;">
            <img src="${EMAIL_ASSETS.PAPERCLIP_ICON}" alt="Adjunto" width="14" height="14" style="display: inline-block; width: 14px; height: 14px; vertical-align: middle; margin-right: 4px; border: 0;" /><strong>Archivo adjunto por el cliente:</strong> ${safeAttachmentName} <em>(Descárguelo en los adjuntos de este correo)</em>
          </td>
        </tr>
      </table>
      <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 520px; width: 100%;">
        <tr>
          <td style="height: 16px; line-height: 16px; font-size: 1px;">&nbsp;</td>
        </tr>
      </table>` : ""}

      <!-- ACCIONES DE CONTACTO RÁPIDO CON EL CLIENTE (AL FINAL, ESTILO CENTRO DE CONTACTO) -->
      ${renderInternalContactActions(phone, safeFullName, `su requerimiento técnico para ${safeEquipment}`)}
    `;

    const emailToCompanyHtml = renderMasterEmail({
      pageTitle: `Nueva Solicitud de Visita Técnica - ${cleanSubjectName}`,
      preheaderText: `Solicitud de visita para ${safeEquipment} de ${safeFullName}.`,
      badgeHtml: "SOLICITUD",
      contentHtml: companyContentHtml,
      showContactCenter: false,
    });

    const { error: companyError } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : undefined,
      subject: emailSubject,
      html: emailToCompanyHtml,
      attachments: attachments,
    });

    if (companyError) {
      console.error("Resend API Error al notificar a la empresa:", companyError);
      return { success: false, error: "Error al enviar la solicitud. Por favor intente más tarde." };
    }

    // 2. Correo de cortesía y confirmación al cliente (si ingresó un correo válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (rawEmail && emailRegex.test(rawEmail)) {
      const customerContentHtml = `
        <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
          Hola ${safeFullName},
        </h1>
        
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
          Hemos recibido exitosamente su solicitud de <strong>Visita Técnica e Inspección</strong>. Nuestro departamento técnico y comercial se encuentra revisando los datos para comunicarse con usted a la brevedad y coordinar los detalles operativos.
        </p>

        ${renderDetailCard(
          "Resumen del Servicio Solicitado",
          [
            { label: "Maquinaria / Equipo", value: safeEquipment },
            { label: "Tipo de Servicio", value: safeServiceType },
            { label: "Fecha Sugerida", value: safePreferredDate },
            { label: "Horario Preferido", value: safePreferredTime },
            { label: "Teléfono de Contacto", value: safePhone },
          ],
          {
            maxWidth: "100%",
            innerTableMaxWidth: "460px",
            hideDivider: true,
            hideRowBorders: true,
          }
        )}

        ${renderMetricsSection("Conoce más sobre nuestro respaldo técnico")}

        ${renderBrochureDownloadCard("¿Deseas conocer más de nuestros servicios y flota?<br/>Descarga nuestro brochure oficial:")}
      `;

      const emailToCustomerHtml = renderMasterEmail({
        pageTitle: "Solicitud de Visita Técnica Registrada - SERVIMAFED S.A.C.",
        preheaderText: `Hola ${safeFullName}, confirmamos la recepción de tu solicitud de visita técnica para tu equipo ${safeEquipment}.`,
        badgeHtml: "¡Solicitud de Visita<br/>Registrada!",
        badgePosition: "bottom-right",
        badgeSize: "large",
        heroBannerUrl: EMAIL_ASSETS.HERO_BANNER,
        contentHtml: customerContentHtml,
        showContactCenter: true,
      });

      // Envío asíncrono no bloqueante de cortesía al cliente
      resend.emails.send({
        from: "SERVIMAFED <web@servimafed.com>",
        to: [rawEmail],
        subject: "¡Hemos recibido tu solicitud de visita técnica! - SERVIMAFED S.A.C.",
        html: emailToCustomerHtml,
      }).catch((err) => {
        console.warn("Aviso: no se pudo enviar correo de confirmación de visita al cliente:", err);
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action sendVisitRequest Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
