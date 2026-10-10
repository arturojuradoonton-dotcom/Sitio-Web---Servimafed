# Revisión y Auditoría de Imágenes No Referenciadas — ORPHAN_IMAGE_REVIEW.md
**Proyecto**: SERVIMAFED S.A.C.  
**Estado**: DOCUMENTO DE EVALUACIÓN PREVIO A LIMPIEZA — NINGÚN ARCHIVO HA SIDO ELIMINADO  
**Total de Imágenes Analizadas sin referencia directa**: 202 archivos  

---

## 1. Criterios de Clasificación

Para garantizar la integridad operativa del sitio y no romper ningún enlace externo o dinámico, las imágenes sin referencia explícita en código han sido clasificadas en 6 categorías:

1. **CONFIRMED_ORPHAN (Confirmado Huérfano)**: Archivos sin referencias directas ni dinámicas en el código fuente, componentes o estilos (por ejemplo, imágenes numeradas del 1 al 59 que quedaron de maquetaciones previas). Candidatas seguras para eliminación en la Fase 2.
2. **POSSIBLE_DYNAMIC_OR_CSS (Posible Uso Dinámico o CSS)**: Archivos de fuentes tipográficas, iconos o mapas de bits que podrían ser cargados dinámicamente mediante hojas de estilo CSS o scripts en runtime.
3. **POSSIBLE_EXTERNAL_PWA (Posible Uso Externo o PWA)**: Favicons, iconos de aplicación web progresiva y accesos directos estándar requeridos por navegadores o dispositivos móviles.
4. **DUPLICATE_LEGACY (Duplicado o Copia Redundante)**: Archivos con nombres duplicados por descargas de explorador (ej. sufijos `(1)`), variantes automáticas de WordPress (ej. sufijos `600x450000000.jpg`), o formatos duplicados (PNGs de marcas cuando ya se usan los SVGs oficiales).
5. **LEGACY_THEME (Archivo Legacy de Plantilla Anterior)**: Elementos de interfaz residuales provenientes de temas de WordPress o CMS anteriores (botones, bordes, cajas de descuento, fondos grises de prueba).
6. **MANUAL_REVIEW (Requiere Revisión Manual)**: Activos técnicos o editoriales que contienen información valiosa de la empresa (diagramas, análisis SOS, material de prensa) que no deben borrarse sin consultar al equipo.

---

## 2. Resumen Cuantitativo por Categoría

| Categoría de Clasificación | Cantidad de Archivos | Acción Recomendada en Fase 2 |
|---|---|---|
| **CONFIRMED_ORPHAN** | 180 | Eliminar tras aprobación definitiva |
| **DUPLICATE_LEGACY** | 12 | Eliminar (archivos duplicados o redundantes) |
| **LEGACY_THEME** | 7 | Eliminar (residuos de CMS anterior) |
| **POSSIBLE_DYNAMIC_OR_CSS** | 1 | MANTENER (reserva técnica) |
| **POSSIBLE_EXTERNAL_PWA** | 2 | MANTENER (requerido por PWA/Browsers) |
| **MANUAL_REVIEW** | 0 | MANTENER hasta confirmación manual |

---

## 3. Catálogo Detallado de Archivos Auditados

| Ruta Relativa en `/public` | Nombre de Archivo | Tamaño | Categoría Asignada | Justificación Técnica |
|---|---|---|---|---|
| `file.svg` | `file.svg` | 0.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `globe.svg` | `globe.svg` | 1.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `iconfont/fonts/auto.svg` | `auto.svg` | 119.7 KB | **POSSIBLE_DYNAMIC_OR_CSS** | Archivos de fuentes/iconos que podrían invocarse mediante CSS de iconfont. |
| `images/-header-photo-bg.jpg` | `-header-photo-bg.jpg` | 102.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/001-calidad.png` | `001-calidad.png` | 10.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/002-puntualidad.png` | `002-puntualidad.png` | 11.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/003-cooperar.png` | `003-cooperar.png` | 7.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/14.jpg` | `14.jpg` | 127.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/15.jpg` | `15.jpg` | 121.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/17.jpg` | `17.jpg` | 128.0 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/18.jpg` | `18.jpg` | 123.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/19.jpg` | `19.jpg` | 167.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/20.jpg` | `20.jpg` | 98.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/21.jpg` | `21.jpg` | 103.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/22.jpg` | `22.jpg` | 77.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/23.jpg` | `23.jpg` | 104.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/24.jpg` | `24.jpg` | 104.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/25.jpg` | `25.jpg` | 104.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/26.jpg` | `26.jpg` | 107.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/27.jpg` | `27.jpg` | 101.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/28.jpg` | `28.jpg` | 239.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/29.jpg` | `29.jpg` | 187.9 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/30.jpg` | `30.jpg` | 337.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/31.jpg` | `31.jpg` | 195.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/32.jpg` | `32.jpg` | 131.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/33.jpg` | `33.jpg` | 154.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/34.jpg` | `34.jpg` | 138.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/35.jpg` | `35.jpg` | 156.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/36.jpg` | `36.jpg` | 220.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/37.jpg` | `37.jpg` | 341.9 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/38.jpg` | `38.jpg` | 257.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/39.jpg` | `39.jpg` | 182.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/41.jpg` | `41.jpg` | 244.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/42.jpg` | `42.jpg` | 170.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/43.jpg` | `43.jpg` | 219.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/44.jpg` | `44.jpg` | 142.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/45.jpg` | `45.jpg` | 375.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/46.jpg` | `46.jpg` | 163.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/47.jpg` | `47.jpg` | 158.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/48.jpg` | `48.jpg` | 293.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/49.jpg` | `49.jpg` | 122.0 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/50.jpg` | `50.jpg` | 189.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/51.jpg` | `51.jpg` | 87.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/52.jpg` | `52.jpg` | 202.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/53.jpg` | `53.jpg` | 174.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/54.jpg` | `54.jpg` | 186.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/56.jpg` | `56.jpg` | 198.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/57.jpg` | `57.jpg` | 193.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/58.jpg` | `58.jpg` | 270.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/59.jpg` | `59.jpg` | 238.9 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/7.jpg` | `7.jpg` | 201.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/8.jpg` | `8.jpg` | 255.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/admin/customizer/footer/footer-style-1.png` | `footer-style-1.png` | 2.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/admin/customizer/footer/footer-style-2.png` | `footer-style-2.png` | 16.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/admin/customizer/footer/footer-style-3.png` | `footer-style-3.png` | 1.9 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/admin/customizer/footer/footer-style-4.png` | `footer-style-4.png` | 2.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/admin/dark.png` | `dark.png` | 30.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/admin/light.png` | `light.png` | 3.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/ajax-loader.gif` | `ajax-loader.gif` | 4.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/banner-bg.png` | `banner-bg.png` | 4.7 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Banners Cabeceras/8.jpg` | `8.jpg` | 725.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/block-bg-1.jpg` | `block-bg-1.jpg` | 102.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/block-bg-2.jpg` | `block-bg-2.jpg` | 44.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/block-bg-3.jpg` | `block-bg-3.jpg` | 44.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/blog/7.jpg` | `7.jpg` | 201.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/blog/8.jpg` | `8.jpg` | 255.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/blog/Komatsu KOMTRAX Telemetría 1.jpg` | `Komatsu KOMTRAX Telemetría 1.jpg` | 441.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/border-hor.png` | `border-hor.png` | 43.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/border-vert.png` | `border-vert.png` | 43.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/car-repair-services-icon.png` | `car-repair-services-icon.png` | 0.9 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/color-icon.png` | `color-icon.png` | 4.2 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/coupon-bg-rtl.jpg` | `coupon-bg-rtl.jpg` | 17.2 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/coupon-bg.jpg` | `coupon-bg.jpg` | 9.7 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/coupon-bg.png` | `coupon-bg.png` | 3.3 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/dashed-line.png` | `dashed-line.png` | 0.1 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/email-brochure-banner-v2.jpg` | `email-brochure-banner-v2.jpg` | 64.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/favicon.png` | `favicon.png` | 1.3 KB | **POSSIBLE_EXTERNAL_PWA** | Iconos de manifest PWA o favicons estándar del navegador. |
| `images/gall-icon01.png` | `gall-icon01.png` | 0.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/gestion-de-flota-600x450.jpg` | `gestion-de-flota-600x450.jpg` | 22.5 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/gestion-de-flota-600x4500.jpg` | `gestion-de-flota-600x4500.jpg` | 37.4 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/gestion-de-flota-600x45000.jpg` | `gestion-de-flota-600x45000.jpg` | 118.7 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/grey-bg-1.png` | `grey-bg-1.png` | 30.7 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/grey-bg.png` | `grey-bg.png` | 26.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/header-bg.png` | `header-bg.png` | 30.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/header-photo-bg.jpg` | `header-photo-bg.jpg` | 139.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/icon-paperclip.png` | `icon-paperclip.png` | 2.6 KB | **POSSIBLE_EXTERNAL_PWA** | Iconos de manifest PWA o favicons estándar del navegador. |
| `images/iconos/16.svg` | `16.svg` | 0.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/inicio/14.jpg` | `14.jpg` | 14.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/15.jpg` | `15.jpg` | 15.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/17.jpg` | `17.jpg` | 34.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/18.jpg` | `18.jpg` | 32.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/19.jpg` | `19.jpg` | 23.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/20.jpg` | `20.jpg` | 30.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/21.jpg` | `21.jpg` | 22.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/22.jpg` | `22.jpg` | 24.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/24.jpg` | `24.jpg` | 36.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/25.jpg` | `25.jpg` | 33.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/27.jpg` | `27.jpg` | 27.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/28.jpg` | `28.jpg` | 33.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/29.jpg` | `29.jpg` | 19.9 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/30.jpg` | `30.jpg` | 15.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/32.jpg` | `32.jpg` | 16.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/33.jpg` | `33.jpg` | 16.0 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/34.jpg` | `34.jpg` | 37.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/35.jpg` | `35.jpg` | 44.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/36.jpg` | `36.jpg` | 35.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/37.jpg` | `37.jpg` | 44.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/38.jpg` | `38.jpg` | 8.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/54545454.jpg` | `54545454.jpg` | 91.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/65656565.jpg` | `65656565.jpg` | 77.0 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/658989898.jpg` | `658989898.jpg` | 78.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/7.jpg` | `7.jpg` | 15.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/8.jpg` | `8.jpg` | 16.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/999999.jpg` | `999999.jpg` | 76.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/inicio/bento-gestion-flota.jpg (1).jpg` | `bento-gestion-flota.jpg (1).jpg` | 19.2 KB | **DUPLICATE_LEGACY** | Descarga duplicada con sufijo del explorador. |
| `images/inicio/ee07a902-2665-472f-b8f6-8bb402ceace3.png` | `ee07a902-2665-472f-b8f6-8bb402ceace3.png` | 1128.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/inicio/slider-4.jpg` | `slider-4.jpg` | 122.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Isotipo-sin-fondo.png` | `Isotipo-sin-fondo.png` | 58.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/loader-yellow.gif` | `loader-yellow.gif` | 644.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/loader.gif.gif` | `loader.gif.gif` | 644.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/loading_apple.gif` | `loading_apple.gif` | 79.7 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/logo-blanco.png` | `logo-blanco.png` | 75.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/logo-vertical.png` | `logo-vertical.png` | 33.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/logo.png` | `logo.png` | 74.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/mantenimiento-motor-600x425.jpg` | `mantenimiento-motor-600x425.jpg` | 76.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/mantenimiento-motor-600x450.jpg` | `mantenimiento-motor-600x450.jpg` | 16.6 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/mantenimiento-motor-600x4500.jpg` | `mantenimiento-motor-600x4500.jpg` | 77.0 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/mantenimiento-motor-600x450000000.jpg` | `mantenimiento-motor-600x450000000.jpg` | 66.0 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/map-marker.png` | `map-marker.png` | 2.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/atlas.png` | `atlas.png` | 15.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/case.png` | `case.png` | 16.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/cat.png` | `cat.png` | 12.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/doosan.png` | `doosan.png` | 18.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/haulotte.png` | `haulotte.png` | 11.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/jcb.png` | `jcb.png` | 79.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/jlg.png` | `jlg.png` | 24.9 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/john deere.png` | `john deere.png` | 26.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/kobelco.png` | `kobelco.png` | 13.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/komatsu.png` | `komatsu.png` | 11.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/sandvik.png` | `sandvik.png` | 13.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/terex.png` | `terex.png` | 8.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/marcas/volvo.png` | `volvo.png` | 39.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/menu/14.jpg` | `14.jpg` | 14.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/15.jpg` | `15.jpg` | 15.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/17.jpg` | `17.jpg` | 34.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/18.jpg` | `18.jpg` | 32.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/19.jpg` | `19.jpg` | 23.5 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/20.jpg` | `20.jpg` | 30.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/21.jpg` | `21.jpg` | 22.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/23.jpg` | `23.jpg` | 53.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/24.jpg` | `24.jpg` | 36.4 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/25.jpg` | `25.jpg` | 33.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/26.jpg` | `26.jpg` | 39.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/29.jpg` | `29.jpg` | 19.9 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/30.jpg` | `30.jpg` | 15.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/31.jpg` | `31.jpg` | 16.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/32.jpg` | `32.jpg` | 37.1 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/33.jpg` | `33.jpg` | 16.0 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/34.jpg` | `34.jpg` | 30.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/35.jpg` | `35.jpg` | 44.2 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/37.jpg` | `37.jpg` | 44.7 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/38.jpg` | `38.jpg` | 8.8 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/7.jpg` | `7.jpg` | 15.3 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu/8.jpg` | `8.jpg` | 16.6 KB | **CONFIRMED_ORPHAN** | Imágenes numeradas de prueba o stock general sin asignación a componentes ni secciones. |
| `images/menu-2.jpg` | `menu-2.jpg` | 36.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/menu-22.png` | `menu-22.png` | 515.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/menu-6.png` | `menu-6.png` | 914.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/motor-diesel-600x450.jpg` | `motor-diesel-600x450.jpg` | 36.5 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/motor-diesel-600x450000.jpg` | `motor-diesel-600x450000.jpg` | 91.8 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/Noticias y Blog/Komatsu KOMTRAX Telemetría1.jpg` | `Komatsu KOMTRAX Telemetría1.jpg` | 385.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/pdf-icon.png` | `pdf-icon.png` | 1.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/pricing-box02-bg.png` | `pricing-box02-bg.png` | 8.7 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/promo01-bg01.png` | `promo01-bg01.png` | 0.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/promo01-bg03.png` | `promo01-bg03.png` | 0.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/repuestos-600x450.jpg` | `repuestos-600x450.jpg` | 27.7 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/repuestos-600x4500000.jpg` | `repuestos-600x4500000.jpg` | 78.3 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/slider-2.png` | `slider-2.png` | 914.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/slider-3.png` | `slider-3.png` | 933.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/slider-gestion-flota.png` | `slider-gestion-flota.png` | 983.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/soldadura-mecanizado-600x450.jpg` | `soldadura-mecanizado-600x450.jpg` | 74.5 KB | **DUPLICATE_LEGACY** | Variantes de tamaño generadas automáticamente por WordPress (ej. 600x450000000.jpg). |
| `images/step1-download.png` | `step1-download.png` | 2.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/step2-evaluate.png` | `step2-evaluate.png` | 2.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/step3-confirm.png` | `step3-confirm.png` | 2.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/tabform-bg.jpg` | `tabform-bg.jpg` | 45.0 KB | **LEGACY_THEME** | Recortes gráficos de componentes de plantilla previa no utilizados en la arquitectura Next.js. |
| `images/Web - Marcas/10.svg` | `10.svg` | 30.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/11.svg` | `11.svg` | 28.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/12.svg` | `12.svg` | 33.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/16.svg` | `16.svg` | 238.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/17.svg` | `17.svg` | 188.2 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/18.svg` | `18.svg` | 21.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/19.svg` | `19.svg` | 13.7 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/20.svg` | `20.svg` | 198.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/21.svg` | `21.svg` | 54.6 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/22.svg` | `22.svg` | 139.8 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/23.svg` | `23.svg` | 21.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/24.svg` | `24.svg` | 40.7 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/Web - Marcas/9.svg` | `9.svg` | 7.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/woman_car_keys.png` | `woman_car_keys.png` | 712.0 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `images/youtube_play.png` | `youtube_play.png` | 41.5 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `next.svg` | `next.svg` | 1.3 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `vercel.svg` | `vercel.svg` | 0.1 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |
| `window.svg` | `window.svg` | 0.4 KB | **CONFIRMED_ORPHAN** | No tiene referencias en ningún archivo del código fuente ni en componentes. |

---
*Fin del informe de revisión de archivos no referenciados. Ningún archivo ha sido eliminado.*