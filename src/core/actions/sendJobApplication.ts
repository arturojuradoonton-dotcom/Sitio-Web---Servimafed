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
    if (cvFile && cvFile.size > 0) {
      // 1. Límite de tamaño: 5 MB
      if (cvFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: "El currículum vitae supera el límite máximo permitido de 5 MB.",
        };
      }

      // 2. Validación de extensión permitida en servidor (.pdf, .doc, .docx)
      if (!isValidExtension(cvFile.name, ALLOWED_CV_EXTENSIONS)) {
        return {
          success: false,
          error: "El formato del CV no está permitido. Solo se aceptan archivos .pdf, .doc o .docx.",
        };
      }

      // 3. Inspección binaria de magic bytes (sin dependencias adicionales)
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      if (!isValidMagicBytes(buffer, cvFile.name)) {
        return {
          success: false,
          error: "El archivo de CV seleccionado no posee un formato válido o está dañado.",
        };
      }

      const safeFilename = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
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

    // Sanitización y escape HTML de datos de usuario para el correo
    const safeNombre = escapeHtml(nombre);
    const safeTelefono = escapeHtml(telefono);
    const safeCorreo = escapeHtml(correo);
    const safeArea = escapeHtml(area);
    const safeMensaje = escapeHtml(mensaje || "Sin mensaje adicional");
    const cleanSubjectNombre = nombre.replace(/[\r\n]+/g, " ").trim().slice(0, 80);
    const cleanSubjectArea = area.replace(/[\r\n]+/g, " ").trim().slice(0, 50);

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
          <p style="margin: 8px 0;"><strong>Nombre Completo:</strong> ${safeNombre}</p>
          <p style="margin: 8px 0;"><strong>Teléfono:</strong> <a href="tel:${safeTelefono}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${safeTelefono}</a></p>
          <p style="margin: 8px 0;"><strong>Correo Electrónico:</strong> <a href="mailto:${safeCorreo}">${safeCorreo}</a></p>
          <p style="margin: 8px 0;"><strong>Área de Interés:</strong> ${safeArea}</p>

          <h3 style="color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
            Mensaje / Experiencia
          </h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${safeMensaje}
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
      subject: `📄 Nueva Postulación: ${cleanSubjectNombre} - ${cleanSubjectArea}`,
      html: emailHtml,
      attachments,
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
