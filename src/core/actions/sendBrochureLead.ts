"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBrochureLead(formData: FormData) {
  try {
    const nombre = (formData.get("nombre") as string)?.trim();
    const empresa = (formData.get("empresa") as string)?.trim();
    const correo = (formData.get("correo") as string)?.trim();
    const telefono = (formData.get("telefono") as string)?.trim() || "No especificado";

    if (!nombre || !empresa || !correo) {
      return {
        success: false,
        error: "Por favor complete su nombre, empresa y correo corporativo.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return {
        success: false,
        error: "Ingrese un correo electrónico válido.",
      };
    }

    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    const companyEmail = process.env.RECLAMOS_EMAIL ? "ventas@servimafed.com" : "ventas@servimafed.com";

    // 1. Notificación al equipo comercial de SERVIMAFED
    const emailToCompanyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B0F19; color: #FCB326; padding: 20px; text-align: center; border-bottom: 4px solid #FCB326;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">
            💼 Nuevo Prospecto Interesado en Brochure
          </h2>
          <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 12px;">
            Descarga de Dossier Técnico Corporativo
          </p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
            <tr><td style="width: 35%; color: #64748b;"><strong>Fecha y Hora:</strong></td><td>${fechaHora}</td></tr>
            <tr><td style="color: #64748b;"><strong>Nombre Completo:</strong></td><td><strong>${nombre}</strong></td></tr>
            <tr><td style="color: #64748b;"><strong>Empresa / Razón Social:</strong></td><td><strong>${empresa}</strong></td></tr>
            <tr><td style="color: #64748b;"><strong>Correo Corporativo:</strong></td><td><a href="mailto:${correo}" style="color: #1d4ed8;">${correo}</a></td></tr>
            <tr><td style="color: #64748b;"><strong>Teléfono:</strong></td><td>${telefono}</td></tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #FCB326; padding: 12px 16px; margin-top: 10px; font-size: 12px; color: #334155;">
            El usuario ha solicitado y descargado el <strong>Brochure Técnico 2026</strong> desde la sección de Preguntas Frecuentes. Se recomienda seguimiento comercial oportuno.
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          SERVIMAFED S.A.C. | Notificaciones Comerciales Automáticas
        </div>
      </div>
    `;

    // 2. Correo de bienvenida y respaldo al cliente
    const emailToCustomerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B0F19; color: #FCB326; padding: 24px; text-align: center; border-bottom: 4px solid #FCB326;">
          <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            SERVIMAFED S.A.C.
          </h2>
          <p style="margin: 6px 0 0 0; color: #ffffff; font-size: 13px;">
            Brochure Corporativo & Dossier Técnico 2026
          </p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 14px; line-height: 1.5; margin-top: 0;">
            Estimado/a <strong>${nombre}</strong> (${empresa}):
          </p>
          <p style="font-size: 13px; line-height: 1.6; color: #475569;">
            Agradecemos su interés en nuestras soluciones de mantenimiento mecánico integral, reparación de componentes mayores y mecanizado para minería y construcción pesada.
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a 
              href="https://www.servimafed.com/documento/brochure-servimafed.pdf" 
              style="background-color: #FCB326; color: #0B0F19; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; padding: 14px 28px; text-decoration: none; border-radius: 2px; display: inline-block;"
            >
              📥 Descargar Brochure Técnico (PDF)
            </a>
          </div>

          <p style="font-size: 12px; line-height: 1.6; color: #64748b;">
            Si tiene alguna duda o requiere agendar una visita técnica en sus operaciones, puede comunicarse directamente con nuestro equipo de ingeniería al teléfono <strong>(+51) 993 667 182</strong> o respondiendo a este mensaje.
          </p>
        </div>

        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          SERVIMAFED S.A.C. | Mz. C Lote 12A, Sector Sumac Pacha - Lurín - Lima | www.servimafed.com
        </div>
      </div>
    `;

    // Envío a ventas
    await resend.emails.send({
      from: "Web Servimafed <web@servimafed.com>",
      to: [companyEmail],
      replyTo: correo,
      subject: `💼 [PROSPECTO BROCHURE] ${nombre} - ${empresa}`,
      html: emailToCompanyHtml,
    });

    // Envío de cortesía al prospecto
    await resend.emails.send({
      from: "SERVIMAFED <web@servimafed.com>",
      to: [correo],
      subject: "Brochure Corporativo & Soluciones Técnicas - SERVIMAFED S.A.C.",
      html: emailToCustomerHtml,
    });

    return {
      success: true,
      downloadUrl: "/documento/brochure-servimafed.pdf",
      nombre,
      empresa,
      correo,
    };
  } catch (error) {
    console.error("Server Action sendBrochureLead Error:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado al procesar la solicitud.",
    };
  }
}
