"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  category: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
  overlayClass: string;
}

const slides: Slide[] = [
  {
    id: 1,
    category: "Rendimiento Industrial",
    title: "Kit de",
    highlight: "Mantenimiento",
    description: "Encuentra la mejor opción en repuestos para mantenimientos preventivos, correctivos de tu maquinaria pesada y equipos industriales.",
    ctaText: "+ INFORMACIÓN",
    ctaLink: "/repuestos/mantenimiento",
    image: "/images/13.jpg",
    alt: "Kits de mantenimiento y repuestos originales",
    overlayClass: "bg-gradient-to-t from-dark/45 via-transparent to-transparent"
  },
  {
    id: 2,
    category: "Suministro y Logística",
    title: "Repuestos",
    highlight: "Originales y Alternativos",
    description: "Amplio stock permanente de componentes de alta rotación, elementos de desgaste y filtración certificada para evitar paradas no programadas.",
    ctaText: "+ INFORMACIÓN",
    ctaLink: "/repuestos",
    image: "/images/55.jpg",
    alt: "Filtros y lubricantes originales y alternativos Caterpillar",
    overlayClass: "bg-gradient-to-t from-dark/25 via-transparent to-transparent"
  },
  {
    id: 3,
    category: "Disponibilidad Operativa 24/7",
    title: "Gestión y Control de",
    highlight: "Flota",
    description: "Planificación por horómetro, confiabilidad electromecánica y soporte técnico en campo para maximizar el rendimiento en obra y minería.",
    ctaText: "+ INFORMACIÓN",
    ctaLink: "/servicios/gestion-flota",
    image: "/images/40.jpg",
    alt: "Excavadora pesada en operación de movimiento de tierras y minería",
    overlayClass: "bg-gradient-to-t from-dark/30 via-transparent to-transparent"
  },
  {
    id: 4,
    category: "SOPORTE TÉCNICO",
    title: "Mantenimiento",
    highlight: "Preventivo y Correctivo",
    description: "Diagnóstico computarizado, análisis SOS de fluidos, calibración de inyección y overhaul integral bajo estándares de fabricante.",
    ctaText: "+ INFORMACIÓN",
    ctaLink: "/servicios/mantenimiento-preventivo",
    image: "/images/9.jpg",
    alt: "Sistema de inyección diésel y mantenimiento de motores pesados",
    overlayClass: "bg-gradient-to-t from-dark/30 via-transparent to-transparent"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Autoplay con temporizador de 6 segundos
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, current]);

  // Soporte de navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div 
      className="relative overflow-hidden min-h-[520px] md:min-h-[660px] lg:min-h-[720px] flex items-center bg-dark select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides (Fondos con Transición Suave Cross-Fade) */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Imagen de Fondo en Alta Definición (2400x1350 nativo) */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized={true}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Capa de Transparencia Suave: Mantiene las imágenes claras y vivas */}
            <div className={`absolute inset-0 ${slide.overlayClass}`} aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(11,15,25,0.35)_0%,_transparent_75%)] pointer-events-none" aria-hidden="true" />

            {/* Contenido Centrado del Slide */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  
                  {/* Categoría / Subtítulo */}
                  <p 
                    className={`text-primary font-bold tracking-[0.3em] text-[11px] md:text-xs uppercase mb-3 md:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all duration-700 delay-100 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    {slide.category}
                  </p>

                  {/* Título Principal */}
                  <h1 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight leading-tight mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-all duration-700 delay-200 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <span className="block font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">{slide.title}</span>
                    <span className="text-primary block font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">{slide.highlight}</span>
                  </h1>

                  {/* Descripción */}
                  <p 
                    className={`text-sm sm:text-base md:text-lg font-normal text-white max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] transition-all duration-700 delay-300 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* Botón de Acción */}
                  <div 
                    className={`transition-all duration-700 delay-400 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <Link 
                      href={slide.ctaLink} 
                      className="bg-dark/60 backdrop-blur-sm border-2 border-primary text-primary hover:bg-primary hover:text-dark font-bold px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 inline-block shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(252,179,38,0.5)] cursor-pointer"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        );
      })}

      {/* Flechas de Navegación Lateral */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3.5 rounded-full bg-dark/40 hover:bg-primary text-white hover:text-dark border border-white/20 hover:border-primary backdrop-blur-sm transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente slide"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3.5 rounded-full bg-dark/40 hover:bg-primary text-white hover:text-dark border border-white/20 hover:border-primary backdrop-blur-sm transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Paginación Inferior (Indicadores / Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              current === i 
                ? 'w-8 bg-primary shadow-[0_0_10px_rgba(252,179,38,0.6)]' 
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
