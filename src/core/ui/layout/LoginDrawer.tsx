"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

interface LoginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDrawer({ isOpen, onClose }: LoginDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll and hide floating WhatsApp button when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("login-drawer-open", "mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("login-drawer-open", "mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("login-drawer-open", "mobile-menu-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-dark/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-drawer-title"
        className="relative z-10 w-full max-w-md sm:max-w-[420px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 ease-out"
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-7 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">
              Plataformas Digitales
            </span>
            <h2 id="login-drawer-title" className="text-xl font-bold text-dark uppercase tracking-tight">
              Inicio de Sesión
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar panel de inicio de sesión"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 sm:p-7 space-y-6 flex-1">
          {/* Main Action 1: Portal Cliente Servimafed */}
          <div className="space-y-2">
            <a
              href="https://portal.servimafed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 border-2 border-primary bg-transparent text-dark font-semibold text-xs tracking-wider text-center rounded-sm hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Ingresar al Portal Cliente</span>
              <ExternalLink className="w-4 h-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-gray-500 font-light text-xs leading-relaxed px-1">
              Consulta de órdenes de servicio, reportes técnicos y cotizaciones para clientes de Servimafed.
            </p>
          </div>

          {/* Main Action 2: ERP Axentra (Intranet Operativa) */}
          <div className="space-y-2 pt-1">
            <a
              href="https://app.servimafed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 border-2 border-primary bg-transparent text-dark font-semibold text-xs tracking-wider text-center rounded-sm hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Acceder a ERP Axentra</span>
              <ExternalLink className="w-4 h-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-gray-500 font-light text-xs leading-relaxed px-1">
              Sistema de gestión operativa de taller, repuestos y control de mantenimiento de maquinaria.
            </p>
          </div>

          <div className="w-full h-px bg-gray-100 my-4"></div>

          {/* Contextual Info (Estilo CAT: "Una Cuenta. Todo Cat.") */}
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-semibold text-dark tracking-tight">
              Una plataforma integrada.
            </h3>
            <p className="text-gray-500 font-light text-xs leading-relaxed">
              Nuestras herramientas digitales centralizan el control de su maquinaria, garantizando trazabilidad completa y máxima disponibilidad de su flota pesada.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium text-xs tracking-wider hover:bg-gray-100 hover:text-dark transition-all rounded-sm cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
