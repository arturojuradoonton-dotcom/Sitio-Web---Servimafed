import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/modules/Contact';

export const metadata: Metadata = {
  title: 'Contacto Corporativo',
  description: 'Comuníquese con Servimafed para cotizaciones de mantenimiento de maquinaria pesada, overhaul de motores y soporte técnico 24/7 en minería y construcción.',
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
            
            {/* Interactive Contact Form */}
            <ContactForm />

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
                        Línea Directa: +51 993 667 182
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
