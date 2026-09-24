"use server";

import { Resend } from "resend";

export interface JobApplicationResult {
  success: boolean;
  error?: string;
}

export async function sendJobApplication(formData: FormData): Promise<JobApplicationResult> {
  try {
    const nombre = formData.get("nombre") as string;
    const telefono = formData.get("telefono") as string;
    const correo = formData.get("correo") as string;
    const area = formData.get("area") as string;
    const mensaje = formData.get("mensaje") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!nombre?.trim() || !telefono?.trim() || !correo?.trim() || !area?.trim()) {
      return { success: false, error: "Por favor, complete todos los campos obligatorios (*)." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY no configurada. Simulando envío en desarrollo.");
      return { success: true };
    }

    const resend = new Resend(apiKey);
    
    // Process Attachment if exists
    const attachments = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: cvFile.name,
        content: buffer
      });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            Nueva Postulación de Trabajo
          </h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Sitio Web Servimafed SAC</p>
        </div>

        <div style="padding: 24px;">
          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">
            Datos del Postulante
          </h3>
          <p style="margin: 8px 0;"><strong>Nombre Completo:</strong> ${nombre}</p>
          <p style="margin: 8px 0;"><strong>Teléfono:</strong> <a href="tel:${telefono}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${telefono}</a></p>
          <p style="margin: 8px 0;"><strong>Correo Electrónico:</strong> <a href="mailto:${correo}">${correo}</a></p>
          <p style="margin: 8px 0;"><strong>Área de Interés:</strong> ${area}</p>

          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
            Mensaje / Experiencia
          </h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${mensaje || "Sin mensaje adicional"}
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b;">
          Mensaje generado automáticamente desde el formulario de Bolsa de Trabajo de <a href="https://www.servimafed.com" style="color: #0f172a; font-weight: bold;">servimafed.com</a>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "SERVIMAFED RRHH <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: correo,
      subject: `📄 Nueva Postulación: ${nombre} - ${area}`,
      html: emailHtml,
      attachments
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { 
        success: false, 
        error: "No se pudo enviar la postulación en este momento. Por favor intente más tarde." 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action sendJobApplication Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
