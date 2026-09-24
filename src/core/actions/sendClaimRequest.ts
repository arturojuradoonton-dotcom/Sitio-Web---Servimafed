"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ClaimRequestData {
  tipo: "reclamo" | "queja";
  nombre: string;
  documento: string; // DNI o RUC
  telefono: string;
  correo: string;
  direccion?: string;
  detalle: string;
  pedido: string;
}

export async function sendClaimRequest(formData: FormData) {
  try {
    const tipo = (formData.get("tipo") as string) || "reclamo";
    const nombre = (formData.get("nombre") as string)?.trim();
    const documento = (formData.get("documento") as string)?.trim();
    const telefono = (formData.get("telefono") as string)?.trim();
    const correo = (formData.get("correo") as string)?.trim();
    const direccion = (formData.get("direccion") as string)?.trim() || "No especificada";
    const detalle = (formData.get("detalle") as string)?.trim();
    const pedido = (formData.get("pedido") as string)?.trim();

    // Validaciones estrictas
    if (!nombre || !documento || !telefono || !correo || !detalle || !pedido) {
      return {
        success: false,
        error: "Por favor complete todos los campos obligatorios del formulario.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return {
        success: false,
        error: "Ingrese un correo electrónico válido para recibir su constancia.",
      };
    }

    // Generar código único correlativo (Ej: LR-2026-9482)
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const claimCode = `LR-${currentYear}-${randomSuffix}`;
    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    const tipoLabel = tipo === "queja" ? "QUEJA" : "RECLAMO";
    const companyEmail = process.env.RECLAMOS_EMAIL || "ventas@servimafed.com";

    // 1. Plantilla para la Empresa (SERVIMAFED)
    const emailToCompanyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B0F19; color: #FCB326; padding: 24px; text-align: center; border-bottom: 4px solid #FCB326;">
          <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            🚨 Libro de Reclamaciones Virtual
          </h2>
          <p style="margin: 6px 0 0 0; color: #ffffff; font-size: 13px;">
            Registro Oficial N° <strong>${claimCode}</strong>
          </p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 12px; color: #92400e; font-weight: bold;">
              ATENCIÓN LEGAL OBLIGATORIA (INDECOPI):
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #78350f;">
              Conforme a la Ley N° 31435, se cuenta con un plazo máximo de <strong>15 días hábiles improrrogables</strong> para emitir respuesta formal al usuario.
            </p>
          </div>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; color: #0B0F19; margin-top: 0;">
            1. Datos del Reclamante
          </h3>
          <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
            <tr><td style="width: 35%; color: #64748b;"><strong>Tipo de Solicitud:</strong></td><td><strong style="color: #d97706;">${tipoLabel}</strong></td></tr>
            <tr><td style="color: #64748b;"><strong>Fecha y Hora:</strong></td><td>${fechaHora}</td></tr>
            <tr><td style="color: #64748b;"><strong>Nombre / Razón Social:</strong></td><td>${nombre}</td></tr>
            <tr><td style="color: #64748b;"><strong>DNI / RUC:</strong></td><td>${documento}</td></tr>
            <tr><td style="color: #64748b;"><strong>Teléfono:</strong></td><td>${telefono}</td></tr>
            <tr><td style="color: #64748b;"><strong>Correo Electrónico:</strong></td><td><a href="mailto:${correo}" style="color: #1d4ed8;">${correo}</a></td></tr>
            <tr><td style="color: #64748b;"><strong>Dirección:</strong></td><td>${direccion}</td></tr>
          </table>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; color: #0B0F19;">
            2. Detalle de la Reclamación (${tipoLabel})
          </h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 20px;">
            ${detalle}
          </div>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; color: #0B0F19;">
            3. Pedido Concreto del Consumidor
          </h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
            ${pedido}
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          SERVIMAFED S.A.C. | RUC 20600567668 | Sistema de Libro de Reclamaciones Virtual
        </div>
      </div>
    `;

    // 2. Plantilla para el Consumidor (Hoja Oficial de Reclamación)
    const emailToCustomerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B0F19; color: #FCB326; padding: 24px; text-align: center; border-bottom: 4px solid #FCB326;">
          <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            SERVIMAFED S.A.C.
          </h2>
          <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 13px;">
            Hoja de Reclamación Virtual N° <strong>${claimCode}</strong>
          </p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 14px; line-height: 1.5; margin-top: 0;">
            Estimado/a <strong>${nombre}</strong>:
          </p>
          <p style="font-size: 13px; line-height: 1.6; color: #475569;">
            Le confirmamos que hemos recibido su <strong>${tipoLabel}</strong> a través de nuestro Libro de Reclamaciones Virtual. A continuación, le hacemos entrega de su constancia oficial:
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; margin: 16px 0; font-size: 12px; line-height: 1.6;">
            <p style="margin: 0 0 6px 0;"><strong>Proveedor:</strong> SERVIMAFED S.A.C.</p>
            <p style="margin: 0 0 6px 0;"><strong>RUC:</strong> 20600567668</p>
            <p style="margin: 0 0 6px 0;"><strong>Dirección:</strong> Mz. C Lote 12A, Sector Sumac Pacha - Lurín - Lima</p>
            <p style="margin: 0 0 6px 0;"><strong>Fecha y Hora de Registro:</strong> ${fechaHora}</p>
            <p style="margin: 0;"><strong>N° de Hoja de Reclamación:</strong> <span style="color: #d97706; font-weight: bold;">${claimCode}</span></p>
          </div>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; font-size: 13px; text-transform: uppercase; color: #0B0F19;">
            Detalle del ${tipoLabel} Registrado:
          </h3>
          <p style="font-size: 13px; line-height: 1.6; color: #334155; background-color: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
            ${detalle}
          </p>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; font-size: 13px; text-transform: uppercase; color: #0B0F19;">
            Pedido del Consumidor:
          </h3>
          <p style="font-size: 13px; line-height: 1.6; color: #334155; background-color: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
            ${pedido}
          </p>

          <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; margin-top: 24px;">
            <p style="margin: 0; font-size: 12px; color: #065f46; font-weight: bold;">
              Plazo de Respuesta Legal (Ley N° 31435 - INDECOPI):
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #047857; line-height: 1.5;">
              SERVIMAFED S.A.C. dará respuesta formal a su reclamación en un plazo no mayor a quince (15) días hábiles improrrogables a través de este correo electrónico.
            </p>
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Servimafed S.A.C. | Mantenimiento y Maquinaria Pesada | www.servimafed.com
        </div>
      </div>
    `;

    // 1. Envío a la empresa
    const sendCompany = await resend.emails.send({
      from: "Libro de Reclamaciones <web@servimafed.com>",
      to: [companyEmail],
      replyTo: correo,
      subject: `🚨 [LIBRO DE RECLAMACIONES] ${tipoLabel} N° ${claimCode} - ${nombre}`,
      html: emailToCompanyHtml,
    });

    if (sendCompany.error) {
      console.error("Error al notificar a la empresa:", sendCompany.error);
      return {
        success: false,
        error: "No se pudo registrar la reclamación en este momento. Por favor intente más tarde.",
      };
    }

    // 2. Envío de la constancia oficial al cliente
    const sendCustomer = await resend.emails.send({
      from: "Libro de Reclamaciones Servimafed <web@servimafed.com>",
      to: [correo],
      subject: `Hoja de Reclamación N° ${claimCode} - SERVIMAFED S.A.C.`,
      html: emailToCustomerHtml,
    });

    if (sendCustomer.error) {
      console.warn("Advertencia: No se pudo enviar copia al cliente:", sendCustomer.error);
    }

    return {
      success: true,
      claimCode,
      tipo: tipoLabel,
      correo,
    };
  } catch (error) {
    console.error("Server Action sendClaimRequest Error:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado al procesar su reclamación.",
    };
  }
}
