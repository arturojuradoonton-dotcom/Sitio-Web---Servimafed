/**
 * Sistema Estandarizado de Plantillas de Correo Corporativo - SERVIMAFED S.A.C.
 * 
 * Basado en la arquitectura visual del Brochure Master (sendBrochureLead.ts):
 * - Contenedor centrado max-width: 700px, 100% compatible con clientes de correo (tablas + CSS inline).
 * - Cabecera azul corporativo (#1d3961) con logotipo oficial vertical blanco.
 * - Badge flotante dorado (#FCB326) de alta visibilidad.
 * - Tipografía de sistema limpia y moderna.
 * - Tarjetas interiores suaves (#f8fafc) con bordes nítidos (#e2e8f0).
 * - Línea de división amarilla (#FCB326, 3px) y remate azul (#1d3961, 3px).
 * - Bloque de Centro de Contacto con píldora, ícono de diadema y dos columnas (teléfono / email).
 * - Pie de página legal e institucional completo (Lurín - Lima, RUC 20600567668, copyright 2026).
 */

export const EMAIL_ASSETS = {
  LOGO_WHITE: "https://www.servimafed.com/images/logo-vertical-blanco.png",
  HERO_BANNER: "https://www.servimafed.com/images/email-brochure-banner.jpg",
  HEADSET_ICON: "https://www.servimafed.com/images/headset-contact.png",
  WORKER_ICON: "https://www.servimafed.com/images/icon-trabajador.png",
  BROCHURE_ICON: "https://www.servimafed.com/images/icon-brochure-download.png",
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
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  ${preheaderText ? `
  <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheaderText}
  </div>` : ""}
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 24px 10px;">
    <tr>
      <td align="center">
        <!-- CONTENEDOR PRINCIPAL BLANCO 700PX (SIN BORDE EXTERIOR) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 700px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- 1. CABECERA CON LOGO A LA IZQUIERDA -->
          <tr>
            <td align="left" style="background-color: ${BRAND.NAVY}; padding: 18px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <a href="https://www.servimafed.com" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img 
                        src="${EMAIL_ASSETS.LOGO_WHITE}" 
                        alt="SERVIMAFED S.A.C." 
                        width="130" 
                        style="display: block; max-width: 130px; height: auto; border: 0;"
                      />
                    </a>
                  </td>
                  ${!heroBannerUrl ? `
                  <td align="right" valign="middle">
                    <!-- BADGE HEADER COMPACTO -->
                    <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${BRAND.YELLOW}; border-radius: 6px; border-collapse: separate;">
                      <tr>
                        <td style="padding: 8px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 12px; font-weight: 800; color: #111c30; text-transform: uppercase; letter-spacing: 0.5px;">
                          ${badgeHtml}
                        </td>
                      </tr>
                    </table>
                  </td>
                  ` : ""}
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
              <table width="100%" height="315" cellpadding="0" cellspacing="0" border="0" background="${heroBannerUrl}" style="width: 100%; max-width: 700px; height: 315px; background-image: url('${heroBannerUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: ${BRAND.NAVY};">
                <tr>
                  <td align="${heroAlign}" valign="${heroValign}" style="padding: 24px 34px;">
                    <!-- BADGE AMARILLO CORPORATIVO FLOTANTE -->
                    <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${BRAND.YELLOW}; border-radius: 8px; box-shadow: ${badgeShadow}; border-collapse: separate;">
                      <tr>
                        <td style="padding: ${badgePadding}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: ${badgeFontSize}; font-weight: 800; color: #111c30; line-height: 1.25; border-radius: 8px; text-align: left; letter-spacing: -0.2px;">
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
            <td style="padding: 32px 36px 24px 36px; background-color: #ffffff;">
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
            <td style="padding: 26px 36px 22px 36px; background-color: #ffffff;">
              
              <!-- PÍLDORA CENTRO DE CONTACTO -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid ${BRAND.BORDER}; border-radius: 50px; padding: 8px 24px; margin: 0 auto 20px auto; background-color: #ffffff;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img 
                      src="${EMAIL_ASSETS.HEADSET_ICON}" 
                      alt="Contacto" 
                      width="24" 
                      height="24" 
                      style="display: block; border-radius: 50%;"
                    />
                  </td>
                  <td style="vertical-align: middle; font-size: 12.5px; color: #334155;">
                    Estamos aquí para ayudarte a través de nuestro <strong>Centro de Contacto</strong>
                  </td>
                </tr>
              </table>

              <!-- DOS COLUMNAS DE CONTACTO -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 6px;">
                <tr>
                  <!-- TELÉFONO -->
                  <td width="50%" align="right" style="vertical-align: middle; border-right: 1px solid #cbd5e1; padding: 6px 32px 6px 12px; text-align: right;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Teléfono</p>
                    <p style="margin: 3px 0 0 0; font-size: 13px;">
                      <a href="tel:${phoneTel}" style="color: #475569; text-decoration: none; font-weight: 600;">${contactCenterPhone}</a>
                    </p>
                  </td>
                  <!-- EMAIL -->
                  <td width="50%" align="left" style="vertical-align: middle; padding: 6px 12px 6px 32px; text-align: left;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Email</p>
                    <p style="margin: 3px 0 0 0; font-size: 13px;">
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
            <td align="center" style="background-color: #ffffff; padding: 22px 24px 28px 24px; text-align: center;">
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
  <div style="text-align: center; margin-top: 20px; margin-bottom: 24px;">
    <p style="margin: 0 0 18px 0; font-size: 15px; font-weight: 700; color: #0f172a; text-transform: none; letter-spacing: 0.2px;">
      ${customTitle}
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <!-- 24/7 SOPORTE -->
        <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
          <img 
            src="${EMAIL_ASSETS.METRIC_SOPORTE}" 
            alt="24/7 Soporte en Campo" 
            width="42" 
            height="42" 
            style="display: block; margin: 0 auto 8px auto; width: 42px; height: 42px; object-fit: contain;"
          />
          <p style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            24/7
          </p>
          <p style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Soporte en Campo
          </p>
        </td>

        <!-- 500+ EQUIPOS -->
        <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
          <img 
            src="${EMAIL_ASSETS.METRIC_EQUIPOS}" 
            alt="500+ Equipos Atendidos" 
            width="46" 
            height="42" 
            style="display: block; margin: 0 auto 8px auto; width: 46px; height: 42px; object-fit: contain;"
          />
          <p style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            500+
          </p>
          <p style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Equipos Atendidos
          </p>
        </td>

        <!-- ISO ESTÁNDARES -->
        <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px;">
          <img 
            src="${EMAIL_ASSETS.METRIC_ISO}" 
            alt="ISO Estándares Globales" 
            width="38" 
            height="42" 
            style="display: block; margin: 0 auto 8px auto; width: 38px; height: 42px; object-fit: contain;"
          />
          <p style="margin: 0 0 2px 0; font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.2;">
            ISO
          </p>
          <p style="margin: 0; font-size: 10.5px; font-weight: 700; color: #64748b; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.4px;">
            Estándares Globales
          </p>
        </td>
      </tr>
    </table>
  </div>
  
  <p style="margin: 0 0 24px 0; font-size: 12.5px; color: #64748b; text-align: center; line-height: 1.6;">
    Contamos con infraestructura propia en Lurín, personal homologado y cobertura nacional para atender sus operaciones mineras, industriales y de construcción.
  </p>`;
}

/**
 * Renderiza el bloque corporativo "Algunos servicios:" con el ícono del trabajador y viñetas con sangría.
 */
export function renderServicesSection(): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
    <tr>
      <td style="padding: 22px 24px;">
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
  <table align="center" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; width: 100%; margin: 0 auto 26px auto; border-radius: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 20px 22px;">
        <img 
          src="${EMAIL_ASSETS.BROCHURE_ICON}" 
          alt="Brochure PDF" 
          width="40" 
          height="40" 
          style="display: block; margin: 0 auto 10px auto; width: 40px; height: 40px; object-fit: contain;"
        />
        <p style="margin: 0 0 14px 0; font-size: 14.5px; font-weight: 700; color: #0f172a; line-height: 1.45; text-align: center;">
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
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 24px; overflow: hidden;">
    <tr>
      <td style="padding: 16px 20px;">
        <p style="margin: 0 0 12px 0; font-size: 11.5px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.6px; text-align: center;">
          ⚡ Acciones Rápidas para el Asesor Comercial:
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- BOTÓN LLAMAR -->
            <td width="48%" align="center" style="padding-right: 6px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: ${BRAND.YELLOW}; border-radius: 6px; box-shadow: 0 2px 6px rgba(252, 179, 38, 0.3);">
                    <a href="${telUrl}" style="display: block; padding: 11px 16px; font-size: 13px; font-weight: 800; color: #0f172a; text-decoration: none; text-align: center;">
                      📞 Llamar al Cliente
                    </a>
                  </td>
                </tr>
              </table>
            </td>
            <!-- BOTÓN WHATSAPP -->
            <td width="48%" align="center" style="padding-left: 6px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #25D366; border-radius: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: block; padding: 11px 16px; font-size: 13px; font-weight: 800; color: #ffffff; text-decoration: none; text-align: center;">
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

export interface DetailCardOptions {
  maxWidth?: string;
  centered?: boolean;
  hideDivider?: boolean;
  hideRowBorders?: boolean;
}

/**
 * Renderiza una tarjeta de detalles con tabla clave-valor estructurada.
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
  } = options;

  const rowBorderStyle = hideRowBorders ? "" : "border-bottom: 1px solid #f1f5f9;";
  const rowPadding = hideRowBorders ? "padding: 6px 10px;" : "padding: 7px 10px;";

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td width="38%" style="${rowPadding} color: #64748b; font-weight: 600; font-size: 13px; ${rowBorderStyle} vertical-align: top;">
          ${r.label}:
        </td>
        <td width="62%" style="${rowPadding} color: #0f172a; font-weight: 700; font-size: 13.5px; ${rowBorderStyle} vertical-align: top;">
          ${r.isLink && r.href ? `<a href="${r.href}" style="color: ${BRAND.NAVY}; text-decoration: none; font-weight: 700;">${r.value}</a>` : r.value}
        </td>
      </tr>`
    )
    .join("");

  const marginStyle = centered ? "margin: 0 auto 22px auto;" : "margin-bottom: 22px;";
  const alignAttr = centered ? `align="center"` : "";
  const headerBorder = hideDivider ? "" : `border-bottom: 2px solid ${BRAND.YELLOW};`;

  return `
  <table ${alignAttr} width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: ${maxWidth}; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; ${marginStyle} overflow: hidden;">
    <tr>
      <td style="background-color: #f8fafc; padding: 12px 18px; ${headerBorder}">
        <span style="font-size: 13px; font-weight: 800; color: ${BRAND.NAVY}; text-transform: uppercase; letter-spacing: 0.5px;">
          ${title}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding: 12px 16px 14px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${rowsHtml}
        </table>
      </td>
    </tr>
  </table>`;
}

/**
 * Renderiza una caja de mensaje o llamada destacada (con barra de acento a la izquierda).
 */
export function renderCalloutBox(
  title: string,
  content: string,
  variant: "gold" | "green" | "blue" | "neutral" = "gold"
): string {
  const config = {
    gold: { border: BRAND.YELLOW, bg: "#fffbeb", text: "#92400e", label: "#b45309" },
    green: { border: "#10b981", bg: "#ecfdf5", text: "#065f46", label: "#047857" },
    blue: { border: BRAND.NAVY, bg: "#eff6ff", text: "#1e3a8a", label: "#1e40af" },
    neutral: { border: "#94a3b8", bg: "#f8fafc", text: "#334155", label: "#475569" },
  }[variant];

  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${config.bg}; border-left: 4px solid ${config.border}; border-radius: 4px; margin-bottom: 22px;">
    <tr>
      <td style="padding: 14px 18px;">
        ${title ? `
        <span style="color: ${config.label}; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
          ${title}
        </span>` : ""}
        <div style="color: ${config.text}; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap;">
          ${content}
        </div>
      </td>
    </tr>
  </table>`;
}
