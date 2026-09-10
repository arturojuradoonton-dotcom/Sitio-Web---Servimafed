import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacte a Servimafed para cotizaciones de mantenimiento de maquinaria pesada, inspecciones en campo y soporte técnico 24/7.',
};

export default function ContactoPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fondos/hero-contacto.jpg" 
            alt="Contacto Industrial" 
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Contacto Corporativo</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Contacto</span>
          </div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">Envíanos una <span className="font-bold text-primary">Solicitud</span></h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
              <p className="text-gray-500 font-light mb-10 leading-relaxed">
                Si requiere una cotización para mantenimiento de flota, inspecciones estructurales o servicios de emergencia, complete el siguiente formulario.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Razón Social / Nombre *</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="Empresa S.A.C." required />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Teléfono de Contacto *</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="Ej. +51 987 654 321" required />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Correo Corporativo</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="contacto@empresa.com" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Requerimiento Técnico *</label>
                  <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none" placeholder="Especifique tipo de maquinaria y horas de operación..." required></textarea>
                </div>
                <button type="button" className="bg-primary text-dark font-medium px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full md:w-auto mt-2 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Enviar Solicitud
                </button>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div>
              <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">Directorio <span className="font-bold text-primary">Técnico</span></h2>
              <div className="w-12 h-1 bg-primary mb-10"></div>
              
              <div className="bg-dark text-white p-10 rounded-sm shadow-xl mb-10 relative overflow-hidden">
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-primary uppercase tracking-widest">Sede Operativa</h4>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                        Mz. C Lote 12A, Sector Sumac Pacha<br />
                        Lurin - Lima
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-primary uppercase tracking-widest">Central de Emergencias</h4>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                        Línea Directa: +51 977 600 893
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 text-primary uppercase tracking-widest">Comunicaciones</h4>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                        Ventas: ventas@servimafed.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="h-64 rounded-sm overflow-hidden border border-gray-200 relative">
                <iframe
                  src="https://maps.google.com/maps?q=Sector%20Sumac%20Pacha,%20Lurin,%20Lima&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-500 rounded-sm"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Servimafed"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
