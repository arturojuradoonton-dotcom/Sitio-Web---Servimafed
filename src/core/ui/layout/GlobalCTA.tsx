"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSchedulerStore } from '@/modules/Scheduling/store/useSchedulerStore';
import { Calendar, Phone } from 'lucide-react';
import Image from 'next/image';

export default function GlobalCTA() {
  const pathname = usePathname();
  const { open } = useSchedulerStore();

  // Define routes where we do NOT want to render the global CTA
  const excludedRoutes = [
    '/contacto',
    '/libro-reclamaciones',
    '/politicas',
    '/not-found',
    '/_not-found'
  ];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <section className="relative py-24 bg-[#f8fafc] text-dark border-y border-gray-100 overflow-hidden shrink-0">
      {/* Background Image: Mapa del Perú como marca de agua */}
      <div className="absolute inset-0 z-0 flex items-center justify-start lg:justify-center opacity-5 pointer-events-none">
        <Image 
          src="/images/mapa-peru-punteado.svg" 
          alt="Cobertura Nacional" 
          width={800}
          height={800}
          className="object-contain w-[120%] lg:w-[60%] h-full mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Section */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block">
              Soporte Técnico de Campo & Taller Autorizado
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-dark uppercase tracking-tight leading-tight">
              ¿Maquinaria detenida o <span className="font-bold text-primary">mantenimiento planificado?</span>
            </h2>
            <p className="text-gray-500 font-light text-base md:text-lg max-w-3xl leading-relaxed">
              Minimice los tiempos improductivos y maximice el rendimiento de sus equipos pesados. Nuestro equipo técnico certificado atiende sus requerimientos con despacho express a nivel nacional 24/7.
            </p>
          </div>

          {/* Action Buttons Section */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:items-end justify-center lg:justify-end">
            
            {/* Main Action Button - Opens Modal */}
            <button
              onClick={open}
              className="bg-primary text-dark font-bold px-8 py-4 uppercase tracking-widest text-xs hover:bg-dark hover:text-white transition-all shadow-md flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              Agendar Visita Técnica
            </button>

            {/* Secondary Action Button - Direct Call */}
            <a
              href="tel:+51993667182"
              className="bg-transparent border border-gray-300 hover:border-dark text-dark font-bold px-8 py-4 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-primary" />
              Llamada de Emergencia
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
