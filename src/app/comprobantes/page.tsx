import Image from 'next/image';
import Link from 'next/link';
import { Search, FileText, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comprobantes Electrónicos',
  description: 'Consulte y descargue sus comprobantes electrónicos (facturas, boletas, notas de crédito) emitidos por Servimafed.',
};

const faqs = [
  {
    question: "¿Cómo descargo mi factura electrónica?",
    answer: "Ingrese su número de RUC y el número de comprobante en el formulario de consulta. El sistema le mostrará el documento para su descarga en formato PDF y XML."
  },
  {
    question: "¿Qué hago si no encuentro mi comprobante?",
    answer: "Si el comprobante fue emitido recientemente, puede demorar hasta 24 horas en estar disponible. Si persiste el problema, comuníquese con nuestro equipo de facturación al correo facturacion@servimafed.com."
  },
  {
    question: "¿Los comprobantes electrónicos tienen la misma validez que los físicos?",
    answer: "Sí. Los comprobantes electrónicos emitidos por Servimafed cumplen con la normativa de SUNAT y tienen la misma validez tributaria que un comprobante impreso."
  },
  {
    question: "¿Puedo solicitar una nota de crédito o débito?",
    answer: "Sí. Comuníquese con nuestro departamento de facturación indicando el número de comprobante original y el motivo de la solicitud."
  }
];

export default function ComprobantesPage() {
  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/fondos/hero-comprobantes.jpg" alt="Comprobantes Electrónicos" fill className="object-cover opacity-20 grayscale" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Comprobantes Electrónicos</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Comprobantes</span>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <FileText className="w-14 h-14 text-primary mx-auto mb-6" strokeWidth={1} />
            <h2 className="text-3xl font-light text-dark mb-4 uppercase tracking-tight">Consultar <span className="font-bold text-primary">Comprobante</span></h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Ingrese los datos de su comprobante para consultarlo o descargarlo en formato PDF y XML.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <form className="space-y-6 bg-gray-50 p-10 border border-gray-200 rounded-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">RUC de la Empresa *</label>
                <input type="text" maxLength={11} className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="20XXXXXXXXX" required />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Tipo de Documento *</label>
                <select className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" required>
                  <option value="">Seleccione</option>
                  <option value="factura">Factura Electrónica</option>
                  <option value="boleta">Boleta de Venta</option>
                  <option value="nota-credito">Nota de Crédito</option>
                  <option value="nota-debito">Nota de Débito</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Número de Comprobante *</label>
                <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="F001-00001234" required />
              </div>
              <button type="button" className="bg-primary text-dark font-medium px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Buscar Comprobante
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f4f4f4] border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-dark uppercase tracking-wide">Preguntas Frecuentes</h3>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 border border-gray-100 rounded-sm">
                  <h4 className="font-bold text-dark text-sm mb-3">{faq.question}</h4>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
