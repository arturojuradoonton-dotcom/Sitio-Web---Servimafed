import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Users, Award, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import BolsaTrabajoForm from './BolsaTrabajoForm';

export const metadata: Metadata = {
  title: 'Bolsa de Trabajo',
  description: 'Únete al equipo de Servimafed. Oportunidades laborales para técnicos mecánicos, ingenieros y profesionales del sector de maquinaria pesada.',
};

const valores = [
  { icon: Briefcase, title: "Proyectos Desafiantes", desc: "Trabajamos con las marcas más importantes de maquinaria pesada en proyectos de minería y construcción a gran escala." },
  { icon: Users, title: "Equipo de Primer Nivel", desc: "Colaborarás con ingenieros y técnicos certificados, en un ambiente de aprendizaje continuo y crecimiento profesional." },
  { icon: Award, title: "Capacitación Continua", desc: "Inversión permanente en certificaciones OEM, seguridad industrial y desarrollo de competencias técnicas avanzadas." },
  { icon: TrendingUp, title: "Crecimiento Profesional", desc: "Plan de carrera estructurado con oportunidades de ascenso basadas en mérito y desempeño." },
];

export default function BolsaTrabajoPage() {
  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/fondos/hero-bolsa-trabajo.jpg" alt="Bolsa de Trabajo" fill className="object-cover opacity-20 grayscale" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Bolsa de Trabajo</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Trabaja con Nosotros</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">Envía tu <span className="font-bold text-primary">Postulación</span></h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-gray-500 font-light mb-10 leading-relaxed">
                Si eres un profesional apasionado por la maquinaria pesada y buscas crecer en una empresa líder del sector, completa el siguiente formulario.
              </p>

              <BolsaTrabajoForm />
            </div>

            {/* Company Culture */}
            <div>
              <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">¿Por qué <span className="font-bold text-primary">Servimafed?</span></h2>
              <div className="w-12 h-1 bg-primary mb-10" />
              <div className="space-y-8">
                {valores.map((valor, i) => {
                  const Icon = valor.icon;
                  return (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-14 h-14 bg-dark/5 rounded flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-dark uppercase tracking-widest text-xs mb-2">{valor.title}</h4>
                        <p className="text-gray-500 font-light text-sm leading-relaxed">{valor.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
