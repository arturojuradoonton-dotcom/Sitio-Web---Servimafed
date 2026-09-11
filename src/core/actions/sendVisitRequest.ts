"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVisitRequest(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = (formData.get("email") as string) || "No proporcionado";
    const equipment = (formData.get("equipment") as string) || "No especificado";
    const year = (formData.get("year") as string) || "No especificado";
    const serviceType = formData.get("serviceType") as string;
    const preferredDate = formData.get("preferredDate") as string;
    const preferredTime = (formData.get("preferredTime") as string) || "No especificada";
    const comments = (formData.get("comments") as string) || "Sin comentarios adicionales";
    const file = formData.get("file") as File | null;

    // Validate required fields
    if (!fullName || !phone || !serviceType || !preferredDate) {
      return { success: false, error: "Faltan campos obligatorios" };
    }

    let attachments = [];

    // Handle file attachment if it exists
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Map service type to readable string
    const serviceTypeMap: Record<string, string> = {
      preventivo: "Mantenimiento Preventivo",
      reparacion: "Reparación de Componentes",
      soldadura: "Mecanizado y Soldadura",
      diagnostico: "Evaluación y Diagnóstico",
      repuestos: "Suministro de Repuestos",
    };
    const serviceTypeReadable = serviceTypeMap[serviceType] || serviceType;

    // Build the email HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #FACC15; background-color: #111827; padding: 20px; margin: 0; text-align: center; text-transform: uppercase;">
          Nueva Solicitud de Visita Técnica
        </h2>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">Información de Contacto</h3>
          <p><strong>Nombre / Razón Social:</strong> ${fullName}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Correo Electrónico:</strong> ${email}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Detallado de Equipos</h3>
          <p><strong>Vehículo, Marca y Modelo:</strong> ${equipment}</p>
          <p><strong>Año:</strong> ${year}</p>
          <p><strong>Tipo de Servicio:</strong> ${serviceTypeReadable}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Detalles de la Cita</h3>
          <p><strong>Fecha Sugerida:</strong> ${preferredDate}</p>
          <p><strong>Hora Preferida:</strong> ${preferredTime}</p>

          <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 25px;">Descripción de la Falla</h3>
          <p style="white-space: pre-wrap;">${comments}</p>
        </div>
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          Este correo fue generado automáticamente desde el sitio web de SERVIMAFED.
        </div>
      </div>
    `;

    // Send email via Resend
    // Dado que el dominio servimafed.com está verificado, usamos ese dominio en el 'from'
    const { data, error } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      subject: `Nueva Solicitud de Visita Técnica - ${fullName}`,
      html: htmlContent,
      attachments: attachments,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: "Error al enviar el correo. Por favor intente más tarde." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
