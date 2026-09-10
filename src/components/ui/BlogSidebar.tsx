"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Calendar } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blogData";
import type { BlogPost } from "@/data/blogData";

interface BlogSidebarProps {
  relatedPosts: BlogPost[];
  archiveMonths: { label: string; yearMonth: string; count: number }[];
}

export default function BlogSidebar({ relatedPosts, archiveMonths }: BlogSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para el año y mes del calendario (Inicia en Mayo 2026 por las fechas de los artículos)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); // 0-indexed (4 = Mayo)

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const shortMonthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Calcular días en el mes actual
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Calcular día de la semana del primer día del mes (Ajustado para que Lunes = 0, Domingo = 6)
  const rawFirstDay = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayIndex = rawFirstDay === 0 ? 6 : rawFirstDay - 1;

  const daysArray = [];
  // Celdas vacías del mes anterior para alineación
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const prevMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1;
  const nextMonthIndex = currentMonth === 11 ? 0 : currentMonth + 1;

  // Obtener las 8 etiquetas más populares y frecuentes
  const allTags = blogPosts.flatMap((p) => p.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/blog?q=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <aside className="lg:col-span-4 space-y-10">
      {/* Search */}
      <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
        <h3 className="font-bold text-dark text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
          Buscar
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 px-4 py-3 pr-12 text-sm font-light text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-primary transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
        <h3 className="font-bold text-dark text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
          Categorías
        </h3>
        <ul className="space-y-3">
          {blogCategories.map((cat, i) => {
            const count = blogPosts.filter((p) => p.category === cat).length;
            return (
              <li key={i}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="flex items-center justify-between text-gray-500 hover:text-primary transition-colors text-sm font-light group"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-primary transition-colors" />
                    {cat}
                  </span>
                  <span className="text-gray-300 text-xs font-bold">
                    ({count})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Archive (Visual Calendar Grid style) */}
      <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
        <h3 className="font-bold text-dark text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
          Archivo
        </h3>
        
        {/* Contenedor del Calendario */}
        <div className="bg-white p-6 border border-gray-200/60 rounded-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-dark text-sm tracking-wide uppercase select-none">
              {monthNames[currentMonth]} {currentYear}
            </span>
          </div>
          
          {/* Cuadrícula del Calendario */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden text-center text-[10px]">
            {/* Cabeceras de los Días de la Semana */}
            {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
              <div key={idx} className="bg-gray-50 text-gray-500 font-bold py-2 uppercase select-none">
                {day}
              </div>
            ))}
            
            {/* Días del Mes */}
            {daysArray.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="bg-white py-2 text-transparent select-none">&nbsp;</div>;
              }
              
              // Destacar el día actual: 24 de Mayo de 2026
              const isHighlighted = day === 24 && currentMonth === 4 && currentYear === 2026;
              const monthString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
              
              return (
                <Link
                  key={idx}
                  href={`/blog?archive=${monthString}`}
                  className={`bg-white py-2 transition-colors cursor-pointer hover:bg-primary/20 block font-light ${
                    isHighlighted 
                      ? "bg-primary! text-dark font-extrabold" 
                      : "text-gray-600"
                  }`}
                >
                  {day}
                </Link>
              );
            })}
          </div>
          
          {/* Navegación del Pie */}
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100 text-xs">
            <button
              onClick={handlePrevMonth}
              className="text-gray-400 hover:text-primary transition-colors cursor-pointer flex items-center gap-1 select-none font-medium bg-transparent border-0 animate-none"
            >
              &laquo; {shortMonthNames[prevMonthIndex]}
            </button>
            <button
              onClick={handleNextMonth}
              className="text-gray-400 hover:text-primary transition-colors cursor-pointer flex items-center gap-1 select-none font-medium bg-transparent border-0 animate-none"
            >
              {shortMonthNames[nextMonthIndex]} &raquo;
            </button>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
        <h3 className="font-bold text-dark text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
          Publicaciones Recientes
        </h3>
        <div className="space-y-6">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="flex gap-4 group"
            >
              <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm bg-gray-200">
                <Image
                  src={related.img}
                  alt={related.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  {related.date}
                </span>
                <h4 className="text-sm font-bold text-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {related.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud (Top 8 most popular tags) */}
      <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
        <h3 className="font-bold text-dark text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-3">
          Etiquetas
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(
            (tag, i) => (
              <Link
                key={i}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 hover:bg-primary hover:text-dark hover:border-primary transition-all duration-300 cursor-pointer"
              >
                {tag}
              </Link>
            )
          )}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-dark p-8 rounded-sm text-center border-t-4 border-primary">
        <h3 className="font-bold text-white text-lg uppercase tracking-wider mb-3">
          ¿Necesita Soporte?
        </h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
          Nuestro equipo técnico está disponible para consultas sobre
          mantenimiento y repuestos.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-primary text-dark font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-white transition-colors w-full"
        >
          Contáctanos
        </Link>
      </div>
    </aside>
  );
}
