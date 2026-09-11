"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Phone, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useSchedulerStore } from '@/modules/Scheduling/store/useSchedulerStore';

export default function TopBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { open } = useSchedulerStore();

  return (
    <div className="bg-dark text-gray-300 text-xs md:text-sm font-sans font-light">
      <div className="flex flex-col md:flex-row justify-between items-stretch">
        
        {/* Mobile Header: Info Toggle + CTA */}
        <div className="md:hidden flex justify-between items-stretch bg-dark w-full">
          {/* Mobile Accordion Toggle (Left) */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-start px-6 text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {/* Yellow CTA Button (Right) */}
          <button 
            onClick={open}
            className="group bg-primary text-dark font-bold uppercase tracking-wide px-6 py-3 flex items-center h-full outline-none no-underline border-none cursor-pointer"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15px 100%)", paddingLeft: "25px" }}
          >
            <div className="flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
              <Calendar className="w-4 h-4" />
              <span>Agendar Visita</span>
            </div>
          </button>
        </div>

        {/* Contact Data (Left side on desktop, accordion on mobile) */}
        <div className={`w-full px-6 py-4 md:py-0 flex-col md:flex-row justify-start gap-4 md:gap-10 items-start md:items-center ${isExpanded ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex items-center gap-2">
            <Clock className="text-primary w-4 h-4" />
            <span className="hidden lg:inline">Lunes a viernes 8:00 - 5:30 y sábado 8:00 - 1:00</span>
            <span className="lg:hidden">Lun-Vie 8-5:30 | Sáb 8-1</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-primary w-4 h-4" />
            <span className="font-medium text-white">+51 977 600 893</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-primary w-4 h-4" />
            <span>Mz. C Lote 12A, Sector Sumac Pacha - Lurin - Lima</span>
          </div>
        </div>
        
        {/* Desktop CTA Button (Right) */}
        <div className="hidden md:flex shrink-0 bg-dark">
          <button 
            onClick={open}
            className="group bg-primary text-dark font-bold uppercase tracking-wide px-8 py-3 flex items-center h-full outline-none no-underline border-none cursor-pointer"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%)", paddingLeft: "35px" }}
          >
            <div className="flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
              <Calendar className="w-4 h-4" />
              <span>Agendar Visita</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
