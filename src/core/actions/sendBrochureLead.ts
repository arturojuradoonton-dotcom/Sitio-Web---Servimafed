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
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; padding: 28px 12px;">
          <tr>
            <td align="center">
              
              <!-- CONTENEDOR PRINCIPAL BLANCO -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
                
                <!-- 1. CABECERA CON LOGO A LA IZQUIERDA Y COLOR AZUL CORPORATIVO #1d3961 -->
                <tr>
                  <td align="left" style="background-color: #1d3961; padding: 18px 28px;">
                    <a href="https://www.servimafed.com" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img 
                        src="https://www.servimafed.com/images/logo-vertical-blanco.png" 
                        alt="SERVIMAFED S.A.C." 
                        width="125" 
                        style="display: block; max-width: 125px; height: auto; border: 0;"
                      />
                    </a>
                  </td>
                </tr>

                <!-- 2. HERO BANNER CON IMAGEN ANTERIOR RECORTADA Y BADGE FLOTANTE (HTML) -->
                <tr>
                  <td style="padding: 0; background-color: #1d3961; line-height: 0;">
                    <!--[if gte mso 9]>
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:580px;height:260px;">
                    <v:fill type="frame" src="https://www.servimafed.com/images/email-brochure-banner.jpg" color="#1d3961" />
                    <v:textbox inset="0,0,0,0">
                    <![endif]-->
                    <table width="100%" height="260" cellpadding="0" cellspacing="0" border="0" background="https://www.servimafed.com/images/email-brochure-banner.jpg" style="width: 100%; max-width: 580px; height: 260px; background-image: url('https://www.servimafed.com/images/email-brochure-banner.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #1d3961;">
                      <tr>
                        <td align="left" valign="top" style="padding: 22px 28px;">
                          <!-- BADGE AMARILLO CORPORATIVO (ELEMENTO HTML) -->
                          <table cellpadding="0" cellspacing="0" border="0" style="background-color: #FCB326; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); border-collapse: separate;">
                            <tr>
                              <td style="padding: 11px 18px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 15px; font-weight: 800; color: #111c30; line-height: 1.25; border-radius: 8px; text-align: left; letter-spacing: -0.2px;">
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
                  <td style="padding: 32px 28px 20px 28px; background-color: #ffffff;">
                    
                    <!-- SALUDO PERSONALIZADO: Hola [Nombre] de la empresa [Empresa], -->
                    <h1 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                      ${empresa ? `Hola ${nombre} de la empresa ${empresa},` : `Hola ${nombre},`}
                    </h1>
                    
                    <p style="margin: 0 0 24px 0; font-size: 13.5px; line-height: 1.65; color: #475569;">
                      Es un placer saludarle de parte de <strong>SERVIMAFED S.A.C.</strong> De acuerdo a su solicitud, le hacemos entrega de nuestro <strong>Dossier Corporativo &amp; Brochure Técnico 2026</strong> para su evaluación comercial y operativa.
                    </p>

                    <!-- GUÍA DE 3 PASOS (ESTRUCTURA IDÉNTICA A LA IMAGEN 1) -->
                    <div style="text-align: center; margin-top: 10px; margin-bottom: 22px;">
                      <p style="margin: 0 0 18px 0; font-size: 14.5px; font-weight: 700; color: #0f172a; text-transform: none; letter-spacing: 0.2px;">
                        Sigue los siguientes pasos:
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0 auto;">
                        <tr>
                          <!-- PASO 1 -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 8px; border-right: 1px solid #e2e8f0;">
                            <img 
                              src="https://www.servimafed.com/images/step1-download.png" 
                              alt="Descarga Brochure" 
                              width="42" 
                              height="42" 
                              style="display: block; margin: 0 auto 10px auto; width: 42px; height: 42px;"
                            />
                            <p style="margin: 0; font-size: 11.5px; font-weight: 600; color: #1e293b; line-height: 1.4;">
                              Descarga y/o visualiza<br/>el brochure
                            </p>
                          </td>

                          <!-- PASO 2 -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 8px; border-right: 1px solid #e2e8f0;">
                            <img 
                              src="https://www.servimafed.com/images/step2-evaluate.png" 
                              alt="Evalúa capacidades" 
                              width="42" 
                              height="42" 
                              style="display: block; margin: 0 auto 10px auto; width: 42px; height: 42px;"
                            />
                            <p style="margin: 0; font-size: 11.5px; font-weight: 600; color: #1e293b; line-height: 1.4;">
                              Evalúa nuestras<br/>capacidades y taller
                            </p>
                          </td>

                          <!-- PASO 3 -->
                          <td width="33.33%" align="center" style="vertical-align: top; padding: 10px 8px;">
                            <img 
                              src="https://www.servimafed.com/images/step3-confirm.png" 
                              alt="Coordina atención" 
                              width="42" 
                              height="42" 
                              style="display: block; margin: 0 auto 10px auto; width: 42px; height: 42px;"
                            />
                            <p style="margin: 0; font-size: 11.5px; font-weight: 600; color: #1e293b; line-height: 1.4;">
                              Solicita cotización<br/>o visita técnica
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- TEXTO EXPLICATIVO INTERMEDIO -->
                    <p style="margin: 0 0 24px 0; font-size: 12px; color: #64748b; text-align: center; line-height: 1.6;">
                      Contamos con infraestructura propia en Lurín, personal homologado y cobertura nacional para atender sus necesidades mecánicas en mina y proyecto.
                    </p>

                    <!-- 4. CARD DESTACADA FLOTANTE (LLAMADA A LA ACCIÓN PRINCIPAL) -->
                    <div style="background-color: #f1f5f9; border-radius: 12px; padding: 26px 20px; text-align: center; margin: 0 0 24px 0; border: 1px solid #e2e8f0;">
                      <img 
                        src="https://www.servimafed.com/images/pdf-icon.png" 
                        alt="Brochure PDF" 
                        width="38" 
                        style="display: block; margin: 0 auto 12px auto; max-width: 38px; height: auto;"
                      />
                      <p style="margin: 0 0 16px 0; font-size: 14.5px; font-weight: 700; color: #0f172a; line-height: 1.4;">
                        ¿Deseas revisar el detalle completo<br/>y descargar tu brochure?
                      </p>
                      
                      <!-- BOTÓN DORADO / AMARILLO VIBRANTE BULLETPROOF -->
                      <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                        <tr>
                          <td align="center" style="background-color: #FCB326; border-radius: 6px; box-shadow: 0 2px 8px rgba(252, 179, 38, 0.4);">
                            <a 
                              href="https://www.servimafed.com/documento/brochure-servimafed.pdf" 
                              target="_blank"
                              style="display: inline-block; padding: 13px 36px; font-size: 13px; font-weight: 800; color: #0f172a; text-decoration: none; text-transform: uppercase; letter-spacing: 0.8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;"
                            >
                              Ingresa aquí
                            </a>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- 5. RESUMEN DE PRESENTACIÓN CORPORATIVA -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; margin-bottom: 22px;">
                      <p style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 700;">
                        Nuestras especialidades clave:
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #475569; line-height: 1.7;">
                        <tr>
                          <td style="padding: 2px 0;">
                            <span style="color: #FCB326; font-weight: bold; margin-right: 6px;">&#9654;</span> <strong>Overhaul y Reconstrucción:</strong> Motores, mandos finales, transmisiones y cilindros.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 2px 0;">
                            <span style="color: #FCB326; font-weight: bold; margin-right: 6px;">&#9654;</span> <strong>Soldadura &amp; Barrenado:</strong> Recuperación estructural en taller Lurín y en campo.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 2px 0;">
                            <span style="color: #FCB326; font-weight: bold; margin-right: 6px;">&#9654;</span> <strong>Suministro de Repuestos:</strong> Componentes OEM y alternativos de alta durabilidad.
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- LÍNEA AMARILLA DIVISORIA (IDÉNTICA A LA IMAGEN 1) -->
                    <div style="border-top: 2px solid #FCB326; margin: 24px 0 20px 0;"></div>

                    <!-- 6. PÍLDORA CENTRO DE CONTACTO (ESTILO IMAGEN 1) -->
                    <table align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; border-radius: 50px; padding: 7px 18px; margin: 0 auto 18px auto;">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                          <img 
                            src="https://www.servimafed.com/images/headset-contact.png" 
                            alt="Contacto" 
                            width="26" 
                            height="26" 
                            style="display: block; border-radius: 50%;"
                          />
                        </td>
                        <td style="vertical-align: middle; font-size: 12px; color: #334155;">
                          Estamos aquí para ayudarte a través de nuestro <strong>Centro de Contacto</strong>
                        </td>
                      </tr>
                    </table>

                    <!-- DOS COLUMNAS DE CONTACTO CON DIVISOR VERTICAL -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
                      <tr>
                        <td width="50%" align="center" style="vertical-align: middle; border-right: 1px solid #cbd5e1; padding: 6px 12px;">
                          <p style="margin: 0; font-size: 12.5px; font-weight: 700; color: #0f172a;">Teléfono</p>
                          <p style="margin: 3px 0 0 0; font-size: 12.5px;">
                            <a href="tel:+51993667182" style="color: #475569; text-decoration: none; font-weight: 600;">993667182</a>
                          </p>
                        </td>
                        <td width="50%" align="center" style="vertical-align: middle; padding: 6px 12px;">
                          <p style="margin: 0; font-size: 12.5px; font-weight: 700; color: #0f172a;">Email</p>
                          <p style="margin: 3px 0 0 0; font-size: 12.5px;">
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
