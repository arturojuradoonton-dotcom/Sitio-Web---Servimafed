import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import GlobalCTA from "@/components/layout/GlobalCTA";
import ScheduleVisitModal from "@/components/ui/ScheduleVisitModal";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: 'Servimafed | Mantenimiento de Maquinaria Pesada',
    template: '%s | Servimafed',
  },
  description: 'Especialistas en mantenimiento integral, reparación de componentes y suministro de repuestos para maquinaria pesada. Servicio 24/7 para minería y construcción en Perú.',
  keywords: ['maquinaria pesada', 'mantenimiento industrial', 'repuestos CAT', 'Komatsu', 'Volvo', 'minería', 'Perú', 'Servimafed'],
  authors: [{ name: 'Servimafed' }],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Servimafed',
    title: 'Servimafed | Mantenimiento de Maquinaria Pesada',
    description: 'Especialistas en mantenimiento integral, reparación de componentes y suministro de repuestos para maquinaria pesada.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
