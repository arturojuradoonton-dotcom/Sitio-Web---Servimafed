"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface BrandSliderProps {
  title?: string;
  logoNumbers?: number[];
}

const defaultLogoNumbers = Array.from({ length: 24 }, (_, i) => i + 1);

export default function BrandSlider({
  title = "Especialistas Multimarca en Equipos de Alto Rendimiento",
  logoNumbers = defaultLogoNumbers
}: BrandSliderProps) {
  
  const brands = logoNumbers.map((num) => ({
    name: `Marca Especializada ${num}`,
    src: `/images/Web - Marcas/${num}.svg`
  }));

  // Configuración del carrusel con paradas y tiempo mínimo (3.5 segundos)
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1
    }, 
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  return (
    <section className="bg-white py-16 border-t border-b border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-dark mb-4 uppercase tracking-tight relative pb-4 md:pb-0">
          <span className="relative inline-block md:pb-2">
            Marcas
            <span className="hidden md:block absolute bottom-0 left-0 w-[60%] h-[4px] bg-primary"></span>
          </span>{" "}
          <span className="font-bold text-dark">Atendidas</span>
          <span className="block md:hidden absolute bottom-0 left-0 w-16 h-[4px] bg-primary"></span>
        </h2>
        <p className="text-gray-500 font-light text-sm md:text-base mt-2">
          Trabajamos con todas las marcas y modelos de equipos pesados.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center">
            {brands.map((brand, i) => (
              <div 
                key={i} 
                className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 px-4 flex items-center justify-center"
              >
                <div className="w-full h-40 relative flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer transform scale-125">
                  <Image 
                    src={brand.src} 
                    alt={brand.name} 
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
