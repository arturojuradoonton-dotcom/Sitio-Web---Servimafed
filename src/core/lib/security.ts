/**
 * Utilidades de seguridad de aplicación para SERVIMAFED
 * Fase 3A - Escape HTML, validación de archivos, límites de longitud y honeypot
 */

/**
 * Escapa caracteres especiales en cadenas de texto para prevenir HTML Injection en plantillas de correo.
 * Protege contra &, <, >, ", '
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Verifica si un campo de texto no excede la longitud máxima permitida.
 */
export function isWithinLength(value: string | undefined | null, maxLength: number): boolean {
  if (!value) return true;
  return value.trim().length <= maxLength;
}

/**
 * Detecta si el campo honeypot anti-spam fue completado (típico de bots automatizados).
 */
export function isHoneypotTriggered(value: unknown): boolean {
  if (!value) return false;
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return true;
}

/**
 * Extensiones permitidas para postulaciones laborales (CV)
 */
export const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

/**
 * Extensiones permitidas para solicitud de visita técnica (documentos y fotografías de equipos)
 */
export const ALLOWED_VISIT_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".webp"];

/**
 * Obtiene la extensión en minúsculas de un nombre de archivo
 */
export function getFileExtension(filename: string): string {
  if (!filename) return "";
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
}

/**
 * Valida la extensión de un archivo contra una lista blanca permitida
 */
export function isValidExtension(filename: string, allowedExtensions: string[]): boolean {
  const ext = getFileExtension(filename);
  return allowedExtensions.includes(ext);
}

/**
 * Valida la firma binaria básica (Magic Bytes) sin dependencias adicionales en Node.js.
 * Rechaza ejecutables y archivos cuya firma no coincida con la extensión declarada.
 */
export function isValidMagicBytes(buffer: Buffer, filename: string): boolean {
  if (!buffer || buffer.length < 4) return false;

  const ext = getFileExtension(filename);

  // Detección directa de ejecutables de Windows (MZ header)
  if (buffer[0] === 0x4d && buffer[1] === 0x5a) {
    return false;
  }

  // Detección directa de scripts shell / php
  if (buffer[0] === 0x23 && buffer[1] === 0x21) {
    // #! shebang
    return false;
  }

  switch (ext) {
    case ".pdf":
      // Firma PDF: %PDF (0x25, 0x50, 0x44, 0x46)
      return (
        buffer[0] === 0x25 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x44 &&
        buffer[3] === 0x46
      );

    case ".doc":
      // Firma Microsoft Word clásico (OLE CFB): 0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1
      if (buffer.length < 8) return false;
      return (
        buffer[0] === 0xd0 &&
        buffer[1] === 0xcf &&
        buffer[2] === 0x11 &&
        buffer[3] === 0xe0 &&
        buffer[4] === 0xa1 &&
        buffer[5] === 0xb1 &&
        buffer[6] === 0x1a &&
        buffer[7] === 0xe1
      );

    case ".docx":
      // Firma Microsoft Word moderno (OpenXML ZIP archive): PK\x03\x04 (0x50, 0x4B, 0x03, 0x04)
      return (
        buffer[0] === 0x50 &&
        buffer[1] === 0x4b &&
        buffer[2] === 0x03 &&
        buffer[3] === 0x04
      );

    case ".jpg":
    case ".jpeg":
      // Firma JPEG SOI: 0xFF, 0xD8, 0xFF
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

    case ".png":
      // Firma PNG: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
      if (buffer.length < 8) return false;
      return (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a
      );

    case ".webp":
      // Firma WEBP: RIFF....WEBP (bytes 0..3: RIFF, bytes 8..11: WEBP)
      if (buffer.length < 12) return false;
      const isRiff =
        buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46;
      const isWebp =
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50;
      return isRiff && isWebp;

    default:
      return false;
  }
}
