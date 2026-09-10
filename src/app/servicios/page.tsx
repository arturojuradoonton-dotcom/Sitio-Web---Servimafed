import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Catálogo completo de servicios de ingeniería: gestión de flota, mantenimiento preventivo, reparación de componentes, diagnóstico electrónico y mecanizado industrial.',
};

export default function ServiciosPage() {
  const servicios = [
    { 
      title: "Gestión de Flota", 
      desc: "Implementación de telemetría y software para monitoreo continuo del rendimiento de los equipos pesados.",
      img: "/images/menu-1.png",
      href: "/servicios/gestion-flota"
    },
    { 
      title: "Mantenimiento Preventivo", 
      desc: "Planes de lubricación, cambio de fluidos e inspecciones rigurosas basadas en el horómetro del fabricante.",
      img: "/images/menu-2.png",
      href: "/servicios/mantenimiento-preventivo"
    },
    { 
      title: "Reparación de Componentes", 
      desc: "Overhaul de motores diésel industriales, transmisiones, mandos finales y cilindros hidráulicos de alta capacidad.",
      img: "/images/menu-3.png",
      href: "/servicios/reparacion-componentes"
    },
    { 
      title: "Evaluación y Diagnóstico", 
      desc: "Escaneo avanzado de módulos de control electrónico (ECM) con escáneres multimarca y análisis de fallas.",
      img: "/images/menu-4.png",
      href: "/servicios/evaluacion-diagnostico"
    },
    { 
      title: "Mecanizado y Soldadura", 
      desc: "Inspección, soldadura certificada y reforzamiento estructural de chasis, brazos y cucharones de excavación.",
      img: "/images/menu-5.png",
      href: "/servicios/mecanizado-soldadura"
    }
  ];

  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fondos/hero-servicios.jpg" 
            alt="Servicios Industriales" 
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Servicios de Ingeniería</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Servicios</span>
          </div>
        </div>
      </section>

      {/* Services Grid Section (Volvo CE Aesthetic) */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl font-light text-dark mb-6 uppercase tracking-tight">Capacidad <span className="font-bold text-primary">Operativa</span></h2>
            <p className="text-gray-500 font-light text-lg leading-relaxed">
              Contamos con infraestructura de clase mundial e ingenieros mecánicos certificados para garantizar la disponibilidad electromecánica de su flota.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicios.map((service, i) => (
              <Link key={i} href={service.href} className="group flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-full h-64 relative overflow-hidden bg-[#f7f7f7]">
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 tracking-wide transition-colors">{service.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-1">{service.desc}</p>
                  <div className="font-light text-sm tracking-wide flex items-center gap-2 text-gray-500 group-hover:text-gray-900 transition-colors mt-auto">
                    Explorar Servicio <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-2xl font-light text-dark uppercase tracking-tight mb-2">¿Máquina detenida en campo?</h2>
            <p className="text-gray-500 font-light">Nuestra unidad móvil de rescate atiende emergencias 24/7 a nivel nacional.</p>
          </div>
          <Link href="/contacto" className="bg-dark text-white font-medium px-8 py-4 uppercase tracking-widest hover:bg-primary hover:text-dark transition-all flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            Contactar Rescate
          </Link>
        </div>
      </section>
    </main>
  );
}
