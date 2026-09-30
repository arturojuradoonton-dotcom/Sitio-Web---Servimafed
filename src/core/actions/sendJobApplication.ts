"use server";

import { Resend } from "resend";
import {
  escapeHtml,
  isWithinLength,
  isHoneypotTriggered,
  isValidExtension,
  isValidMagicBytes,
  ALLOWED_CV_EXTENSIONS,
} from "@/core/lib/security";
import {
  renderMasterEmail,
  renderInternalContactActions,
  renderDetailCard,
  renderCalloutBox,
  EMAIL_ASSETS,
  BRAND,
} from "@/core/lib/emailLayout";

export interface JobApplicationResult {
  success: boolean;
  error?: string;
}

export async function sendJobApplication(formData: FormData): Promise<JobApplicationResult> {
  try {
    const website = formData.get("website") as string;

    // Honeypot anti-spam
    if (isHoneypotTriggered(website)) {
      return { success: true };
    }

    const nombre = (formData.get("nombre") as string)?.trim();
    const telefono = (formData.get("telefono") as string)?.trim();
    const correo = (formData.get("correo") as string)?.trim();
    const area = (formData.get("area") as string)?.trim();
    const mensaje = ((formData.get("mensaje") as string)?.trim()) || "";
    const cvFile = formData.get("cv") as File | null;

    if (!nombre || !telefono || !correo || !area) {
      return { success: false, error: "Por favor, complete todos los campos obligatorios (*)." };
    }

    // Validación de límites de longitud server-side
    if (
      !isWithinLength(nombre, 150) ||
      !isWithinLength(telefono, 30) ||
      !isWithinLength(correo, 254) ||
      !isWithinLength(area, 100) ||
      !isWithinLength(mensaje, 2000)
    ) {
      return {
        success: false,
        error: "Uno o más campos exceden la longitud máxima permitida.",
      };
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return {
        success: false,
        error: "Ingrese un correo electrónico válido.",
      };
    }

    // Validación server-side de archivo adjunto (CV)
    const attachments = [];
    let attachedCvName = "";
    if (cvFile && cvFile.size > 0) {
      if (cvFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: "El currículum vitae supera el límite máximo permitido de 5 MB.",
        };
      }

      if (!isValidExtension(cvFile.name, ALLOWED_CV_EXTENSIONS)) {
        return {
          success: false,
          error: "El formato del CV no está permitido. Solo se aceptan archivos .pdf, .doc o .docx.",
        };
      }

      const buffer = Buffer.from(await cvFile.arrayBuffer());
      if (!isValidMagicBytes(buffer, cvFile.name)) {
        return {
          success: false,
          error: "El archivo de CV seleccionado no posee un formato válido o está dañado.",
        };
      }

      const safeFilename = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      attachedCvName = safeFilename;
      attachments.push({
        filename: safeFilename,
        content: buffer,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_API_KEY no configurada. Simulando envío en desarrollo.");
        return { success: true };
      }
      return {
        success: false,
        error: "El servicio no está disponible temporalmente. Por favor, inténtelo nuevamente o contáctenos directamente.",
      };
    }

    const resend = new Resend(apiKey);

    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    // Sanitización y escape HTML de datos de usuario para el correo
    const safeNombre = escapeHtml(nombre);
    const safeTelefono = escapeHtml(telefono);
    const safeCorreo = escapeHtml(correo);
    const safeArea = escapeHtml(area);
    const safeMensaje = escapeHtml(mensaje || "Sin mensaje adicional");
    const cleanSubjectNombre = nombre.replace(/[\r\n]+/g, " ").trim().slice(0, 80);
    const cleanSubjectArea = area.replace(/[\r\n]+/g, " ").trim().slice(0, 50);

    // 1. Notificación interna para RRHH / Selección
    const hrContentHtml = `
      <div style="text-align: left; margin-bottom: 22px;">
        <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
          Nueva Postulación - Bolsa de Trabajo
        </h1>
        <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Se ha recibido un nuevo currículum para el área de <strong>${safeArea}</strong> desde el portal de convocatorias.
        </p>
      </div>

      ${renderDetailCard("Datos del Postulante", [
        { label: "Fecha y Hora", value: fechaHora },
        { label: "Nombre Completo", value: safeNombre },
        { label: "Teléfono", value: safeTelefono, isLink: true, href: `tel:${telefono.replace(/\D/g, "")}` },
        { label: "Correo Electrónico", value: safeCorreo, isLink: true, href: `mailto:${safeCorreo}` },
        { label: "Área de Interés", value: safeArea },
        { label: "Currículum Vitae", value: attachedCvName || "No adjuntado" },
      ], {
        maxWidth: "520px",
        centered: true,
        innerTableMaxWidth: "440px",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderCalloutBox(
        "Mensaje / Resumen de Experiencia:",
        safeMensaje,
        "blue",
        { maxWidth: "520px", centered: true }
      )}

      ${attachedCvName ? `
      <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" class="callout-table" style="max-width: 520px; width: 100%; background-color: #f1f5f9; border-radius: 6px; margin: 0 auto 6px auto;">
        <tr>
          <td class="callout-cell" style="padding: 12px 16px; font-size: 13px; color: #475569;">
            📎 <strong>Archivo de CV adjunto:</strong> ${attachedCvName} <em>(Descárguelo en los adjuntos de este correo)</em>
          </td>
        </tr>
      </table>` : ""}

      <!-- ACCIONES DE CONTACTO RÁPIDO CON EL CLIENTE (AL FINAL, ESTILO IMAGEN 1) -->
      ${renderInternalContactActions(telefono, safeNombre, `su postulación para ${safeArea}`)}
    `;

    const emailToHrHtml = renderMasterEmail({
      pageTitle: `Nueva Postulación: ${cleanSubjectNombre} - ${cleanSubjectArea}`,
      preheaderText: `Postulación para ${safeArea}: ${safeNombre} (${safeTelefono}).`,
      badgeHtml: "📄 NUEVA POSTULACIÓN",
      contentHtml: hrContentHtml,
      showContactCenter: false,
      customFooterText: "SERVIMAFED S.A.C. | Departamento de Gestión del Talento Humano",
    });

    const { error: hrError } = await resend.emails.send({
      from: "SERVIMAFED RRHH <web@servimafed.com>",
      to: [BRAND.EMAIL_HR],
      replyTo: correo,
      subject: `📄 Nueva Postulación: ${cleanSubjectNombre} - ${cleanSubjectArea}`,
      html: emailToHrHtml,
      attachments,
    });

    if (hrError) {
      console.error("Resend API Error al notificar a RRHH:", hrError);
      return { 
        success: false, 
        error: "No se pudo enviar la postulación en este momento. Por favor intente más tarde." 
      };
    }

    // 2. Correo de cortesía y confirmación al postulante
    const candidateContentHtml = `
      <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
        Hola ${safeNombre},
      </h1>
      
      <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
        Muchas gracias por tu interés en integrarte a <strong>SERVIMAFED S.A.C.</strong> Hemos recibido exitosamente tu postulación y currículum para el área de <strong>${safeArea}</strong>.
      </p>

      ${renderDetailCard(
        "Datos Registrados de tu Postulación",
        [
          { label: "Área de Postulación", value: safeArea },
          { label: "Fecha y Hora de Registro", value: fechaHora },
          { label: "Teléfono de Contacto", value: safeTelefono },
          { label: "Correo Electrónico", value: safeCorreo },
        ],
        {
          maxWidth: "520px",
          centered: true,
          hideDivider: true,
          hideRowBorders: true,
        }
      )}

      ${renderCalloutBox(
        "Proceso de Selección:",
        "Nuestro equipo de Gestión del Talento Humano evaluará tu perfil y trayectoria profesional. En caso de contar con una posición que se adapte a tus competencias, nos pondremos en contacto contigo para coordinar una entrevista técnica y personal.",
        "neutral"
      )}
    `;

    const emailToCandidateHtml = renderMasterEmail({
      pageTitle: "Hemos recibido tu postulación - SERVIMAFED S.A.C.",
      preheaderText: `Hola ${safeNombre}, confirmamos la recepción de tu postulación para ${safeArea} en SERVIMAFED S.A.C.`,
      badgeHtml: "¡Postulación<br/>Recibida!",
      heroBannerUrl: EMAIL_ASSETS.HERO_BANNER,
      contentHtml: candidateContentHtml,
      showContactCenter: true,
      contactCenterEmail: BRAND.EMAIL_HR,
      customFooterText: "SERVIMAFED S.A.C. | Departamento de Gestión del Talento Humano",
    });

    // Envío asíncrono al postulante
    resend.emails.send({
      from: "SERVIMAFED RRHH <web@servimafed.com>",
      to: [correo],
      replyTo: BRAND.EMAIL_HR,
      subject: "Hemos recibido tu postulación laboral - SERVIMAFED S.A.C.",
      html: emailToCandidateHtml,
    }).catch((err) => {
      console.warn("Aviso: no se pudo enviar correo de confirmación al postulante:", err);
    });

    return { success: true };
  } catch (error) {
    console.error("Server Action sendJobApplication Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
