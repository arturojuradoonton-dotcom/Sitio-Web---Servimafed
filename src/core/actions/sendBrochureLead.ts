"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBrochureLead(formData: FormData) {
  try {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return {
        success: false,
        error: "Ingrese un correo electrónico válido.",
      };
    }

    const fechaHora = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      dateStyle: "long",
      timeStyle: "short",
    });

    const companyEmail = process.env.RECLAMOS_EMAIL ? "ventas@servimafed.com" : "ventas@servimafed.com";

    // 1. Notificación al equipo comercial de SERVIMAFED
    const emailToCompanyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B0F19; color: #FCB326; padding: 20px; text-align: center; border-bottom: 4px solid #FCB326;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">
            💼 Nuevo Prospecto Interesado en Brochure
          </h2>
          <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 12px;">
            Descarga de Dossier Técnico Corporativo
          </p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
            <tr><td style="width: 35%; color: #64748b;"><strong>Fecha y Hora:</strong></td><td>${fechaHora}</td></tr>
            <tr><td style="color: #64748b;"><strong>Nombre Completo:</strong></td><td><strong>${nombre}</strong></td></tr>
            <tr><td style="color: #64748b;"><strong>Empresa / Razón Social:</strong></td><td><strong>${empresa}</strong></td></tr>
            <tr><td style="color: #64748b;"><strong>Correo Corporativo:</strong></td><td><a href="mailto:${correo}" style="color: #1d4ed8;">${correo}</a></td></tr>
            <tr><td style="color: #64748b;"><strong>Teléfono:</strong></td><td>${telefono}</td></tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #FCB326; padding: 12px 16px; margin-top: 10px; font-size: 12px; color: #334155;">
            El usuario ha solicitado y descargado el <strong>Brochure Técnico 2026</strong> desde la sección de Preguntas Frecuentes. Se recomienda seguimiento comercial oportuno.
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          SERVIMAFED S.A.C. | Notificaciones Comerciales Automáticas
        </div>
      </div>
    `;

    // 2. Correo corporativo de presentación y entrega de brochure (Estructura Plantilla Imagen 1)
    const emailToCustomerHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Brochure Corporativo - SERVIMAFED S.A.C.</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 24px 10px;">
          <tr>
            <td align="center">
              
              <!-- CONTENEDOR PRINCIPAL BLANCO (AMPLIADO A 700PX - SIN BORDE EXTERIOR) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 700px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                
                <!-- 1. CABECERA CON LOGO A LA IZQUIERDA Y COLOR AZUL CORPORATIVO #1d3961 -->
                <tr>
                  <td align="left" style="background-color: #1d3961; padding: 20px 36px;">
                    <a href="https://www.servimafed.com" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img 
                        src="https://www.servimafed.com/images/logo-vertical-blanco.png" 
                        alt="SERVIMAFED S.A.C." 
                        width="130" 
                        style="display: block; max-width: 130px; height: auto; border: 0;"
                      />
                    </a>
                  </td>
                </tr>

                <!-- 2. HERO BANNER CON IMAGEN Y BADGE FLOTANTE (HTML) -->
                <tr>
                  <td style="padding: 0; background-color: #1d3961; line-height: 0;">
                    <!--[if gte mso 9]>
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:700px;height:315px;">
                    <v:fill type="frame" src="https://www.servimafed.com/images/email-brochure-banner.jpg" color="#1d3961" />
                    <v:textbox inset="0,0,0,0">
                    <![endif]-->
                    <table width="100%" height="315" cellpadding="0" cellspacing="0" border="0" background="https://www.servimafed.com/images/email-brochure-banner.jpg" style="width: 100%; max-width: 700px; height: 315px; background-image: url('https://www.servimafed.com/images/email-brochure-banner.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #1d3961;">
                      <tr>
                        <td align="left" valign="top" style="padding: 26px 36px;">
                          <!-- BADGE AMARILLO CORPORATIVO (ELEMENTO HTML) -->
                          <table cellpadding="0" cellspacing="0" border="0" style="background-color: #FCB326; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); border-collapse: separate;">
                            <tr>
                              <td style="padding: 12px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 16px; font-weight: 800; color: #111c30; line-height: 1.25; border-radius: 8px; text-align: left; letter-spacing: -0.2px;">
                                ¡Tu Brochure<br/>está Listo!
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

                <!-- 3. CUERPO DEL CORREO -->
                <tr>
                  <td style="padding: 36px 36px 24px 36px; background-color: #ffffff;">
                    
                    <!-- SALUDO PERSONALIZADO: Hola [Nombre] de la empresa [Empresa], -->
                    <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                      ${empresa ? `Hola ${nombre} de la empresa ${empresa},` : `Hola ${nombre},`}
                    </h1>
                    
                    <p style="margin: 0 0 24px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
                      Es un placer saludarle de parte de <strong>SERVIMAFED S.A.C.</strong> De acuerdo a su solicitud, le hacemos entrega de nuestro <strong>Dossier Corporativo &amp; Brochure Técnico 2026</strong> para su evaluación comercial y operativa.
                    </p>

                    <!-- ¿SABÍAS QUE EN SERVIMAFED? - MÉTRICAS Y FORTALEZAS -->
                    <div style="text-align: center; margin-top: 10px; margin-bottom: 26px;">
                      <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 700; color: #0f172a; text-transform: none; letter-spacing: 0.2px;">
                        ¿Sabías que en SERVIMAFED?
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0 auto;">
                        <tr>
                          <!-- COLUMNA 1: 24/7 SOPORTE EN CAMPO -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
                            <img 
                              src="https://www.servimafed.com/images/metric-soporte.png" 
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

                          <!-- COLUMNA 2: 500+ EQUIPOS ATENDIDOS -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px; border-right: 1px solid #e2e8f0;">
                            <img 
                              src="https://www.servimafed.com/images/metric-equipos.png" 
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

                          <!-- COLUMNA 3: ISO ESTÁNDARES GLOBALES -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 12px;">
                            <img 
                              src="https://www.servimafed.com/images/metric-iso.png" 
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

                    <!-- TEXTO EXPLICATIVO INTERMEDIO -->
                    <p style="margin: 0 0 28px 0; font-size: 12.5px; color: #64748b; text-align: center; line-height: 1.6;">
                      Contamos con infraestructura propia en Lurín, personal homologado y cobertura nacional para atender sus necesidades mecánicas en mina y proyecto.
                    </p>

                    <!-- 4. CARD DESTACADA FLOTANTE (CON RELLENO GRIS SUAVE Y PADDING REDUCIDO) -->
                    <table align="center" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; width: 100%; margin: 0 auto 30px auto; border-radius: 14px; border: 1px solid #e2e8f0; background-color: #f8fafc;">
                      <tr>
                        <td align="center" style="padding: 18px 20px;">
                          <img 
                            src="https://www.servimafed.com/images/icon-brochure-download.png" 
                            alt="Brochure PDF" 
                            width="40" 
                            height="40" 
                            style="display: block; margin: 0 auto 10px auto; width: 40px; height: 40px; object-fit: contain;"
                          />
                          <p style="margin: 0 0 14px 0; font-size: 14.5px; font-weight: 700; color: #0f172a; line-height: 1.45; text-align: center;">
                            ¿Deseas revisar el detalle completo<br/>y descargar tu brochure?
                          </p>
                          
                          <!-- BOTÓN DORADO ESTILIZADO BULLETPROOF (PADDING REDUCIDO) -->
                          <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                            <tr>
                              <td align="center" style="background-color: #FCB326; border-radius: 6px; box-shadow: 0 2px 6px rgba(252, 179, 38, 0.35);">
                                <a 
                                  href="https://www.servimafed.com/documento/brochure-servimafed.pdf" 
                                  target="_blank"
                                  style="display: inline-block; padding: 7px 22px; font-size: 13px; font-weight: 700; color: #0f172a; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; letter-spacing: 0.2px;"
                                >
                                  Ingresa aquí
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- 5. ALGUNOS SERVICIOS (TODO EL ANCHO DEL CUERPO, RELLENO GRIS SUAVE, ICONO GRANDE 44PX Y SANGRÍA) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 10px;">
                      <tr>
                        <td style="padding: 22px 24px;">
                          <!-- TÍTULO CON ICONO DEL TRABAJADOR AGRANDADO (44PX) -->
                          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td valign="middle" style="padding-right: 12px;">
                                <img 
                                  src="https://www.servimafed.com/images/icon-trabajador.png" 
                                  alt="Servicios" 
                                  width="44" 
                                  height="44" 
                                  style="display: block; width: 44px; height: 44px; object-fit: contain;"
                                />
                              </td>
                              <td valign="middle" style="font-size: 17px; color: #1d3961; font-weight: 700; line-height: 1.2;">
                                Algunos servicios:
                              </td>
                            </tr>
                          </table>
                          
                          <!-- LISTA DE LOS 5 PUNTOS CON SANGRÍA INTERIOR HACIA LA DERECHA -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-left: 24px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #475569; line-height: 1.65;">
                                  <tr>
                                    <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">
                                      &bull;
                                    </td>
                                    <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65; font-weight: 400;">
                                      Gestión y control de flotas, orientado a optimizar la disponibilidad, operación y mantenimiento de los equipos.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">
                                      &bull;
                                    </td>
                                    <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65; font-weight: 400;">
                                      Mantenimiento preventivo y correctivo para conservar el rendimiento y prolongar la vida útil de los equipos.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">
                                      &bull;
                                    </td>
                                    <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65; font-weight: 400;">
                                      Inspección, evaluación y diagnóstico técnico para identificar fallas y determinar las acciones correctivas.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">
                                      &bull;
                                    </td>
                                    <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65; font-weight: 400;">
                                      Mecanizado, fabricación, reparación y soldadura de componentes y estructuras para maquinaria.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" style="padding: 4px 10px 8px 0; color: #64748b; font-size: 14px; line-height: 1.5; width: 14px;">
                                      &bull;
                                    </td>
                                    <td valign="top" style="padding: 4px 0 8px 0; font-size: 13px; color: #475569; line-height: 1.65; font-weight: 400;">
                                      Suministro de repuestos y componentes para atender las necesidades de mantenimiento y reparación.
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- LÍNEA AMARILLA A TODO LO ANCHO DE LA MAQUETACIÓN -->
                <tr>
                  <td style="background-color: #FCB326; height: 3px; font-size: 0; line-height: 0; padding: 0;">&nbsp;</td>
                </tr>

                <!-- 6. CUERPO INFERIOR: CENTRO DE CONTACTO -->
                <tr>
                  <td style="padding: 28px 36px 24px 36px; background-color: #ffffff;">

                    <!-- PÍLDORA CENTRO DE CONTACTO -->
                    <table align="center" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 50px; padding: 8px 24px; margin: 0 auto 22px auto; background-color: #ffffff;">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img 
                            src="https://www.servimafed.com/images/headset-contact.png" 
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

                    <!-- DOS COLUMNAS DE CONTACTO: TELÉFONO A LA DERECHA, EMAIL A LA IZQUIERDA (SEPARADOS DEL DIVISOR CENTRAL) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
                      <tr>
                        <!-- COLUMNA IZQUIERDA: TELÉFONO ALINEADO A LA DERECHA, CON SEPARACIÓN HACIA LA LÍNEA -->
                        <td width="50%" align="right" style="vertical-align: middle; border-right: 1px solid #cbd5e1; padding: 6px 32px 6px 12px; text-align: right;">
                          <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Teléfono</p>
                          <p style="margin: 3px 0 0 0; font-size: 13px;">
                            <a href="tel:+51993667182" style="color: #475569; text-decoration: none; font-weight: 600;">993667182</a>
                          </p>
                        </td>
                        <!-- COLUMNA DERECHA: EMAIL ALINEADO A LA IZQUIERDA, CON SEPARACIÓN HACIA LA LÍNEA -->
                        <td width="50%" align="left" style="vertical-align: middle; padding: 6px 12px 6px 32px; text-align: left;">
                          <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">Email</p>
                          <p style="margin: 3px 0 0 0; font-size: 13px;">
                            <a href="mailto:ventas@servimafed.com" style="color: #475569; text-decoration: none; font-weight: 600;">ventas@servimafed.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- LÍNEA AZUL DE REMATE -->
                <tr>
                  <td style="background-color: #1d3961; height: 3px; font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>

                <!-- 7. FOOTER INSTITUCIONAL -->
                <tr>
                  <td align="center" style="background-color: #ffffff; padding: 22px 24px 28px 24px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                      Este mensaje fue enviado por <strong>SERVIMAFED S.A.C.</strong>
                    </p>
                    <p style="margin: 0 0 4px 0; font-size: 10.5px; color: #94a3b8; line-height: 1.5;">
                      Dirección: Mz. C Lote 12A, Sector Sumac Pacha - Lurín - Lima<br/>
                      RUC: 20600567668
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
      </html>
    `;

    // Envío a ventas
    await resend.emails.send({
      from: "Web Servimafed <web@servimafed.com>",
      to: [companyEmail],
      replyTo: correo,
      subject: `💼 [PROSPECTO BROCHURE] ${nombre} - ${empresa}`,
      html: emailToCompanyHtml,
    });

    // Envío de cortesía al prospecto
    await resend.emails.send({
      from: "SERVIMAFED <web@servimafed.com>",
      to: [correo],
      subject: "¡Tu Brochure Corporativo está listo! - SERVIMAFED S.A.C.",
      html: emailToCustomerHtml,
    });

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
