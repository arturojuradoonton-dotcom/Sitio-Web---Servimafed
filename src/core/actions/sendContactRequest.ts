"use server";

import { Resend } from "resend";
import { escapeHtml, isWithinLength, isHoneypotTriggered } from "@/core/lib/security";

export interface ContactFormData {
  companyName: string;
  phone: string;
  email?: string;
  requirement: string;
  website?: string;
}

export interface ContactActionResult {
  success: boolean;
  error?: string;
}

export async function sendContactRequest(data: ContactFormData): Promise<ContactActionResult> {
  try {
    const { companyName, phone, email, requirement, website } = data;

    // Honeypot anti-spam
    if (isHoneypotTriggered(website)) {
      return { success: true };
    }

    if (!companyName?.trim() || !phone?.trim() || !requirement?.trim()) {
      return { success: false, error: "Por favor, complete todos los campos obligatorios (*)." };
    }

    // Validación de límites de longitud server-side
    if (
      !isWithinLength(companyName, 200) ||
      !isWithinLength(phone, 30) ||
      !isWithinLength(email, 254) ||
      !isWithinLength(requirement, 2000)
    ) {
      return {
        success: false,
        error: "Uno o más campos exceden la longitud máxima permitida.",
      };
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

    // Sanitización y escape HTML de datos de usuario para el correo
    const safeCompanyName = escapeHtml(companyName.trim());
    const safePhone = escapeHtml(phone.trim());
    const cleanEmail = email?.trim() || "";
    const safeEmail = escapeHtml(cleanEmail);
    const safeRequirement = escapeHtml(requirement.trim());
    const cleanSubjectCompany = companyName.replace(/[\r\n]+/g, " ").trim().slice(0, 100);

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
          <p style="margin: 8px 0;"><strong>Razón Social / Nombre:</strong> ${safeCompanyName}</p>
          <p style="margin: 8px 0;"><strong>Teléfono de Contacto:</strong> <a href="tel:${safePhone}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${safePhone}</a></p>
          <p style="margin: 8px 0;"><strong>Correo Electrónico:</strong> ${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : 'No proporcionado'}</p>

          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
            Requerimiento Técnico
          </h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${safeRequirement}
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
      replyTo: cleanEmail ? cleanEmail : undefined,
      subject: `🚨 Solicitud de Contacto - ${cleanSubjectCompany}`,
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
