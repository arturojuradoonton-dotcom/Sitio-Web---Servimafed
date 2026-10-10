# Checklist de Control de Calidad de Imágenes — IMAGE_QA_CHECKLIST.md
**Proyecto**: SERVIMAFED S.A.C.  
**Propósito**: Protocolo de validación técnica y visual para la fase de reemplazo y despliegue de nuevos activos visuales.

---

## 1. Control de Calidad Visual y Resolución

- [ ] **No hay imágenes borrosas en pantallas estándar (1x)**: Cada imagen renderizada posee suficiente nitidez en sus bordes, tipografías incrustadas o detalles mecánicos.
- [ ] **No hay imágenes pixeladas en pantallas de alta densidad (Retina 2x/3x)**: Las imágenes se proporcionan a un mínimo de 1.5x a 2x de sus dimensiones físicas de renderizado en CSS.
- [ ] **No hay imágenes deformadas (Aspect Ratio)**: Todas las imágenes conservan su relación de aspecto original (`aspect-ratio`, `object-cover` o `object-contain`) sin distorsión vertical u horizontal (evitar `width: 100%; height: 100%` sin `object-cover`).
- [ ] **No hay artefactos de compresión excesiva**: Los degradados de cielo, sombras oscuras y metales pulidos no muestran bandas de color (color banding) ni bloques típicos de compresión JPEG extrema.
- [ ] **No hay imágenes ampliadas artificialmente**: Ningún archivo nativo de 600px se renderiza en contenedores mayores a su resolución sin reemplazo previo.
- [ ] **Eliminación total de dobles extensiones**: Verificar que no existan archivos con extensiones compuestas como `.jpg.jpg` o `.gif.gif`.

---

## 2. Coherencia de Diseño y Dirección de Arte

- [ ] **Coherencia visual industrial**: Todas las fotografías representan fielmente el sector de minería, construcción pesada, maquinaria pesada e ingeniería en el contexto peruano.
- [ ] **Paleta cromática alineada a la marca**: Las imágenes armonizan con los colores corporativos de SERVIMAFED (Azul Marino `#1d3961`, Amarillo Oro `#FCB326`, Gris Técnico `#f4f4f4` y Antracita `#1a1a1a`).
- [ ] **Crops y encuadres correctos**: Los puntos focales de cada imagen (máquinas, técnicos trabajando, repuestos) permanecen dentro de la zona visible y no son recortados abruptamente por los bordes del contenedor.
- [ ] **Espacio negativo para tipografía**: En los banners con texto superpuesto, los sujetos principales se sitúan hacia la derecha o centro, dejando espacio limpio y oscuro en la zona izquierda para titulares legibles.
- [ ] **No existen imágenes redundantes ni duplicadas**: No se reutiliza la misma foto técnica bajo nombres diferentes en servicios, repuestos y testimonios.
- [ ] **Credibilidad en testimonios**: Los testimonios cuentan con retratos fotográficos verosímiles de ingenieros, superintendentes y técnicos con su equipo de protección personal (EPP), reemplazando las fotos genéricas de motores.

---

## 3. Comportamiento Responsive y Dispositivos

- [ ] **Visualización correcta en Desktop (≥ 1280px)**:
  - Los Hero Sliders y banners panorámicos cubren el ancho completo sin pérdida de nitidez.
  - El Bento Grid distribuye las proporciones asimétricas (2 col y 1 col) limpiamente.
  - Los mega menús muestran miniaturas nítidas de 220px a 260px.
- [ ] **Visualización correcta en Tablet (768px – 1024px)**:
  - Las tarjetas de servicios y productos colapsan a 2 columnas con proporciones de imagen balanceadas.
  - El Hero Slider mantiene textos y botones sin tapar el sujeto principal de la imagen.
- [ ] **Visualización correcta en Mobile (< 768px)**:
  - La propiedad `object-position: center` o `object-position: top` evita que el sujeto principal quede fuera del viewport móvil vertical.
  - Las imágenes no provocan scroll horizontal involuntario (`overflow-x: hidden`).
  - El menú móvil (`MobileMenu.tsx`) prioriza la carga de texto y no descarga miniaturas pesadas innecesarias.

---

## 4. Rendimiento (Performance) y Core Web Vitals

- [ ] **Formatos modernos aplicados**:
  - Fotografías convertidas a formato **WebP** o **AVIF**.
  - Iconos y logotipos vectoriales en formato **SVG**.
  - Formato **PNG** reservado únicamente para firmas transparentes y plantillas de correo transaccional.
- [ ] **Eliminación del GIF de preloader pesado**: El spinner `loader-yellow.gif` (659 KB) ha sido sustituido por SVG o animación CSS (< 2 KB), desbloqueando la red en la carga inicial.
- [ ] **Eliminación de la propiedad `unoptimized={true}`**: Los componentes `<Image>` de Next.js procesan y sirven imágenes en el tamaño óptimo para el dispositivo del usuario.
- [ ] **LCP optimizado (Largest Contentful Paint < 1.5s)**:
  - Únicamente la imagen visible del Hero Slider inicial tiene la propiedad `priority`.
  - Todas las demás imágenes inferiores tienen `loading="lazy"` nativo.
- [ ] **Definición precisa del atributo `sizes`**:
  - Bento Grid: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`
  - Catálogo de Repuestos: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"`
  - Evita que un celular descargue la versión de 2880px pensada para pantallas 4K.
- [ ] **Prevención de saltos de diseño (CLS = 0)**:
  - Todo elemento de imagen cuenta con relación de aspecto predefinida (`aspect-ratio`, dimensiones fijas o `fill` con contenedor relativo).
- [ ] **Peso total de página controlado**: La suma del peso de todas las imágenes transferidas en la carga inicial del Home no supera **1.2 MB**.

---

## 5. Accesibilidad (A11y) y SEO

- [ ] **Atributos `alt` descriptivos y contextuales**:
  - Ninguna imagen contiene `alt` genéricos vacíos como "image", "foto", "1", "slider".
  - Los logos de marcas en `BrandSlider.tsx` declaran su nombre oficial (ej. `alt="Repuestos y mantenimiento especializado para maquinaria Caterpillar"`).
- [ ] **Imágenes decorativas marcadas adecuadamente**:
  - Fondos abstractos, sombras y marcas de agua declaran `aria-hidden="true"` o `alt=""` para no saturar a lectores de pantalla.
- [ ] **Compatibilidad con OpenGraph**: Las imágenes de portada de artículos de blog y páginas principales cumplen con la proporción estándar **1.91:1 (1200 × 630 px)** para previsualizaciones impecables en LinkedIn, WhatsApp y Facebook.
- [ ] **Compatibilidad con Emails Transaccionales**: Las rutas de imágenes referenciadas en `emailLayout.ts` para correos de Resend permanecen accesibles públicamente con URLs absolutas para evitar imágenes caídas en bandejas de entrada.

---

## 6. Depuración y Limpieza del Repositorio

- [ ] **Limpieza de 297 imágenes huérfanas**: Mover o eliminar las imágenes residuales no utilizadas en la raíz `/images/` y subcarpetas para reducir el tamaño del repositorio en más de 40 MB.
- [ ] **Estructura de carpetas normalizada**: Implementación de `/public/images/` dividido en `/brand/`, `/banners/`, `/services/`, `/products/`, `/blog/`, `/icons/`, `/bento/`, `/testimonials/` y `/email/`.
- [ ] **Cero enlaces rotos (0% 404)**: Validación mediante build (`npm run build`) de que ninguna ruta de imagen genera advertencias o errores durante la compilación estática.

---
*Checklist aprobado para la fase de ejecución de cambios.*
