import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench, Settings, Ruler } from 'lucide-react';

const proyectos = [
  {
    title: "Overhaul de Motor CAT 3512",
    sector: "Sector Minería",
    description: "Recuperación total de la operatividad del motor en tiempo récord de 14 días, cumpliendo con todas las especificaciones OEM y pruebas de banco.",
    image: "/images/inicio/bento-reparacion-componente.jpg.jpg",
    icon: <Settings className="w-5 h-5 text-primary" />
  },
  {
    title: "Mantenimiento Integral de Flota",
    sector: "Sector Construcción",
    description: "Ejecución de plan de mantenimiento preventivo para flota de 15 excavadoras, logrando un 95% de disponibilidad mecánica operativa sostenida.",
    image: "/images/inicio/bento-mantenimiento.jpg.jpg",
    icon: <Wrench className="w-5 h-5 text-primary" />
  },
  {
    title: "Mecanizado de Mandos Finales",
    sector: "Movimiento de Tierras",
    description: "Reparación y mecanizado pesado de mandos finales para tractor D8T. Recuperación estructural y ajuste de tolerancias con precisión milimétrica.",
    image: "/images/inicio/bento-mecanizado-soldadura.jpg.jpg",
    icon: <Ruler className="w-5 h-5 text-primary" />
  }
];

export function HomeProjects() {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light text-dark uppercase tracking-tight">
              Casos de <span className="font-bold text-dark">Éxito</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-3 mb-4" aria-hidden="true"></div>
            <p className="text-gray-500 font-light text-sm md:text-base mt-6">
              Nuestra experiencia respaldada por resultados. Descubre cómo ayudamos a optimizar la disponibilidad y confiabilidad de maquinaria pesada en proyectos clave.
            </p>
          </div>
          <Link href="/servicios" className="inline-flex items-center gap-2 text-dark font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors shrink-0">
            Ver Servicios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <div 
              key={index} 
              className="group bg-[#f8fafc] border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
            >
              {/* Imagen del proyecto */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-dark/80 backdrop-blur-sm px-3 py-1 rounded-sm flex items-center gap-2">
                  {proyecto.icon}
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{proyecto.sector}</span>
                </div>
                <Image
                  src={proyecto.image}
                  alt={proyecto.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                  {proyecto.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 flex-1">
                  {proyecto.description}
                </p>
                <div className="w-12 h-1 bg-gray-200 group-hover:bg-primary transition-colors mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
