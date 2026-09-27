"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { serviciosDropdown as servicios, repuestosDropdown as repuestos } from '@/data/navigationData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset: number;
}

export default function MobileMenu({ isOpen, onClose, topOffset }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  // Close submenus on route change
  useEffect(() => {
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
    <div
      style={{ top: `${topOffset}px` }}
      className={`fixed inset-x-0 bottom-0 bg-white z-[9991] shadow-2xl flex flex-col overflow-y-auto lg:hidden transition-all duration-300 ease-in-out ${
        isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
      }`}
    >
      {/* 1. Search Bar */}
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/70">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('q') as HTMLInputElement;
            if (input.value.trim()) {
              router.push(`/buscar?q=${encodeURIComponent(input.value.trim())}`);
              onClose();
            }
          }}
        >
          <input
            name="q"
            type="text"
            placeholder="Buscar..."
            className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            aria-label="Buscar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 py-3 px-3">
        <ul className="space-y-1">
          {/* Inicio */}
          <li>
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/')
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Inicio
            </Link>
          </li>

          {/* Nosotros */}
          <li>
            <Link
              href="/nosotros"
              onClick={onClose}
              className={`flex items-center px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/nosotros')
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Nosotros
            </Link>
          </li>

          {/* Servicios Accordion */}
          <li>
            <button
              onClick={() => toggleSubmenu('servicios')}
              className={`flex items-center justify-between w-full px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/servicios') || openSubmenu === 'servicios'
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Servicios
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openSubmenu === 'servicios' ? 'rotate-180 text-primary' : 'text-gray-400'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSubmenu === 'servicios' ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-gray-50/80 rounded-md py-2 my-1 mx-2 border border-gray-100">
                <Link
                  href="/servicios"
                  onClick={onClose}
                  className="flex items-center px-6 py-2.5 text-xs font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors"
                >
                  Ver Todos los Servicios →
                </Link>
                {servicios.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="flex flex-col px-6 py-2.5 hover:bg-primary/5 transition-colors border-l-2 border-transparent hover:border-primary ml-4"
                  >
                    <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{item.name}</span>
                    <span className="text-[11px] text-gray-500 font-light mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* Repuestos Accordion */}
          <li>
            <button
              onClick={() => toggleSubmenu('repuestos')}
              className={`flex items-center justify-between w-full px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/repuestos') || openSubmenu === 'repuestos'
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Repuestos
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openSubmenu === 'repuestos' ? 'rotate-180 text-primary' : 'text-gray-400'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSubmenu === 'repuestos' ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-gray-50/80 rounded-md py-2 my-1 mx-2 border border-gray-100">
                <Link
                  href="/repuestos"
                  onClick={onClose}
                  className="flex items-center px-6 py-2.5 text-xs font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors"
                >
                  Ver Inventario de Repuestos →
                </Link>
                {repuestos.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="flex flex-col px-6 py-2.5 hover:bg-primary/5 transition-colors border-l-2 border-transparent hover:border-primary ml-4"
                  >
                    <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{item.name}</span>
                    <span className="text-[11px] text-gray-500 font-light mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* Blog */}
          <li>
            <Link
              href="/blog"
              onClick={onClose}
              className={`flex items-center px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/blog')
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>
          </li>

          {/* Contacto */}
          <li>
            <Link
              href="/contacto"
              onClick={onClose}
              className={`flex items-center px-5 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-md ${
                isActive('/contacto')
                  ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Contáctanos
            </Link>
          </li>
        </ul>
      </nav>

      {/* 3. Footer Contacts */}
      <div className="border-t border-gray-100 p-5 bg-gray-50/60 pb-8">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium">+51 993 667 182</span>
            <a
              href="https://wa.me/51993667182?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[#25D366] hover:scale-110 transition-transform p-1"
              aria-label="Contactar por WhatsApp"
            >
              <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 2.003c-7.721 0-13.993 6.272-13.993 13.993 0 2.467.655 4.876 1.898 6.993L2 30l7.207-1.89A13.94 13.94 0 0 0 16.004 30c7.721 0 13.993-6.272 13.993-13.993S23.725 2.003 16.004 2.003zm0 25.586a11.57 11.57 0 0 1-5.898-1.617l-.423-.251-4.384 1.15 1.17-4.275-.276-.439a11.56 11.56 0 0 1-1.773-6.161c0-6.393 5.2-11.593 11.593-11.593S27.6 9.603 27.6 15.996 22.397 27.589 16.004 27.589zm6.353-8.676c-.348-.174-2.061-1.017-2.381-1.133-.32-.116-.553-.174-.786.174-.233.348-.902 1.133-1.106 1.366-.204.233-.407.261-.755.087-.348-.174-1.47-.542-2.8-1.727-1.034-.922-1.733-2.061-1.936-2.41-.204-.348-.022-.536.153-.709.157-.157.348-.407.522-.611.174-.204.232-.348.348-.58.116-.233.058-.436-.029-.611-.087-.174-.786-1.895-1.077-2.595-.284-.68-.572-.588-.786-.599l-.67-.011c-.233 0-.611.087-.931.436-.32.348-1.22 1.192-1.22 2.907s1.249 3.372 1.423 3.604c.174.233 2.458 3.752 5.955 5.262.832.36 1.482.575 1.99.736.836.266 1.597.228 2.198.138.67-.1 2.061-.843 2.351-1.657.29-.814.29-1.512.204-1.657-.087-.145-.32-.232-.669-.407z" />
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-light">ventas@servimafed.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-light">Mz. C Lote 12A, Sector Sumac Pacha - Lurin - Lima</span>
          </div>
        </div>
      </div>
    </div>
  );
}
