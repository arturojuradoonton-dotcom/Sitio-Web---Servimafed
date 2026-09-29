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
      // 1. Límite de tamaño máximo: 5 MB
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: "El archivo adjunto supera el límite máximo permitido de 5 MB.",
        };
      }

      // 2. Validación de extensión permitida en servidor
      if (!isValidExtension(file.name, ALLOWED_VISIT_EXTENSIONS)) {
        return {
          success: false,
          error: "El tipo de archivo no está permitido. Formatos aceptados: PDF, DOC, DOCX, JPG, PNG o WEBP.",
        };
      }

      // 3. Inspección binaria de magic bytes (sin dependencias adicionales)
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

    // Formateo y sanitización para acciones directas (Llamada y WhatsApp)
    const cleanPhoneDigits = phone.replace(/\D/g, "");
    const whatsappNumber = cleanPhoneDigits.length === 9 ? `51${cleanPhoneDigits}` : cleanPhoneDigits;
    const waGreeting = encodeURIComponent(
      `Hola ${fullName}, le saludamos del equipo técnico de SERVIMAFED S.A.C. Recibimos su solicitud de visita técnica para su equipo ${equipment}. ¿Podemos coordinar la inspección?`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waGreeting}`;
    const telUrl = `tel:${cleanPhoneDigits}`;

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

    // Build high-converting, personalized HTML email for the sales team
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud de Visita Técnica</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F5F9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #E2E8F0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0B0F19; padding: 28px 24px; text-align: center; border-bottom: 4px solid #FCB326;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <span style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                      SERVI<span style="color: #FCB326;">MAFED</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="background-color: #FCB326; color: #0B0F19; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; display: inline-block;">
                      🔥 NUEVA OPORTUNIDAD COMERCIAL · VISITA TÉCNICA
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 12px;">
                    <h1 style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Requerimiento de Servicio en Campo
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions Bar (Llamar al instante + WhatsApp) -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 18px 24px; border-bottom: 1px solid #E2E8F0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
                      ⚡ Acciones Inmediatas para el Asesor Comercial:
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- Botón Llamar -->
                        <td width="48%" align="center" style="padding-right: 6px;">
                          <a href="${telUrl}" style="background-color: #FCB326; color: #0B0F19; display: block; padding: 12px 14px; text-decoration: none; border-radius: 6px; font-weight: 800; font-size: 13px; text-align: center; letter-spacing: 0.3px;">
                            📞 Llamar al Cliente
                          </a>
                        </td>
                        <!-- Botón WhatsApp -->
                        <td width="48%" align="center" style="padding-left: 6px;">
                          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #25D366; color: #FFFFFF; display: block; padding: 12px 14px; text-decoration: none; border-radius: 6px; font-weight: 800; font-size: 13px; text-align: center; letter-spacing: 0.3px;">
                            💬 Chatear por WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 24px 28px;">

              <!-- Customer Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 22px;">
                <tr>
                  <td style="border-bottom: 2px solid #FCB326; padding-bottom: 6px;">
                    <span style="font-size: 13px; font-weight: 800; color: #0B0F19; text-transform: uppercase; letter-spacing: 0.5px;">
                      👤 Datos de Contacto del Cliente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px;">
                      <tr>
                        <td width="35%" style="color: #64748B; font-weight: 600;">Nombre / Razón Social:</td>
                        <td width="65%" style="color: #0B0F19; font-weight: 700;">${safeFullName}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Teléfono:</td>
                        <td style="color: #0B0F19; font-weight: 700;">
                          <a href="${telUrl}" style="color: #D97706; text-decoration: none; font-weight: 800;">${safePhone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Correo Electrónico:</td>
                        <td>
                          ${email !== "No proporcionado" 
                            ? `<a href="mailto:${safeEmail}" style="color: #2563EB; text-decoration: none; font-weight: 600;">${safeEmail}</a>`
                            : `<span style="color: #94A3B8; font-style: italic;">No proporcionado</span>`
                          }
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Equipment Spotlight Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; margin-bottom: 22px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0F19; padding: 10px 16px; border-bottom: 2px solid #FCB326;">
                    <span style="color: #FCB326; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                      🚜 Ficha del Equipo y Servicio Requerido
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px;">
                      <tr>
                        <td width="38%" style="color: #64748B; font-weight: 600;">Vehículo / Maquinaria:</td>
                        <td width="62%" style="color: #0B0F19; font-weight: 800; font-size: 15px;">${safeEquipment}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Año de Fabricación:</td>
                        <td style="color: #0B0F19; font-weight: 700;">${safeYear}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Tipo de Servicio:</td>
                        <td>
                          <span style="background-color: #FEF3C7; color: #92400E; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px; display: inline-block;">
                            ${safeServiceType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Cita Sugerida:</td>
                        <td style="color: #0B0F19; font-weight: 700;">
                          📅 ${safePreferredDate} &nbsp;·&nbsp; ⏰ ${safePreferredTime}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Problem Callout Box (Pain Point / Urgency) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; border-radius: 4px; margin-bottom: 22px;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <span style="color: #B45309; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                      ⚠️ Síntoma / Falla Reportada por el Cliente:
                    </span>
                    <p style="color: #1F2937; font-size: 15px; font-weight: 600; font-style: italic; margin: 0; line-height: 1.5; white-space: pre-wrap;">
                      "${safeComments}"
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Attachment Note (if any) -->
              ${attachedFileName ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F5F9; border-radius: 6px; margin-bottom: 22px;">
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #475569;">
                    📎 <strong>Archivo adjunto del cliente:</strong> ${safeAttachmentName} <em>(Descárguelo en la cabecera de este correo)</em>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Commercial Tip Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px;">
                <tr>
                  <td style="padding: 12px 16px; font-size: 12px; line-height: 1.5; color: #1E40AF;">
                    💡 <strong>Tip Comercial:</strong> El cliente requiere atención técnica. Contactarlo dentro de los primeros <strong>15 minutos</strong> incrementa la tasa de cierre en más del <strong>70%</strong>. ¡Haz la llamada ahora!
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0B0F19; padding: 20px; text-align: center; border-top: 1px solid #1E293B;">
              <p style="color: #94A3B8; font-size: 11px; margin: 0 0 6px 0; letter-spacing: 0.3px;">
                SERVIMAFED S.A.C. · Mantenimiento y Repuestos de Maquinaria Pesada
              </p>
              <p style="color: #64748B; font-size: 11px; margin: 0;">
                Mz. C Lote 12A, Sector Sumac Pacha - Lurín, Lima | <a href="https://www.servimafed.com" style="color: #FCB326; text-decoration: none; font-weight: bold;">www.servimafed.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: rawEmail || undefined,
      subject: emailSubject,
      html: htmlContent,
      attachments: attachments,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: "Error al enviar el correo. Por favor intente más tarde." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action sendVisitRequest Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
