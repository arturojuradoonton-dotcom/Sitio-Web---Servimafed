import Image from 'next/image';
import Link from 'next/link';
import { Send, AlertTriangle, Building2 } from 'lucide-react';
import type { Metadata } from 'next';

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

              <form className="space-y-6">
                {/* Tipo */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3 text-xs uppercase tracking-widest">Tipo de Solicitud *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo" value="reclamo" className="accent-[#FCB326] w-4 h-4" defaultChecked />
                      <span className="text-sm text-gray-700">Reclamo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo" value="queja" className="accent-[#FCB326] w-4 h-4" />
                      <span className="text-sm text-gray-700">Queja</span>
                    </label>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 font-light"><strong>Reclamo:</strong> disconformidad con el servicio brindado. <strong>Queja:</strong> malestar respecto a la atención al público.</p>
                </div>

                {/* Datos Personales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Nombre Completo *</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="Juan Pérez García" required />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">DNI / RUC *</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="12345678" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Teléfono *</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="+51 987 654 321" required />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Correo Electrónico</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Dirección</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="Av. Principal 123, Lima" />
                </div>

                {/* Detalle */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Detalle de la Reclamación *</label>
                  <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none" placeholder="Describa detalladamente el motivo de su reclamación..." required />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Pedido del Consumidor *</label>
                  <textarea rows={3} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none" placeholder="Indique qué solución espera recibir..." required />
                </div>

                <button type="button" className="bg-primary text-dark font-medium px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full md:w-auto mt-2 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Enviar Reclamación
                </button>
              </form>
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
                    <span className="text-gray-200 font-light">20XXXXXXXXX</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Dirección</span>
                    <span className="text-gray-200 font-light">Mz. C Lote 12A, Sector Sumac Pacha - Lurin - Lima</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-dark mb-4">Plazo de Respuesta</h4>
                <p className="text-gray-500 font-light text-xs leading-relaxed">
                  El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a treinta (30) días calendario, pudiendo extenderse por un plazo similar de ser necesario.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
