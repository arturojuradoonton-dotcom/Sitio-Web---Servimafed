import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopBar from "@/core/ui/layout/TopBar";
import NavBar from "@/core/ui/layout/NavBar";
import Footer from "@/core/ui/layout/Footer";
import Preloader from "@/core/ui/Preloader";
import WhatsAppButton from "@/core/ui/WhatsAppButton";
import GlobalCTA from "@/core/ui/layout/GlobalCTA";
import ScheduleVisitModal from "@/core/ui/ScheduleVisitModal";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.servimafed.com'),
  alternates: {
    canonical: 'https://www.servimafed.com',
  },
  title: {
    default: 'Servimafed | Mantenimiento de Maquinaria Pesada en Perú',
    template: '%s | Servimafed',
  },
  description: 'Especialistas en mantenimiento integral, reparación de componentes y suministro de repuestos para maquinaria pesada. Servicio 24/7 para minería y construcción en Perú.',
  keywords: ['maquinaria pesada', 'mantenimiento industrial', 'repuestos CAT', 'Komatsu', 'Volvo', 'minería', 'Perú', 'Servimafed'],
  authors: [{ name: 'Servimafed' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://www.servimafed.com',
    siteName: 'Servimafed',
    title: 'Servimafed | Mantenimiento de Maquinaria Pesada en Perú',
    description: 'Especialistas en mantenimiento integral, reparación de componentes y suministro de repuestos para maquinaria pesada.',
    images: [
      {
        url: '/images/Logo-horizontal.png',
        width: 1200,
        height: 630,
        alt: 'Servimafed Logo',
      },
    ],
  },
};

const schemaJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Corporation',
      '@id': 'https://www.servimafed.com/#organization',
      name: 'SERVIMAFED S.A.C.',
      alternateName: ['Servimafed', 'Servimafed SAC'],
      url: 'https://www.servimafed.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://www.servimafed.com/#logo',
        url: 'https://www.servimafed.com/images/Logo-horizontal.png',
        caption: 'SERVIMAFED S.A.C.',
      },
      image: 'https://www.servimafed.com/images/Logo-horizontal.png',
      description: 'Especialistas en overhaul de motores, diagnóstico avanzado, mantenimiento de flota y repuestos OEM para maquinaria pesada en minería y construcción en Perú.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mz. C Lote 12A, Sector Sumac Pacha',
        addressLocality: 'Lurín',
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
      telephone: '+51993667182',
      email: 'ventas@servimafed.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+51993667182',
          contactType: 'customer service',
          areaServed: 'PE',
          availableLanguage: ['es'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.servimafed.com/#website',
      url: 'https://www.servimafed.com',
      name: 'Servimafed',
      publisher: {
        '@id': 'https://www.servimafed.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.servimafed.com/buscar?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Nosotros',
      url: 'https://www.servimafed.com/nosotros',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Servicios',
      url: 'https://www.servimafed.com/servicios',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Repuestos OEM',
      url: 'https://www.servimafed.com/repuestos',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Gestión de Flota',
      url: 'https://www.servimafed.com/servicios/gestion-flota',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Overhaul de Motores',
      url: 'https://www.servimafed.com/servicios/reparacion-componentes',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Contacto',
      url: 'https://www.servimafed.com/contacto',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Comprobantes Electrónicos',
      url: 'https://www.servimafed.com/comprobantes',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className={`${roboto.variable} font-sans antialiased bg-gray-50 text-slate-800 flex flex-col min-h-screen`}>
        <Preloader />
        <TopBar />
        <NavBar />
        {children}
        <WhatsAppButton />
        <GlobalCTA />
        <ScheduleVisitModal />
        <Footer />
      </body>
    </html>
  );
}

