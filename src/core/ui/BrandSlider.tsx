"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface BrandSliderProps {
  title?: string;
  subtitle?: string;
  logoNumbers?: number[];
}

const defaultLogoNumbers = Array.from({ length: 24 }, (_, i) => i + 1);

export default function BrandSlider({
  title = "Marcas Atendidas",
  subtitle = "Trabajamos con las principales marcas y modelos de equipos pesados.",
  logoNumbers = defaultLogoNumbers
}: BrandSliderProps) {
  
  const words = title.trim().split(/\s+/);
  const splitIndex = words.length > 2 ? Math.ceil(words.length / 2) : 1;
  const firstPart = words.slice(0, splitIndex).join(" ");
  const lastPart = words.slice(splitIndex).join(" ");

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
      <div className="container mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-light text-dark uppercase tracking-tight">
          {firstPart}{" "}
          {lastPart && <span className="font-bold text-primary">{lastPart}</span>}
        </h2>
        <div className="w-12 h-1 bg-primary mt-3 mb-4" aria-hidden="true"></div>
        <p className="text-gray-500 font-light text-sm md:text-base max-w-3xl">
          {subtitle}
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
                    unoptimized
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
