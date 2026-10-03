"use server";

import { Resend } from "resend";
import { escapeHtml, isWithinLength, isHoneypotTriggered } from "@/core/lib/security";
import {
  renderMasterEmail,
  renderMetricsSection,
  renderServicesSection,
  renderBrochureDownloadCard,
  renderInternalContactActions,
  renderDetailCard,
  renderCalloutBox,
  EMAIL_ASSETS,
} from "@/core/lib/emailLayout";

export async function sendBrochureLead(formData: FormData) {
  try {
    const website = formData.get("website") as string;

    // Honeypot anti-spam: si un bot completa el campo, simular respuesta pero no llamar a Resend
    if (isHoneypotTriggered(website)) {
      return {
        success: true,
        downloadUrl: "/documento/brochure-servimafed.pdf",
        nombre: "Visitante",
        empresa: "Empresa",
        correo: "correo@servimafed.com",
      };
    }

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

    // Validación de límites de longitud server-side
    if (
      !isWithinLength(nombre, 150) ||
      !isWithinLength(empresa, 200) ||
      !isWithinLength(correo, 254) ||
      !isWithinLength(telefono, 30)
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
        error: "Ingrese un correo electrónico válido.",
      };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_API_KEY no configurada. Simulando entrega de brochure en desarrollo.");
        return {
          success: true,
          downloadUrl: "/documento/brochure-servimafed.pdf",
          nombre,
          empresa,
          correo,
        };
      }
      return {
        success: false,
        error: "El servicio no está disponible temporalmente. Por favor intente más tarde.",
      };
    }

    const resend = new Resend(apiKey);

    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    const companyEmail = process.env.VENTAS_EMAIL || "ventas@servimafed.com";

    // Sanitización y escape HTML de variables de usuario
    const safeNombre = escapeHtml(nombre);
    const safeEmpresa = escapeHtml(empresa);
    const safeCorreo = escapeHtml(correo);
    const safeTelefono = escapeHtml(telefono);
    const cleanSubjectNombre = nombre.replace(/[\r\n]+/g, " ").trim().slice(0, 80);
    const cleanSubjectEmpresa = empresa.replace(/[\r\n]+/g, " ").trim().slice(0, 80);

    // 1. Notificación al equipo comercial de SERVIMAFED (Plantilla Estandarizada)
    const companyContentHtml = `
      <div style="text-align: left; margin-bottom: 22px;">
        <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
          Nuevo Prospecto Interesado en Brochure
        </h1>
        <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Un nuevo contacto corporativo ha solicitado el <strong>Brochure Técnico 2026</strong> desde la web oficial.
        </p>
      </div>

      ${renderDetailCard("Datos del Prospecto", [
        { label: "Fecha y Hora", value: fechaHora },
        { label: "Nombre Completo", value: safeNombre },
        { label: "Empresa / Razón Social", value: safeEmpresa },
        { label: "Correo Corporativo", value: safeCorreo, isLink: true, href: `mailto:${safeCorreo}` },
        { label: "Teléfono", value: safeTelefono, isLink: telefono !== "No especificado", href: `tel:${telefono.replace(/\D/g, "")}` },
      ], {
        maxWidth: "100%",
        innerTableMaxWidth: "480px",
        innerAlign: "left",
        hideDivider: true,
        hideRowBorders: true,
      })}

      ${renderCalloutBox(
        "Acción Comercial Sugerida:",
        "El prospecto ya cuenta con el brochure digital en su bandeja de entrada. Contactarlo en los próximos minutos para calificar su necesidad operativa (flota, tipo de maquinaria o repuestos requeridos) multiplica las oportunidades de cotización.",
        "gold",
        { maxWidth: "100%" }
      )}

      <!-- ACCIONES DE CONTACTO RÁPIDO CON EL CLIENTE (AL FINAL, ESTILO IMAGEN 1) -->
      ${telefono !== "No especificado" ? renderInternalContactActions(telefono, safeNombre, "su solicitud del Brochure Técnico 2026") : ""}
    `;

    const emailToCompanyHtml = renderMasterEmail({
      pageTitle: `Nuevo Prospecto Brochure - ${cleanSubjectNombre}`,
      preheaderText: `Prospecto de ${safeEmpresa}: ${safeNombre} ha descargado el Brochure 2026.`,
      headerTitle: "BROCHURE TÉCNICO",
      headerIconUrl: EMAIL_ASSETS.CLIENT_ICON,
      badgeHtml: "PROSPECTO",
      contentHtml: companyContentHtml,
      showContactCenter: false,
    });

    // 2. Correo corporativo de presentación y entrega de brochure al prospecto (Plantilla Estandarizada con Hero)
    const customerContentHtml = `
      <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
        ${safeEmpresa ? `Hola ${safeNombre} de la empresa ${safeEmpresa},` : `Hola ${safeNombre},`}
      </h1>
      
      <p style="margin: 0 0 24px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
        Es un placer saludarle de parte de <strong>SERVIMAFED S.A.C.</strong> De acuerdo a su solicitud, le hacemos entrega de nuestro <strong>Brochure Técnico 2026</strong> para su evaluación comercial y operativa.
      </p>

      ${renderMetricsSection("¿Sabías que en SERVIMAFED?")}

      ${renderBrochureDownloadCard("¿Deseas revisar el detalle completo<br/>y descargar tu brochure?")}

      ${renderServicesSection()}
    `;

    const emailToCustomerHtml = renderMasterEmail({
      pageTitle: "Brochure Corporativo - SERVIMAFED S.A.C.",
      preheaderText: `Hola ${safeNombre}, aquí tienes disponible el Brochure Corporativo 2026 de SERVIMAFED S.A.C.`,
      badgeHtml: "¡Tu Brochure<br/>está Listo!",
      badgePosition: "bottom-right",
      badgeSize: "large",
      heroBannerUrl: EMAIL_ASSETS.HERO_BANNER,
      contentHtml: customerContentHtml,
      showContactCenter: true,
    });

    // Envío a ventas
    const { error: companyError } = await resend.emails.send({
      from: "Web Servimafed <web@servimafed.com>",
      to: [companyEmail],
      replyTo: correo,
      subject: `💼 [PROSPECTO BROCHURE] ${cleanSubjectNombre} - ${cleanSubjectEmpresa}`,
      html: emailToCompanyHtml,
    });

    if (companyError) {
      console.error("Error al notificar al equipo comercial:", companyError);
      return {
        success: false,
        error: "No se pudo procesar la solicitud en este momento. Por favor intente nuevamente.",
      };
    }

    // Envío de cortesía al prospecto
    const { error: customerError } = await resend.emails.send({
      from: "SERVIMAFED <web@servimafed.com>",
      to: [correo],
      subject: "¡Tu Brochure Corporativo está listo! - SERVIMAFED S.A.C.",
      html: emailToCustomerHtml,
    });

    if (customerError) {
      console.error("Error al enviar brochure al prospecto:", customerError);
      return {
        success: false,
        error: "No se pudo procesar la entrega del brochure en este momento. Por favor intente nuevamente.",
      };
    }

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
