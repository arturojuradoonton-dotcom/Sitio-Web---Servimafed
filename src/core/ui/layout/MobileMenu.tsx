"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { serviciosDropdown as servicios, repuestosDropdown as repuestos } from '@/data/navigationData';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));


  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  // Lock body scroll and handle WhatsApp float button visibility when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  const toggleSubmenu = useCallback((key: string) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  }, []);

  return (
    <>
      {/* Hamburger Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden cursor-pointer w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
        aria-label="Abrir menú de navegación"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-dark/60 backdrop-blur-sm z-[9990] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white z-[9991] shadow-2xl transition-transform duration-400 ease-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)} className="relative h-8 w-32">
            <Image 
              src="/images/logo.png" 
              alt="SERVIMAFED Logo" 
              fill
              loading="lazy"
              sizes="128px"
              className="object-contain object-left"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-100">
          <form 
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('q') as HTMLInputElement;
              if (input.value.trim()) {
                window.location.href = `/buscar?q=${encodeURIComponent(input.value.trim())}`;
              }
            }}
          >
            <input 
              name="q"
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-sm pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5">
            {/* Inicio */}
            <li>
              <Link
                href="/"
                className={`flex items-center px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/') ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Inicio
              </Link>
            </li>

            {/* Compañía */}
            <li>
              <Link
                href="/nosotros"
                className={`flex items-center px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/nosotros') ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Nosotros
              </Link>
            </li>

            {/* Servicios Accordion */}
            <li>
              <button
                onClick={() => toggleSubmenu('servicios')}
                className={`flex items-center justify-between w-full px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/servicios') || openSubmenu === 'servicios' ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Servicios
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    openSubmenu === 'servicios' ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openSubmenu === 'servicios' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-gray-50 py-2">
                  <Link
                    href="/servicios"
                    className="flex items-center px-8 py-2.5 text-xs font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Ver Todos →
                  </Link>
                  {servicios.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex flex-col px-8 py-3 hover:bg-primary/5 transition-colors border-l-2 border-transparent hover:border-primary ml-6"
                    >
                      <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{item.name}</span>
                      <span className="text-[11px] text-gray-400 font-light mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Repuestos Accordion */}
            <li>
              <button
                onClick={() => toggleSubmenu('repuestos')}
                className={`flex items-center justify-between w-full px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/repuestos') || openSubmenu === 'repuestos' ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Repuestos
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    openSubmenu === 'repuestos' ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openSubmenu === 'repuestos' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-gray-50 py-2">
                  <Link
                    href="/repuestos"
                    className="flex items-center px-8 py-2.5 text-xs font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Ver Inventario →
                  </Link>
                  {repuestos.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex flex-col px-8 py-3 hover:bg-primary/5 transition-colors border-l-2 border-transparent hover:border-primary ml-6"
                    >
                      <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{item.name}</span>
                      <span className="text-[11px] text-gray-400 font-light mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            
            {/* Blog */}
            <li>
              <Link
                href="/blog"
                className={`flex items-center px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/blog') ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Blog
              </Link>
            </li>
            
            {/* Soporte Técnico */}
            <li>
              <Link
                href="/contacto"
                className={`flex items-center px-6 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/contacto') ? 'text-primary bg-primary/5 border-l-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'}`}
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer CTA */}
        <div className="border-t border-gray-100 p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-500">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-light">+51 993 667 182</span>
              <a href="https://wa.me/51993667182?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20sus%20servicios." target="_blank" rel="noopener noreferrer" className="ml-auto text-primary hover:scale-110 transition-transform">
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.004 2.003c-7.721 0-13.993 6.272-13.993 13.993 0 2.467.655 4.876 1.898 6.993L2 30l7.207-1.89A13.94 13.94 0 0 0 16.004 30c7.721 0 13.993-6.272 13.993-13.993S23.725 2.003 16.004 2.003zm0 25.586a11.57 11.57 0 0 1-5.898-1.617l-.423-.251-4.384 1.15 1.17-4.275-.276-.439a11.56 11.56 0 0 1-1.773-6.161c0-6.393 5.2-11.593 11.593-11.593S27.6 9.603 27.6 15.996 22.397 27.589 16.004 27.589zm6.353-8.676c-.348-.174-2.061-1.017-2.381-1.133-.32-.116-.553-.174-.786.174-.233.348-.902 1.133-1.106 1.366-.204.233-.407.261-.755.087-.348-.174-1.47-.542-2.8-1.727-1.034-.922-1.733-2.061-1.936-2.41-.204-.348-.022-.536.153-.709.157-.157.348-.407.522-.611.174-.204.232-.348.348-.58.116-.233.058-.436-.029-.611-.087-.174-.786-1.895-1.077-2.595-.284-.68-.572-.588-.786-.599l-.67-.011c-.233 0-.611.087-.931.436-.32.348-1.22 1.192-1.22 2.907s1.249 3.372 1.423 3.604c.174.233 2.458 3.752 5.955 5.262.832.36 1.482.575 1.99.736.836.266 1.597.228 2.198.138.67-.1 2.061-.843 2.351-1.657.29-.814.29-1.512.204-1.657-.087-.145-.32-.232-.669-.407z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-light">ventas@servimafed.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-light">Mz. C Lote 12A, Sector Sumac Pacha - Lurin - Lima</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <a
              href="https://portal.servimafed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-gray-800 hover:text-primary hover:border-primary transition-colors py-2.5 rounded-md"
            >
              <User className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs font-bold uppercase tracking-widest">Portal Cliente</span>
            </a>
            <a
              href="https://app.servimafed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-transparent bg-dark text-white hover:bg-primary hover:text-dark transition-colors py-2.5 rounded-md"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Intranet (ERP)</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
