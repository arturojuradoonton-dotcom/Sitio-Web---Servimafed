"use client";

import { useState } from "react";

import { milestones } from '@/data/timelineData';

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Contenido Seleccionado - Izquierda */}
        <div className="lg:col-span-8 order-2 lg:order-1 relative">
          <div className="bg-white border-l-4 border-primary p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-sm transition-all duration-500 min-h-[300px] flex flex-col justify-center text-left">
            <span className="text-primary/10 font-extrabold text-7xl md:text-8xl tracking-tighter select-none absolute top-4 right-8 z-0">
              {milestones[activeIndex].year}
            </span>
            <div className="relative z-10">
              <h4 className="font-bold text-dark text-2xl md:text-3xl uppercase tracking-wide mb-6">
                {milestones[activeIndex].title}
              </h4>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-gray-500 font-light text-lg md:text-xl leading-relaxed">
                {milestones[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Selector Vertical - Derecha */}
        <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end py-8">
          <div className="relative border-l-[3px] border-gray-200 ml-4 py-2 space-y-14">
            {milestones.map((m, i) => {
              const isActive = activeIndex === i;
              return (
                <div 
                  key={m.year} 
                  className="relative flex items-center cursor-pointer group" 
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Punto en la línea */}
                  <div 
                    className={`absolute rounded-full bg-white transition-all duration-300 flex items-center justify-center
                      ${isActive 
                        ? '-left-[13px] w-6 h-6 border-2 border-primary' 
                        : '-left-[9px] w-4 h-4 border-2 border-gray-300 group-hover:border-primary'
                      }`}
                  >
                    {isActive && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                  
                  {/* Texto del año */}
                  <span 
                    className={`ml-10 font-bold text-2xl md:text-3xl tracking-widest transition-colors duration-300 
                      ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-dark'}`}
                  >
                    {m.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
