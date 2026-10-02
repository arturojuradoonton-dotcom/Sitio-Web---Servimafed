"use server";

import { Resend } from "resend";
import { escapeHtml, isWithinLength, isHoneypotTriggered } from "@/core/lib/security";
import {
  renderMasterEmail,
  renderDetailCard,
  renderCalloutBox,
  renderInternalContactActions,
  EMAIL_ASSETS,
  BRAND,
} from "@/core/lib/emailLayout";

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
    const website = formData.get("website") as string;

    // Honeypot anti-spam
    if (isHoneypotTriggered(website)) {
      return {
        success: true,
        claimCode: `LR-${new Date().getFullYear()}-0000`,
        tipo: "RECLAMO",
        correo: "registro@servimafed.com",
      };
    }

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

    // Validación de límites de longitud server-side
    if (
      !isWithinLength(nombre, 150) ||
      !isWithinLength(documento, 30) ||
      !isWithinLength(telefono, 30) ||
      !isWithinLength(correo, 254) ||
      !isWithinLength(direccion, 250) ||
      !isWithinLength(detalle, 4000) ||
      !isWithinLength(pedido, 2000)
    ) {
      return {
        success: false,
        error: "Uno o más campos exceden la longitud máxima permitida.",
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
    const companyEmail = process.env.RECLAMOS_EMAIL || "reclamos@servimafed.com";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_API_KEY no configurada. Simulando registro de reclamación en desarrollo.");
        return {
          success: true,
          claimCode,
          tipo: tipoLabel,
          correo,
        };
      }
      return {
        success: false,
        error: "El servicio no está disponible temporalmente. Por favor intente más tarde.",
      };
    }

    const resend = new Resend(apiKey);

    // Sanitización y escape HTML de datos de usuario para el correo
    const safeNombre = escapeHtml(nombre);
    const safeDocumento = escapeHtml(documento);
    const safeTelefono = escapeHtml(telefono);
    const safeCorreo = escapeHtml(correo);
    const safeDireccion = escapeHtml(direccion);
    const safeDetalle = escapeHtml(detalle);
    const safePedido = escapeHtml(pedido);
    const cleanSubjectNombre = nombre.replace(/[\r\n]+/g, " ").trim().slice(0, 80);

    // 1. Plantilla para la Empresa (SERVIMAFED - Atención Legal)
    const companyContentHtml = `
      <div style="text-align: left; margin-bottom: 22px;">
        <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
          Libro de Reclamaciones Virtual - Registro N° ${claimCode}
        </h1>
        <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Se ha recibido un nuevo registro en el Libro de Reclamaciones con valor legal vinculante.
        </p>
      </div>

      ${renderCalloutBox(
        "ALERTA LEGAL OBLIGATORIA (INDECOPI - LEY N° 31435):",
        "Conforme a la normativa vigente del Código de Protección y Defensa del Consumidor, se cuenta con un plazo legal perentorio de <strong>15 días hábiles improrrogables</strong> para dar respuesta formal y motivada al reclamante a través del correo registrado.",
        "gold",
        { maxWidth: "520px", centered: true }
      )}

      ${renderDetailCard("Datos del Reclamante", [
        { label: "Código de Registro", value: claimCode },
        { label: "Tipo de Registro", value: tipoLabel },
        { label: "Fecha y Hora", value: fechaHora },
        { label: "Nombre / Razón Social", value: safeNombre },
        { label: "DNI / RUC", value: safeDocumento },
        { label: "Teléfono", value: safeTelefono, isLink: true, href: `tel:${telefono.replace(/\D/g, "")}` },
        { label: "Correo Electrónico", value: safeCorreo, isLink: true, href: `mailto:${safeCorreo}` },
        { label: "Dirección", value: safeDireccion },
      ], {
        maxWidth: "520px",
        centered: true,
        innerTableMaxWidth: "440px",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderCalloutBox(`Detalle de la Reclamación (${tipoLabel}):`, safeDetalle, "neutral", { maxWidth: "520px", centered: true })}

      ${renderCalloutBox("Pedido Concreto del Consumidor:", safePedido, "blue", { maxWidth: "520px", centered: true })}

      <!-- ACCIONES DE CONTACTO RÁPIDO CON EL RECLAMANTE (AL FINAL, ESTILO IMAGEN 1) -->
      ${renderInternalContactActions(telefono, safeNombre, `su ${tipoLabel.toLowerCase()} registrada con código ${claimCode}`, {
        pillTitle: "Acciones de Contacto Rápido con el Reclamante",
        callLabel: "Llamar al Reclamante",
        teamName: "área de Atención al Cliente y Reclamaciones",
      })}
    `;

    const emailToCompanyHtml = renderMasterEmail({
      pageTitle: `Libro de Reclamaciones - ${claimCode} - ${cleanSubjectNombre}`,
      preheaderText: `Alerta legal INDECOPI: ${tipoLabel} N° ${claimCode} de ${safeNombre}.`,
      headerTitle: "RECLAMACIONES",
      headerIconUrl: EMAIL_ASSETS.CLAIMS_ICON,
      badgeHtml: tipoLabel,
      contentHtml: companyContentHtml,
      showContactCenter: false,
      customFooterText: "SERVIMAFED S.A.C. | Sistema Automatizado de Libro de Reclamaciones Virtual",
    });

    // 2. Plantilla para el Consumidor (Hoja Oficial de Reclamación con respaldo estandarizado)
    const customerContentHtml = `
      <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
        Estimado/a ${safeNombre},
      </h1>
      
      <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
        Le confirmamos que hemos recibido su <strong>${tipoLabel}</strong> a través de nuestro Libro de Reclamaciones Virtual. A continuación, le hacemos entrega de su constancia y hoja de registro oficial:
      </p>

      ${renderDetailCard("Constancia Oficial del Proveedor", [
        { label: "N° de Hoja de Reclamación", value: claimCode },
        { label: "Tipo de Registro", value: tipoLabel },
        { label: "Proveedor", value: "SERVIMAFED S.A.C." },
        { label: "RUC", value: BRAND.RUC },
        { label: "Dirección Legal", value: BRAND.ADDRESS },
        { label: "Fecha y Hora de Registro", value: fechaHora },
      ], {
        maxWidth: "520px",
        centered: true,
        innerTableMaxWidth: "440px",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderCalloutBox(`Detalle de su ${tipoLabel} Registrado:`, safeDetalle, "neutral", { maxWidth: "520px", centered: true })}

      ${renderCalloutBox("Su Pedido Concreto:", safePedido, "neutral", { maxWidth: "520px", centered: true })}

      ${renderCalloutBox(
        "Plazo de Respuesta Legal (Ley N° 31435 - INDECOPI):",
        "SERVIMAFED S.A.C. dará respuesta formal y motivada a su reclamación en un plazo no mayor a quince (15) días hábiles improrrogables a través de este correo electrónico.",
        "green",
        { maxWidth: "520px", centered: true }
      )}
    `;

    const emailToCustomerHtml = renderMasterEmail({
      pageTitle: `Hoja de Reclamación N° ${claimCode} - SERVIMAFED S.A.C.`,
      preheaderText: `Constancia oficial de ${tipoLabel} N° ${claimCode} registrada ante SERVIMAFED S.A.C.`,
      headerTitle: "LIBRO DE RECLAMACIONES",
      headerIconUrl: EMAIL_ASSETS.CLAIMS_ICON,
      badgeHtml: `REGISTRO N°<br/>${claimCode}`,
      contentHtml: customerContentHtml,
      showContactCenter: true,
      contactCenterEmail: BRAND.EMAIL_CLAIMS,
      customFooterText: "SERVIMAFED S.A.C. | Libro de Reclamaciones Virtual conforme a las directivas de INDECOPI.",
    });

    // 1. Envío a la empresa
    const sendCompany = await resend.emails.send({
      from: "Libro de Reclamaciones <web@servimafed.com>",
      to: [companyEmail],
      replyTo: correo,
      subject: `🚨 [LIBRO DE RECLAMACIONES] ${tipoLabel} N° ${claimCode} - ${cleanSubjectNombre}`,
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
      console.error("Error al enviar constancia al cliente:", sendCustomer.error);
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
      error: "Ocurrió un error inesperado al procesar la solicitud.",
    };
  }
}
