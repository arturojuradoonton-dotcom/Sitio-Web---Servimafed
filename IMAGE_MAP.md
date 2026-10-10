# Mapa de Relaciones Visuales — IMAGE_MAP.md
**Proyecto**: SERVIMAFED S.A.C.  
**Objetivo**: Visualizar la jerarquía exacta y correspondencia directa entre páginas, secciones, componentes y cada imagen del sitio web.

---

## Estructura Jerárquica del Sitio

```text
GLOBAL LAYOUT (RootLayout & Core Components)
├── Favicons & PWA
│   ├── Favicon ICO ──────────────────────────→ IMG-005 (favicon.ico)
│   ├── Favicon 48x48 ────────────────────────→ IMG-006 (favicon-48x48.png)
│   ├── Favicon 96x96 ────────────────────────→ IMG-007 (favicon-96x96.png)
│   ├── App Icon 192x192 ─────────────────────→ IMG-008 (icon-192x192.png)
│   ├── App Icon 512x512 ─────────────────────→ IMG-009 (icon-512x512.png)
│   └── Apple Touch Icon 180x180 ─────────────→ IMG-010 (apple-touch-icon.png)
├── Header & Navegación (NavBar.tsx)
│   ├── Logotipo Principal ───────────────────→ IMG-001 (Logo-horizontal.png → brand-logo-horizontal.webp)
│   ├── Mega Menú: Gestión de Flota ──────────→ IMG-016 (menu-service-fleet.webp)
│   ├── Mega Menú: Mantenimiento Preventivo ──→ IMG-017 (menu-service-preventive.webp)
│   ├── Mega Menú: Reparación Componentes ────→ IMG-018 (menu-service-components.webp)
│   ├── Mega Menú: Mecanizado y Soldadura ────→ IMG-019 (menu-service-welding.webp)
│   ├── Mega Menú: Evaluación y Diagnóstico ──→ IMG-020 (menu-service-diagnostic.webp)
│   ├── Mega Menú: Accesorios ────────────────→ IMG-021 (menu-part-accessories.webp)
│   ├── Mega Menú: Componentes Mayores ───────→ IMG-022 (menu-part-components.webp)
│   ├── Mega Menú: Elementos de Desgaste ─────→ IMG-023 (menu-part-wear.webp)
│   └── Mega Menú: Repuestos Mantenimiento ───→ IMG-024 (menu-part-maintenance.webp)
├── Preloader (Preloader.tsx)
│   └── Spinner de Carga Inicial ─────────────→ IMG-011 (loader-yellow.gif → ui-preloader.svg)
├── Global CTA (GlobalCTA.tsx)
│   └── Marca de Agua Mapa del Perú ──────────→ IMG-012 (mapa-peru-punteado.svg)
└── Footer (Footer.tsx)
    ├── Logotipo Blanco / Variante ───────────→ IMG-002 (Logo-horizontal--Variante.png → brand-logo-white.webp)
    ├── Icono: Bolsa de Trabajo ──────────────→ IMG-013 (icon-jobs.svg)
    ├── Icono: Comprobantes Electrónicos ─────→ IMG-014 (icon-receipt.svg)
    ├── Icono: Política de Privacidad ────────→ IMG-015 (icon-privacy.svg)
    └── Icono: Libro de Reclamaciones ────────→ IMG-016 (icon-claims.svg)

HOME (/)
├── Hero Slider (HeroSlider.tsx)
│   ├── Slide 1: Kits de Mantenimiento ───────→ IMG-025 (13.jpg → hero-slide-kits-mantenimiento.webp)
│   ├── Slide 2: Repuestos Originales ────────→ IMG-026 (55.jpg → hero-slide-repuestos-oem.webp)
│   ├── Slide 3: Gestión y Control de Flota ──→ IMG-027 (40.jpg → hero-slide-gestion-flota.webp)
│   └── Slide 4: Overhaul de Motores ─────────→ IMG-028 (9.jpg → hero-slide-overhaul-motores.webp)
├── Valores Corporativos (page.tsx)
│   ├── Icono: Calidad ───────────────────────→ IMG-029 (iconos/3.svg → icon-value-calidad.svg)
│   ├── Icono: Confiabilidad ─────────────────→ IMG-030 (iconos/1.svg → icon-value-confiabilidad.svg)
│   └── Icono: Puntualidad ───────────────────→ IMG-031 (iconos/2.svg → icon-value-puntualidad.svg)
├── Catálogo Integral Bento Grid (page.tsx)
│   ├── Card 1: Gestión de Flota ─────────────→ IMG-032 (bento-gestion-flota.webp)
│   ├── Card 2: Mantenimiento Preventivo ─────→ IMG-033 (bento-mantenimiento-preventivo.webp)
│   ├── Card 3: Suministro de Repuestos ──────→ IMG-034 (bento-suministro-repuestos.webp)
│   ├── Card 4: Evaluación y Diagnóstico ─────→ IMG-035 (bento-evaluacion-diagnostico.webp)
│   ├── Card 5: Mecanizado y Soldadura ───────→ IMG-036 (bento-mecanizado-soldadura.webp)
│   └── Card 6: Reparación de Componentes ────→ IMG-037 (bento-reparacion-componentes.webp)
├── Noticias Técnicas (HomeNews.tsx)
│   └── Portadas de Artículos Dinámicos ──────→ Mapeadas desde Blog Data (IMG-106 a IMG-117)
├── Indicadores de Confianza / Métricas (page.tsx)
│   ├── Métrica: 100% Técnicos Especializados → IMG-038 (iconos/8.svg → icon-metric-tecnicos.svg)
│   ├── Métrica: 24/7 Soporte en Campo ───────→ IMG-039 (iconos/6.svg → icon-metric-soporte.svg)
│   ├── Métrica: 500+ Equipos Atendidos ──────→ IMG-040 (iconos/5.svg → icon-metric-equipos.svg)
│   └── Métrica: ISO Estándares Globales ─────→ IMG-041 (iconos/4.svg → icon-metric-iso.svg)
├── Testimonios de Clientes (HomeTestimonials.tsx - Módulo Preparado)
│   ├── Testimonio 1: Rachel Bell ────────────→ IMG-125 (testimonial-rachel-bell.webp)
│   ├── Testimonio 2: Carlos Mendoza ─────────→ IMG-126 (testimonial-carlos-mendoza.webp)
│   ├── Testimonio 3: Elena Rojas ────────────→ IMG-127 (testimonial-elena-rojas.webp)
│   └── Testimonio 4: Mateo Silva ────────────→ IMG-128 (testimonial-mateo-silva.webp)
└── Marcas Atendidas (BrandSlider.tsx)
    └── 24 Logos Vectoriales de Fabricantes ──→ IMG-042 a IMG-065 (brand-[nombre-marca].svg)

NOSOTROS (/nosotros)
├── Cabecera Principal ───────────────────────→ IMG-066 (hero-nosotros.jpg → banner-hero-nosotros.webp)
├── Historia y Misión (Operaciones en Campo) ──→ IMG-067 (historia.jpg → about-operaciones-campo.webp)
├── Estadísticas de Desempeño
│   ├── Textura de Fondo ─────────────────────→ IMG-068 (bg-industrial-texture.webp)
│   ├── Icono: Horas Máquina Recuperadas ─────→ IMG-069 (iconos/13.svg → icon-stat-hours.svg)
│   ├── Icono: Personal Técnico Calificado ───→ IMG-070 (iconos/7.svg → icon-stat-team.svg)
│   ├── Icono: Cumplimiento Normas HSE ───────→ IMG-071 (iconos/15.svg → icon-stat-hse.svg)
│   └── Icono: Certificación ISO 9001 ────────→ IMG-072 (iconos/14.svg → icon-stat-iso.svg)
└── Marcas Líderes ───────────────────────────→ IMG-042 a IMG-065 (BrandSlider.tsx)

SERVICIOS (/servicios)
├── Cabecera Principal ───────────────────────→ IMG-073 (hero-servicios.jpg → banner-hero-servicios.webp)
└── Cuadrícula de Servicios
    ├── Card 1: Gestión de Flota ─────────────→ IMG-074 (menu-1.png → service-card-gestion-flota.webp)
    ├── Card 2: Mantenimiento Preventivo ─────→ IMG-075 (menu-2.png ROTO → service-card-mantenimiento-preventivo.webp)
    ├── Card 3: Reparación de Componentes ────→ IMG-076 (menu-3.png → service-card-reparacion-componentes.webp)
    ├── Card 4: Evaluación y Diagnóstico ─────→ IMG-077 (menu-4.png → service-card-evaluacion-diagnostico.webp)
    └── Card 5: Mecanizado y Soldadura ───────→ IMG-078 (menu-5.png → service-card-mecanizado-soldadura.webp)

DETALLE DE SERVICIO (/servicios/[slug])
├── /servicios/gestion-flota ─────────────────→ IMG-079 (service-hero-gestion-flota.webp)
├── /servicios/mantenimiento-preventivo ──────→ IMG-080 (service-hero-mantenimiento-preventivo.webp)
├── /servicios/reparacion-componentes ────────→ IMG-081 (service-hero-reparacion-componentes.webp)
│   └── Comparador Antes y Después (Opcional) ─→ IMG-129 (antes.webp) + IMG-130 (despues.webp)
├── /servicios/evaluacion-diagnostico ────────→ IMG-082 (service-hero-evaluacion-diagnostico.webp)
└── /servicios/mecanizado-soldadura ──────────→ IMG-083 (service-hero-mecanizado-soldadura.webp)

REPUESTOS (/repuestos)
├── Cabecera Principal ───────────────────────→ IMG-084 (hero-repuestos.jpg → banner-hero-repuestos.webp)
└── Cuadrícula de Categorías
    ├── Card 1: Accesorios Industriales ──────→ IMG-085 (part-cat-accesorios.webp)
    ├── Card 2: Componentes Mayores ──────────→ IMG-086 (part-cat-componentes.webp)
    ├── Card 3: Elementos de Desgaste (GET) ──→ IMG-087 (part-cat-elementos-desgaste.webp)
    └── Card 4: Repuestos de Mantenimiento ───→ IMG-088 (part-cat-mantenimiento.webp)

DETALLE DE REPUESTO (/repuestos/[slug])
├── /repuestos/accesorios
│   ├── Hero Banner de Categoría ─────────────→ IMG-085 (part-cat-accesorios.webp)
│   ├── Producto 1: Martillos Hidráulicos ────→ IMG-089 (product-martillo-hidraulico.webp) [NUEVO / 404]
│   ├── Producto 2: Acoples Rápidos ──────────→ IMG-090 (product-acople-rapido.webp) [NUEVO / 404]
│   ├── Producto 3: Garfios y Pulpos ─────────→ IMG-091 (product-garfio-industrial.webp) [NUEVO / 404]
│   └── Producto 4: Rippers y Escarificadores → IMG-092 (product-ripper-escarificador.webp) [NUEVO / 404]
├── /repuestos/componentes
│   ├── Hero Banner de Categoría ─────────────→ IMG-086 (part-cat-componentes.webp)
│   ├── Producto 1: Motores Diésel ───────────→ IMG-093 (product-motor-diesel-industrial.webp) [NUEVO / 404]
│   ├── Producto 2: Transmisiones Powershift ─→ IMG-094 (product-transmision-powershift.webp) [NUEVO / 404]
│   ├── Producto 3: Sistemas Hidráulicos ─────→ IMG-095 (product-bomba-hidraulica.webp) [NUEVO / 404]
│   └── Producto 4: Mandos Finales ───────────→ IMG-096 (product-mando-final.webp) [NUEVO / 404]
├── /repuestos/elementos-desgaste
│   ├── Hero Banner de Categoría ─────────────→ IMG-087 (part-cat-elementos-desgaste.webp)
│   ├── Producto 1: Cuchillas y Cantoneras ───→ IMG-097 (product-cuchillas-cantoneras.webp) [NUEVO / 404]
│   ├── Producto 2: Puntas y Adaptadores ─────→ IMG-098 (product-puntas-adaptadores-get.webp) [NUEVO / 404]
│   ├── Producto 3: Tren de Rodaje ───────────→ IMG-099 (product-tren-rodaje-orugas.webp) [NUEVO / 404]
│   └── Producto 4: Aceros Antidesgaste ──────→ IMG-100 (product-planchas-hardox.webp) [NUEVO / 404]
└── /repuestos/mantenimiento
    ├── Hero Banner de Categoría ─────────────→ IMG-088 (part-cat-mantenimiento.webp)
    ├── Producto 1: Sistemas de Filtración ───→ IMG-101 (product-sistemas-filtracion.webp) [NUEVO / 404]
    ├── Producto 2: Lubricantes Especializados → IMG-102 (product-lubricantes-industriales.webp) [NUEVO / 404]
    ├── Producto 3: Kits de Sellado ──────────→ IMG-103 (product-kits-sellos-hidraulicos.webp) [NUEVO / 404]
    └── Producto 4: Correas y Mangueras ──────→ IMG-104 (product-mangueras-correas-transmision.webp) [NUEVO / 404]

BLOG Y ARTÍCULOS TÉCNICOS (/blog y /blog/[slug])
├── Cabecera General del Blog ────────────────→ IMG-105 (banner-hero-blog.webp)
├── Portadas de Artículos
│   ├── Post: Análisis de Aceite S.O.S. ──────→ IMG-106 (blog-analisis-aceite-sos.webp)
│   ├── Post: Reconstrucción Cucharones ──────→ IMG-107 (blog-soldadura-cucharones-tolvas.webp)
│   ├── Post: Plataforma ERP Axentra ─────────→ IMG-108 (blog-erp-axentra-gestion.webp)
│   ├── Post: Componentes OEM Motores ────────→ IMG-109 (blog-componentes-oem-motores.webp)
│   ├── Post: Aceros Hardox vs Creusabro ─────→ IMG-110 (blog-aceros-hardox-vs-creusabro.webp)
│   ├── Post: Telemetría Komatsu KOMTRAX ─────→ IMG-111 (blog-komatsu-komtrax-telemetria.webp)
│   ├── Post: Excavadoras Stage V ────────────→ IMG-112 (blog-excavadoras-stage-v.webp)
│   ├── Post: Guía Reporte S.O.S. ────────────→ IMG-113 (blog-guia-reporte-sos.webp)
│   ├── Post: 5 Señales Overhaul Transmisión ─→ IMG-114 (10.jpg → blog-senales-overhaul-transmision.webp)
│   ├── Post: Normas HSEQ Minería ────────────→ IMG-115 (11.jpg ROTO → blog-normas-hseq-seguridad-minera.webp)
│   ├── Post: Volvo L25 Cargador Eléctrico ───→ IMG-116 (12.jpg ROTO → blog-volvo-l25-cargador-electrico.webp)
│   └── Post: Intervalos Horómetro CAT 320 ───→ IMG-117 (16.jpg ROTO → blog-intervalos-mantenimiento-cat-320.webp)
└── Página de Detalle de Artículo
    ├── Cabecera de Post (Fondo Atenuado) ────→ Utiliza la misma imagen del post (`post.img`)
    └── Imagen Destacada del Contenido ───────→ Utiliza la misma imagen del post (`post.img`)

PÁGINAS SECUNDARIAS Y DE SERVICIO
├── /contacto ────────────────────────────────→ IMG-118 (hero-contactanos.jpg → banner-hero-contacto.webp)
├── /bolsa-trabajo ───────────────────────────→ IMG-119 (hero-bolsa-trabajo.jpg ROTO → banner-hero-bolsa-trabajo.webp)
├── /comprobantes ────────────────────────────→ IMG-121 (hero-comprobantes.jpg ROTO → banner-hero-comprobantes.webp)
├── /libro-reclamaciones ─────────────────────→ IMG-120 (hero-contacto.jpg → banner-hero-libro-reclamaciones.webp)
├── /buscar ──────────────────────────────────→ IMG-122 (hero-buscar.jpg ROTO → banner-hero-buscar.webp)
├── /politicas ───────────────────────────────→ IMG-123 (hero-politicas.jpg ROTO → banner-hero-politicas.webp)
└── /not-found (404) ─────────────────────────→ IMG-124 (hero-404.jpg ROTO → banner-hero-404.webp)

SISTEMA DE EMAIL MARKETING Y LEADS (Resend / emailLayout.ts)
├── Cabeceras de Correo HTML
│   ├── Banner General Brochure ──────────────→ IMG-131 (email-brochure-banner.jpg)
│   ├── Hero Banner Confirmación Brochure ────→ IMG-132 (email-hero-banner-brochure.jpg)
│   ├── Hero Banner Notificación Contacto ────→ IMG-133 (email-hero-banner-contact.jpg)
│   └── Hero Banner Postulación Laboral ──────→ IMG-134 (email-hero-banner-jobs.png)
└── Iconografía de Soporte en Correos
    ├── Logotipo Vertical Blanco ─────────────→ IMG-003 (logo-vertical-blanco.png)
    ├── Icono Headset Atención ───────────────→ IMG-135 (headset-contact.png)
    ├── Icono Técnico Trabajador ─────────────→ IMG-136 (icon-trabajador.png)
    ├── Iconos Métricas (Soporte, Equipos, ISO)→ IMG-146, IMG-147, IMG-148
    └── Iconos Contacto (Teléfono, WhatsApp) ─→ IMG-144, IMG-145
```

---
*Fin del mapa visual de relaciones de imágenes.*
