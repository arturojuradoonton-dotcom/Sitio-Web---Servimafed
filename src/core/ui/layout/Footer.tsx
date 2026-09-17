import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Briefcase, 
  FileText, 
  ClipboardList, 
  BookOpen, 
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans mt-auto">
      {/* 1. Barra de Cumplimiento y Enlaces Rápidos (Estilo Ferreyros) */}
      <div className="bg-primary w-full">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between py-4 text-dark gap-6">
            
            {/* Enlaces de Cumplimiento */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 text-[11px] md:text-xs font-bold uppercase tracking-widest flex-1">
              <Link href="/bolsa-trabajo" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src="/images/iconos/bolsa de trabajo.svg" alt="Bolsa de Trabajo" fill className="object-contain" />
                </div>
                <span className="w-20 leading-tight">Bolsa de Trabajo</span>
              </Link>
              
              <div className="hidden lg:block w-px h-8 bg-dark/20"></div>

              <Link href="/comprobantes" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src="/images/iconos/comprobantes electronicos.svg" alt="Comprobantes Electrónicos" fill className="object-contain" />
                </div>
                <span className="w-28 leading-tight">Comprobantes Electrónicos</span>
              </Link>

              <div className="hidden lg:block w-px h-8 bg-dark/20"></div>

              <Link href="/politicas" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src="/images/iconos/politica de privacidad.svg" alt="Política de Privacidad" fill className="object-contain" />
                </div>
                <span className="w-24 leading-tight">Política de Privacidad</span>
              </Link>

              <div className="hidden lg:block w-px h-8 bg-dark/20"></div>

              <Link href="/libro-reclamaciones" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src="/images/iconos/libro de reclamaciones.svg" alt="Libro de Reclamaciones" fill className="object-contain" />
                </div>
                <span className="w-28 leading-tight">Libro de Reclamaciones</span>
              </Link>
            </div>

            <div className="hidden lg:block w-px h-10 bg-dark/20 mx-4"></div>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3 shrink-0">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/servimafed-s-a-c/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Conéctate en LinkedIn"
                className="bg-dark text-primary p-2 rounded-sm hover:bg-white hover:text-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/servimafedsac" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="bg-dark text-primary p-2 rounded-sm hover:bg-white hover:text-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/servimafedsac/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="bg-dark text-primary p-2 rounded-sm hover:bg-white hover:text-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@servimafed" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Suscríbete en YouTube"
                className="bg-dark text-primary p-2 rounded-sm hover:bg-white hover:text-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z"/></svg>
              </a>
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@servimafedsac" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en TikTok"
                className="bg-dark text-primary p-2 rounded-sm hover:bg-white hover:text-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Menú Corporativo */}
      <div className="bg-[#1a1a1a] border-b border-gray-800">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Columna 1: Marca */}
            <div>
              <div className="relative h-10 w-44 md:h-12 md:w-56 mb-6">
                <Image 
                  src="/images/Logo-horizontal--Variante.png" 
                  alt="SERVIMAFED Logo" 
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                Especialistas en mantenimiento integral y reparación de maquinaria pesada. Soluciones de ingeniería para minería y construcción.
              </p>
            </div>

            {/* Columna 2: Servicios */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-primary pl-3">Servicios</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Gestión de Flota', href: '/servicios/gestion-flota' },
                  { name: 'Mantenimiento Preventivo', href: '/servicios/mantenimiento-preventivo' },
                  { name: 'Reparación de Componentes', href: '/servicios/reparacion-componentes' },
                  { name: 'Evaluación y Diagnóstico', href: '/servicios/evaluacion-diagnostico' },
                  { name: 'Mecanizado y Soldadura', href: '/servicios/mecanizado-soldadura' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-light flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-dark group-hover:text-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Repuestos */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-primary pl-3">Repuestos</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Accesorios', href: '/repuestos#accesorios' },
                  { name: 'Componentes Mayores', href: '/repuestos#componentes' },
                  { name: 'Elementos de Desgaste', href: '/repuestos#desgaste' },
                  { name: 'Filtros y Lubricantes', href: '/repuestos#mantenimiento' },
                  { name: 'Promociones', href: '/repuestos#promociones' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-light flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-dark group-hover:text-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-primary pl-3">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm font-light">Mz. C Lote 12A, Sector Sumac Pacha - Lurin - Lima</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-gray-300 text-sm font-light">+51 993 667 182</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-gray-300 text-sm font-light">ventas@servimafed.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Copyright y Enlaces Legales */}
      <div className="bg-[#111111] py-6">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Copyright (Izquierda) */}
          <div className="text-white text-xs font-light tracking-wide text-center lg:text-left">
            Copyright &copy; {new Date().getFullYear()} Servimafed | RUC: 20600567668
          </div>
          
          {/* Enlaces Legales (Derecha) */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 text-white text-xs font-light tracking-wide">
            <Link href="/politicas" className="hover:text-primary transition-colors">Política de privacidad</Link>
            <span className="text-gray-600">|</span>
            <Link href="/comprobantes" className="hover:text-primary transition-colors">Comprobantes electrónicos</Link>
            <span className="text-gray-600">|</span>
            <Link href="/libro-reclamaciones" className="hover:text-primary transition-colors">Libro de reclamaciones</Link>
            <span className="text-gray-600">|</span>
            <Link href="/bolsa-trabajo" className="hover:text-primary transition-colors">Bolsa de trabajo</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
