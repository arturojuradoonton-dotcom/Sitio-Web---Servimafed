"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, FileText, Download, Loader2, AlertCircle } from "lucide-react";
import { sendBrochureLead } from "@/core/actions/sendBrochureLead";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { nombre: string; empresa: string; correo: string }) => void;
}

export default function BrochureModal({ isOpen, onClose, onSuccess }: BrochureModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await sendBrochureLead(formData);

      if (result.success && result.downloadUrl) {
        // Disparar descarga automática en el navegador
        const link = document.createElement("a");
        link.href = result.downloadUrl;
        link.download = "Brochure-SERVIMAFED.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        formRef.current?.reset();
        onSuccess({
          nombre: result.nombre || "",
          empresa: result.empresa || "",
          correo: result.correo || "",
        });
        onClose();
      } else {
        setErrorMessage(result.error || "Ocurrió un error al procesar la solicitud.");
      }
    } catch {
      setErrorMessage("Error de conexión. Por favor intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-white text-dark rounded-sm shadow-2xl border-t-4 border-primary p-6 sm:p-8 z-10 transform transition-all duration-300 scale-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors p-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-primary/20">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-dark">
            Descargar Brochure Corporativo
          </h3>
          <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed max-w-sm mx-auto">
            Complete sus datos para iniciar la descarga inmediata de nuestro dossier técnico y recibir una copia de respaldo.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-start gap-2 rounded-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Ej. Ing. Carlos Mendoza"
              className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary px-3.5 py-2.5 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1">
              Empresa / Razón Social <span className="text-red-500">*</span>
            </label>
            <input
              name="empresa"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Ej. Minera Chinalco / Consorcio Vial"
              className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary px-3.5 py-2.5 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1">
                Correo Corporativo <span className="text-red-500">*</span>
              </label>
              <input
                name="correo"
                type="email"
                required
                disabled={isSubmitting}
                placeholder="cmendoza@empresa.com"
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary px-3.5 py-2.5 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1">
                Teléfono <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <input
                name="telefono"
                type="tel"
                disabled={isSubmitting}
                placeholder="+51 987 654 321"
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary px-3.5 py-2.5 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-400 font-light pt-1 leading-normal">
            Al solicitar el brochure, acepta recibir información técnica y comercial de SERVIMAFED S.A.C.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-[#ffcc00] text-dark font-bold py-3.5 px-6 uppercase text-xs tracking-widest transition-all rounded-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-dark" />
                <span>Generando descarga...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar Brochure PDF</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
