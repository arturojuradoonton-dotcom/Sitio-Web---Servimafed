"use server";

import { Resend } from "resend";

export interface ContactFormData {
  companyName: string;
  phone: string;
  email?: string;
  requirement: string;
}

export interface ContactActionResult {
  success: boolean;
  error?: string;
}

export async function sendContactRequest(data: ContactFormData): Promise<ContactActionResult> {
  try {
    const { companyName, phone, email, requirement } = data;

    if (!companyName?.trim() || !phone?.trim() || !requirement?.trim()) {
      return { success: false, error: "Por favor, complete todos los campos obligatorios (*)." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY no configurada. Simulando envío en desarrollo.");
      return { success: true };
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            Nueva Solicitud de Contacto Corporativo
          </h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Sitio Web Servimafed SAC</p>
        </div>

        <div style="padding: 24px;">
          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">
            Datos del Cliente
          </h3>
          <p style="margin: 8px 0;"><strong>Razón Social / Nombre:</strong> ${companyName}</p>
          <p style="margin: 8px 0;"><strong>Teléfono de Contacto:</strong> <a href="tel:${phone}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${phone}</a></p>
          <p style="margin: 8px 0;"><strong>Correo Electrónico:</strong> ${email?.trim() ? `<a href="mailto:${email}">${email}</a>` : 'No proporcionado'}</p>

          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
            Requerimiento Técnico
          </h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${requirement}
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b;">
          Mensaje generado automáticamente desde el formulario de contacto de <a href="https://www.servimafed.com" style="color: #0f172a; font-weight: bold;">servimafed.com</a>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: email?.trim() ? email.trim() : undefined,
      subject: `🚨 Solicitud de Contacto - ${companyName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { 
        success: false, 
        error: "No se pudo enviar el correo en este momento. Por favor intente más tarde o contáctenos vía telefónica." 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action sendContactRequest Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
