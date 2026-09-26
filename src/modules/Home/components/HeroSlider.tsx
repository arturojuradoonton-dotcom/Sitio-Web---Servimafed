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
    category: "Ingeniería & Soporte Técnico",
    title: "Overhaul y Reconstrucción de",
    highlight: "Motores Pesados",
    description: "Especialistas en overhaul integral de motores diésel de alta potencia, calibración de sistemas de inyección y pruebas de banco bajo estándares OEM.",
    ctaText: "+ Información",
    ctaLink: "/servicios/reparacion-componentes",
    image: "/images/9.jpg",
    alt: "Sistema de inyección diésel y motor de maquinaria pesada Servimafed",
    overlayClass: "bg-gradient-to-t from-dark/95 via-dark/70 to-dark/45"
  },
  {
    id: 2,
    category: "Disponibilidad Mecánica 24/7",
    title: "Mantenimiento Integral de",
    highlight: "Maquinaria Pesada",
    description: "Soporte técnico integral en campo y taller para flotas de minería y construcción. Maximizamos el tiempo operativo y la confiabilidad de sus equipos.",
    ctaText: "Nuestros Servicios",
    ctaLink: "/servicios",
    image: "/images/40.jpg",
    alt: "Excavadora Volvo en operación de minería y movimiento de tierras",
    overlayClass: "bg-gradient-to-t from-dark/95 via-dark/70 to-dark/50"
  },
  {
    id: 3,
    category: "Suministro & Logística de Precisión",
    title: "Repuestos Originales y",
    highlight: "Filtración CAT",
    description: "Inventario permanente de filtros de aceite, combustible, lubricantes certificados y componentes de alto rendimiento para garantizar cero paradas imprevistas.",
    ctaText: "Catálogo de Repuestos",
    ctaLink: "/repuestos",
    image: "/images/55.jpg",
    alt: "Filtros y lubricantes originales Caterpillar",
    overlayClass: "bg-gradient-to-t from-dark/95 via-dark/70 to-dark/45"
  },
  {
    id: 4,
    category: "Línea Volvo Genuine Parts & Fluidos",
    title: "Kits de Mantenimiento y",
    highlight: "Lubricantes Certificados",
    description: "Filtros hidráulicos, aceites para motor VDS y fluidos de alta especificación para proteger la vida útil y eficiencia de sus sistemas motrices e hidráulicos.",
    ctaText: "Consultar Disponibilidad",
    ctaLink: "/contacto",
    image: "/images/13.jpg",
    alt: "Línea de filtros y lubricantes originales Volvo",
    overlayClass: "bg-gradient-to-t from-dark/95 via-dark/80 to-dark/60"
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
            {/* Imagen de Fondo en Alta Definición (1920x1080 nativo) */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized={true}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Capa de Degradado para Contraste y Legibilidad */}
            <div className={`absolute inset-0 ${slide.overlayClass}`} aria-hidden="true" />
            <div className="absolute inset-0 bg-dark/25" aria-hidden="true" />

            {/* Contenido Centrado del Slide */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  
                  {/* Categoría / Subtítulo */}
                  <p 
                    className={`text-primary font-semibold tracking-[0.3em] text-[11px] md:text-xs uppercase mb-3 md:mb-4 transition-all duration-700 delay-100 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    {slide.category}
                  </p>

                  {/* Título Principal */}
                  <h1 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight leading-tight mb-4 md:mb-6 transition-all duration-700 delay-200 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <span className="block font-light text-gray-100">{slide.title}</span>
                    <span className="text-primary block font-black">{slide.highlight}</span>
                  </h1>

                  {/* Descripción */}
                  <p 
                    className={`text-sm sm:text-base md:text-lg font-light text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 transition-all duration-700 delay-300 ${
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
                      className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-dark font-bold px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 inline-block shadow-lg"
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
