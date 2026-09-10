"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "¡Sin duda recomendaría SERVIMAFED a cualquiera! Muy profesionales y confiables. El mejor servicio al cliente y precios razonables. De ahora en adelante, será mi taller de confianza. El servicio al cliente fue increíble, ¡y fueron muy amables y conocedores!",
    name: "Rachel Bell",
    role: "fotógrafa industrial",
    company: "",
    rating: 5,
    image: "/images/testimonio/1.jpg",
  },
  {
    quote: "La rapidez con la que SERVIMAFED realiza el overhaul de componentes mayores y despacha repuestos OEM para nuestras excavadoras CAT ha sido clave para cumplir nuestras metas de producción en Las Bambas.",
    name: "Carlos Mendoza",
    role: "Superintendente de Flota Pesada",
    company: "Minera Las Bambas",
    rating: 5,
    image: "/images/testimonio/2.jpg",
  },
  {
    quote: "Impecable servicio de soldadura y recuperación estructural pesada. Reconstruyeron los cucharones de nuestras cargadoras bajo planos originales utilizando planchas Hardox 500 de alta resistencia.",
    name: "Elena Rojas",
    role: "Supervisora HSE & Activos",
    company: "Consorcio Vial del Sur",
    rating: 5,
    image: "/images/testimonio/3.jpg",
  },
  {
    quote: "Su unidad de diagnóstico electrónico móvil acudió a nuestra obra en Ate en menos de 2 horas. Solucionaron una falla crítica en el ECM de un tractor D8T que nos estaba costando miles de dólares.",
    name: "Mateo Silva",
    role: "Jefe de Mantenimiento de Maquinaria",
    company: "Constructora Alfa S.A.C.",
    rating: 5,
    image: "/images/testimonio/4.jpg",
  }
];

export function HomeTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[activeIndex];

  return (
    <section className="py-24 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-6">
        {/* items-end → both columns align at the BOTTOM, so the taller image overflows upward */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 items-end">

          {/* ── LEFT: Image column (col-span-5, h-[480px]) ────────── */}
          <div className="lg:col-span-5 relative z-0">
            <div className="relative h-[320px] lg:h-[480px] w-full overflow-hidden shadow-lg">
              <Image
                src={active.image}
                alt="Opiniones de los clientes - SERVIMAFED"
                fill
                priority
                className="object-cover object-top transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>

          {/* ── RIGHT: Content card (col-span-7, h-[420px], overlaps image, in front) ── */}
          <div className="lg:col-span-7 bg-white relative flex flex-col justify-between z-10 lg:-ml-10 shadow-xl border border-gray-100/60 mt-6 lg:mt-0 lg:h-[420px] overflow-visible">
            
            {/* Quote bubble — inside the card (z-10, overflow-visible) so it renders on top of the image boundary */}
            <div className="absolute top-6 -left-6 w-12 h-12 bg-[#4e4e4e] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg z-30 hidden lg:flex">
              <Quote className="w-4 h-4 fill-white text-white" />
            </div>

            {/* Inner padding */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">

              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight mb-1">
                  Opiniones de los clientes
                </h3>

                {/* Stars */}
                <div className="flex gap-1 text-[#f59e0b] mt-3 mb-5">
                  {[...Array(active.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b] stroke-0" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed mb-4 line-clamp-4 lg:line-clamp-3">
                  {active.quote}
                </p>

                {/* Signature */}
                <div className="text-sm sm:text-base">
                  <span className="text-[#f59e0b] font-bold">
                    – {active.name}
                  </span>
                  <span className="text-gray-500 font-normal">
                    , {active.role.toLowerCase()}{active.company ? ` en ${active.company}` : ''}
                  </span>
                </div>
              </div>

              {/* Navigation Controls & Watermark */}
              <div className="flex items-center justify-between pt-2 relative">
                
                {/* Chevron Controls */}
                <div className="flex gap-6">
                  <button
                    onClick={handlePrev}
                    aria-label="Testimonio anterior"
                    className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer p-1"
                  >
                    <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Siguiente testimonio"
                    className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer p-1"
                  >
                    <ChevronRight className="w-7 h-7 stroke-[2.5]" />
                  </button>
                </div>

                {/* Watermark slide number */}
                <div className="text-[8rem] font-bold text-gray-100 select-none pointer-events-none font-sans leading-none translate-y-6 translate-x-2">
                  {activeIndex + 1}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
