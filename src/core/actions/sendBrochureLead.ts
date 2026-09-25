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

    // 2. Correo premium de bienvenida y entrega de brochure al prospecto
    const emailToCustomerHtml = `
      <div style="background-color: #f1f5f9; padding: 32px 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding: 0;">
              
              <!-- HEADER CON LOGO -->
              <div style="background-color: #0B0F19; padding: 36px 24px 28px 24px; text-align: center; border-bottom: 4px solid #FCB326;">
                <img 
                  src="https://www.servimafed.com/images/Logo-horizontal--Variante.png" 
                  alt="SERVIMAFED S.A.C." 
                  width="220" 
                  style="display: block; margin: 0 auto 12px auto; max-width: 220px; height: auto;"
                />
                <p style="margin: 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
                  Soluciones de Ingeniería para Minería &amp; Construcción
                </p>
              </div>

              <!-- SALUDO PERSONALIZADO -->
              <div style="padding: 32px 32px 12px 32px;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 8px 0; color: #0B0F19;">
                  Estimado/a <strong>${nombre}</strong>,
                </p>
                <p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0;">
                  Gracias por el interés de <strong>${empresa}</strong> en nuestras capacidades técnicas y servicios especializados. Nos complace hacerle entrega de nuestro <strong>Brochure Corporativo &amp; Dossier Técnico 2026</strong> en formato PDF para su revisión.
                </p>
              </div>

              <!-- LINEA DIVISORIA -->
              <div style="padding: 0 32px;">
                <div style="border-top: 1px solid #e2e8f0; margin: 16px 0;"></div>
              </div>

              <!-- TRUST BADGES -->
              <div style="padding: 0 32px 8px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                  <tr>
                    <td width="25%" style="text-align: center; padding: 10px 4px;">
                      <div style="font-size: 22px; margin-bottom: 4px;">&#9881;&#65039;</div>
                      <div style="font-size: 11px; font-weight: bold; color: #0B0F19; text-transform: uppercase; letter-spacing: 0.5px;">+10 Años</div>
                      <div style="font-size: 10px; color: #64748b;">de Experiencia</div>
                    </td>
                    <td width="25%" style="text-align: center; padding: 10px 4px;">
                      <div style="font-size: 22px; margin-bottom: 4px;">&#9935;&#65039;</div>
                      <div style="font-size: 11px; font-weight: bold; color: #0B0F19; text-transform: uppercase; letter-spacing: 0.5px;">Minería</div>
                      <div style="font-size: 10px; color: #64748b;">y Construcción</div>
                    </td>
                    <td width="25%" style="text-align: center; padding: 10px 4px;">
                      <div style="font-size: 22px; margin-bottom: 4px;">&#127477;&#127466;</div>
                      <div style="font-size: 11px; font-weight: bold; color: #0B0F19; text-transform: uppercase; letter-spacing: 0.5px;">Cobertura</div>
                      <div style="font-size: 10px; color: #64748b;">Nacional</div>
                    </td>
                    <td width="25%" style="text-align: center; padding: 10px 4px;">
                      <div style="font-size: 22px; margin-bottom: 4px;">&#9989;</div>
                      <div style="font-size: 11px; font-weight: bold; color: #0B0F19; text-transform: uppercase; letter-spacing: 0.5px;">Estándares</div>
                      <div style="font-size: 10px; color: #64748b;">OEM &amp; ISO</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA PRINCIPAL — DESCARGA DE BROCHURE -->
              <div style="padding: 12px 32px 0 32px;">
                <div style="background-color: #0B0F19; border-radius: 6px; padding: 32px 24px; text-align: center; border-left: 4px solid #FCB326; border-right: 4px solid #FCB326;">
                  <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FCB326; font-weight: bold;">
                    Documento Oficial Listo para Consulta
                  </p>
                  <p style="margin: 0 0 22px 0; font-size: 14px; color: #ffffff; font-weight: 500;">
                    Brochure Corporativo &amp; Dossier Técnico 2026
                  </p>
                  <div>
                    <a 
                      href="https://www.servimafed.com/documento/brochure-servimafed.pdf" 
                      target="_blank"
                      style="background-color: #FCB326; color: #0B0F19; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; padding: 16px 36px; text-decoration: none; border-radius: 4px; display: inline-block; box-shadow: 0 4px 14px rgba(252, 179, 38, 0.4);"
                    >
                      &#128229; Descargar Brochure (PDF)
                    </a>
                  </div>
                  <p style="margin: 18px 0 0 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                    Incluye catálogo de servicios, infraestructura de taller en Lurín,<br/>capacidades en soldadura, maestranza y estándares técnicos.
                  </p>
                </div>
              </div>

              <!-- SERVICIOS DESTACADOS -->
              <div style="padding: 28px 32px 0 32px;">
                <p style="margin: 0 0 14px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #0B0F19; font-weight: bold;">
                  Capacidades técnicas destacadas:
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #FCB326; font-weight: bold; margin-right: 8px;">&#9654;</span>
                      Mantenimiento mecánico integral de maquinaria pesada y línea amarilla
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #FCB326; font-weight: bold; margin-right: 8px;">&#9654;</span>
                      Overhaul y reconstrucción de componentes mayores (motores, mandos, transmisiones)
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #FCB326; font-weight: bold; margin-right: 8px;">&#9654;</span>
                      Soldadura estructural homologada, barrenado en campo y maestranza
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; color: #334155;">
                      <span style="color: #FCB326; font-weight: bold; margin-right: 8px;">&#9654;</span>
                      Suministro de repuestos originales y alternativos de alta durabilidad
                    </td>
                  </tr>
                </table>
              </div>

              <!-- SIGUIENTE PASO — CTA SECUNDARIO -->
              <div style="padding: 24px 32px 0 32px;">
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 22px; text-align: center;">
                  <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold; color: #0B0F19;">
                    ¿Requiere evaluar una necesidad técnica u operativa en campo?
                  </p>
                  <p style="margin: 0 0 16px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                    Nuestro equipo de ingenieros especialistas puede coordinar una visita técnica o reunión comercial con su equipo.
                  </p>
                  <a 
                    href="https://www.servimafed.com/contacto" 
                    target="_blank"
                    style="background-color: #ffffff; color: #0B0F19; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; padding: 11px 24px; text-decoration: none; border-radius: 4px; display: inline-block; border: 2px solid #0B0F19;"
                  >
                    Solicitar Visita Técnica &#8594;
                  </a>
                </div>
              </div>

              <!-- CONTACTO DIRECTO -->
              <div style="padding: 24px 32px 0 32px;">
                <p style="font-size: 12px; line-height: 1.6; color: #64748b; margin: 0;">
                  Atención comercial y técnica directa:
                </p>
                <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 10px;">
                  <tr>
                    <td style="padding: 4px 12px 4px 0; font-size: 13px; color: #64748b;">&#128222;</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #334155;"><a href="tel:+51993667182" style="color: #334155; text-decoration: none; font-weight: bold;">(+51) 993 667 182</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 12px 4px 0; font-size: 13px; color: #64748b;">&#9993;&#65039;</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #334155;"><a href="mailto:ventas@servimafed.com" style="color: #1d4ed8; text-decoration: none; font-weight: 500;">ventas@servimafed.com</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 12px 4px 0; font-size: 13px; color: #64748b;">&#127760;</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #334155;"><a href="https://www.servimafed.com" style="color: #1d4ed8; text-decoration: none; font-weight: 500;">www.servimafed.com</a></td>
                  </tr>
                </table>
              </div>

              <!-- FOOTER PREMIUM -->
              <div style="margin-top: 32px; background-color: #0B0F19; padding: 28px 32px; text-align: center;">
                <p style="margin: 0 0 6px 0; font-size: 12px; color: #FCB326; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">
                  SERVIMAFED S.A.C.
                </p>
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #94a3b8;">
                  Mz. C Lote 12A, Sector Sumac Pacha · Lurín · Lima, Perú
                </p>
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">
                  RUC: 20600567668
                </p>
                <div style="border-top: 1px solid #1e293b; margin: 18px 0;"></div>
                <p style="margin: 0; font-size: 10px; color: #64748b; line-height: 1.5;">
                  Este correo fue enviado porque solicitó la descarga del brochure técnico corporativo desde <a href="https://www.servimafed.com" style="color: #FCB326; text-decoration: none;">servimafed.com</a>.<br/>Si no realizó esta solicitud, puede desestimar este mensaje.
                </p>
              </div>

            </td>
          </tr>
        </table>
      </div>
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
      subject: "Brochure Corporativo & Soluciones Técnicas - SERVIMAFED S.A.C.",
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
