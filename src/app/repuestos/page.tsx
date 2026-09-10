import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { repuestosData } from '@/data/repuestosData';

export const metadata: Metadata = {
  title: 'Repuestos',
  description: 'Catálogo de repuestos OEM para maquinaria pesada: accesorios, componentes mayores, elementos de desgaste, filtros y lubricantes. Despacho en 24 horas.',
};

export default function RepuestosPage() {
  const categorias = Object.entries(repuestosData).map(([slug, data]) => ({
    slug,
    title: data.title,
    desc: data.overview.substring(0, 120) + '...',
    img: data.heroImage,
    href: `/repuestos/${slug}`,
  }));

  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fondos/hero-repuestos.jpg"
            alt="Repuestos Industriales"
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Catálogo de Repuestos</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Repuestos</span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl font-light text-dark mb-6 uppercase tracking-tight">Suministro <span className="font-bold text-primary">Integral</span></h2>
            <p className="text-gray-500 font-light text-lg leading-relaxed">
              Inventario permanente de componentes, herramientas de desgaste, filtros y lubricantes originales para mantener su flota operativa. Despacho en 24 horas a nivel nacional.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categorias.map((cat, i) => (
              <Link key={i} href={cat.href} className="group flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-full h-72 relative overflow-hidden bg-[#f7f7f7]">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 tracking-wide transition-colors">{cat.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-1">{cat.desc}</p>
                  <div className="font-light text-sm tracking-wide flex items-center gap-2 text-gray-500 group-hover:text-gray-900 transition-colors mt-auto">
                    Ver Catálogo <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Banner */}
      <section className="py-20 bg-[#f4f4f4] border-t border-gray-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-light text-dark uppercase tracking-tight mb-2">¿Necesita un repuesto urgente?</h2>
            <p className="text-gray-500 font-light">Consulte disponibilidad inmediata con nuestro equipo de logística. Despacho express a nivel nacional.</p>
          </div>
          <Link href="/contacto" className="bg-dark text-white font-medium px-8 py-4 uppercase tracking-widest hover:bg-primary hover:text-dark transition-all flex items-center gap-3 shrink-0">
            <Phone className="w-5 h-5 text-primary" />
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </main>
  );
}
