"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const typeWords = [
  "Mantenimiento Preventivo",
  "Overhaul de Motores",
  "Diagnóstico en Campo",
  "Suministro de Repuestos"
];

export default function HeroSlider() {
  const [mountVideo, setMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Typewriter State
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setMountVideo(true);
  }, []);

  // Lógica del Typewriter Effect - Difuminación en lugar de borrado
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = typeWords[wordIndex];
    
    if (isFadingOut) {
      // Espera 600ms para que la animación de fade-out de CSS termine
      timeout = setTimeout(() => {
        setText('');
        setIsFadingOut(false);
        setWordIndex((prev) => (prev + 1) % typeWords.length);
      }, 600); 
    } else {
      if (text.length === currentWord.length) {
        timeout = setTimeout(() => setIsFadingOut(true), 4000); // Pausa larga de 4 segundos al completar
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, 120); // Velocidad de escritura
      }
    }
    return () => clearTimeout(timeout);
  }, [text, isFadingOut, wordIndex]);

  useEffect(() => {
    if (mountVideo && videoRef.current) {
      const videoElement = videoRef.current;
      const playVideo = async () => {
        try {
          videoElement.muted = true;
          await videoElement.play();
          setVideoReady(true);
        } catch (error) {
          console.warn("Autoplay bloqueado:", error);
          setVideoReady(false);
        }
      };
      playVideo();
    }
  }, [mountVideo]);

  return (
    <div className="relative overflow-hidden min-h-[500px] md:min-h-[750px] bg-dark">
      {/* Video de Fondo Global */}
      {mountVideo && (
        <video
          ref={videoRef}
          src="/videos/hero-machinery-new.mp4"
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out pointer-events-none ${
            videoReady ? 'opacity-90 z-0' : 'opacity-0 z-0'
          }`}
        />
      )}

      {/* Degradado Suave (Permite ver el video claramente) */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent z-10 pointer-events-none"></div>
      
      {/* Contenido del Slide - Estructura original pero centrada */}
      <div className="absolute inset-0 w-full h-full flex items-center z-20">
        <div className="container mx-auto px-6 relative flex flex-col w-full">
          <div className="max-w-4xl flex flex-col items-center text-center mx-auto">
            
            {/* Subtítulo Original */}
            <p 
              className={`text-primary font-semibold tracking-[0.3em] text-[11px] md:text-xs uppercase mb-4 md:mb-6 transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Ingeniería & Soporte Técnico
            </p>

            {/* Título Original con Typewriter */}
            <h1 
              className={`text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight uppercase tracking-tight transition-all duration-1000 ease-out min-h-[100px] md:min-h-[140px] flex flex-col justify-center ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="block mb-2 font-light text-gray-100">Soluciones Expertas</span>
              <span className={`text-primary font-bold block transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                {text}
                <span className="animate-pulse border-r-4 border-primary ml-1 h-[80%] inline-block align-middle"></span>
              </span>
            </h1>

            {/* Descripción Original */}
            <p 
              className={`text-sm md:text-lg font-light mb-8 md:mb-10 text-gray-300 max-w-xl leading-relaxed transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              Especialistas en overhauls de motores, diagnóstico avanzado, soporte técnico en campo y suministro de repuestos OEM. Maximizamos la disponibilidad mecánica de tu flota.
            </p>

            {/* Botón Ghost Original */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Link href="/servicios" className="bg-transparent border-2 border-primary text-primary font-bold px-8 md:px-10 py-3 md:py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-dark inline-block">
                + Información
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
