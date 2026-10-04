"use server";

import { Resend } from "resend";
import { escapeHtml, isWithinLength, isHoneypotTriggered } from "@/core/lib/security";
import {
  renderMasterEmail,
  renderMetricsSection,
  renderBrochureDownloadCard,
  renderInternalContactActions,
  renderDetailCard,
  renderCalloutBox,
  EMAIL_ASSETS,
} from "@/core/lib/emailLayout";

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

    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    // Sanitización y escape HTML de datos de usuario para el correo
    const safeCompanyName = escapeHtml(companyName.trim());
    const safePhone = escapeHtml(phone.trim());
    const cleanEmail = email?.trim() || "";
    const safeEmail = escapeHtml(cleanEmail);
    const safeRequirement = escapeHtml(requirement.trim());
    const cleanSubjectCompany = companyName.replace(/[\r\n]+/g, " ").trim().slice(0, 100);

    // 1. Notificación interna para el equipo comercial de SERVIMAFED
    const companyContentHtml = `
      <div style="text-align: left; margin-bottom: 22px; padding: 0 24px;">
        <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
          Nueva Solicitud de Contacto Corporativo
        </h1>
        <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Un cliente potencial se ha comunicado a través del formulario de contacto de la web oficial.
        </p>
      </div>

      ${renderDetailCard("Datos del Cliente", [
        { label: "Fecha y Hora", value: fechaHora },
        { label: "Razón Social / Nombre", value: safeCompanyName },
        { label: "Teléfono de Contacto", value: safePhone, isLink: true, href: `tel:${phone.replace(/\D/g, "")}` },
        { label: "Correo Electrónico", value: safeEmail || "No proporcionado", isLink: Boolean(cleanEmail), href: cleanEmail ? `mailto:${safeEmail}` : undefined },
      ], {
        maxWidth: "100%",
        innerTableMaxWidth: "480px",
        innerAlign: "left",
        fullBleed: true,
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderCalloutBox(
        "Requerimiento Técnico / Consulta Comercial:",
        safeRequirement,
        "gold",
        { maxWidth: "100%", fullBleed: true }
      )}

      <div style="padding: 0 24px;">
        <!-- ACCIONES DE CONTACTO RÁPIDO CON EL CLIENTE (AL FINAL, ESTILO IMAGEN 1) -->
        ${renderInternalContactActions(phone, safeCompanyName, "su mensaje de contacto")}
      </div>
    `;

    const emailToCompanyHtml = renderMasterEmail({
      pageTitle: `Contacto Corporativo - ${cleanSubjectCompany}`,
      preheaderText: `Nuevo mensaje de ${safeCompanyName} (${safePhone}).`,
      headerTitle: "CONTACTO CORPORATIVO",
      headerIconUrl: EMAIL_ASSETS.CLIENT_ICON,
      badgeHtml: "CONTACTO",
      contentHtml: companyContentHtml,
      contentPadding: "32px 0 24px 0",
      showContactCenter: false,
    });

    const { error: companyError } = await resend.emails.send({
      from: "SERVIMAFED Web <web@servimafed.com>",
      to: ["ventas@servimafed.com"],
      replyTo: cleanEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ? cleanEmail : undefined,
      subject: `🚨 Solicitud de Contacto - ${cleanSubjectCompany}`,
      html: emailToCompanyHtml,
    });

    if (companyError) {
      console.error("Resend API Error al enviar a ventas:", companyError);
      return { 
        success: false, 
        error: "No se pudo enviar el correo en este momento. Por favor intente más tarde o contáctenos vía telefónica." 
      };
    }

    // 2. Correo de cortesía y confirmación al cliente (si proporcionó correo válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanEmail && emailRegex.test(cleanEmail)) {
      const customerContentHtml = `
        <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
          Hola ${safeCompanyName},
        </h1>
        
        <p style="margin: 0 0 20px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
          Hemos recibido exitosamente su comunicación a través de nuestro canal corporativo. Un asesor comercial especializado se pondrá en contacto con usted a la brevedad posible para brindarle asesoría técnica y una cotización a la medida de su proyecto.
        </p>

        ${renderDetailCard(
          "Resumen del Mensaje Recibido",
          [
            { label: "Empresa / Nombre", value: safeCompanyName },
            { label: "Teléfono Registrado", value: safePhone },
            { label: "Fecha y Hora", value: fechaHora },
          ],
          {
            maxWidth: "100%",
            innerTableMaxWidth: "480px",
            innerAlign: "left",
            hideDivider: true,
            hideRowBorders: true,
          }
        )}

        ${renderMetricsSection("Conoce más sobre nuestro respaldo técnico")}

        ${renderBrochureDownloadCard("¿Deseas conocer más de nuestros servicios y flota?<br/>Descarga nuestro brochure oficial:")}
      `;

      const emailToCustomerHtml = renderMasterEmail({
        pageTitle: "Hemos recibido tu mensaje - SERVIMAFED S.A.C.",
        preheaderText: `Hola ${safeCompanyName}, confirmamos la recepción de tu mensaje en SERVIMAFED S.A.C.`,
        badgeHtml: "¡Mensaje Recibido<br/>con Éxito!",
        badgePosition: "bottom-right",
        badgeSize: "large",
        heroBannerUrl: EMAIL_ASSETS.HERO_BANNER_CONTACT,
        contentHtml: customerContentHtml,
        showContactCenter: true,
      });

      // Envío asíncrono no bloqueante al cliente
      resend.emails.send({
        from: "SERVIMAFED <web@servimafed.com>",
        to: [cleanEmail],
        subject: "¡Hemos recibido tu mensaje de contacto! - SERVIMAFED S.A.C.",
        html: emailToCustomerHtml,
      }).catch((err) => {
        console.warn("Aviso: no se pudo enviar correo de confirmación de contacto al cliente:", err);
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action sendContactRequest Error:", error);
    return { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." };
  }
}
