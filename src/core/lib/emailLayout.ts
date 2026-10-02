/**
 * Sistema Estandarizado de Plantillas de Correo Corporativo - SERVIMAFED S.A.C.
 * 
 * Basado en la arquitectura visual corporativa con compatibilidad responsive avanzada:
 * - Contenedor centrado max-width: 700px, 100% fluido en dispositivos móviles (< 600px).
 * - Hero banner panorámico adaptativo con proporción armónica en celular (~170px de alto).
 * - Cabecera azul corporativo (#1d3961) con logotipo oficial vertical blanco.
 * - Badge flotante dorado (#FCB326) con tipografía y espaciado proporcional en móviles.
 * - Tipografía limpia, márgenes seguros (14px en móvil) y tablas clave-valor balanceadas.
 * - Tarjetas interiores suaves (#f8fafc) con bordes nítidos (#e2e8f0).
 * - Línea de división amarilla (#FCB326, 3px) y remate azul (#1d3961, 3px).
 * - Bloque de Centro de Contacto y Acciones Rápidas con adaptación compacta para smartphones.
 * - Pie de página legal e institucional completo (Lurín - Lima, RUC 20600567668, copyright 2026).
 */

export const EMAIL_ASSETS = {
  LOGO_WHITE: "https://www.servimafed.com/images/logo-vertical-blanco.png",
  HERO_BANNER: "https://www.servimafed.com/images/email-brochure-banner.jpg",
  HEADSET_ICON: "https://www.servimafed.com/images/headset-contact.png",
  WORKER_ICON: "https://www.servimafed.com/images/icon-trabajador.png",
  BROCHURE_ICON: "https://www.servimafed.com/images/icon-brochure-download.png",
  PAPERCLIP_ICON: "https://www.servimafed.com/images/icon-clip-adjunto.png",
  LIGHTNING_ICON: "https://www.servimafed.com/images/icon-lightning-pill.png",
  TECHNICAL_VISIT_ICON: "https://www.servimafed.com/images/icon-technical-visit.png",
  PHONE_ICON: "https://www.servimafed.com/images/icon-phone-gold.png",
  WHATSAPP_ICON: "https://www.servimafed.com/images/icon-whatsapp-green.png",
  METRIC_SOPORTE: "https://www.servimafed.com/images/metric-soporte.png",
  METRIC_EQUIPOS: "https://www.servimafed.com/images/metric-equipos.png",
  METRIC_ISO: "https://www.servimafed.com/images/metric-iso.png",
  BROCHURE_PDF: "https://www.servimafed.com/documento/brochure-servimafed.pdf",
};

export const BRAND = {
  NAVY: "#1d3961",
  DARK: "#0B0F19",
  YELLOW: "#FCB326",
  YELLOW_HOVER: "#e5a11e",
  BORDER: "#e2e8f0",
  BG_SOFT: "#f8fafc",
  TEXT_MAIN: "#0f172a",
  TEXT_MUTED: "#64748b",
  PHONE: "993667182",
  PHONE_TEL: "+51993667182",
  EMAIL_SALES: "ventas@servimafed.com",
  EMAIL_CLAIMS: "reclamos@servimafed.com",
  EMAIL_HR: "talentohumano@servimafed.com",
  ADDRESS: "Mz. C Lote 12A, Sector Sumac Pacha - Lurín - Lima",
  RUC: "20600567668",
};

export interface MasterEmailOptions {
  pageTitle: string;
  preheaderText?: string;
  badgeHtml: string;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  badgeSize?: "normal" | "large";
  heroBannerUrl?: string; // Si se omite, se usa cabecera compacta azul con logo
  contentHtml: string;
  showContactCenter?: boolean;
  contactCenterEmail?: string;
  contactCenterPhone?: string;
  customFooterText?: string;
}

/**
 * Renderiza el envoltorio maestro (HTML base completo) para correos de cliente y notificaciones internas.
 * Incluye normalización completa y media queries responsivas para celulares.
 */
export function renderMasterEmail(options: MasterEmailOptions): string {
  const {
    pageTitle,
    preheaderText = "",
    badgeHtml,
    badgePosition = "top-left",
    badgeSize = "normal",
    heroBannerUrl,
    contentHtml,
    showContactCenter = true,
    contactCenterEmail = BRAND.EMAIL_SALES,
    contactCenterPhone = BRAND.PHONE,
    customFooterText,
  } = options;

  const phoneTel = contactCenterPhone.startsWith("+") 
    ? contactCenterPhone 
    : `+51${contactCenterPhone.replace(/\D/g, "")}`;

  // Determinación de posición del badge en el hero banner
  const isBottom = badgePosition.startsWith("bottom");
  const isRight = badgePosition.endsWith("right");
  const heroAlign = isRight ? "right" : "left";
  const heroValign = isBottom ? "bottom" : "top";
  
  // Tamaño del badge
  const isLarge = badgeSize === "large";
  const badgePadding = isLarge ? "15px 24px" : "12px 20px";
  const badgeFontSize = isLarge ? "18px" : "16px";
  const badgeShadow = isLarge 
    ? "0 4px 14px rgba(0, 0, 0, 0.35)" 
    : "0 4px 12px rgba(0, 0, 0, 0.25)";

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>${pageTitle}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, span, a, p { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    /* Resets básicos de clientes de correo */
    html, body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background-color: #ffffff;
    }
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    a {
      text-decoration: none;
    }

    /* REGLAS RESPONSIVAS PARA SMARTPHONES Y PANTALLAS PEQUEÑAS (<= 600px) */
    @media only screen and (max-width: 600px) {
      .outer-wrapper {
        padding: 8px 4px !important;
      }
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 6px !important;
      }
      
      /* Cabecera */
      .header-cell {
        padding: 0 !important;
      }
      .header-inner-left {
        padding: 14px 0 14px 14px !important;
      }
      .header-inner-right {
        padding: 14px 14px 14px 0 !important;
      }
      .header-logo {
        max-width: 105px !important;
        width: 105px !important;
        height: auto !important;
      }
      .header-title-text {
        font-size: 13.5px !important;
        letter-spacing: 0.4px !important;
        white-space: nowrap !important;
      }
      .header-badge-td {
        padding: 6px 11px !important;
        font-size: 10.5px !important;
        white-space: nowrap !important;
      }

      /* Hero Banner en Celulares: Altura proporcionada ~170px para mantener estética panorámica */
      .hero-banner-table {
        height: 170px !important;
        min-height: 170px !important;
      }
      .hero-banner-cell {
        padding: 12px 14px !important;
      }
      .hero-badge-table {
        border-radius: 6px !important;
      }
      .hero-badge-td {
        padding: 6px 12px !important;
        font-size: 12px !important;
        line-height: 1.25 !important;
      }

      /* Contenido Central */
      .content-cell {
        padding: 20px 14px 18px 14px !important;
      }
      .content-cell h1 {
        font-size: 18px !important;
        line-height: 1.3 !important;
        margin-bottom: 8px !important;
      }
      .content-cell p {
        font-size: 13px !important;
        line-height: 1.55 !important;
      }

      /* Tarjetas de Datos */
      .detail-card-table {
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 14px !important;
      }
      .detail-card-header {
        padding: 10px 14px !important;
      }
      .detail-card-header-text {
        font-size: 11.5px !important;
      }
      .detail-card-body {
        padding: 8px 6px !important;
      }
      .detail-inner-table {
        width: 100% !important;
        max-width: 100% !important;
      }
      .detail-label-td {
        width: 44% !important;
        font-size: 11.5px !important;
        padding: 5px 4px !important;
      }
      .detail-value-td {
        width: 56% !important;
        font-size: 12px !important;
        padding: 5px 4px !important;
      }

      /* Cajas de llamada (Callout) */
      .callout-table {
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 14px !important;
      }
      .callout-cell {
        padding: 10px 12px !important;
      }
      .callout-title {
        font-size: 10.5px !important;
      }
      .callout-text {
        font-size: 12px !important;
      }

      /* Acciones Rápidas Internas con el Cliente */
      .internal-contact-table {
        width: 100% !important;
        max-width: 100% !important;
        margin: 18px auto 6px auto !important;
      }
      .internal-contact-pill {
        padding: 5px 12px !important;
        margin-bottom: 10px !important;
      }
      .internal-contact-pill-text {
        font-size: 10px !important;
      }
      .internal-contact-left {
        padding: 4px 8px 4px 0 !important;
      }
      .internal-contact-right {
        padding: 4px 0 4px 8px !important;
      }
      .internal-contact-label {
        font-size: 9.5px !important;
      }
      .internal-contact-value {
        font-size: 12px !important;
      }

      /* Bloque de Métricas (24/7, 500+, ISO) */
      .metrics-container {
        margin-top: 14px !important;
        margin-bottom: 16px !important;
      }
      .metrics-title {
        font-size: 13px !important;
        margin-bottom: 10px !important;
      }
      .metric-cell {
        padding: 6px 2px !important;
      }
      .metric-icon {
        width: 30px !important;
        height: 30px !important;
        margin-bottom: 4px !important;
      }
      .metric-num {
        font-size: 15px !important;
      }
      .metric-label {
        font-size: 8.5px !important;
        letter-spacing: 0px !important;
      }
      .metrics-footer-text {
        font-size: 11px !important;
        margin-bottom: 16px !important;
      }

      /* Tarjeta de Descarga Brochure */
      .brochure-card-cell {
        padding: 14px 10px !important;
      }
      .brochure-card-title {
        font-size: 12.5px !important;
        margin-bottom: 10px !important;
      }

      /* Servicios Especializados */
      .services-card-cell {
        padding: 14px 12px !important;
      }

      /* Acciones Rápidas Asesor Comercial */
      .sales-btn-col {
        padding: 4px !important;
      }
      .sales-btn-a {
        padding: 9px 8px !important;
        font-size: 11.5px !important;
      }

      /* Centro de Contacto */
      .contact-center-cell {
        padding: 16px 12px 14px 12px !important;
      }
      .contact-center-pill {
        padding: 5px 12px !important;
        margin-bottom: 12px !important;
      }
      .contact-center-pill-text {
        font-size: 11px !important;
      }
      .contact-center-left {
        padding: 4px 10px 4px 0 !important;
      }
      .contact-center-right {
        padding: 4px 0 4px 10px !important;
      }
      .contact-center-label {
        font-size: 11.5px !important;
      }
      .contact-center-value {
        font-size: 11.5px !important;
      }

      /* Pie de página */
      .footer-cell {
        padding: 16px 12px 20px 12px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  ${preheaderText ? `
  <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheaderText}
  </div>` : ""}
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="outer-wrapper" style="background-color: #ffffff; padding: 24px 10px;">
    <tr>
      <td align="center">
        <!-- CONTENEDOR PRINCIPAL BLANCO 700PX (SIN BORDE EXTERIOR) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 700px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- 1. CABECERA -->
          <tr>
            <td align="center" class="header-cell" style="background-color: ${BRAND.NAVY}; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100% !important; min-width: 100%;">
                <tr>
                  ${heroBannerUrl ? `
                  <td align="left" valign="middle" class="header-inner-left" style="padding: 22px 24px;">
                    <a href="https://www.servimafed.com" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img 
                        src="${EMAIL_ASSETS.LOGO_WHITE}" 
                        alt="SERVIMAFED S.A.C." 
                        width="130" 
                        class="header-logo"
                        style="display: block; max-width: 130px; height: auto; border: 0;"
                      />
                    </a>
                  </td>
                  ` : `
                  <!-- CABECERA NOTIFICACIÓN INTERNA: ALINEADA A LOS EXTREMOS -->
                  <td align="left" valign="middle" class="header-inner-left" style="padding: 20px 0 20px 24px;">
                    <table cellpadding="0" cellspacing="0" border="0" align="left">
                      <tr>
                        <td valign="middle" align="left" style="padding-right: 12px; line-height: 0;">
                          <img src="${EMAIL_ASSETS.TECHNICAL_VISIT_ICON}" alt="Visita Técnica" width="54" height="54" border="0" style="display: block; width: 54px; height: 54px;" />
                        </td>
                        <td valign="middle" align="left" style="white-space: nowrap;">
                          <span class="header-title-text" style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.8px; text-transform: uppercase; white-space: nowrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                            VISITA TÉCNICA
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" class="header-inner-right" style="padding: 20px 24px 20px 0;">
                    <table cellpadding="0" cellspacing="0" border="0" align="right" style="background-color: ${BRAND.YELLOW}; border-radius: 6px; border-collapse: separate;">
                      <tr>
                        <td class="header-badge-td" align="center" valign="middle" style="padding: 7px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 11.5px; font-weight: 800; color: #111c30; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
                          ${badgeHtml}
                        </td>
                      </tr>
                    </table>
                  </td>
                  `}
                </tr>
              </table>
            </td>
          </tr>

          ${heroBannerUrl ? `
          <!-- 2. HERO BANNER CON IMAGEN Y BADGE FLOTANTE -->
          <tr>
            <td style="padding: 0; background-color: ${BRAND.NAVY}; line-height: 0;">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:700px;height:315px;">
              <v:fill type="frame" src="${heroBannerUrl}" color="${BRAND.NAVY}" />
              <v:textbox inset="0,0,0,0">
              <![endif]-->
              <table width="100%" height="315" cellpadding="0" cellspacing="0" border="0" background="${heroBannerUrl}" class="hero-banner-table" style="width: 100%; max-width: 700px; height: 315px; background-image: url('${heroBannerUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: ${BRAND.NAVY};">
                <tr>
                  <td align="${heroAlign}" valign="${heroValign}" class="hero-banner-cell" style="padding: 24px 34px;">
                    <!-- BADGE AMARILLO CORPORATIVO FLOTANTE -->
                    <table cellpadding="0" cellspacing="0" border="0" class="hero-badge-table" style="background-color: ${BRAND.YELLOW}; border-radius: 8px; box-shadow: ${badgeShadow}; border-collapse: separate;">
                      <tr>
                        <td class="hero-badge-td" style="padding: ${badgePadding}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: ${badgeFontSize}; font-weight: 800; color: #111c30; line-height: 1.25; border-radius: 8px; text-align: left; letter-spacing: -0.2px;">
                          ${badgeHtml}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
              </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
          ` : ""}

          <!-- 3. CUERPO PRINCIPAL DEL CORREO -->
          <tr>
            <td class="content-cell" style="padding: 32px 36px 24px 36px; background-color: #ffffff;">
              ${contentHtml}
            </td>
          </tr>

          ${showContactCenter ? `
          <!-- LÍNEA AMARILLA CORPORATIVA (3PX) -->
          <tr>
            <td style="background-color: ${BRAND.YELLOW}; height: 3px; font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
          </tr>

          <!-- 4. CENTRO DE CONTACTO OFICIAL -->
          <tr>
            <td class="contact-center-cell" style="padding: 26px 36px 22px 36px; background-color: #ffffff;">
              
              <!-- PÍLDORA CENTRO DE CONTACTO (DISEÑO CÁPSULA PRÉMIUM) -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" class="contact-center-pill" style="border-collapse: separate !important; border-radius: 50px; background-color: #f1f5f9; margin: 0 auto 20px auto;">
                <tr>
                  <td style="vertical-align: middle; padding: 4px 18px 4px 5px; border-radius: 50px; background-color: #f1f5f9;">
                    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate !important;">
                      <tr>
                        <td valign="middle" style="padding: 0; line-height: 0;">
                          <img 
                            src="${EMAIL_ASSETS.HEADSET_ICON}" 
                            alt="Contacto" 
                            width="30" 
                            height="30" 
                            style="display: block; width: 30px; height: 30px; border-radius: 50%; border: 0;"
                          />
                        </td>
                        <td class="contact-center-pill-text" valign="middle" style="padding-left: 10px; font-size: 12.5px; color: #334155; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; white-space: nowrap;">
                          Estamos aquí para ayudarte a través de nuestro <strong>Centro de Contacto</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DOS COLUMNAS DE CONTACTO -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 6px;">
                <tr>
                  <!-- TELÉFONO -->
                  <td width="50%" align="right" class="contact-center-left" style="vertical-align: middle; border-right: 1px solid #cbd5e1; padding: 6px 32px 6px 12px; text-align: right;">
                    <p class="contact-center-label" style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Teléfono</p>
                    <p class="contact-center-value" style="margin: 3px 0 0 0; font-size: 13px;">
                      <a href="tel:${phoneTel}" style="color: #475569; text-decoration: none; font-weight: 600;">${contactCenterPhone}</a>
                    </p>
                  </td>
                  <!-- EMAIL -->
                  <td width="50%" align="left" class="contact-center-right" style="vertical-align: middle; padding: 6px 12px 6px 32px; text-align: left;">
                    <p class="contact-center-label" style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Email</p>
                    <p class="contact-center-value" style="margin: 3px 0 0 0; font-size: 13px;">
                      <a href="mailto:${contactCenterEmail}" style="color: #475569; text-decoration: none; font-weight: 600;">${contactCenterEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
          ` : ""}

          <!-- LÍNEA AZUL DE REMATE (3PX) -->
          <tr>
            <td style="background-color: ${BRAND.NAVY}; height: 3px; font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
          </tr>

          <!-- 5. FOOTER INSTITUCIONAL -->
          <tr>
            <td align="center" class="footer-cell" style="background-color: #ffffff; padding: 22px 24px 28px 24px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                ${customFooterText || `Este mensaje fue enviado por <strong>SERVIMAFED S.A.C.</strong>`}
              </p>
              <p style="margin: 0 0 4px 0; font-size: 10.5px; color: #94a3b8; line-height: 1.5;">
                Dirección: ${BRAND.ADDRESS}<br/>
                RUC: ${BRAND.RUC}
              </p>
              <p style="margin: 6px 0 0 0; font-size: 10px; color: #94a3b8;">
                &copy; 2026 Derechos Reservados.
              </p>
            </td>
          </tr>

        </table>
        <!-- FIN CONTENEDOR PRINCIPAL -->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Renderiza el bloque "¿Sabías que en SERVIMAFED?" con las 3 métricas de soporte, equipos e ISO.
 */
export function renderMetricsSection(customTitle = "¿Sabías que en SERVIMAFED?"): string {
  return `
  <div class="metrics-container" style="text-align: center; margin-top: 20px; margin-bottom: 24px;">
    <p class="metrics-title" style="margin: 0 0 18px 0; font-size: 15px; font-weight: 700; color: #0f172a; text-transform: none; letter-spacing: 0.2px;">
      ${customTitle}
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <!-- 24/7 SOPORTE -->
        <td width="33.33%" align="center" class="metric-cell" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
          <img 
            src="${EMAIL_ASSETS.METRIC_SOPORTE}" 
            alt="24/7 Soporte en Campo" 
            width="42" 
            height="42" 
            class="metric-icon"
            style="display: block; margin: 0 auto 8px auto; width: 42px; height: 42px; object-fit: contain;"
          />
          <p class="metric-num" style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            24/7
          </p>
          <p class="metric-label" style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Soporte en Campo
          </p>
        </td>

        <!-- 500+ EQUIPOS -->
        <td width="33.33%" align="center" class="metric-cell" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
          <img 
            src="${EMAIL_ASSETS.METRIC_EQUIPOS}" 
            alt="500+ Equipos Atendidos" 
            width="46" 
            height="42" 
            class="metric-icon"
            style="display: block; margin: 0 auto 8px auto; width: 46px; height: 42px; object-fit: contain;"
          />
          <p class="metric-num" style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            500+
          </p>
          <p class="metric-label" style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Equipos Atendidos
          </p>
        </td>

        <!-- ISO ESTÁNDARES -->
        <td width="33.33%" align="center" class="metric-cell" style="vertical-align: top; padding: 10px 12px;">
          <img 
            src="${EMAIL_ASSETS.METRIC_ISO}" 
            alt="ISO Estándares Globales" 
            width="38" 
            height="42" 
            class="metric-icon"
            style="display: block; margin: 0 auto 8px auto; width: 38px; height: 42px; object-fit: contain;"
          />
          <p class="metric-num" style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            ISO
          </p>
          <p class="metric-label" style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Estándares Globales
          </p>
        </td>
      </tr>
    </table>
  </div>
  
  <p class="metrics-footer-text" style="margin: 0 0 24px 0; font-size: 12.5px; color: #64748b; text-align: center; line-height: 1.6;">
    Contamos con infraestructura propia en Lurín, personal homologado y cobertura nacional para atender sus operaciones mineras, industriales y de construcción.
  </p>`;
}

/**
 * Renderiza el bloque corporativo "Algunos servicios:" con el ícono del trabajador y viñetas con sangría.
 */
export function renderServicesSection(): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="services-card" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
    <tr>
      <td class="services-card-cell" style="padding: 22px 24px;">
        <!-- TÍTULO CON ÍCONO -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
          <tr>
            <td valign="middle" style="padding-right: 12px;">
              <img 
                src="${EMAIL_ASSETS.WORKER_ICON}" 
                alt="Servicios" 
                width="44" 
                height="44" 
                style="display: block; width: 44px; height: 44px; object-fit: contain;"
              />
            </td>
            <td valign="middle" style="font-size: 16.5px; color: ${BRAND.NAVY}; font-weight: 700; line-height: 1.2;">
              Algunos de nuestros servicios especializados:
            </td>
          </tr>
        </table>
        
        <!-- LISTA CON SANGRÍA -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-left: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #475569; line-height: 1.65;">
                <tr>
                  <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">&bull;</td>
                  <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65;">
                    Gestión y control de flotas, orientado a optimizar la disponibilidad, operación y mantenimiento de los equipos.
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">&bull;</td>
                  <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65;">
                    Mantenimiento preventivo y correctivo para conservar el rendimiento y prolongar la vida útil de los equipos.
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">&bull;</td>
                  <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65;">
                    Inspección, evaluación y diagnóstico técnico para identificar fallas y determinar las acciones correctivas.
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">&bull;</td>
                  <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65;">
                    Mecanizado, fabricación, reparación y soldadura de componentes y estructuras para maquinaria.
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">&bull;</td>
                  <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65;">
                    Suministro de repuestos y componentes para atender las necesidades de mantenimiento y reparación.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>`;
}

/**
 * Renderiza la tarjeta destacada con botón dorado para descargar o revisar el brochure.
 */
export function renderBrochureDownloadCard(title = "¿Deseas revisar el detalle completo<br/>y descargar tu brochure?"): string {
  return `
  <table align="center" cellpadding="0" cellspacing="0" border="0" class="brochure-card-table" style="max-width: 500px; width: 100%; margin: 0 auto 26px auto; border-radius: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc;">
    <tr>
      <td align="center" class="brochure-card-cell" style="padding: 20px 22px;">
        <img 
          src="${EMAIL_ASSETS.BROCHURE_ICON}" 
          alt="Brochure PDF" 
          width="40" 
          height="40" 
          style="display: block; margin: 0 auto 10px auto; width: 40px; height: 40px; object-fit: contain;"
        />
        <p class="brochure-card-title" style="margin: 0 0 14px 0; font-size: 14.5px; font-weight: 700; color: #0f172a; line-height: 1.45; text-align: center;">
          ${title}
        </p>
        
        <!-- BOTÓN DORADO -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="background-color: ${BRAND.YELLOW}; border-radius: 6px; box-shadow: 0 2px 6px rgba(252, 179, 38, 0.35);">
              <a 
                href="${EMAIL_ASSETS.BROCHURE_PDF}" 
                target="_blank"
                style="display: inline-block; padding: 8px 24px; font-size: 13px; font-weight: 700; color: #0f172a; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; letter-spacing: 0.2px;"
              >
                Ingresa aquí
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

/**
 * Renderiza la barra de acciones rápidas para el asesor de ventas (Llamar con un clic y WhatsApp directo).
 */
export function renderSalesQuickActions(phone: string, clientName: string, contextSummary = "su consulta en la web de SERVIMAFED"): string {
  const cleanDigits = phone.replace(/\D/g, "");
  const whatsappNumber = cleanDigits.length === 9 ? `51${cleanDigits}` : cleanDigits;
  const greeting = encodeURIComponent(
    `Hola ${clientName}, le saludamos del equipo comercial de SERVIMAFED S.A.C. Recibimos su comunicación sobre ${contextSummary}. ¿En qué podemos apoyarle hoy?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${greeting}`;
  const telUrl = `tel:${cleanDigits}`;

  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="sales-actions-table" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 24px; overflow: hidden;">
    <tr>
      <td style="padding: 16px 20px;">
        <p style="margin: 0 0 12px 0; font-size: 11.5px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.6px; text-align: center;">
          ⚡ Acciones Rápidas para el Asesor Comercial:
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- BOTÓN LLAMAR -->
            <td width="48%" align="center" class="sales-btn-col" style="padding-right: 6px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: ${BRAND.YELLOW}; border-radius: 6px; box-shadow: 0 2px 6px rgba(252, 179, 38, 0.3);">
                    <a href="${telUrl}" class="sales-btn-a" style="display: block; padding: 11px 16px; font-size: 13px; font-weight: 800; color: #0f172a; text-decoration: none; text-align: center;">
                      📞 Llamar al Cliente
                    </a>
                  </td>
                </tr>
              </table>
            </td>
            <!-- BOTÓN WHATSAPP -->
            <td width="48%" align="center" class="sales-btn-col" style="padding-left: 6px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #25D366; border-radius: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="sales-btn-a" style="display: block; padding: 11px 16px; font-size: 13px; font-weight: 800; color: #ffffff; text-decoration: none; text-align: center;">
                      💬 Chatear por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="margin: 12px 0 0 0; font-size: 11.5px; line-height: 1.45; color: #64748b; text-align: center;">
          💡 <strong>Tip Comercial:</strong> Contactar al prospecto dentro de los primeros <strong>15 minutos</strong> incrementa la conversión en más del <strong>70%</strong>.
        </p>
      </td>
    </tr>
  </table>`;
}

/**
 * Renderiza la barra de acciones de contacto con el cliente al final del correo interno (estilo Centro de Contacto de la Imagen 1).
 */
export function renderInternalContactActions(
  phone: string,
  clientName: string,
  contextSummary = "su solicitud de visita técnica"
): string {
  const cleanDigits = phone.replace(/\D/g, "");
  const whatsappNumber = cleanDigits.length === 9 ? `51${cleanDigits}` : cleanDigits;
  const greeting = encodeURIComponent(
    `Hola ${clientName}, le saludamos del equipo técnico de SERVIMAFED S.A.C. Recibimos ${contextSummary}. ¿Podemos coordinar los detalles?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${greeting}`;
  const telUrl = `tel:${cleanDigits}`;

  return `
  <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" class="internal-contact-table" style="max-width: 520px; width: 100%; margin: 0 auto;">
    <tr>
      <td align="center">
        <!-- PÍLDORA SUPERIOR (DISEÑO CÁPSULA PRÉMIUM) -->
        <table align="center" cellpadding="0" cellspacing="0" border="0" class="internal-contact-pill" style="border-collapse: separate !important; border-radius: 50px; background-color: #f1f5f9; margin: 0 auto 16px auto;">
          <tr>
            <td style="vertical-align: middle; padding: 4px 18px 4px 5px; border-radius: 50px; background-color: #f1f5f9;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate !important;">
                <tr>
                  <td valign="middle" align="center" style="width: 30px; height: 30px; padding: 0; line-height: 0;">
                    <img src="${EMAIL_ASSETS.LIGHTNING_ICON}" alt="Acción" width="30" height="30" style="display: block; width: 30px; height: 30px; border-radius: 50%; border: 0;" />
                  </td>
                  <td class="internal-contact-pill-text" valign="middle" style="padding-left: 10px; font-size: 12px; font-weight: 700; color: #334155; letter-spacing: 0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; white-space: nowrap;">
                    Acciones de Contacto Rápido con el Cliente
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- DOS COLUMNAS DE ACCIÓN CON DIVISOR VERTICAL CENTRAL -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- COLUMNA IZQUIERDA: LLAMADA -->
            <td width="50%" align="right" class="internal-contact-left" style="vertical-align: middle; border-right: 1px solid #cbd5e1; padding: 6px 28px 6px 12px; text-align: right;">
              <p class="internal-contact-label" style="margin: 0; font-size: 11.5px; font-weight: 700; color: #64748b; letter-spacing: 0.3px;">
                Llamar al Cliente
              </p>
              <p class="internal-contact-value" style="margin: 4px 0 0 0; font-size: 13.5px;">
                <a href="${telUrl}" style="color: ${BRAND.YELLOW}; text-decoration: none; font-weight: 800;">
                  <img src="${EMAIL_ASSETS.PHONE_ICON}" alt="Llamar" width="14" height="14" style="display: inline-block; width: 14px; height: 14px; vertical-align: middle; margin-right: 4px; border: 0;" />${phone}
                </a>
              </p>
            </td>
            <!-- COLUMNA DERECHA: WHATSAPP -->
            <td width="50%" align="left" class="internal-contact-right" style="vertical-align: middle; padding: 6px 12px 6px 28px; text-align: left;">
              <p class="internal-contact-label" style="margin: 0; font-size: 11.5px; font-weight: 700; color: #64748b; letter-spacing: 0.3px;">
                WhatsApp Directo
              </p>
              <p class="internal-contact-value" style="margin: 4px 0 0 0; font-size: 13.5px;">
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="color: #16a34a; text-decoration: none; font-weight: 800;">
                  <img src="${EMAIL_ASSETS.WHATSAPP_ICON}" alt="WhatsApp" width="14" height="14" style="display: inline-block; width: 14px; height: 14px; vertical-align: middle; margin-right: 4px; border: 0;" />Iniciar Chat
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

export interface DetailCardOptions {
  maxWidth?: string;
  centered?: boolean;
  hideDivider?: boolean;
  hideRowBorders?: boolean;
  innerTableMaxWidth?: string;
}

/**
 * Renderiza una tarjeta de detalles con tabla clave-valor estructurada y adaptada a celulares.
 */
export function renderDetailCard(
  title: string,
  rows: Array<{ label: string; value: string; isLink?: boolean; href?: string }>,
  options: DetailCardOptions = {}
): string {
  const {
    maxWidth = "100%",
    centered = false,
    hideDivider = false,
    hideRowBorders = false,
    innerTableMaxWidth,
  } = options;

  const rowBorderStyle = hideRowBorders ? "" : "border-bottom: 1px solid #f1f5f9;";
  const rowPadding = hideRowBorders ? "padding: 6px 10px;" : "padding: 7px 10px;";

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td width="42%" align="left" class="detail-label-td" style="${rowPadding} color: #64748b; font-weight: 600; font-size: 13px; text-align: left; ${rowBorderStyle} vertical-align: top;">
          ${r.label}:
        </td>
        <td width="58%" align="left" class="detail-value-td" style="${rowPadding} color: #0f172a; font-weight: 700; font-size: 13.5px; text-align: left; ${rowBorderStyle} vertical-align: top;">
          ${r.isLink && r.href ? `<a href="${r.href}" style="color: ${BRAND.NAVY}; text-decoration: none; font-weight: 700;">${r.value}</a>` : r.value}
        </td>
      </tr>`
    )
    .join("");

  const marginStyle = centered ? "margin: 0 auto 0 auto;" : "margin-bottom: 0;";
  const alignAttr = centered ? `align="center"` : "";
  const headerBorder = hideDivider ? "" : `border-bottom: 2px solid ${BRAND.YELLOW};`;
  const innerTableStyle = innerTableMaxWidth 
    ? `max-width: ${innerTableMaxWidth}; width: 100%; margin: 0 auto;` 
    : "width: 100%;";
  const bodyCellPadding = innerTableMaxWidth ? "padding: 16px 20px 18px 20px;" : "padding: 12px 16px 14px 16px;";

  return `
  <table ${alignAttr} width="100%" cellpadding="0" cellspacing="0" border="0" class="detail-card-table" style="max-width: ${maxWidth}; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; ${marginStyle} overflow: hidden;">
    <tr>
      <td align="left" class="detail-card-header" style="background-color: #f8fafc; padding: 14px 22px; text-align: left; ${headerBorder}">
        <span class="detail-card-header-text" style="font-size: 13.5px; font-weight: 800; color: ${BRAND.NAVY}; text-transform: uppercase; letter-spacing: 0.5px;">
          ${title}
        </span>
      </td>
    </tr>
    <tr>
      <td align="center" class="detail-card-body" style="${bodyCellPadding}">
        <table align="center" cellpadding="0" cellspacing="0" border="0" class="detail-inner-table" style="${innerTableStyle}">
          ${rowsHtml}
        </table>
      </td>
    </tr>
  </table>
  <!-- SPACER TABLE CROSS-PLATFORM (OUTLOOK WIN 10 & WIN 11) -->
  <table ${alignAttr} width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: ${maxWidth}; width: 100%;">
    <tr>
      <td style="height: 16px; line-height: 16px; font-size: 1px;">&nbsp;</td>
    </tr>
  </table>`;
}

/**
 * Renderiza una caja de mensaje o llamada destacada (con barra de acento a la izquierda).
 */
export function renderCalloutBox(
  title: string,
  content: string,
  variant: "gold" | "green" | "blue" | "neutral" = "gold",
  options: { maxWidth?: string; centered?: boolean } = {}
): string {
  const { maxWidth = "100%", centered = false } = options;
  const config = {
    gold: { border: BRAND.YELLOW, bg: "#fffbeb", text: "#92400e", label: "#b45309" },
    green: { border: "#10b981", bg: "#ecfdf5", text: "#065f46", label: "#047857" },
    blue: { border: BRAND.NAVY, bg: "#eff6ff", text: "#1e3a8a", label: "#1e40af" },
    neutral: { border: "#94a3b8", bg: "#f8fafc", text: "#334155", label: "#475569" },
  }[variant];

  const marginStyle = centered ? "margin: 0 auto 0 auto;" : "margin-bottom: 0;";
  const alignAttr = centered ? `align="center"` : "";

  return `
  <table ${alignAttr} width="100%" cellpadding="0" cellspacing="0" border="0" class="callout-table" style="max-width: ${maxWidth}; width: 100%; background-color: ${config.bg}; border-left: 4px solid ${config.border}; border-radius: 4px; ${marginStyle}">
    <tr>
      <td class="callout-cell" style="padding: 14px 18px;">
        ${title ? `
        <span class="callout-title" style="color: ${config.label}; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
          ${title}
        </span>` : ""}
        <div class="callout-text" style="color: ${config.text}; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap;">
          ${content}
        </div>
      </td>
    </tr>
  </table>
  <!-- SPACER TABLE CROSS-PLATFORM (OUTLOOK WIN 10 & WIN 11) -->
  <table ${alignAttr} width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: ${maxWidth}; width: 100%;">
    <tr>
      <td style="height: 16px; line-height: 16px; font-size: 1px;">&nbsp;</td>
    </tr>
  </table>`;
}
