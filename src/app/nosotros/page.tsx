import Image from 'next/image';
import Link from 'next/link';
import { Award, Briefcase, Users, ShieldCheck, CheckCircle2, Activity, Target } from 'lucide-react';
import Timeline from '@/core/ui/Timeline';
import BrandSlider from '@/core/ui/BrandSlider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conozca el perfil corporativo de Servimafed: más de 10 años de experiencia en mantenimiento de maquinaria pesada, 150+ técnicos certificados y estándares ISO.',
};

export default function NosotrosPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fondos/hero-nosotros.jpg" 
            alt="Sobre la Empresa" 
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Perfil Corporativo</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
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
                Como contratista principal para mineras y constructoras, nos especializamos en mantener la operatividad de equipos de alto tonelaje. Nuestra infraestructura y red logística nos permiten responder a emergencias mecánicas a nivel nacional.
              </p>

              <ul className="space-y-4 text-gray-700 font-medium text-sm tracking-wide mt-8">
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  INGENIEROS DE CAMPO CERTIFICADOS (OEM)
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  INFRAESTRUCTURA DE TALLER CLASE A
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
              { number: "150", label: "Técnicos en Campo", src: "/images/iconos/7.svg" },
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

      {/* Leadership Team Section */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">Liderazgo Profesional</span>
            <h2 className="text-3xl font-light text-dark uppercase tracking-tight">Equipo de <span className="font-bold text-primary">Dirección y Operaciones</span></h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Ing. Fernando Valencia",
                role: "Director de Operaciones",
                desc: "Ingeniero Mecánico Senior con más de 20 años en dirección de talleres de gran minería y certificación OEM por fabricantes líderes.",
                img: "/images/nosotros/equipo-1.jpg"
              },
              {
                name: "Dra. Patricia Alva",
                role: "Gerente de Aseguramiento de Calidad",
                desc: "Especialista en auditoría HSEQ y responsable de la implementación de sistemas integrados de seguridad laboral en proyectos mineros.",
                img: "/images/nosotros/equipo-2.jpg"
              },
              {
                name: "Ing. Ricardo Thorne",
                role: "Jefe de Soporte Técnico en Campo",
                desc: "Coordinador nacional del equipo de auxilio mecánico rápido y experto en diagnóstico de sistemas electrónicos ECM multimarca.",
                img: "/images/nosotros/equipo-3.jpg"
              }
            ].map((leader, i) => (
              <div key={i} className="bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col rounded-sm overflow-hidden">
                <div className="relative h-64 w-full bg-[#f4f4f4] overflow-hidden">
                  <Image 
                    src={leader.img} 
                    alt={leader.name} 
                    fill 
                    className="object-cover opacity-75 grayscale hover:scale-105 hover:opacity-100 transition-all duration-700"
                  />
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-dark text-base uppercase tracking-wider mb-1">{leader.name}</h4>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-4">{leader.role}</span>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{leader.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Partners Section (Logo Slider) */}
      <BrandSlider title="Socios Tecnológicos y Marcas Especializadas" logoNumbers={[17, 16, 22, 9, 1, 5, 6, 8, 4, 11]} />


    </main>
  );
}

