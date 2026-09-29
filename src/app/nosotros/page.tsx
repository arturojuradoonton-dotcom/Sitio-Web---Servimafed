import Image from 'next/image';
import Link from 'next/link';
import { Award, Briefcase, Users, ShieldCheck, CheckCircle2, Activity, Target } from 'lucide-react';
import Timeline from '@/core/ui/Timeline';
import BrandSlider from '@/core/ui/BrandSlider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conozca el perfil corporativo de Servimafed: experiencia en mantenimiento de maquinaria pesada, técnicos especializados y altos estándares de calidad.',
};

export default function NosotrosPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/Banners Cabeceras/hero-nosotros.jpg" 
            alt="Sobre la Empresa" 
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-dark/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white drop-shadow-md">Perfil Corporativo</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-200 uppercase tracking-widest drop-shadow-sm">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary">Nosotros</span>
          </div>
        </div>
      </section>

      {/* Main Content: Who We Are */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative h-[500px] overflow-hidden shadow-xl rounded-sm">
              <Image 
                src="/images/nosotros/historia.jpg" 
                alt="Operaciones en Campo" 
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              {/* Floating Badge */}
              <div className="absolute bottom-0 right-0 bg-dark text-white p-8 shadow-2xl text-center border-t-4 border-primary">
                <span className="block text-5xl font-light mb-2 text-primary">10+</span>
                <span className="block font-medium text-xs uppercase tracking-widest">Años de<br/>Experiencia</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <p className="text-primary font-medium tracking-widest text-xs uppercase mb-3">HISTORIA Y MISIÓN</p>
              <h2 className="text-3xl md:text-4xl font-light text-dark mb-6 leading-tight uppercase tracking-tight">
                Líderes en <span className="font-bold text-primary">Soporte Técnico</span> Industrial
              </h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
              
              <p className="text-gray-500 font-light text-lg leading-relaxed mb-6">
                Nos especializamos en mantener la operatividad de equipos pesados y de alto tonelaje. Contamos con nuestro taller en Lima y unidades móviles preparadas para atender evaluaciones y requerimientos mecánicos directamente en sus operaciones.
              </p>

              <ul className="space-y-4 text-gray-700 font-medium text-sm tracking-wide mt-8">
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  SOPORTE TÉCNICO EN CAMPO
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  TALLER EN LIMA
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  TRAZABILIDAD EN PROCESOS DE REPARACIÓN
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Mission, Vision & Values (Industrial Grid) */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Mission */}
            <div className="bg-white p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-dark uppercase tracking-wider mb-4">Nuestra Misión</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Garantizar la disponibilidad mecánica y el óptimo rendimiento de la maquinaria pesada de nuestros clientes, mediante soporte técnico calificado en campo y taller, y suministro oportuno de repuestos OEM de alta durabilidad, reduciendo al mínimo los tiempos improductivos.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-10 border-t-4 border-dark shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-12 h-12 bg-dark/5 rounded flex items-center justify-center text-dark mb-6">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-dark uppercase tracking-wider mb-4">Nuestra Visión</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Consolidarnos para el año 2030 como el socio estratégico líder en ingeniería de mantenimiento y suministro de repuestos para maquinaria pesada en el Perú, reconocidos nacionalmente por nuestra excelencia operativa, puntualidad de entrega y estricto cumplimiento de estándares HSEQ.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-dark uppercase tracking-wider mb-4">Nuestros Valores</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Actuamos bajo una conducta de transparencia absoluta y responsabilidad técnica. Para nosotros, la calidad es innegociable en cada componente, la puntualidad es ley en cada entrega y la seguridad de nuestro personal y del cliente rige cada maniobra en campo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/fondos/hero-nosotros.jpg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "12M+", label: "Horas Máquina Recuperadas", src: "/images/iconos/13.svg" },
              { number: "100%", label: "Personal Calificado", src: "/images/iconos/7.svg" },
              { number: "100%", label: "Cumplimiento HSE", src: "/images/iconos/15.svg" },
              { number: "ISO", label: "Certificación 9001:2015", src: "/images/iconos/14.svg" },
            ].map((stat, i) => {
              return (
                <div key={i} className="p-6">
                  <div className="w-20 h-20 flex items-center justify-center hover:scale-105 hover:rotate-3 transition-all duration-300 mx-auto mb-6">
                    <div 
                      className="w-14 h-14 bg-white" 
                      style={{
                        maskImage: `url(${stat.src})`,
                        WebkitMaskImage: `url(${stat.src})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                      title={stat.label}
                    />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-3">{stat.number}</div>
                  <div className="font-light uppercase tracking-widest text-xs text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Timeline (Timeline Corporativo) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">Nuestra Trayectoria</span>
            <h2 className="text-3xl font-light text-dark uppercase tracking-tight">Hitos de <span className="font-bold text-primary">Nuestra Historia</span></h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <Timeline />
        </div>
      </section>

      {/* Brand Partners Section (Logo Slider) */}
      <BrandSlider 
        title="Repuestos de Marcas Líderes" 
        subtitle="Utilizamos repuestos, filtros y componentes de los principales fabricantes para garantizar la máxima durabilidad y rendimiento de su maquinaria."
        logoNumbers={[17, 16, 22, 9, 1, 5, 6, 8, 4, 11]} 
      />


    </main>
  );
}

