import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Building2 } from 'lucide-react';
import type { Metadata } from 'next';
import LibroReclamacionesForm from './LibroReclamacionesForm';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description: 'Formulario de Libro de Reclamaciones de Servimafed, conforme a la Ley 29571 del Código de Protección y Defensa del Consumidor.',
};

export default function LibroReclamacionesPage() {
  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/fondos/hero-libro-reclamaciones.jpg" alt="Libro de Reclamaciones" fill className="object-cover opacity-20 grayscale" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Libro de Reclamaciones</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Libro de Reclamaciones</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">Formulario de <span className="font-bold text-primary">Reclamación</span></h2>
              <div className="w-12 h-1 bg-primary mb-6" />
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 p-4 rounded-sm mb-10">
                <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley 29571), este establecimiento cuenta con un Libro de Reclamaciones a su disposición. Formule su queja o reclamo completando el siguiente formulario.
                </p>
              </div>

              <LibroReclamacionesForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-dark p-10 text-white shadow-xl rounded-sm">
                <Building2 className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Datos del Proveedor</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Razón Social</span>
                    <span className="text-gray-200 font-light">Servimafed S.A.C.</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">RUC</span>
                    <span className="text-gray-200 font-bold text-primary">20600567668</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Dirección</span>
                    <span className="text-gray-200 font-light">Mz. C Lote 12A, Sector Sumac Pacha - Lurín - Lima</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-dark mb-4">Plazo de Respuesta Legal</h4>
                <p className="text-gray-500 font-light text-xs leading-relaxed">
                  De conformidad con la Ley N° 31435 (modificatoria del Código de Protección y Defensa del Consumidor), el proveedor deberá dar respuesta formal al reclamo o queja en un plazo no mayor a quince (15) días hábiles improrrogables a través del correo electrónico consignado.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
