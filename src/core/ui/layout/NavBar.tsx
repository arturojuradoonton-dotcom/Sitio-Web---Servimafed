"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ChevronDown, ArrowRight, X, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { serviciosDropdown, repuestosDropdown } from '@/data/navigationData';

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<'servicios' | 'repuestos' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const desktopUserMenuRef = useRef<HTMLDivElement>(null);
  const [navBottom, setNavBottom] = useState(72);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  // Function to calculate exact physical bottom edge of navbar on screen
  const updateNavBottom = useCallback(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setNavBottom(Math.max(0, Math.round(rect.bottom)));
    }
  }, []);

  // Close menus on route change (adjusted during render to avoid cascading renders in React 19)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsDesktopUserMenuOpen(false);
  }

  // Recalculate navbar bottom on resize and scroll
  useEffect(() => {
    updateNavBottom();
    window.addEventListener('resize', updateNavBottom);
    window.addEventListener('scroll', updateNavBottom, { passive: true });
    return () => {
      window.removeEventListener('resize', updateNavBottom);
      window.removeEventListener('scroll', updateNavBottom);
    };
  }, [updateNavBottom]);

  // When mobile menu state changes, update immediately
  useEffect(() => {
    if (isMobileMenuOpen) {
      updateNavBottom();
    }
  }, [isMobileMenuOpen, updateNavBottom]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  // Close search on Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      closeSearch();
    }
  };

  // Close desktop user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopUserMenuRef.current &&
        !desktopUserMenuRef.current.contains(event.target as Node)
      ) {
        setIsDesktopUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsDesktopUserMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 font-sans">
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        
        {/* Search Overlay */}
        {isSearchOpen && (
          <div ref={searchOverlayRef} className="absolute inset-0 bg-white z-[60] flex items-center">
            <form onSubmit={handleSearch} className="w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-sm border border-gray-100">
              <Search className="text-gray-400 w-5 h-5 shrink-0" />
              <input 
                ref={searchInputRef}
                autoFocus
                type="text" 
                placeholder="Buscar servicios, repuestos, blog..." 
                className="w-full text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={closeSearch} className="text-gray-400 hover:text-dark shrink-0 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
        {/* Logo */}
        <Link 
          href="/" 
          onClick={closeMenu} 
          className="relative h-10 w-44 md:h-12 md:w-56 block shrink-0"
        >
          <Image 
            src="/images/Logo-horizontal.png" 
            alt="SERVIMAFED Logo" 
            fill
            priority
            sizes="(max-width: 768px) 176px, 224px"
            className="object-contain object-left"
          />
        </Link>

        {/* Menu */}
        <ul className="hidden lg:flex font-medium text-gray-600 text-[13px] items-center gap-6 xl:gap-8 uppercase tracking-widest h-full">
          <li className="flex items-center h-full py-6 transition-colors">
            <Link href="/" onClick={closeMenu} className={`transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}>Inicio</Link>
          </li>
          
          <li className="flex items-center h-full py-6 transition-colors">
            <Link href="/nosotros" onClick={closeMenu} className={`transition-colors ${isActive('/nosotros') ? 'text-primary' : 'hover:text-primary'}`}>Nosotros</Link>
          </li>
          
          {/* Mega Menú de Servicios */}
          <li 
            onMouseEnter={() => setActiveDropdown('servicios')}
            onMouseLeave={() => setActiveDropdown(null)}
            className="flex items-center h-full py-6 transition-colors"
          >
            <Link href="/servicios" onClick={closeMenu} className={`transition-colors flex items-center gap-1 ${activeDropdown === 'servicios' || isActive('/servicios') ? 'text-primary' : 'hover:text-primary'}`}>
              Servicios <ChevronDown className={`w-4 h-4 transition-colors ${activeDropdown === 'servicios' || isActive('/servicios') ? 'text-primary' : 'text-gray-400'}`} />
            </Link>
            
            <div className={`absolute top-[100%] left-0 w-full bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100 transition-all duration-300 transform z-50 ${
              activeDropdown === 'servicios'
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
            }`}>
              <div className="container mx-auto px-6 py-10">
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-light text-dark uppercase tracking-tight">Catálogo de <span className="font-bold">Servicios</span></h3>
                  <Link href="/servicios" onClick={closeMenu} className="text-sm font-bold text-primary flex items-center gap-2 hover:text-dark transition-colors uppercase tracking-widest">
                    Ver Todos los Servicios <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                  {serviciosDropdown.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={closeMenu} className="group/card flex flex-col">
                      <div className="w-full h-32 relative bg-[#f7f7f7] rounded-sm overflow-hidden mb-4 flex items-center justify-center">
                        <Image src={item.img} alt={item.name} fill loading="lazy" sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover group-hover/card:scale-110 transition-transform duration-700 ease-in-out" />
                        <div className="absolute inset-0 bg-dark/0 group-hover/card:bg-dark/5 transition-colors duration-300"></div>
                      </div>
                      <span className="block text-gray-800 text-xs font-bold uppercase tracking-wide group-hover/card:text-primary transition-colors mb-1 leading-tight">{item.name}</span>
                      <span className="block text-gray-500 text-[11px] font-light normal-case leading-relaxed">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* Mega Menú de Repuestos */}
          <li 
            onMouseEnter={() => setActiveDropdown('repuestos')}
            onMouseLeave={() => setActiveDropdown(null)}
            className="flex items-center h-full py-6 transition-colors"
          >
            <Link href="/repuestos" onClick={closeMenu} className={`transition-colors flex items-center gap-1 ${activeDropdown === 'repuestos' || isActive('/repuestos') ? 'text-primary' : 'hover:text-primary'}`}>
              Repuestos <ChevronDown className={`w-4 h-4 transition-colors ${activeDropdown === 'repuestos' || isActive('/repuestos') ? 'text-primary' : 'text-gray-400'}`} />
            </Link>
            
            <div className={`absolute top-[100%] left-0 w-full bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100 transition-all duration-300 transform z-50 ${
              activeDropdown === 'repuestos'
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
            }`}>
              <div className="container mx-auto px-6 py-10">
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-light text-dark uppercase tracking-tight">Catálogo de <span className="font-bold">Repuestos</span></h3>
                  <Link href="/repuestos" onClick={closeMenu} className="text-sm font-bold text-primary flex items-center gap-2 hover:text-dark transition-colors uppercase tracking-widest">
                    Ver Inventario <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {repuestosDropdown.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={closeMenu} className="group/card flex flex-col">
                      <div className="w-full h-36 relative bg-[#f7f7f7] rounded-sm overflow-hidden mb-4 flex items-center justify-center border border-gray-50 group-hover/card:border-primary/20 transition-colors">
                        <Image src={item.img} alt={item.name} fill loading="lazy" sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-in-out" />
                        <div className="absolute inset-0 bg-dark/0 group-hover/card:bg-dark/5 transition-colors duration-300"></div>
                      </div>
                      <span className="block text-gray-800 text-sm font-bold uppercase tracking-wide group-hover/card:text-primary transition-colors mb-1 leading-tight">{item.name}</span>
                      <span className="block text-gray-500 text-xs font-light normal-case leading-relaxed">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-center h-full py-6 transition-colors">
            <Link href="/blog" onClick={closeMenu} className={`transition-colors ${isActive('/blog') ? 'text-primary' : 'hover:text-primary'}`}>Blog</Link>
          </li>

          <li className="flex items-center h-full py-6 transition-colors">
            <Link href="/contacto" onClick={closeMenu} className={`transition-colors ${isActive('/contacto') ? 'text-primary' : 'hover:text-primary'}`}>Contáctanos</Link>
          </li>
        </ul>

        {/* Search, User Login & Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-6 py-4">
          <button onClick={() => setIsSearchOpen(true)} className="hidden md:flex items-center justify-center outline-none">
            <Search className="cursor-pointer text-gray-700 hover:text-primary transition-colors w-5 h-5" />
          </button>
          
          {/* Desktop User Login Dropdown */}
          <div 
            ref={desktopUserMenuRef}
            className="hidden md:flex relative group h-full items-center"
          >
            <button 
              type="button"
              onClick={() => setIsDesktopUserMenuOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsDesktopUserMenuOpen(false);
              }}
              aria-expanded={isDesktopUserMenuOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 text-gray-700 group-hover:text-primary transition-colors cursor-pointer outline-none py-4"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm font-medium">Inicio de sesión</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-primary transition-transform duration-200 ${isDesktopUserMenuOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>

            {/* Dropdown Card */}
            <div className={`absolute top-full right-0 w-48 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 rounded-b-md transition-all duration-300 z-50 overflow-hidden ${
              isDesktopUserMenuOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
            }`}>
              <a
                href="https://portal.servimafed.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDesktopUserMenuOpen(false)}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 border-b border-gray-50 transition-colors"
              >
                Portal Cliente
              </a>
              <a
                href="https://app.servimafed.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDesktopUserMenuOpen(false)}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                Intranet (ERP)
              </a>
            </div>
          </div>

          {/* Mobile User Login Trigger & Dropdown */}
          <div className="relative md:hidden">
            <button
              onClick={() => {
                setIsUserMenuOpen((prev) => !prev);
                setIsMobileMenuOpen(false);
              }}
              className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isUserMenuOpen ? 'text-primary bg-primary/10' : 'text-dark hover:text-primary hover:bg-gray-100'
              }`}
              aria-label="Acceso a portales de usuario"
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[9992] bg-transparent"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-52 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.15)] border border-gray-100 rounded-lg p-2 z-[9993] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Acceso a Portales
                    </span>
                  </div>
                  <a
                    href="https://portal.servimafed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    <User className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
                    <span>Portal Cliente</span>
                  </a>
                  <a
                    href="https://app.servimafed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    <div className="w-4 h-4 rounded bg-dark text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      E
                    </div>
                    <span>Intranet (ERP)</span>
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger / Close Toggle Trigger */}
          <button
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
              setIsUserMenuOpen(false);
            }}
            className="lg:hidden cursor-pointer w-10 h-10 flex items-center justify-center hover:text-primary transition-colors text-dark"
            aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-dark" />
            ) : (
              <Menu className="w-6 h-6 text-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Full-width Mobile Menu Dropdown */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        topOffset={navBottom}
      />
    </nav>
  );
}

