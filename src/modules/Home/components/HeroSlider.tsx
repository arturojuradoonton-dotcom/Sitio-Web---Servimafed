"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wrench, Cpu, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useSchedulerStore } from '@/modules/Scheduling/store/useSchedulerStore';

export default function HeroSlider() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { open } = useSchedulerStore();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[580px] md:min-h-[700px] lg:min-h-[740px] flex items-center bg-dark">
      {/* 1. Fondo Fotográfico Cinematográfico en Alta Definición (Carga Inmediata) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/inicio/hero-workshop-main.jpg"
          alt="Taller de Mantenimiento de Maquinaria Pesada Servimafed"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01] transition-transform duration-1000"
        />
      </div>

      {/* 2. Degradados Técnicos para Máxima Legibilidad y Profundidad */}
      {/* Sombreado Lateral (Oscuro en la izquierda para el texto, despejado a la derecha para ver la máquina) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-dark via-dark/85 md:via-dark/70 to-dark/30 md:to-transparent" 
        aria-hidden="true"
      />
      {/* Sombreado Vertical Suave */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-dark/90 via-transparent to-dark/40" 
        aria-hidden="true"
      />

      {/* 3. Contenido Principal */}
      <div className="container mx-auto px-6 relative z-20 py-16 md:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Badge de Estado en Vivo */}
          <div 
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark/70 border border-primary/40 backdrop-blur-md text-[11px] md:text-xs font-bold tracking-widest uppercase text-primary mb-6 transition-all duration-700 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>Soporte Técnico Activo 24/7 en Mina & Campo</span>
          </div>

          {/* Titular Imponente */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] mb-5 transition-all duration-700 delay-150 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Mantenimiento Integral
            <span className="text-primary block mt-1 font-black">
              & Overhaul Pesado
            </span>
          </h1>

          {/* Subtítulo Refinado (Espacioso y con aire) */}
          <p 
            className={`text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mb-8 transition-all duration-700 delay-300 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Ingeniería de precisión y servicio in situ para maquinaria de minería y construcción. Maximizamos el tiempo medio entre fallas y la disponibilidad mecánica de tus activos críticos.
          </p>

          {/* 3 Indicadores Técnicos Clave en Una Sola Línea Horizontal (Cero Saturación) */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mb-10 border-t border-white/10 max-w-2xl transition-all duration-700 delay-500 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-primary shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-gray-200 tracking-wide uppercase">
                Overhaul OEM
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-primary shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-gray-200 tracking-wide uppercase">
                Diagnóstico ECM
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-gray-200 tracking-wide uppercase">
                Respuesta &lt; 2h
              </span>
            </div>
          </div>

          {/* Botones de Acción (Dual CTA) */}
          <div 
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-700 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Botón Principal (Abre Modal de Agendar Visita) */}
            <button
              onClick={open}
              className="group bg-primary text-dark font-black text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-sm shadow-[0_10px_25px_rgba(252,179,38,0.35)] hover:shadow-[0_14px_35px_rgba(252,179,38,0.55)] hover:bg-[#ffbe3b] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 cursor-pointer outline-none border-none"
            >
              <Calendar className="w-4 h-4 text-dark" />
              <span>Solicitar Evaluación</span>
            </button>

            {/* Botón Secundario (Explorar Servicios) */}
            <Link
              href="/servicios"
              className="group inline-flex items-center gap-2.5 border border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/50 text-white font-bold text-xs md:text-sm uppercase tracking-widest px-7 py-4 rounded-sm backdrop-blur-sm transition-all duration-300"
            >
              <span>Ver Capacidades</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
