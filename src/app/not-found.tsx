import Link from 'next/link';
import Image from 'next/image';
import { Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <section className="relative flex-1 flex items-center justify-center bg-dark min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fondos/hero-404.jpg"
            alt="Página no encontrada"
            fill
            className="object-cover opacity-10 grayscale"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[120px] md:text-[180px] font-bold text-primary leading-none mb-2 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-4xl font-light text-white mb-4 uppercase tracking-tight">Página no encontrada</h2>
          <p className="text-gray-400 font-light text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed">
            La página que busca no existe o ha sido trasladada. Verifique la dirección URL o regrese a nuestro sitio principal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-primary text-dark font-bold text-xs px-8 py-4 uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Volver al Inicio
            </Link>
            <Link
              href="/contacto"
              className="border border-gray-600 text-gray-300 font-bold text-xs px-8 py-4 uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contactar Soporte
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
