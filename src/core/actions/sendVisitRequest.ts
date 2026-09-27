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
    const cleanSubjectName = fullName.replace(/[\r\n]+/g, " ").trim().slice(0, 100);

    // Build the email HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #FACC15; background-color: #111827; padding: 20px; margin: 0; text-align: center; text-transform: uppercase;">
          Nueva Solicitud de Visita Técnica
        </h2>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">Información de Contacto</h3>
          <p><strong>Nombre / Razón Social:</strong> ${safeFullName}</p>
          <p><strong>Teléfono:</strong> ${safePhone}</p>
          <p><strong>Correo Electrónico:</strong> ${safeEmail}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Detallado de Equipos</h3>
          <p><strong>Vehículo, Marca y Modelo:</strong> ${safeEquipment}</p>
          <p><strong>Año:</strong> ${safeYear}</p>
          <p><strong>Tipo de Servicio:</strong> ${safeServiceType}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Detalles de la Cita</h3>
          <p><strong>Fecha Sugerida:</strong> ${safePreferredDate}</p>
          <p><strong>Hora Preferida:</strong> ${safePreferredTime}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Descripción de la Falla</h3>
          <p style="white-space: pre-wrap;">${safeComments}</p>
        </div>
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          Este correo fue generado automáticamente desde el sitio web de SERVIMAFED.
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: rawEmail || undefined,
      subject: `Nueva Solicitud de Visita Técnica - ${cleanSubjectName}`,
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
