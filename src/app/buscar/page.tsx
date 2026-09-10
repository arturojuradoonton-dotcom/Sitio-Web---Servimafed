"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, FileQuestion } from 'lucide-react';
import { serviciosData } from '@/data/serviciosData';
import { repuestosData } from '@/data/repuestosData';
import { Suspense } from 'react';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  Object.entries(serviciosData).forEach(([slug, data]) => {
    results.push({
      title: data.title,
      description: data.subtitle,
      href: `/servicios/${slug}`,
      category: 'Servicio',
    });
    data.benefits.forEach((benefit) => {
      results.push({
        title: benefit.title,
        description: benefit.desc,
        href: `/servicios/${slug}`,
        category: data.title,
      });
    });
  });

  Object.entries(repuestosData).forEach(([slug, data]) => {
    results.push({
      title: data.title,
      description: data.subtitle,
      href: `/repuestos/${slug}`,
      category: 'Repuesto',
    });
    data.items.forEach((item) => {
      results.push({
        title: item.name,
        description: item.desc,
        href: `/repuestos/${slug}`,
        category: data.title,
      });
    });
  });

  return results;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const searchIndex = buildSearchIndex();

  const results = query.trim().length > 0
    ? searchIndex.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  // Deduplicate by href
  const uniqueResults = results.reduce<SearchResult[]>((acc, item) => {
    if (!acc.some((r) => r.href === item.href && r.title === item.title)) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <>
      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-16">
        <form className="relative" action="/buscar" method="GET">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="q"
            type="text"
            defaultValue={query}
            placeholder="Buscar servicios, repuestos, componentes..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-base pl-14 pr-6 py-5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light rounded-sm"
            autoFocus
          />
        </form>
      </div>

      {/* Results */}
      {query.trim().length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-xl font-light text-gray-400 mb-2">Ingrese un término de búsqueda</h2>
          <p className="text-gray-400 font-light text-sm">Busque por tipo de servicio, repuesto, componente o marca.</p>
        </div>
      ) : uniqueResults.length === 0 ? (
        <div className="text-center py-12">
          <FileQuestion className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-xl font-light text-dark mb-2">Sin resultados para &quot;{query}&quot;</h2>
          <p className="text-gray-400 font-light text-sm mb-8">Intente con otros términos o explore nuestro catálogo.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/servicios" className="text-primary font-bold text-xs uppercase tracking-widest hover:text-dark transition-colors flex items-center gap-2">
              Ver Servicios <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/repuestos" className="text-primary font-bold text-xs uppercase tracking-widest hover:text-dark transition-colors flex items-center gap-2">
              Ver Repuestos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-400 font-light text-sm mb-8">
            Se encontraron <span className="font-bold text-dark">{uniqueResults.length}</span> resultado{uniqueResults.length !== 1 ? 's' : ''} para &quot;{query}&quot;
          </p>
          <div className="space-y-4">
            {uniqueResults.map((result, i) => (
              <Link
                key={i}
                href={result.href}
                className="group block bg-white border border-gray-100 hover:border-primary/30 p-6 transition-all duration-300 hover:shadow-md rounded-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">{result.category}</span>
                    <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors uppercase tracking-wide mb-2">{result.title}</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{result.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function BuscarPage() {
  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fondos/hero-buscar.jpg"
            alt="Búsqueda"
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Buscar</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Resultados</span>
          </div>
        </div>
      </section>

      {/* Search Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Suspense fallback={
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-6 animate-pulse" />
              <p className="text-gray-400 font-light">Cargando búsqueda...</p>
            </div>
          }>
            <SearchResults />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
