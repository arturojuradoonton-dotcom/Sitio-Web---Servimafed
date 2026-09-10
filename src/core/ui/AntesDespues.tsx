'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AntesDespuesProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function AntesDespues({ beforeImage, afterImage, className = '' }: AntesDespuesProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <div className={`relative overflow-hidden select-none aspect-[4/3] w-full bg-[#111111] border border-gray-800 ${className}`}>
      {/* Después (Fondo) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={afterImage} 
          alt="Después" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-dark/90 text-primary border border-primary/45 px-3 py-1.5 text-xs uppercase font-extrabold tracking-widest z-20 shadow-md">
          Después (Restaurado)
        </div>
      </div>

      {/* Antes (Capa Recortada por clip-path) */}
      <div 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image 
          src={beforeImage} 
          alt="Antes" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 left-4 bg-dark/95 text-white border border-gray-700 px-3 py-1.5 text-xs uppercase font-extrabold tracking-widest z-20 shadow-md">
          Antes (Desgaste)
        </div>
      </div>

      {/* Línea Divisora Amarilla y Botón Central de Deslizamiento */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-primary cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary border-2 border-dark flex items-center justify-between px-1.5 shadow-xl">
          <span className="text-dark font-extrabold text-[10px] pointer-events-none select-none">&larr;</span>
          <span className="text-dark font-extrabold text-[10px] pointer-events-none select-none">&rarr;</span>
        </div>
      </div>

      {/* Slider Input Invisible para capturar el arrastre táctil / mouse */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Deslizador Antes y Después"
      />
    </div>
  );
}
