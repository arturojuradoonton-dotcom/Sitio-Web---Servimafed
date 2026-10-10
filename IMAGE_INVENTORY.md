# Inventario y Auditoría Completa de Imágenes — SERVIMAFED S.A.C.
**Sitio Web Oficial**: [www.servimafed.com](https://www.servimafed.com)  
**Fecha de Auditoría**: Octubre 2026  
**Auditor**: Antigravity AI Engineering  
**Estado General**: AUDITORÍA COMPLETADA — ESPERANDO APROBACIÓN DE USUARIO (SIN MODIFICACIONES EJECUTADAS)

---

## Índice
1. [Resumen Ejecutivo y Métricas Globales](#1-resumen-ejecutivo-y-métricas-globales)
2. [Diagnóstico de Calidad y Problemas Críticos Detectados](#2-diagnóstico-de-calidad-y-problemas-críticos-detectados)
3. [Inventario Completo de Imágenes del Sitio](#3-inventario-completo-de-imágenes-del-sitio)
4. [Required Images (Imágenes que Realmente Necesita el Sitio)](#4-required-images-imágenes-que-realmente-necesita-el-sitio)
5. [Nueva Estructura de Directorios Propuesta](#5-nueva-estructura-de-directorios-propuesta)
6. [Convención de Nomenclatura SEO-Friendly](#6-convención-de-nomenclatura-seo-friendly)
7. [Estrategia de Resoluciones, Formatos y Responsive](#7-estrategia-de-resoluciones-formatos-y-responsive)
8. [Auditoría de Performance y Buenas Prácticas Next.js](#8-auditoría-de-performance-y-buenas-prácticas-nextjs)

---

## 1. Resumen Ejecutivo y Métricas Globales

Se ha realizado un escaneo exhaustivo del 100% de la base de código (`src/app`, `src/core`, `src/modules`, `src/data`, `public/`), analizando todas las páginas, componentes de interfaz, mega menús, plantillas de correo transaccionales y archivos estáticos en disco.

### Métricas Cuantitativas
| Indicador | Cantidad | Observación |
|---|---|---|
| **Total de archivos de imagen en `/public`** | **372** | Archivos físicos en disco (JPG, PNG, WebP, SVG, GIF, ICO) |
| **Imágenes activas en código** | **75** | Referenciadas y mostradas efectivamente en frontend/backend |
| **Imágenes huérfanas / no utilizadas en código** | **297** | Archivos residuales, duplicados, sin uso alguno |
| **Referencias rotas / archivos faltantes (404)** | **26 puntos críticos** (55 ocurrencias) | URLs en código que apuntan a archivos inexistentes |
| **Imágenes externas (URLs absolutas)** | **1** (repetida en 2 lugares) | `Logo-horizontal.png` en `layout.tsx` (Schema.org / OG) |
| **Activos de email transaccional (Resend)** | **18** | Enlazados vía `emailLayout.ts` para notificaciones a clientes |

### Desglose por Estado Recomendado
- **KEEP (Mantener)**: **44 imágenes** (Logos vectoriales oficiales, favicons, iconos SVG de UI, mapa del Perú).
- **OPTIMIZE (Optimizar peso / formato / compresión)**: **25 imágenes** (Banners de cabecera JPG >800 KB, banners de email en PNG >1 MB, logos PNG que deben migrar a WebP/SVG).
- **REPLACE (Reemplazar por mala calidad o duplicidad)**: **28 imágenes** (Bentos de 600x450 ampliados a pantallas retina, fotos numéricas de testimonios que son motores repetidos, imágenes genéricas del hero slider).
- **REMOVE (Eliminar del repositorio)**: **297 imágenes** (Archivos huérfanos del 1 al 59, `54545454.jpg`, `ee07a902...png`, `admin/customizer`, etc.).
- **NEW (Nuevas imágenes a conseguir)**: **26 imágenes** (5 hero banners faltantes, 16 fotos de productos para catálogo de repuestos, 3 imágenes para posts de blog rotos, 2 imágenes de comparación técnica antes/después).
- **Total de imágenes que se necesita conseguir (NEW + REPLACE)**: **54 imágenes**.

---

## 2. Diagnóstico de Calidad y Problemas Críticos Detectados

### 2.1 Enlaces Rotos y 404 en el Frontend (Crítico)
1. **Páginas secundarias sin banner de cabecera**:
   - `/bolsa-trabajo`: Busca `/images/fondos/hero-bolsa-trabajo.jpg` (No existe).
   - `/comprobantes`: Busca `/images/fondos/hero-comprobantes.jpg` (No existe).
   - `/buscar`: Busca `/images/fondos/hero-buscar.jpg` (No existe).
   - `/politicas`: Busca `/images/fondos/hero-politicas.jpg` (No existe).
   - `/not-found` (404): Busca `/images/fondos/hero-404.jpg` (No existe).
2. **Catálogo de Repuestos (`/repuestos/[slug]`)**:
   - Las 4 subcategorías (`accesorios`, `componentes`, `elementos-desgaste`, `mantenimiento`) contienen 4 productos cada una con rutas como `/images/repuestos/accesorios/1.jpg` hasta `4.jpg`. **Los 16 archivos están ausentes en disco**. Los usuarios que entran a ver detalles de productos ven recuadros rotos.
3. **Página de Servicios (`/servicios`)**:
   - La card de "Mantenimiento Preventivo" enlaza a `/images/menu-2.png`, el cual no existe (en disco solo existe `menu-2.jpg` de baja resolución o `menu-22.png`).
4. **Servicio Detalle Gestión de Flota (`/servicios/gestion-flota`)**:
   - En `serviciosData.ts` la imagen está configurada como `/images/servicios/gestion-flota.jpg`, pero en disco el archivo se guardó erróneamente con doble extensión `gestion-flota.jpg.jpg`.
5. **Blog Técnico (`/blog` y `/blog/[slug]`)**:
   - Artículos clave ("Nuevas Normas HSEQ", "Volvo L25 Eléctrico", "Intervalos CAT 320") apuntan a `/images/blog/11.jpg`, `/images/blog/12.jpg`, `/images/blog/16.jpg`. En `/public/images/blog/` solo existen del 1 al 10.

### 2.2 Problemas de Calidad Visual y Pixelación (Bentos y Heroes)
1. **Bento Grid de Inicio (`page.tsx`)**:
   - Las 6 tarjetas Bento (`bento-gestion-flota.jpg.jpg`, `bento-mantenimiento.jpg.jpg`, etc.) tienen un tamaño nativo de solo **600 × 450 px**.
   - En pantallas grandes (desktop), las tarjetas anchas ocupan hasta 640px de ancho renderizado. En pantallas de alta densidad (Retina 2x/3x, MacBook, monitores 2K/4K), la imagen se escala artificialmente a más del 200%, generando un efecto visiblemente borroso y pixelado.
   - Además, `bento-repuestos.jpg.jpg` pesa únicamente **16.1 KB**, evidenciando artefactos de compresión JPEG severos (bloques de compresión visibles en degradados y bordes de maquinaria).
2. **Doble Extensión Sistemática en Nombres de Archivo**:
   - Existen más de 15 archivos guardados como `.jpg.jpg` y `.gif.gif` (`bento-mecanizado-soldadura.jpg.jpg`, `accesorios.jpg.jpg`, `loader.gif.gif`). Esto denota scripts de guardado defectuosos o exportaciones erróneas.
3. **Contenido Falso o Incoherente en Testimonios**:
   - En `HomeTestimonials.tsx`, los testimonios de clientes (Rachel Bell, Carlos Mendoza, Elena Rojas, Mateo Silva) utilizan `/images/testimonio/1.jpg` a `4.jpg`.
   - Al inspeccionar los archivos físicos, **son fotos técnicas idénticas de motores y repuestos copiadas desde la carpeta de servicios**, no fotografías de personas ni retratos profesionales.
4. **Pesos Desproporcionados y Formatos Inadecuados**:
   - `/images/menu-4.png` (937 KB) y `/images/menu-5.png` (955 KB): Fotografías guardadas en PNG sin compresión que deberían ser WebP de menos de 70 KB.
   - `/images/loader-yellow.gif`: Un spinner GIF de **659.7 KB** que se carga con `priority` y `unoptimized` en el `RootLayout` en absolutamente **todas las páginas del sitio**. Genera un bloqueo innecesario de red en conexiones móviles cuando un SVG animado de 2 KB cumpliría la misma función con nitidez vectorial infinita.
   - `/images/email-hero-banner-jobs.png`: Un banner de **1.02 MB** utilizado en el correo de bolsa de trabajo.

---

## 3. Inventario Completo de Imágenes del Sitio

A continuación se detalla cada activo visual actualmente presente o requerido en el código fuente.

### Convenciones de Estado:
- **KEEP**: Mantener tal como está (activo correcto y optimizado).
- **OPTIMIZE**: Mantener la imagen pero optimizar formato, compresión o nombres.
- **REPLACE**: Reemplazar la imagen por una nueva debido a baja calidad, pixelación o incoherencia.
- **REMOVE**: Eliminar archivo huérfano del disco para limpiar el proyecto.
- **NEW**: Nueva imagen requerida que actualmente falta y provoca error 404.

### Convenciones de Prioridad:
- **CRITICAL**: Afecta directamente la navegación, provoca 404 en el cliente o bloquea el LCP.
- **HIGH**: Afecta la percepción de marca en páginas principales (Home, Servicios, Repuestos).
- **MEDIUM**: Mejoras visuales en páginas secundarias o módulos complementarios.
- **LOW**: Archivos residuales, iconos auxiliares o limpiezas menores.

---

### TABLA 1: Identidad Corporativa y Favicons

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-001** | Global | Header / `NavBar.tsx` | `Logo-horizontal.png` | `/images/Logo-horizontal.png` | Logo | 500 × 125 | 28.0 KB | 224 × 48 px | 4:1 | Both | **OPTIMIZE** | **HIGH** | `brand-logo-horizontal.webp` | WebP + SVG | 448 × 96 (2x) | Convertir a SVG o WebP optimizado con transparencia limpia. |
| **IMG-002** | Global | Footer / `Footer.tsx` | `Logo-horizontal--Variante.png` | `/images/Logo-horizontal--Variante.png` | Logo | 500 × 125 | 25.6 KB | 224 × 48 px | 4:1 | Both | **OPTIMIZE** | **HIGH** | `brand-logo-white.webp` | WebP + SVG | 448 × 96 (2x) | Eliminar doble guión en nombre; generar variante SVG para máxima nitidez en fondo oscuro. |
| **IMG-003** | Emails | Header Email / `emailLayout.ts` | `logo-vertical-blanco.png` | `/images/logo-vertical-blanco.png` | Logo | 400 × 400 | 33.2 KB | 160 × 60 px | ~2.6:1 | Both | **KEEP** | **HIGH** | `brand-logo-vertical-white.png` | PNG | 320 × 120 (2x) | Mantener ruta accesible para correos HTML ya enviados; compatibilidad con clientes de correo. |
| **IMG-004** | Global | Branding / OpenGraph | `Isotipo-sin-fondo.png` | `/images/Isotipo-sin-fondo.png` | Isotipo | 512 × 512 | 59.9 KB | Variable | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `brand-isotipo.webp` | WebP / SVG | 512 × 512 | Optimizar compresión y proporcionar versión SVG vectorial. |
| **IMG-005** | Global | Browser Tab / `layout.tsx` | `favicon.ico` | `/favicon.ico` | Icono | Multi-size | 1.9 KB | 32 × 32 px | 1:1 | Both | **KEEP** | **MEDIUM** | `favicon.ico` | ICO | 32 × 32 | Mantener para compatibilidad universal con navegadores antiguos. |
| **IMG-006** | Global | PWA / `layout.tsx` | `favicon-48x48.png` | `/favicon-48x48.png` | Icono | 48 × 48 | 1.9 KB | 48 × 48 px | 1:1 | Both | **KEEP** | **LOW** | `favicon-48x48.png` | PNG | 48 × 48 | Mantener. |
| **IMG-007** | Global | PWA / `layout.tsx` | `icon-192x192.png` | `/icon-192x192.png` | Icono | 192 × 192 | 7.3 KB | 192 × 192 px | 1:1 | Both | **KEEP** | **LOW** | `icon-192x192.png` | PNG | 192 × 192 | Mantener. |
| **IMG-008** | Global | PWA / `layout.tsx` | `icon-512x512.png` | `/icon-512x512.png` | Icono | 512 × 512 | 20.3 KB | 512 × 512 px | 1:1 | Both | **KEEP** | **LOW** | `icon-512x512.png` | PNG | 512 × 512 | Mantener. |
| **IMG-009** | Global | iOS / `layout.tsx` | `apple-touch-icon.png` | `/apple-touch-icon.png` | Icono | 180 × 180 | 6.6 KB | 180 × 180 px | 1:1 | Mobile | **KEEP** | **LOW** | `apple-touch-icon.png` | PNG | 180 × 180 | Mantener. |

---

### TABLA 2: Elementos Globales de Interfaz y Navegación

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-010** | Global | Pantalla de carga / `Preloader.tsx` | `loader-yellow.gif` | `/images/loader-yellow.gif` | GIF Animado | 200 × 200 | 659.7 KB | 120 × 120 px | 1:1 | Both | **REPLACE** | **CRITICAL** | `ui-preloader.svg` | SVG / CSS | Vectorial | Reemplazar GIF pesado de 660 KB por animación CSS pura o SVG optimizado de 2 KB. |
| **IMG-011** | Global | Banner CTA / `GlobalCTA.tsx` | `mapa-peru-punteado.svg` | `/images/mapa-peru-punteado.svg` | Gráfico SVG | Vectorial | 225 B | 600 × 600 px | 1:1 | Both | **KEEP** | **LOW** | `map-peru-dots.svg` | SVG | Vectorial | Mantener, extremadamente ligero y limpio. |
| **IMG-012** | Global | Footer / `Footer.tsx` | `bolsa de trabajo.svg` | `/images/iconos/bolsa de trabajo.svg` | Icono SVG | Vectorial | 13.0 KB | 28 × 28 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-jobs.svg` | SVG | Vectorial | Renombrar sin espacios y optimizar paths SVG (SVGO). |
| **IMG-013** | Global | Footer / `Footer.tsx` | `comprobantes electronicos.svg` | `/images/iconos/comprobantes electronicos.svg` | Icono SVG | Vectorial | 4.9 KB | 28 × 28 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-receipt.svg` | SVG | Vectorial | Renombrar sin espacios y optimizar con SVGO. |
| **IMG-014** | Global | Footer / `Footer.tsx` | `politica de privacidad.svg` | `/images/iconos/politica de privacidad.svg` | Icono SVG | Vectorial | 7.3 KB | 28 × 28 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-privacy.svg` | SVG | Vectorial | Renombrar sin espacios y optimizar con SVGO. |
| **IMG-015** | Global | Footer / `Footer.tsx` | `libro de reclamaciones.svg` | `/images/iconos/libro de reclamaciones.svg` | Icono SVG | Vectorial | 5.8 KB | 28 × 28 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-claims.svg` | SVG | Vectorial | Renombrar sin espacios y optimizar con SVGO. |
| **IMG-016** | Global | Mega Menú / `navigationData.ts` | `servicio-gestion.jpg.jpg` | `/images/menu/servicio-gestion.jpg.jpg` | Foto Miniatura | 600 × 450 | 35.8 KB | 220 × 128 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-service-fleet.webp` | WebP | 440 × 256 (2x) | Corregir doble extensión `.jpg.jpg` y exportar a WebP de alta nitidez. |
| **IMG-017** | Global | Mega Menú / `navigationData.ts` | `servicio-mantenimiento.jpg.jpg` | `/images/menu/servicio-mantenimiento.jpg.jpg` | Foto Miniatura | 600 × 450 | 24.9 KB | 220 × 128 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-service-preventive.webp` | WebP | 440 × 256 (2x) | Corregir doble extensión `.jpg.jpg` y exportar a WebP. |
| **IMG-018** | Global | Mega Menú / `navigationData.ts` | `servicio-reparacion.jpg.jpg` | `/images/menu/servicio-reparacion.jpg.jpg` | Foto Miniatura | 600 × 450 | 54.6 KB | 220 × 128 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-service-components.webp` | WebP | 440 × 256 (2x) | Corregir doble extensión `.jpg.jpg` y exportar a WebP. |
| **IMG-019** | Global | Mega Menú / `navigationData.ts` | `servicio-soldadura.jpg.jpg` | `/images/menu/servicio-soldadura.jpg.jpg` | Foto Miniatura | 600 × 450 | 28.4 KB | 220 × 128 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-service-welding.webp` | WebP | 440 × 256 (2x) | Corregir doble extensión `.jpg.jpg` y exportar a WebP. |
| **IMG-020** | Global | Mega Menú / `navigationData.ts` | `servicio-evaluacion.jpg.jpg` | `/images/menu/servicio-evaluacion.jpg.jpg` | Foto Miniatura | 600 × 450 | 36.2 KB | 220 × 128 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-service-diagnostic.webp` | WebP | 440 × 256 (2x) | Corregir doble extensión `.jpg.jpg` y exportar a WebP. |
| **IMG-021** | Global | Mega Menú / `navigationData.ts` | `repuestos-accesorios.jpg.jpg` | `/images/menu/repuestos-accesorios.jpg.jpg` | Foto Miniatura | 600 × 450 | 33.9 KB | 260 × 144 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-part-accessories.webp` | WebP | 520 × 288 (2x) | Corregir doble extensión y exportar a WebP. |
| **IMG-022** | Global | Mega Menú / `navigationData.ts` | `repuesto-componentes.jpg.jpg` | `/images/menu/repuesto-componentes.jpg.jpg` | Foto Miniatura | 600 × 450 | 20.4 KB | 260 × 144 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-part-components.webp` | WebP | 520 × 288 (2x) | Corregir doble extensión y exportar a WebP. |
| **IMG-023** | Global | Mega Menú / `navigationData.ts` | `repuesto-elementos-desgaste.jpg` | `/images/menu/repuesto-elementos-desgaste.jpg` | Foto Miniatura | 600 × 450 | 16.6 KB | 260 × 144 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-part-wear.webp` | WebP | 520 × 288 (2x) | Exportar a WebP nítido. |
| **IMG-024** | Global | Mega Menú / `navigationData.ts` | `repuesto-mantenimiento.jpg.jpg` | `/images/menu/repuesto-mantenimiento.jpg.jpg` | Foto Miniatura | 600 × 450 | 16.5 KB | 260 × 144 px | 16:9 | Desktop | **OPTIMIZE** | **HIGH** | `menu-part-maintenance.webp` | WebP | 520 × 288 (2x) | Corregir doble extensión y exportar a WebP. |

---

### TABLA 3: Página Principal (Home `/`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-025** | Home (`/`) | Hero Slider / `HeroSlider.tsx` | `13.jpg` | `/images/13.jpg` | Fotografía | 2400 × 1350 | 94.0 KB | 1920 × 720 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `hero-slide-kits-mantenimiento.webp` | WebP / AVIF | 2560 × 1440 | Reemplazar nombre genérico `13.jpg`. Fotografía de alta definición de kits de filtración y repuestos mineros. |
| **IMG-026** | Home (`/`) | Hero Slider / `HeroSlider.tsx` | `55.jpg` | `/images/55.jpg` | Fotografía | 2400 × 1350 | 166.6 KB | 1920 × 720 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `hero-slide-repuestos-oem.webp` | WebP / AVIF | 2560 × 1440 | Reemplazar nombre genérico `55.jpg`. Imagen premium de almacén de repuestos pesados. |
| **IMG-027** | Home (`/`) | Hero Slider / `HeroSlider.tsx` | `40.jpg` | `/images/40.jpg` | Fotografía | 2400 × 1350 | 309.5 KB | 1920 × 720 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `hero-slide-gestion-flota.webp` | WebP / AVIF | 2560 × 1440 | Reemplazar nombre genérico `40.jpg`. Maquinaria pesada CAT/Komatsu operando en tajo abierto. |
| **IMG-028** | Home (`/`) | Hero Slider / `HeroSlider.tsx` | `9.jpg` | `/images/9.jpg` | Fotografía | 2400 × 1350 | 200.6 KB | 1920 × 720 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `hero-slide-overhaul-motores.webp` | WebP / AVIF | 2560 × 1440 | Reemplazar nombre genérico `9.jpg`. Técnico realizando calibración de motor diésel en taller. |
| **IMG-029** | Home (`/`) | Valores / `page.tsx` | `3.svg` | `/images/iconos/3.svg` | Icono SVG | Vectorial | 34.2 KB | 48 × 48 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-value-calidad.svg` | SVG | Vectorial | Renombrar descriptivamente y limpiar paths SVG con SVGO. |
| **IMG-030** | Home (`/`) | Valores / `page.tsx` | `1.svg` | `/images/iconos/1.svg` | Icono SVG | Vectorial | 9.2 KB | 48 × 48 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-value-confiabilidad.svg` | SVG | Vectorial | Renombrar descriptivamente y optimizar SVGO. |
| **IMG-031** | Home (`/`) | Valores / `page.tsx` | `2.svg` | `/images/iconos/2.svg` | Icono SVG | Vectorial | 13.0 KB | 48 × 48 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-value-puntualidad.svg` | SVG | Vectorial | Renombrar descriptivamente y optimizar SVGO. |
| **IMG-032** | Home (`/`) | Bento Grid / `page.tsx` | `bento-gestion-flota.jpg.jpg` | `/images/inicio/bento-gestion-flota.jpg.jpg` | Fotografía Bento | 600 × 450 | 35.0 KB | 640 × 315 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `bento-gestion-flota.webp` | WebP / AVIF | 1280 × 720 (2x) | Imagen de 600px pixelada en Retina. Requiere fotografía 2K de flota minera con telemetría. |
| **IMG-033** | Home (`/`) | Bento Grid / `page.tsx` | `bento-mantenimiento.jpg.jpg` | `/images/inicio/bento-mantenimiento.jpg.jpg` | Fotografía Bento | 600 × 450 | 36.5 KB | 320 × 315 px | ~1:1 | Both | **REPLACE** | **CRITICAL** | `bento-mantenimiento-preventivo.webp` | WebP / AVIF | 800 × 800 (2x) | Reemplazar por imagen cuadrada nítida de servicio de lubricación y filtros. |
| **IMG-034** | Home (`/`) | Bento Grid / `page.tsx` | `bento-repuestos.jpg.jpg` | `/images/inicio/bento-repuestos.jpg.jpg` | Fotografía Bento | 600 × 450 | 16.1 KB | 320 × 315 px | ~1:1 | Both | **REPLACE** | **CRITICAL** | `bento-suministro-repuestos.webp` | WebP / AVIF | 800 × 800 (2x) | Severamente comprimida (16 KB). Requiere imagen nítida de componentes y rodamientos pesados. |
| **IMG-035** | Home (`/`) | Bento Grid / `page.tsx` | `bento-evaluacion-diagnostico.jpg.jpg` | `/images/inicio/bento-evaluacion-diagnostico.jpg.jpg` | Fotografía Bento | 600 × 450 | 30.7 KB | 320 × 315 px | ~1:1 | Both | **REPLACE** | **CRITICAL** | `bento-evaluacion-diagnostico.webp` | WebP / AVIF | 800 × 800 (2x) | Escaneo electrónico con laptop de diagnóstico conectada a módulo ECM. |
| **IMG-036** | Home (`/`) | Bento Grid / `page.tsx` | `bento-mecanizado-soldadura.jpg.jpg` | `/images/inicio/bento-mecanizado-soldadura.jpg.jpg` | Fotografía Bento | 600 × 450 | 39.6 KB | 320 × 315 px | ~1:1 | Both | **REPLACE** | **CRITICAL** | `bento-mecanizado-soldadura.webp` | WebP / AVIF | 800 × 800 (2x) | Soldadura MIG/FCAW certificada sobre estructura de cuchara pesada con chispas dinámicas. |
| **IMG-037** | Home (`/`) | Bento Grid / `page.tsx` | `bento-reparacion-componente.jpg.jpg` | `/images/inicio/bento-reparacion-componente.jpg.jpg` | Fotografía Bento | 600 × 450 | 53.4 KB | 640 × 315 px | 16:9 | Both | **REPLACE** | **CRITICAL** | `bento-reparacion-componentes.webp` | WebP / AVIF | 1280 × 720 (2x) | Overhaul de bloque motor diésel CAT/Cummins en taller limpio y ordenado. |
| **IMG-038** | Home (`/`) | Métricas / `page.tsx` | `8.svg` | `/images/iconos/8.svg` | Icono SVG | Vectorial | 10.2 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-metric-tecnicos.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-039** | Home (`/`) | Métricas / `page.tsx` | `6.svg` | `/images/iconos/6.svg` | Icono SVG | Vectorial | 40.2 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-metric-soporte-247.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-040** | Home (`/`) | Métricas / `page.tsx` | `5.svg` | `/images/iconos/5.svg` | Icono SVG | Vectorial | 10.4 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-metric-equipos.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-041** | Home (`/`) | Métricas / `page.tsx` | `4.svg` | `/images/iconos/4.svg` | Icono SVG | Vectorial | 9.1 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **MEDIUM** | `icon-metric-iso.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-042** a **IMG-065** | Home (`/`) | Marcas / `BrandSlider.tsx` | `1.svg` a `24.svg` | `/images/Web - Marcas/[1-24].svg` | Logos SVG | Vectoriales | 7 KB - 243 KB | 160 × 60 px | ~3:1 | Both | **OPTIMIZE** | **HIGH** | `brand-caterpillar.svg`, `brand-komatsu.svg`, etc. | SVG | Vectorial | Renombrar archivos con nombres reales de marca; añadir `alt` descriptivo accesible; eliminar espacio en carpeta `Web - Marcas`. |

---

### TABLA 4: Página Nosotros (`/nosotros`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-066** | Nosotros | Cabecera / `nosotros/page.tsx` | `hero-nosotros.jpg` | `/images/Banners Cabeceras/hero-nosotros.jpg` | Fotografía Hero | 1920 × 550 | 437.6 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **HIGH** | `banner-hero-nosotros.webp` | WebP | 1920 × 600 | Convertir a WebP, reduciendo peso de 437 KB a ~90 KB sin pérdida visible. |
| **IMG-067** | Nosotros | Historia / `nosotros/page.tsx` | `historia.jpg` | `/images/nosotros/historia.jpg` | Fotografía | 1200 × 800 | 208.9 KB | 600 × 500 px | 6:5 | Both | **OPTIMIZE** | **HIGH** | `about-operaciones-campo.webp` | WebP | 1200 × 1000 (2x) | Optimizar a WebP; verificar encuadre y contraste con filtro de marca. |
| **IMG-068** | Nosotros | Textura / `nosotros/page.tsx` | `hero-nosotros.jpg` | `/images/fondos/hero-nosotros.jpg` | Background CSS | 1920 × 550 | 141.4 KB | Fullwidth | N/A | Both | **OPTIMIZE** | **LOW** | `bg-industrial-texture.webp` | WebP | 1600 × 600 | Optimizar peso para background con opacidad 5%. |
| **IMG-069** | Nosotros | Estadísticas / `nosotros/page.tsx` | `13.svg` | `/images/iconos/13.svg` | Icono SVG | Vectorial | 14.0 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **LOW** | `icon-stat-hours.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-070** | Nosotros | Estadísticas / `nosotros/page.tsx` | `7.svg` | `/images/iconos/7.svg` | Icono SVG | Vectorial | 10.4 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **LOW** | `icon-stat-team.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-071** | Nosotros | Estadísticas / `nosotros/page.tsx` | `15.svg` | `/images/iconos/15.svg` | Icono SVG | Vectorial | 10.6 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **LOW** | `icon-stat-hse.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |
| **IMG-072** | Nosotros | Estadísticas / `nosotros/page.tsx` | `14.svg` | `/images/iconos/14.svg` | Icono SVG | Vectorial | 12.1 KB | 56 × 56 px | 1:1 | Both | **OPTIMIZE** | **LOW** | `icon-stat-iso.svg` | SVG | Vectorial | Renombrar y optimizar con SVGO. |

---

### TABLA 5: Página de Servicios (`/servicios` y `/servicios/[slug]`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-073** | Servicios | Cabecera / `servicios/page.tsx` | `hero-servicios.jpg` | `/images/Banners Cabeceras/hero-servicios.jpg` | Fotografía Hero | 1920 × 550 | 554.3 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **HIGH** | `banner-hero-servicios.webp` | WebP | 1920 × 600 | Convertir a WebP (ahorro estimado: 80% del peso). |
| **IMG-074** | Servicios | Tarjeta 1 / `servicios/page.tsx` | `menu-1.png` | `/images/menu-1.png` | Fotografía Card | 800 × 533 | 661.8 KB | 400 × 256 px | 16:10 | Both | **OPTIMIZE** | **HIGH** | `service-card-gestion-flota.webp` | WebP | 800 × 512 (2x) | Migrar de PNG masivo (661 KB) a WebP (aprox. 55 KB). |
| **IMG-075** | Servicios | Tarjeta 2 / `servicios/page.tsx` | `menu-2.png` | `/images/menu-2.png` | Fotografía Card | **NO EXISTE** | **404** | 400 × 256 px | 16:10 | Both | **NEW** | **CRITICAL** | `service-card-mantenimiento-preventivo.webp` | WebP | 800 × 512 (2x) | Ruta rota en código actual. Generar nueva imagen de mantenimiento preventivo. |
| **IMG-076** | Servicios | Tarjeta 3 / `servicios/page.tsx` | `menu-3.png` | `/images/menu-3.png` | Fotografía Card | 800 × 533 | 725.0 KB | 400 × 256 px | 16:10 | Both | **OPTIMIZE** | **HIGH** | `service-card-reparacion-componentes.webp` | WebP | 800 × 512 (2x) | Migrar de PNG masivo (725 KB) a WebP. |
| **IMG-077** | Servicios | Tarjeta 4 / `servicios/page.tsx` | `menu-4.png` | `/images/menu-4.png` | Fotografía Card | 800 × 533 | 937.7 KB | 400 × 256 px | 16:10 | Both | **OPTIMIZE** | **HIGH** | `service-card-evaluacion-diagnostico.webp` | WebP | 800 × 512 (2x) | Migrar de PNG masivo (937 KB) a WebP. |
| **IMG-078** | Servicios | Tarjeta 5 / `servicios/page.tsx` | `menu-5.png` | `/images/menu-5.png` | Fotografía Card | 800 × 533 | 955.4 KB | 400 × 256 px | 16:10 | Both | **OPTIMIZE** | **HIGH** | `service-card-mecanizado-soldadura.webp` | WebP | 800 × 512 (2x) | Migrar de PNG masivo (955 KB) a WebP. |
| **IMG-079** | Detalle Servicio | Hero / `gestion-flota` | `gestion-flota.jpg` | `/images/servicios/gestion-flota.jpg` | Fotografía Hero | **ROTO** (en disco `.jpg.jpg`) | 78.8 KB | 1920 × 500 px | 21:9 | Both | **NEW / REPLACE** | **CRITICAL** | `service-hero-gestion-flota.webp` | WebP | 1920 × 800 | 404 por discrepancia de extensión. Reemplazar por fotografía de alta resolución adecuada para viewport de 1920px. |
| **IMG-080** | Detalle Servicio | Hero / `mantenimiento-preventivo` | `mantenimiento-preventivo.jpg.jpg` | `/images/servicios/mantenimiento-preventivo.jpg.jpg` | Fotografía Hero | 600 × 450 | 37.4 KB | 1920 × 500 px | 21:9 | Both | **REPLACE** | **CRITICAL** | `service-hero-mantenimiento-preventivo.webp` | WebP | 1920 × 800 | Imagen de solo 600px estirada a 1920px; extremadamente pixelada. Requiere imagen panorámica HD. |
| **IMG-081** | Detalle Servicio | Hero / `reparacion-componentes` | `reparacion-componentes.jpg.jpg` | `/images/servicios/reparacion-componentes.jpg.jpg` | Fotografía Hero | 600 × 450 | 80.1 KB | 1920 × 500 px | 21:9 | Both | **REPLACE** | **CRITICAL** | `service-hero-reparacion-componentes.webp` | WebP | 1920 × 800 | Estirada a 1920px. Reemplazar por toma panorámica de overhaul de transmisión/motor. |
| **IMG-082** | Detalle Servicio | Hero / `evaluacion-diagnostico` | `evaluacion-diagnostico.jpg.jpg` | `/images/servicios/evaluacion-diagnostico.jpg.jpg` | Fotografía Hero | 600 × 450 | 94.0 KB | 1920 × 500 px | 21:9 | Both | **REPLACE** | **CRITICAL** | `service-hero-evaluacion-diagnostico.webp` | WebP | 1920 × 800 | Estirada a 1920px. Reemplazar por toma panorámica de escáner electrónico multimarca. |
| **IMG-083** | Detalle Servicio | Hero / `mecanizado-soldadura` | `mecanizado-soldadura.jpg.jpg` | `/images/servicios/mecanizado-soldadura.jpg.jpg` | Fotografía Hero | 600 × 450 | 94.0 KB | 1920 × 500 px | 21:9 | Both | **REPLACE** | **CRITICAL** | `service-hero-mecanizado-soldadura.webp` | WebP | 1920 × 800 | Estirada a 1920px (archivo duplicado de evaluación). Reemplazar por barrenado in situ o soldadura Hardox HD. |

---

### TABLA 6: Catálogo de Repuestos (`/repuestos` y `/repuestos/[slug]`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-084** | Repuestos | Cabecera / `repuestos/page.tsx` | `hero-repuestos.jpg` | `/images/Banners Cabeceras/hero-repuestos.jpg` | Fotografía Hero | 1920 × 550 | 809.4 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **HIGH** | `banner-hero-repuestos.webp` | WebP | 1920 × 600 | Optimizar peso de 809 KB a ~95 KB en WebP. |
| **IMG-085** | Repuestos | Card & Hero / Accesorios | `accesorios.jpg.jpg` | `/images/repuestos/accesorios.jpg.jpg` | Fotografía | 600 × 450 | 94.0 KB | 600 × 288 px / 1920 × 500 px | 16:9 / 21:9 | Both | **REPLACE** | **CRITICAL** | `part-cat-accesorios.webp` | WebP | 1920 × 800 | Corregir doble extensión y reemplazar resolución insuficiente para hero banner. |
| **IMG-086** | Repuestos | Card & Hero / Componentes | `componentes.jpg.jpg` | `/images/repuestos/componentes.jpg.jpg` | Fotografía | 600 × 450 | 78.8 KB | 600 × 288 px / 1920 × 500 px | 16:9 / 21:9 | Both | **REPLACE** | **CRITICAL** | `part-cat-componentes.webp` | WebP | 1920 × 800 | Corregir doble extensión y reemplazar resolución insuficiente. |
| **IMG-087** | Repuestos | Card & Hero / Desgaste | `elementos-desgaste.jpg` | `/images/repuestos/elementos-desgaste.jpg` | Fotografía | 600 × 450 | 37.4 KB | 600 × 288 px / 1920 × 500 px | 16:9 / 21:9 | Both | **REPLACE** | **CRITICAL** | `part-cat-elementos-desgaste.webp` | WebP | 1920 × 800 | Reemplazar resolución insuficiente. |
| **IMG-088** | Repuestos | Card & Hero / Mantenimiento | `repuestos-mantenimiento.jpg` | `/images/repuestos/repuestos-mantenimiento.jpg` | Fotografía | 600 × 450 | 94.0 KB | 600 × 288 px / 1920 × 500 px | 16:9 / 21:9 | Both | **REPLACE** | **CRITICAL** | `part-cat-mantenimiento.webp` | WebP | 1920 × 800 | Reemplazar resolución insuficiente. |
| **IMG-089** | Detalle Repuestos | Accesorios: Martillos Hidráulicos | `1.jpg` | `/images/repuestos/accesorios/1.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-martillo-hidraulico.webp` | WebP | 800 × 500 (2x) | Crear imagen de martillo hidráulico para excavadora pesada. |
| **IMG-090** | Detalle Repuestos | Accesorios: Acoples Rápidos | `2.jpg` | `/images/repuestos/accesorios/2.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-acople-rapido.webp` | WebP | 800 × 500 (2x) | Crear imagen de acople rápido hidráulico industrial. |
| **IMG-091** | Detalle Repuestos | Accesorios: Garfios y Pulpos | `3.jpg` | `/images/repuestos/accesorios/3.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-garfio-industrial.webp` | WebP | 800 × 500 (2x) | Crear imagen de tenaza / garfio chatarrero o de escollera. |
| **IMG-092** | Detalle Repuestos | Accesorios: Rippers / Escarificadores | `4.jpg` | `/images/repuestos/accesorios/4.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-ripper-escarificador.webp` | WebP | 800 × 500 (2x) | Crear imagen de vástago ripper para tractor oruga D8/D9. |
| **IMG-093** | Detalle Repuestos | Componentes: Motores Diésel | `1.jpg` | `/images/repuestos/componentes/1.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-motor-diesel-industrial.webp` | WebP | 800 × 500 (2x) | Crear imagen de motor diésel CAT C15 / Cummins QSK en soporte de taller. |
| **IMG-094** | Detalle Repuestos | Componentes: Transmisiones Powershift | `2.jpg` | `/images/repuestos/componentes/2.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-transmision-powershift.webp` | WebP | 800 × 500 (2x) | Crear imagen de caja de transmisión planetaria industrial limpia. |
| **IMG-095** | Detalle Repuestos | Componentes: Sistemas Hidráulicos | `3.jpg` | `/images/repuestos/componentes/3.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-bomba-hidraulica-pistones.webp` | WebP | 800 × 500 (2x) | Crear imagen de bomba hidráulica de pistones axiales Rexroth/CAT. |
| **IMG-096** | Detalle Repuestos | Componentes: Mandos Finales | `4.jpg` | `/images/repuestos/componentes/4.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-mando-final-reductor.webp` | WebP | 800 × 500 (2x) | Crear imagen de reductor de giro o mando final planetario. |
| **IMG-097** | Detalle Repuestos | Desgaste: Cuchillas y Cantoneras | `1.jpg` | `/images/repuestos/elementos-desgaste/1.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-cuchillas-cantoneras.webp` | WebP | 800 × 500 (2x) | Crear imagen de juego de cuchillas apernables de motoniveladora/cargador. |
| **IMG-098** | Detalle Repuestos | Desgaste: Puntas y Adaptadores | `2.jpg` | `/images/repuestos/elementos-desgaste/2.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-puntas-adaptadores-get.webp` | WebP | 800 × 500 (2x) | Crear imagen de dientes de excavadora CAT Advansys / Komatsu KVX. |
| **IMG-099** | Detalle Repuestos | Desgaste: Tren de Rodaje | `3.jpg` | `/images/repuestos/elementos-desgaste/3.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-tren-rodaje-orugas.webp` | WebP | 800 × 500 (2x) | Crear imagen de eslabones de cadena, zapatas y rodillos de soporte. |
| **IMG-100** | Detalle Repuestos | Desgaste: Aceros Antidesgaste | `4.jpg` | `/images/repuestos/elementos-desgaste/4.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-planchas-hardox-antidesgaste.webp` | WebP | 800 × 500 (2x) | Crear imagen de planchas antidesgaste Hardox 500 cortadas a medida. |
| **IMG-101** | Detalle Repuestos | Mantenimiento: Sistemas Filtración | `1.jpg` | `/images/repuestos/mantenimiento/1.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-filtros-aceite-aire-combustible.webp` | WebP | 800 × 500 (2x) | Crear imagen de filtros industriales Donaldson/CAT en bodegón técnico. |
| **IMG-102** | Detalle Repuestos | Mantenimiento: Lubricantes Especiales | `2.jpg` | `/images/repuestos/mantenimiento/2.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-lubricantes-fluidos-industriales.webp` | WebP | 800 × 500 (2x) | Crear imagen de tambores de aceite sintético 15W-40 y fluidos hidráulicos. |
| **IMG-103** | Detalle Repuestos | Mantenimiento: Kits Sellos Hidráulicos | `3.jpg` | `/images/repuestos/mantenimiento/3.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-kits-sellos-hidraulicos.webp` | WebP | 800 × 500 (2x) | Crear imagen de empaquetaduras, retenes y O-rings de nitrilo/viton. |
| **IMG-104** | Detalle Repuestos | Mantenimiento: Correas y Mangueras | `4.jpg` | `/images/repuestos/mantenimiento/4.jpg` | Foto Producto | **NO EXISTE** | **404** | 300 × 192 px | 16:10 | Both | **NEW** | **CRITICAL** | `product-mangueras-correas-transmision.webp` | WebP | 800 × 500 (2x) | Crear imagen de mangueras hidráulicas de 4 mallas y correas acanaladas. |

---

### TABLA 7: Blog Técnico (`/blog` y `/blog/[slug]`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-105** | Blog | Cabecera / `blog/page.tsx` | `hero-blog.jpg` | `/images/Banners Cabeceras/hero-blog.jpg` | Fotografía Hero | 1920 × 550 | 812.3 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **HIGH** | `banner-hero-blog.webp` | WebP | 1920 × 600 | Optimizar peso de 812 KB a ~90 KB en WebP. |
| **IMG-106** | Blog | Post 1 / Análisis Aceite | `Análisis de Aceite S.O.S.jpg` | `/images/Noticias y Blog/Análisis de Aceite S.O.S.jpg` | Fotografía | 1200 × 800 | 221.3 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-analisis-aceite-sos.webp` | WebP | 1200 × 630 | Renombrar sin tildes ni espacios; convertir a WebP. |
| **IMG-107** | Blog | Post 2 / Soldadura Tolvas | `Soldadura de Cucharones y Tolvas.jpg` | `/images/Noticias y Blog/Soldadura de Cucharones y Tolvas.jpg` | Fotografía | 1200 × 800 | 586.7 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-soldadura-cucharones-tolvas.webp` | WebP | 1200 × 630 | Renombrar sin espacios; optimizar peso en WebP. |
| **IMG-108** | Blog | Post 3 / ERP Axentra | `Plataforma ERP Axentra.jpg` | `/images/Noticias y Blog/Plataforma ERP Axentra.jpg` | Fotografía | 1200 × 800 | 165.6 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-erp-axentra-gestion-taller.webp` | WebP | 1200 × 630 | Renombrar sin espacios; optimizar a WebP. |
| **IMG-109** | Blog | Post 4 / Componentes OEM | `Componentes OEM Motores.jpg` | `/images/Noticias y Blog/Componentes OEM Motores.jpg` | Fotografía | 1200 × 800 | 502.6 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-componentes-oem-motores.webp` | WebP | 1200 × 630 | Renombrar sin espacios; optimizar a WebP. |
| **IMG-110** | Blog | Post 5 / Hardox vs Creusabro | `Aceros Hardox vs Creusabro.jpg` | `/images/Noticias y Blog/Aceros Hardox vs Creusabro.jpg` | Fotografía | 1200 × 800 | 488.7 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-aceros-hardox-vs-creusabro.webp` | WebP | 1200 × 630 | Renombrar sin espacios; optimizar a WebP. |
| **IMG-111** | Blog | Post 6 / Telemetría KOMTRAX | `Komatsu KOMTRAX Telemetría.jpg` | `/images/Noticias y Blog/Komatsu KOMTRAX Telemetría.jpg` | Fotografía | 1200 × 800 | 452.2 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-komatsu-komtrax-telemetria.webp` | WebP | 1200 × 630 | Renombrar sin tildes ni espacios; optimizar a WebP. |
| **IMG-112** | Blog | Post 7 / Excavadoras Stage V | `Excavadoras Stage V.jpg` | `/images/Noticias y Blog/Excavadoras Stage V.jpg` | Fotografía | 1200 × 800 | 595.1 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-excavadoras-stage-v-emisiones.webp` | WebP | 1200 × 630 | Renombrar sin espacios; optimizar a WebP. |
| **IMG-113** | Blog | Post 8 / Reporte S.O.S. | `Guía Reporte S.O.S.jpg` | `/images/Noticias y Blog/Guía Reporte S.O.S.jpg` | Fotografía | 1200 × 800 | 251.8 KB | 800 × 400 px | 2:1 | Both | **OPTIMIZE** | **MEDIUM** | `blog-guia-reporte-sos-tribologia.webp` | WebP | 1200 × 630 | Renombrar sin tildes ni espacios; optimizar a WebP. |
| **IMG-114** | Blog | Post 9 / 5 Señales Overhaul | `10.jpg` | `/images/blog/10.jpg` | Fotografía | 1200 × 800 | 176.9 KB | 800 × 400 px | 2:1 | Both | **REPLACE** | **MEDIUM** | `blog-senales-overhaul-transmision.webp` | WebP | 1200 × 630 | Reemplazar nombre genérico `10.jpg` por imagen específica de transmisión powershift desarmada. |
| **IMG-115** | Blog | Post 10 / Normas HSEQ | `11.jpg` | `/images/blog/11.jpg` | Fotografía | **NO EXISTE** | **404** | 800 × 400 px | 2:1 | Both | **NEW** | **HIGH** | `blog-normas-hseq-seguridad-minera.webp` | WebP | 1200 × 630 | Crear imagen de supervisor de seguridad y técnico con EPP en mina peruana. |
| **IMG-116** | Blog | Post 11 / Volvo Eléctrico L25 | `12.jpg` | `/images/blog/12.jpg` | Fotografía | **NO EXISTE** | **404** | 800 × 400 px | 2:1 | Both | **NEW** | **HIGH** | `blog-volvo-l25-cargador-electrico.webp` | WebP | 1200 × 630 | Crear imagen de cargador frontal compacto eléctrico en operación silenciosa. |
| **IMG-117** | Blog | Post 12 / Horómetro CAT 320 | `16.jpg` | `/images/blog/16.jpg` | Fotografía | **NO EXISTE** | **404** | 800 × 400 px | 2:1 | Both | **NEW** | **HIGH** | `blog-intervalos-mantenimiento-cat-320.webp` | WebP | 1200 × 630 | Crear imagen de excavadora CAT 320 recibiendo inspección de 1000 horas. |

---

### TABLA 8: Páginas Secundarias y Legales

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-118** | Contacto | Cabecera / `contacto/page.tsx` | `hero-contactanos.jpg` | `/images/Banners Cabeceras/hero-contactanos.jpg` | Fotografía Hero | 1920 × 550 | 890.6 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **HIGH** | `banner-hero-contacto.webp` | WebP | 1920 × 600 | Optimizar peso de 890 KB a ~90 KB en WebP. |
| **IMG-119** | Bolsa Trabajo | Cabecera / `bolsa-trabajo/page.tsx` | `hero-bolsa-trabajo.jpg` | `/images/fondos/hero-bolsa-trabajo.jpg` | Fotografía Hero | **NO EXISTE** | **404** | 1920 × 380 px | 21:9 | Both | **NEW** | **CRITICAL** | `banner-hero-bolsa-trabajo.webp` | WebP | 1920 × 600 | Crear banner con equipo humano de técnicos e ingenieros en taller. |
| **IMG-120** | Reclamaciones | Cabecera / `libro-reclamaciones/page.tsx` | `hero-contacto.jpg` | `/images/fondos/hero-contacto.jpg` | Fotografía Hero | 1920 × 550 | 263.5 KB | 1920 × 380 px | 21:9 | Both | **OPTIMIZE** | **MEDIUM** | `banner-hero-libro-reclamaciones.webp` | WebP | 1920 × 600 | Crear banner institucional sobrio y optimizar a WebP. |
| **IMG-121** | Comprobantes | Cabecera / `comprobantes/page.tsx` | `hero-comprobantes.jpg` | `/images/fondos/hero-comprobantes.jpg` | Fotografía Hero | **NO EXISTE** | **404** | 1920 × 380 px | 21:9 | Both | **NEW** | **CRITICAL** | `banner-hero-comprobantes.webp` | WebP | 1920 × 600 | Crear banner con temática administrativa / facturación electrónica SUNAT. |
| **IMG-122** | Buscar | Cabecera / `buscar/page.tsx` | `hero-buscar.jpg` | `/images/fondos/hero-buscar.jpg` | Fotografía Hero | **NO EXISTE** | **404** | 1920 × 380 px | 21:9 | Both | **NEW** | **CRITICAL** | `banner-hero-buscar.webp` | WebP | 1920 × 600 | Crear banner con vista técnica de catálogo o almacén de maquinaria. |
| **IMG-123** | Políticas | Cabecera / `politicas/page.tsx` | `hero-politicas.jpg` | `/images/fondos/hero-politicas.jpg` | Fotografía Hero | **NO EXISTE** | **404** | 1920 × 380 px | 21:9 | Both | **NEW** | **CRITICAL** | `banner-hero-politicas.webp` | WebP | 1920 × 600 | Crear banner institucional sobrio sobre seguridad de datos y compliance. |
| **IMG-124** | 404 Not Found | Fondo / `not-found.tsx` | `hero-404.jpg` | `/images/fondos/hero-404.jpg` | Fotografía Hero | **NO EXISTE** | **404** | 1920 × 600 px | 21:9 | Both | **NEW** | **HIGH** | `banner-hero-404.webp` | WebP | 1920 × 800 | Crear fondo dramático de maquinaria pesada en contraluz para error 404. |

---

### TABLA 9: Módulo de Testimonios y Proyectos (`HomeTestimonials.tsx` y `AntesDespues.tsx`)

| ID | Página / Uso | Sección / Componente | Archivo Actual | URL / Ruta Actual | Tipo | Dimensiones Originales | Tamaño | Renderizado Aprox. | Aspect Ratio | Disp. | Estado | Prioridad | Nuevo Nombre Recomendado | Formato Rec. | Res. Rec. | Acción Recomendada |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **IMG-125** | Home (`/`) | Testimonio 1 / `HomeTestimonials.tsx` | `1.jpg` | `/images/testimonio/1.jpg` | Fotografía Retrato | 600 × 450 (Motor) | 94.0 KB | 480 × 480 px | 1:1 | Both | **REPLACE** | **HIGH** | `testimonial-rachel-bell.webp` | WebP | 800 × 800 (2x) | Reemplazar foto técnica errónea de motor por retrato profesional de fotógrafa industrial con EPP. |
| **IMG-126** | Home (`/`) | Testimonio 2 / `HomeTestimonials.tsx` | `2.jpg` | `/images/testimonio/2.jpg` | Fotografía Retrato | 600 × 450 (Motor) | 78.8 KB | 480 × 480 px | 1:1 | Both | **REPLACE** | **HIGH** | `testimonial-carlos-mendoza.webp` | WebP | 800 × 800 (2x) | Reemplazar por retrato de Superintendente de Mina con casco blanco y chaleco en mina peruana. |
| **IMG-127** | Home (`/`) | Testimonio 3 / `HomeTestimonials.tsx` | `3.jpg` | `/images/testimonio/3.jpg` | Fotografía Retrato | 600 × 450 (Motor) | 37.4 KB | 480 × 480 px | 1:1 | Both | **REPLACE** | **HIGH** | `testimonial-elena-rojas.webp` | WebP | 800 × 800 (2x) | Reemplazar por retrato de Supervisora HSE con equipo de protección y planos de obra. |
| **IMG-128** | Home (`/`) | Testimonio 4 / `HomeTestimonials.tsx` | `4.jpg` | `/images/testimonio/4.jpg` | Fotografía Retrato | 600 × 450 (Motor) | 94.0 KB | 480 × 480 px | 1:1 | Both | **REPLACE** | **HIGH** | `testimonial-mateo-silva.webp` | WebP | 800 × 800 (2x) | Reemplazar por retrato de Jefe de Mantenimiento con tablet de diagnóstico. |
| **IMG-129** | Servicios | Comparador / `AntesDespues.tsx` | N/A | `/images/servicios/antes-overhaul.jpg` | Fotografía Técnica | N/A | N/A | 600 × 450 px | 4:3 | Both | **NEW** | **MEDIUM** | `comparison-motor-desgaste-antes.webp` | WebP | 1200 × 900 | Motor con desgaste severo, carbonilla y fuga de aceite antes de reparación. |
| **IMG-130** | Servicios | Comparador / `AntesDespues.tsx` | N/A | `/images/servicios/despues-overhaul.jpg` | Fotografía Técnica | N/A | N/A | 600 × 450 px | 4:3 | Both | **NEW** | **MEDIUM** | `comparison-motor-overhaul-despues.webp` | WebP | 1200 × 900 | Mismo motor totalmente reacondicionado, pintado con pintura horneada OEM amarilla. |

---

### TABLA 10: Activos de Plantillas de Correo Transaccional (`emailLayout.ts`)
*Nota crítica: Estos archivos están vinculados a correos HTML enviados a clientes mediante Resend. Deben mantenerse en sus rutas públicas para garantizar que los correos históricos o en tránsito continúen cargando sus imágenes correctamente.*

| ID | Uso en Email | Archivo Actual | URL Pública | Tipo | Tamaño | Acción Recomendada |
|---|---|---|---|---|---|---|
| **IMG-131** | Cabecera Email | `email-brochure-banner.jpg` | `https://www.servimafed.com/images/email-brochure-banner.jpg` | JPG | 61.7 KB | **KEEP** (Mantener ruta pública compatible). |
| **IMG-132** | Cabecera Brochure | `email-hero-banner-brochure.jpg` | `https://www.servimafed.com/images/email-hero-banner-brochure.jpg` | JPG | 165.4 KB | **KEEP** (Mantener ruta pública compatible). |
| **IMG-133** | Cabecera Contacto | `email-hero-banner-contact.jpg` | `https://www.servimafed.com/images/email-hero-banner-contact.jpg` | JPG | 380.3 KB | **KEEP** (Mantener ruta pública compatible). |
| **IMG-134** | Cabecera Trabajos | `email-hero-banner-jobs.png` | `https://www.servimafed.com/images/email-hero-banner-jobs.png` | PNG | 1,026.8 KB | **OPTIMIZE** (Optimizar compresión sin cambiar extensión/ruta para no saturar bandeja de entrada). |
| **IMG-135** | Icono Soporte | `headset-contact.png` | `https://www.servimafed.com/images/headset-contact.png` | PNG | 1.4 KB | **KEEP**. |
| **IMG-136** | Icono Trabajador | `icon-trabajador.png` | `https://www.servimafed.com/images/icon-trabajador.png` | PNG | 13.9 KB | **KEEP**. |
| **IMG-137** | Icono Descarga | `icon-brochure-download.png` | `https://www.servimafed.com/images/icon-brochure-download.png` | PNG | 4.8 KB | **KEEP**. |
| **IMG-138** | Icono Adjunto | `icon-clip-adjunto.png` | `https://www.servimafed.com/images/icon-clip-adjunto.png` | PNG | 2.7 KB | **KEEP**. |
| **IMG-139** | Icono Urgencia | `icon-lightning-pill.png` | `https://www.servimafed.com/images/icon-lightning-pill.png` | PNG | 5.0 KB | **KEEP**. |
| **IMG-140** | Icono Visita | `icon-technical-visit.png` | `https://www.servimafed.com/images/icon-technical-visit.png` | PNG | 9.8 KB | **KEEP**. |
| **IMG-141** | Icono Cliente | `icon-email-client.png` | `https://www.servimafed.com/images/icon-email-client.png` | PNG | 10.5 KB | **KEEP**. |
| **IMG-142** | Icono Empleo | `icon-email-job.png` | `https://www.servimafed.com/images/icon-email-job.png` | PNG | 11.4 KB | **KEEP**. |
| **IMG-143** | Icono Reclamos | `icon-email-claims.png` | `https://www.servimafed.com/images/icon-email-claims.png` | PNG | 5.2 KB | **KEEP**. |
| **IMG-144** | Icono Teléfono | `icon-phone-gold.png` | `https://www.servimafed.com/images/icon-phone-gold.png` | PNG | 6.6 KB | **KEEP**. |
| **IMG-145** | Icono WhatsApp | `icon-whatsapp-green.png` | `https://www.servimafed.com/images/icon-whatsapp-green.png` | PNG | 7.9 KB | **KEEP**. |
| **IMG-146** | Métrica Soporte | `metric-soporte.png` | `https://www.servimafed.com/images/metric-soporte.png` | PNG | 16.0 KB | **KEEP**. |
| **IMG-147** | Métrica Equipos | `metric-equipos.png` | `https://www.servimafed.com/images/metric-equipos.png` | PNG | 14.9 KB | **KEEP**. |
| **IMG-148** | Métrica ISO | `metric-iso.png` | `https://www.servimafed.com/images/metric-iso.png` | PNG | 12.8 KB | **KEEP**. |

---

## 4. Required Images (Imágenes que Realmente Necesita el Sitio)

Esta sección consolida todas las imágenes indispensables que deben generarse, adquirirse o producirse para completar el sitio web sin vacíos ni imágenes rotas:

| ID | Página | Sección | Propósito | Qué debe mostrar | Tipo | Orientación | Aspect Ratio | Resolución Recomendada | Disp. | Prioridad | Método Recomendado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **REQ-001** | `/bolsa-trabajo` | Hero Header | Banner de cabecera institucional para captación de talento | Equipo técnico e ingenieros de maquinaria pesada con cascos, EPP y planos en taller moderno | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-002** | `/comprobantes` | Hero Header | Banner de cabecera para portal de comprobantes y facturación electrónica | Entorno corporativo de control logístico y digital de minería con tablets y pantallas de datos | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-003** | `/buscar` | Hero Header | Banner de cabecera para buscador interno de repuestos y servicios | Vista en perspectiva de estanterías industriales con repuestos mecánicos etiquetados | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-004** | `/politicas` | Hero Header | Banner de cabecera para políticas de privacidad y legal | Instalaciones industriales y oficinas de ingeniería técnica con iluminación limpia | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-005** | `/not-found` | Hero Error 404 | Fondo atmosférico para página de error 404 | Silueta de excavadora minera gigante al atardecer en los Andes peruanos con neblina | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **HIGH** | AI_GENERATED / STOCK |
| **REQ-006** | `/servicios` | Card 2 | Tarjeta de servicio de mantenimiento preventivo (soluciona ruta rota `menu-2.png`) | Técnico realizando cambio de filtros y muestreo de fluidos en excavadora Caterpillar | Foto | Horizontal | 16:10 | 1200 × 750 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-007** | `/servicios/gestion-flota` | Hero Header | Banner de servicio de gestión y mantenimiento de flota bajo contrato | Tren de maquinaria pesada (volquetes, cargadores y excavadoras) operando en proyecto vial | Foto | Horizontal | 21:9 | 2880 × 1234 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-008** | `/repuestos/accesorios` | Producto 1 | Catálogo: Martillo Hidráulico de impacto | Martillo hidráulico pesado montado en brazo de excavadora para demolición de roca | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-009** | `/repuestos/accesorios` | Producto 2 | Catálogo: Acoples Rápidos | Acople rápido hidráulico de acero forjado con seguros mecánicos | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-010** | `/repuestos/accesorios` | Producto 3 | Catálogo: Garfios y Pulpos Industriales | Tenaza / garfio industrial para manipulación de rocas masivas y chatarra | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-011** | `/repuestos/accesorios` | Producto 4 | Catálogo: Rippers y Escarificadores | Diente ripper monorripper pesado para tractor topador CAT D9T | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-012** | `/repuestos/componentes` | Producto 1 | Catálogo: Motores Diésel Industriales | Motor diésel de alta cilindrada CAT C15 / Cummins QSK19 en soporte técnico | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-013** | `/repuestos/componentes` | Producto 2 | Catálogo: Transmisiones Powershift | Conjunto de transmisión powershift planetaria con convertidor de par | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-014** | `/repuestos/componentes` | Producto 3 | Catálogo: Sistemas Hidráulicos | Bomba hidráulica tándem de pistones de caudal variable Rexroth/CAT | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-015** | `/repuestos/componentes` | Producto 4 | Catálogo: Mandos Finales | Mando final reductor planetario con corona dentada para oruga | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-016** | `/repuestos/elementos-desgaste` | Producto 1 | Catálogo: Cuchillas y Cantoneras | Cuchillas de corte tratadas térmicamente para pala cargadora y motoniveladora | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-017** | `/repuestos/elementos-desgaste` | Producto 2 | Catálogo: Puntas y Adaptadores GET | Dientes de balde de penetración pesada con seguros de retención | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-018** | `/repuestos/elementos-desgaste` | Producto 3 | Catálogo: Tren de Rodaje | Eslabones de oruga sellada y lubricada, rodillos y rueda guía | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-019** | `/repuestos/elementos-desgaste` | Producto 4 | Catálogo: Aceros Antidesgaste | Planchas de acero bimetálico Hardox 500 para blindaje de tolva | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-020** | `/repuestos/mantenimiento` | Producto 1 | Catálogo: Sistemas de Filtración | Filtros de combustible, aceite, aire primario/secundario e hidráulicos Donaldson | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-021** | `/repuestos/mantenimiento` | Producto 2 | Catálogo: Lubricantes Especializados | Tambores y baldes de aceite sintético 15W-40, fluidos TO-4 y grasas EP | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-022** | `/repuestos/mantenimiento` | Producto 3 | Catálogo: Kits de Sellado | Kits de sellos y retenes para cilindro hidráulico de levante y volteo | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-023** | `/repuestos/mantenimiento` | Producto 4 | Catálogo: Correas y Mangueras | Mangueras de alta presión XT-3 / XT-5 con acoples prensados y correas en V | Foto Producto | Horizontal | 16:10 | 1000 × 625 px | Both | **CRITICAL** | AI_GENERATED / STOCK |
| **REQ-024** | `/blog` | Post 10: HSEQ Minero | Ilustración para artículo de normativas HSEQ | Charla de seguridad de 5 minutos entre técnicos con EPP en mina peruana | Foto | Horizontal | 16:9 | 1600 × 900 px | Both | **HIGH** | AI_GENERATED / STOCK |
| **REQ-025** | `/blog` | Post 11: Volvo Eléctrico | Ilustración para artículo sobre maquinaria eléctrica | Cargador frontal compacto Volvo L25 Electric en estación de carga limpia | Foto | Horizontal | 16:9 | 1600 × 900 px | Both | **HIGH** | AI_GENERATED / STOCK |
| **REQ-026** | `/blog` | Post 12: Horómetro CAT 320 | Ilustración para guía de mantenimiento preventivo | Excavadora CAT 320 con compartimento de motor abierto recibiendo servicio | Foto | Horizontal | 16:9 | 1600 × 900 px | Both | **HIGH** | AI_GENERATED / STOCK |

---

## 5. Nueva Estructura de Directorios Propuesta

Actualmente, `/public/images/` sufre de carpetas con espacios (`Banners Cabeceras`, `Noticias y Blog`, `Web - Marcas`), archivos sin categorizar en la raíz (`1.jpg` al `59.jpg`, `mantenimiento-motor-600x450000000.jpg`), y carpetas huérfanas de plantillas antiguas (`admin/`).

Se propone la siguiente estructura limpia, intuitiva y modular adaptada estrictamente a la realidad corporativa de SERVIMAFED SAC:

```
public/
└── images/
    ├── brand/                    # Logotipos oficiales e isotipos vectoriales
    │   ├── logo-horizontal.webp
    │   ├── logo-horizontal-white.webp
    │   ├── logo-vertical-white.png
    │   └── isotipo.svg
    │
    ├── banners/                  # Cabeceras principales de cada página (1920x600)
    │   ├── hero-home-kits.webp
    │   ├── hero-home-repuestos.webp
    │   ├── hero-home-flota.webp
    │   ├── hero-home-overhaul.webp
    │   ├── hero-nosotros.webp
    │   ├── hero-servicios.webp
    │   ├── hero-repuestos.webp
    │   ├── hero-blog.webp
    │   ├── hero-contacto.webp
    │   ├── hero-bolsa-trabajo.webp
    │   ├── hero-comprobantes.webp
    │   ├── hero-buscar.webp
    │   ├── hero-politicas.webp
    │   └── hero-404.webp
    │
    ├── services/                 # Servicios técnicos de ingeniería
    │   ├── cards/                # Miniaturas para la página general /servicios
    │   │   ├── gestion-flota.webp
    │   │   ├── mantenimiento-preventivo.webp
    │   │   ├── reparacion-componentes.webp
    │   │   ├── evaluacion-diagnostico.webp
    │   │   └── mecanizado-soldadura.webp
    │   └── heroes/               # Banners panorámicos para /servicios/[slug]
    │       ├── gestion-flota-hero.webp
    │       ├── mantenimiento-preventivo-hero.webp
    │       ├── reparacion-componentes-hero.webp
    │       ├── evaluacion-diagnostico-hero.webp
    │       └── mecanizado-soldadura-hero.webp
    │
    ├── products/                 # Catálogo de repuestos (/repuestos/[slug])
    │   ├── categories/           # Banners y cards por categoría
    │   │   ├── accesorios.webp
    │   │   ├── componentes-mayores.webp
    │   │   ├── elementos-desgaste.webp
    │   │   └── repuestos-mantenimiento.webp
    │   └── items/                # Productos individuales del catálogo
    │       ├── martillo-hidraulico.webp
    │       ├── acople-rapido.webp
    │       ├── garfio-industrial.webp
    │       ├── ripper-escarificador.webp
    │       ├── motor-diesel.webp
    │       ├── transmision-powershift.webp
    │       ├── bomba-hidraulica.webp
    │       ├── mando-final.webp
    │       ├── cuchillas-cantoneras.webp
    │       ├── puntas-adaptadores.webp
    │       ├── tren-rodaje.webp
    │       ├── planchas-hardox.webp
    │       ├── sistemas-filtracion.webp
    │       ├── lubricantes-industriales.webp
    │       ├── kits-sellos.webp
    │       └── correas-mangueras.webp
    │
    ├── bento/                    # Bento Grid de la página de Inicio (1280x720)
    │   ├── gestion-flota.webp
    │   ├── mantenimiento-preventivo.webp
    │   ├── repuestos.webp
    │   ├── evaluacion-diagnostico.webp
    │   ├── mecanizado-soldadura.webp
    │   └── reparacion-componentes.webp
    │
    ├── blog/                     # Artículos técnicos y novedades (1200x630)
    │   ├── analisis-aceite-sos.webp
    │   ├── soldadura-cucharones-tolvas.webp
    │   ├── erp-axentra-gestion.webp
    │   ├── componentes-oem-motores.webp
    │   ├── aceros-hardox-vs-creusabro.webp
    │   ├── telemetria-komatsu-komtrax.webp
    │   ├── excavadoras-stage-v.webp
    │   ├── guia-reporte-sos.webp
    │   ├── overhaul-transmisiones.webp
    │   ├── normas-hseq-mineria.webp
    │   ├── volvo-l25-electrico.webp
    │   └── intervalos-cat-320.webp
    │
    ├── testimonials/             # Retratos de clientes/superintendentes (800x800)
    │   ├── cliente-rachel-bell.webp
    │   ├── cliente-carlos-mendoza.webp
    │   ├── cliente-elena-rojas.webp
    │   └── cliente-mateo-silva.webp
    │
    ├── brands/                   # Logotipos vectoriales de fabricantes atendidos
    │   ├── cat.svg
    │   ├── komatsu.svg
    │   ├── volvo.svg
    │   ├── cummins.svg
    │   ├── john-deere.svg
    │   └── [19 marcas adicionales].svg
    │
    ├── icons/                    # Iconografía vectorial de interfaz y métricas
    │   ├── ui-preloader.svg
    │   ├── value-calidad.svg
    │   ├── value-confiabilidad.svg
    │   ├── value-puntualidad.svg
    │   ├── metric-tecnicos.svg
    │   ├── metric-soporte.svg
    │   ├── metric-equipos.svg
    │   ├── metric-iso.svg
    │   └── [iconos footer].svg
    │
    └── email/                    # Activos fijos para plantillas de correo Resend
        ├── email-brochure-banner.jpg
        ├── email-hero-banner-brochure.jpg
        ├── email-hero-banner-contact.jpg
        ├── email-hero-banner-jobs.png
        └── [iconos email].png
```

### Archivos Afectados al Implementar Esta Estructura (Previo a Cualquier Movimiento):
Antes de mover o renombrar archivos, se deberá actualizar la ruta en los siguientes 12 archivos de código:
1. `src/core/ui/layout/NavBar.tsx` (Logo principal y enlaces de mega menús).
2. `src/core/ui/layout/Footer.tsx` (Logo secundario e iconos de barra inferior).
3. `src/core/ui/Preloader.tsx` (Reemplazo del GIF por SVG).
4. `src/core/ui/BrandSlider.tsx` (Mapeo de SVG de marcas).
5. `src/modules/Home/components/HeroSlider.tsx` (Rutas de los 4 slides).
6. `src/app/page.tsx` (Rutas de las 6 tarjetas Bento e iconos de métricas).
7. `src/app/nosotros/page.tsx` (Hero banner y foto histórica).
8. `src/app/servicios/page.tsx` y `src/data/serviciosData.ts` (Cards y 5 heroes de detalle).
9. `src/app/repuestos/page.tsx` y `src/data/repuestosData.ts` (Cards, heroes y 16 productos).
10. `src/data/blogData.ts` (12 imágenes de portada de artículos).
11. `src/data/navigationData.ts` (9 imágenes de mega menús).
12. `src/app/[slug]/page.tsx` (`contacto`, `bolsa-trabajo`, `comprobantes`, `buscar`, `politicas`, `not-found`).

---

## 6. Convención de Nomenclatura SEO-Friendly

Se establece el siguiente estándar para todos los activos de imagen del proyecto:
1. **Formato**: `kebab-case` en minúsculas, sin espacios, sin tildes ni caracteres especiales (`ñ`, paréntesis, etc.).
2. **Estructura semántica**: `[categoría]-[entidad]-[descripción-clave].[ext]`
   - Ejemplos correctos:
     - `banner-hero-bolsa-trabajo.webp`
     - `service-card-mecanizado-soldadura.webp`
     - `product-martillo-hidraulico-pesado.webp`
     - `blog-analisis-aceite-sos-motores.webp`
     - `brand-caterpillar.svg`
3. **Versiones Mobile (si difieren en crop)**: `[nombre]-mobile.webp`
4. **Prohibición de nombres genéricos**: Quedan terminantemente prohibidos nombres como `1.jpg`, `55.jpg`, `menu-22.png`, `bento-gestion-flota.jpg.jpg` o `image-final.jpg`.

---

## 7. Estrategia de Resoluciones, Formatos y Responsive

### 7.1 Formatos Recomendados por Tipo de Activo
- **WebP (Calidad 85%)**: Para todas las fotografías y composiciones realistas (Banners, Bentos, Productos, Blog). Proporciona un ahorro de peso del 40-70% frente a JPEG con idéntica calidad visual.
- **AVIF (Opcional en builds)**: Soportado nativamente por Next.js `<Image>` mediante conversión automática en servidor si se habilita en `next.config.ts`.
- **SVG**: Exclusivo para logotipos, iconos de métricas, marcas de fabricantes e ilustraciones vectoriales. Garantiza nitidez perfecta en cualquier escala con peso inferior a 15 KB.
- **PNG**: Restringido únicamente a activos de correo HTML transaccional (`emailLayout.ts`) debido a que clientes de correo tradicionales (Outlook de escritorio) no renderizan WebP/AVIF.

### 7.2 Densidad de Pixeles y Retina 2x
Para evitar pixelación en pantallas de alta resolución (smartphones modernos, iPads, laptops Retina, monitores 4K):
- **Hero Banners (Fullwidth)**: Renderizado en pantalla de 1920 × 600 px → Archivo nativo a **2560 × 1440 px** o **2880 × 1234 px** (WebP optimizado ~110 KB).
- **Tarjetas Bento Grid**: Renderizado en pantalla hasta 640 × 315 px → Archivo nativo a **1280 × 720 px** (WebP optimizado ~65 KB).
- **Cards de Catálogo / Productos**: Renderizado a 380 × 240 px → Archivo nativo a **800 × 500 px** (WebP optimizado ~38 KB).
- **Featured Image de Blog**: Renderizado a 800 × 400 px → Archivo nativo a **1200 × 630 px** (WebP optimizado ~75 KB, además compatible con proporción estándar 1.91:1 para OpenGraph de LinkedIn y Facebook).

---

## 8. Auditoría de Performance y Buenas Prácticas Next.js

1. **Eliminar banderas `unoptimized={true}`**:
   - Actualmente `HeroSlider.tsx` tiene configurado `unoptimized={true}` en las imágenes de cabecera. Esto desactiva el optimizador de Next.js y fuerza al cliente a descargar imágenes pesadas originales. Al reemplazar las imágenes con WebP nativo optimizado, debe removerse esta bandera.
2. **Configuración de `priority` en Above-the-Fold**:
   - Solo el primer slide activo del Hero Slider y el banner de cabecera de cada página deben tener la propiedad `priority`. Las demás imágenes del slider y los módulos inferiores deben mantener `loading="lazy"` para garantizar un **LCP (Largest Contentful Paint) menor a 1.2 segundos**.
3. **Atributo `sizes` preciso para evitar descargas sobredimensionadas**:
   - Para las tarjetas Bento: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`.
   - Para las cards de productos: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"`.
4. **Prevención de CLS (Cumulative Layout Shift)**:
   - Toda etiqueta `<Image>` debe declarar `fill` con contenedor con relación de aspecto fija (`aspect-[16/9]`, `aspect-[4/3]`) o bien atributos explícitos `width` y `height`.
5. **Sanitización de `alt` para Accesibilidad y SEO**:
   - Reemplazar textos genéricos como `alt="Marca Especializada 1"` por el nombre oficial de la marca: `alt="Repuestos y servicio especializado para maquinaria Caterpillar"`.

---
*Fin del documento de inventario y auditoría técnica.*
