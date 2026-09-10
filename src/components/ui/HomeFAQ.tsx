"use client";

import React, { useState } from 'react';
import { Plus, Minus, FileText, Download } from 'lucide-react';

const faqs = [
  {
    question: "¿Atienden emergencias mecánicas en campo o solo en taller?",
    answer: "Contamos con unidades móviles equipadas para brindar soporte técnico, evaluación y diagnósticos directamente en campo (minas, obras y campamentos), además de nuestros talleres especializados para reparaciones mayores (overhaul) y mecanizado."
  },
  {
    question: "¿Qué marcas de maquinaria pesada atienden?",
    answer: "Somos especialistas multimarca. Tenemos amplia experiencia interviniendo equipos Caterpillar, Komatsu, Volvo, Sandvik y John Deere, operando siempre bajo los estándares estrictos y manuales del fabricante (OEM)."
  },
  {
    question: "¿Tienen garantía los repuestos y reparaciones?",
    answer: "Sí. Todos los componentes reparados en nuestro taller y los repuestos que suministramos pasan por un riguroso control de calidad y cuentan con garantía documentada contra defectos de fábrica o fallas de ensamblaje."
  },
  {
    question: "¿Realizan importación directa de repuestos críticos?",
    answer: "Absolutamente. Si un elemento de desgaste, filtro o componente mayor no se encuentra en nuestro inventario local, gestionamos importaciones express a través de nuestra red logística global para minimizar el tiempo de inactividad (downtime) de su flota."
  }
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Lado Izquierdo: Información y Soporte */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-light text-dark uppercase tracking-tight">
              Preguntas <span className="font-bold text-dark">Frecuentes</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-3 mb-6" aria-hidden="true"></div>
            <p className="text-gray-500 font-light text-sm md:text-base mb-10 leading-relaxed">
              Resolvemos sus dudas operativas de forma ágil y transparente. Aquí respondemos a las consultas más comunes de nuestros clientes en el sector industrial, minero y construcción.
            </p>

            {/* Caja de Descarga Brochure */}
            <div className="bg-dark p-8 border-l-4 border-primary relative overflow-hidden group shadow-lg">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-lg tracking-wide">Brochure Corporativo</h3>
                </div>
                <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">
                  Descarga nuestro brochure técnico y conoce a detalle todas nuestras certificaciones, infraestructura y capacidad operativa en formato PDF.
                </p>
                <a 
                  href="/brochure-servimafed.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
                >
                  Descargar PDF <Download className="w-4 h-4" />
                </a>
              </div>
              {/* Decoración de fondo */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Lado Derecho: Acordeón de Preguntas */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border border-gray-200 bg-[#f8fafc] transition-all duration-300 ${
                    openIndex === index ? 'shadow-md border-primary/50 bg-white' : 'hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left focus:outline-none"
                  >
                    <span className={`font-bold text-sm md:text-base pr-8 transition-colors duration-300 ${
                      openIndex === index ? 'text-primary' : 'text-dark'
                    }`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-gray-400">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 transition-transform duration-300 group-hover:text-dark" />
                      )}
                    </span>
                  </button>
                  
                  {/* Contenido (Respuesta) */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
