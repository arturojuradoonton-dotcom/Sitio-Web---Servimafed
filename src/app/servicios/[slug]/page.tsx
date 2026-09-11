import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ChevronRight, 
  Wrench, 
  ShieldCheck, 
  Phone,
  Compass,
  Settings,
  Cpu,
  Activity,
  Flame
} from 'lucide-react';
import { serviciosData } from '@/data/serviciosData';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return Object.keys(serviciosData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = serviciosData[resolvedParams.slug as keyof typeof serviciosData];
  if (!data) return { title: 'Servicio no encontrado' };
  return {
    title: data.title,
    description: data.subtitle + '. ' + data.overview.substring(0, 140) + '...',
  };
}

export default async function ServicioDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = serviciosData[slug as keyof typeof serviciosData];

  if (!data) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Hero Banner Minimalista Estilo Volvo */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-dark">
          <Image 
            src={data.heroImage} 
            alt={data.title} 
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] text-primary mb-6">
              <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
              <ChevronRight className="w-3 h-3" />
              <span>{data.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight leading-none">{data.title}</h1>
            <p className="text-xl md:text-2xl font-light text-gray-300">{data.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Columna Izquierda: Descripción */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-light text-dark mb-6 uppercase tracking-tight">Visión <span className="font-bold text-primary">General</span></h2>
            <div className="w-16 h-1 bg-primary mb-10"></div>
            <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed mb-16">
              {data.overview}
            </p>

            <h3 className="text-2xl font-bold text-dark mb-8 uppercase tracking-wide">Ventajas Principales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="bg-gray-50 p-8 border-l-4 border-primary hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-dark uppercase tracking-widest text-xs mb-3">{benefit.title}</h4>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-dark mb-8 uppercase tracking-wide">Características del Servicio</h3>
            <ul className="space-y-6 bg-[#f9f9f9] p-10 border border-gray-100 rounded-sm">
              {data.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" strokeWidth={2} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Derecha: Sidebar CTA */}
          <div className="lg:col-span-4 space-y-8 mt-4 lg:mt-0">
            
            {/* Menú Lateral de Servicios Relacionados (Estilo Imagen de Referencia) */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100 flex flex-col">
                {Object.entries(serviciosData).map(([itemSlug, itemData]) => {
                  const isActive = itemSlug === slug;
                  
                  // Asignación de icono dinámico
                  let IconComponent = Wrench;
                  if (itemSlug === "gestion-flota") IconComponent = Compass;
                  else if (itemSlug === "mantenimiento-preventivo") IconComponent = Settings;
                  else if (itemSlug === "reparacion-componentes") IconComponent = Cpu;
                  else if (itemSlug === "evaluacion-diagnostico") IconComponent = Activity;
                  else if (itemSlug === "mecanizado-soldadura") IconComponent = Flame;

                  return (
                    <Link
                      key={itemSlug}
                      href={`/servicios/${itemSlug}`}
                      className={`flex items-center gap-4 px-6 py-5 text-xs uppercase tracking-wider font-bold transition-all duration-300 border-l-4 group ${
                        isActive
                          ? "bg-gray-50 border-primary text-dark"
                          : "bg-white border-transparent text-gray-500 hover:bg-gray-50/50 hover:text-dark hover:border-primary/50"
                      }`}
                    >
                      <IconComponent 
                        className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                        }`} 
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                      <span>{itemData.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-dark p-10 text-white shadow-xl relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500"></div>
              <Wrench className="w-12 h-12 text-primary mb-8" strokeWidth={1} />
              <h4 className="text-2xl font-light text-white mb-4 uppercase tracking-tight leading-tight">¿Necesita este <span className="font-bold">servicio?</span></h4>
              <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">Nuestros ingenieros de campo están listos para evaluar sus equipos y proporcionar una cotización técnica detallada sin compromiso.</p>
              <Link href="/contacto" className="inline-block bg-primary text-dark font-bold text-xs px-8 py-5 uppercase tracking-widest hover:bg-white transition-colors w-full text-center">
                Solicitar Inspección
              </Link>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-sm shadow-sm hover:border-primary/50 transition-colors">
              <ShieldCheck className="w-8 h-8 text-dark mb-4" strokeWidth={1.5} />
              <h4 className="text-xs font-bold uppercase tracking-widest text-dark mb-2">Garantía Certificada</h4>
              <p className="text-gray-500 font-light text-xs leading-relaxed">Todos nuestros trabajos mecánicos y componentes reparados están respaldados por una garantía de taller de 6 meses o 1000 horas de operación continua.</p>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm flex items-center gap-5 hover:bg-primary/10 transition-colors">
              <Phone className="w-10 h-10 text-primary" strokeWidth={1.5} />
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Ventas y Soporte</h4>
                <a href="tel:+51993667182" className="text-xl font-bold text-dark hover:text-primary transition-colors">+51 993 667 182</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
