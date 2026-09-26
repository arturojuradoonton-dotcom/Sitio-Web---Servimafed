'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Tiempo que dura la pantalla de carga (1500ms = 1.5 segundos)
    const timer = setTimeout(() => {
      setFading(true); // Inicia la transición de desvanecimiento
      // 500ms después se remueve completamente del código (para que no estorbe los clics)
      setTimeout(() => setLoading(false), 500); 
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#fafafa] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
        {/* Usamos unoptimized={true} para que Next.js no congele la animación del GIF */}
        <Image 
          src="/images/loader-yellow.gif" 
          alt="Cargando Servimafed..." 
          fill
          unoptimized={true}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
