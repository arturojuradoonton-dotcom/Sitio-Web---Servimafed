import HeroSlider from '@/modules/Home/components/HeroSlider';
import dynamic from 'next/dynamic';
import { HomeNews } from '@/modules/Home/components/HomeNews';
import { Plus, PenTool, ShieldCheck, Truck, Users, Award, Handshake, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const BrandSlider = dynamic(() => import('@/core/ui/BrandSlider'));
const HomeFAQ = dynamic(() => import('@/modules/Home/components/HomeFAQ'));

export const metadata: Metadata = {
  title: {
    absolute: 'Servimafed | Mantenimiento de Maquinaria Pesada y Minería en Perú',
  },
  description: 'Servimafed: especialistas en overhaul de motores, diagnóstico avanzado, mantenimiento de flota y repuestos OEM para maquinaria pesada en minería y construcción en Perú.',
  alternates: {
    canonical: 'https://www.servimafed.com',
  },
};

export default function Home() {
  const solucionesBento = [
    { 
      title: "Gestión de Flota", 
      desc: "Planes de mantenimiento por horómetro, control de disponibilidad mecánica y confiabilidad para maximizar el tiempo medio entre fallas y reducir los tiempos de reparación de su flota.",
      img: "/images/inicio/bento-gestion-flota.jpg.jpg",
      href: "/servicios/gestion-flota",
      gridClass: "col-span-2 lg:col-span-2"
    },
    { 
      title: "Mantenimiento Preventivo", 
      desc: "Servicios programados por horómetro, análisis de fluidos SOS y reemplazo de filtros OEM.",
      img: "/images/inicio/bento-mantenimiento.jpg.jpg",
      href: "/servicios/mantenimiento-preventivo",
      gridClass: "col-span-1 lg:col-span-1"
    },
    { 
      title: "Suministro de Repuestos", 
      desc: "Inventario en tiempo real de componentes, herramientas de desgaste, filtros y lubricantes para mantener su flota operativa.",
      img: "/images/inicio/bento-repuestos.jpg.jpg",
      href: "/repuestos",
      gridClass: "col-span-1 lg:col-span-1"
    },
    { 
      title: "Evaluación y Diagnóstico", 
      desc: "Escaneo electrónico multimarca, interpretación de códigos de falla y diagnóstico termográfico en campo.",
      img: "/images/inicio/bento-evaluacion-diagnostico.jpg.jpg",
      href: "/servicios/evaluacion-diagnostico",
      gridClass: "col-span-1 lg:col-span-1"
    },
    { 
      title: "Mecanizado y Soldadura", 
      desc: "Reforzamiento estructural pesado, recuperación de alojamientos (line boring) y fabricación bajo plano.",
      img: "/images/inicio/bento-mecanizado-soldadura.jpg.jpg",
      href: "/servicios/mecanizado-soldadura",
      gridClass: "col-span-1 lg:col-span-1"
    },
    { 
      title: "Reparación de Componentes", 
      desc: "Overhaul integral de motores diésel de alta potencia, transmisiones powershift y bancos de válvulas bajo estrictos estándares OEM.",
      img: "/images/inicio/bento-reparacion-componente.jpg.jpg",
      href: "/servicios/reparacion-componentes",
      gridClass: "col-span-2 lg:col-span-2"
    }
  ];

  return (
    <main className="flex-1 flex flex-col font-sans bg-white overflow-hidden">
      {/* 1. Hero Section (Slider Dinámico) */}
      <HeroSlider />

      {/* Sección de Valores (Calidad, Confiabilidad, Puntualidad) */}
      <section className="py-16 bg-[#fafafa] border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            
            {/* Calidad */}
            <div className="flex gap-5 items-start">
              <div className="w-20 h-20 flex items-center justify-center hover:scale-105 transition-all duration-300 shrink-0">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/iconos/3.svg"
                    alt="Calidad"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-dark mb-2">Calidad</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Soluciones de mantenimiento y mecanizado con altos estándares de calidad, incluso para los proyectos más complejos.
                </p>
              </div>
            </div>

            {/* Confiabilidad */}
            <div className="flex gap-5 items-start">
              <div className="w-20 h-20 flex items-center justify-center hover:scale-105 transition-all duration-300 shrink-0">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/iconos/1.svg"
                    alt="Confiabilidad"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-dark mb-2">Confiabilidad</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Es nuestro principal objetivo; estamos organizados y estructurados para cumplir estrictamente con los compromisos adquiridos con nuestros clientes.
                </p>
              </div>
            </div>

            {/* Puntualidad */}
            <div className="flex gap-5 items-start">
              <div className="w-20 h-20 flex items-center justify-center hover:scale-105 transition-all duration-300 shrink-0">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/iconos/2.svg"
                    alt="Puntualidad"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-dark mb-2">Puntualidad</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Toda nuestra organización está orientada y optimizada para gestionar los requerimientos en los tiempos previstos, desde los más simples hasta los más estructurados.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Bento Grid Services Section (Ferreyros / CAT Style) */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-light text-dark uppercase tracking-tight">
                Catálogo <span className="font-bold text-dark">Integral</span>
              </h2>
              <div className="w-16 h-1 bg-primary mt-3 mb-6" aria-hidden="true"></div>
              <p className="text-gray-500 font-light text-lg">
                Soluciones completas de ingeniería y suministro de repuestos para garantizar la máxima disponibilidad mecánica de su maquinaria pesada.
              </p>
            </div>
            <Link href="/servicios" className="text-sm font-bold text-dark hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">
              Explorar Capacidades &rarr;
            </Link>
          </div>

          {/* Grid Asimétrico (Bento Layout Inteligente: 2 col en móvil, 4 en escritorio) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {solucionesBento.map((solucion, i) => (
              <Link 
                key={i} 
                href={solucion.href} 
                className={`group relative h-[210px] sm:h-[250px] md:h-[300px] lg:h-[315px] overflow-hidden bg-dark block ${solucion.gridClass}`}
              >
                {/* Imagen de Fondo */}
                <Image 
                  src={solucion.img} 
                  alt={solucion.title} 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
                />
                
                {/* Degradado para Legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/25 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Banda Deslizante Ultra Translúcida (Cristal Fino) */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/15 backdrop-blur-[3px] transform translate-y-[calc(100%-52px)] md:translate-y-[calc(100%-66px)] group-hover:translate-y-0 transition-all duration-500 ease-in-out z-10 border-t border-white/20 group-hover:border-primary group-hover:bg-dark/70">
                  {/* Encabezado (Siempre Visible) */}
                  <div className="flex justify-between items-center h-[52px] md:h-[66px] px-3.5 sm:px-5 md:px-7">
                     <h3 className="font-medium text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2 pr-1">
                        {solucion.title}
                     </h3>
                     <Plus className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-primary transition-all duration-500 transform group-hover:rotate-90 shrink-0 ml-2" />
                  </div>
                  
                  {/* Descripción Expandible */}
                  <div className="px-3.5 sm:px-5 md:px-7 pb-4 md:pb-6 pt-1 md:pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                     <p className="text-xs md:text-sm font-light text-gray-200 leading-relaxed line-clamp-3 md:line-clamp-4">
                        {solucion.desc}
                     </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias y Artículos Técnicos (Blog) */}
      <HomeNews />

      {/* 3. Indicadores de Confianza */}
      <section className="bg-white py-10 sm:py-14 md:py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-0 md:divide-x md:divide-gray-100 text-center">
            
            {/* Item 1 */}
            <div className="p-2 sm:p-4 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative mb-3 sm:mb-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/iconos/8.svg"
                  alt="Técnicos Especializados"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-dark mb-1">100%</h4>
              <p className="text-gray-500 font-light text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest">Técnicos Especializados</p>
            </div>
            
            {/* Item 2 */}
            <div className="p-2 sm:p-4 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative mb-3 sm:mb-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/iconos/6.svg"
                  alt="Soporte en Campo"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-dark mb-1">24/7</h4>
              <p className="text-gray-500 font-light text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest">Soporte en Campo</p>
            </div>
            
            {/* Item 3 */}
            <div className="p-2 sm:p-4 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative mb-3 sm:mb-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/iconos/5.svg"
                  alt="Equipos Atendidos"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-dark mb-1">500+</h4>
              <p className="text-gray-500 font-light text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest">Equipos Atendidos</p>
            </div>
            
            {/* Item 4 */}
            <div className="p-2 sm:p-4 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative mb-3 sm:mb-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/iconos/4.svg"
                  alt="Estándares Globales"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-dark mb-1">ISO</h4>
              <p className="text-gray-500 font-light text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest">Estándares Globales</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Preguntas Frecuentes (FAQ) */}
      <HomeFAQ />

      {/* 5. Brand Marquee Slider */}
      <BrandSlider logoNumbers={[10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 24, 1, 2, 3, 4, 8, 7]} />
    </main>
  );
}

