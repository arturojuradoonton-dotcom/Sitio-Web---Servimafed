"use client";

import React, { useState, useRef } from "react";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { sendClaimRequest } from "@/core/actions/sendClaimRequest";
import { FormSuccessModal } from "@/core/ui/FormSuccessModal";

export default function LibroReclamacionesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    claimCode: string;
    tipo: string;
    correo: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await sendClaimRequest(formData);

      if (result.success && result.claimCode) {
        setSuccessData({
          claimCode: result.claimCode,
          tipo: result.tipo || "RECLAMO",
          correo: result.correo || "",
        });
        formRef.current?.reset();
      } else {
        setErrorMessage(result.error || "Ocurrió un error al registrar la reclamación.");
      }
    } catch {
      setErrorMessage("Error de conexión. Por favor verifique su internet o intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3 rounded-sm">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 font-light">{errorMessage}</p>
          </div>
        )}

        {/* Tipo de Solicitud */}
        <div>
          <label className="block font-medium text-gray-700 mb-3 text-xs uppercase tracking-widest">
            Tipo de Solicitud <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="reclamo"
                className="accent-primary w-4 h-4 cursor-pointer"
                defaultChecked
              />
              <span className="text-sm text-gray-700 font-medium">Reclamo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="queja"
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-700 font-medium">Queja</span>
            </label>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 font-light">
            <strong>Reclamo:</strong> disconformidad con el servicio o producto brindado.{" "}
            <strong>Queja:</strong> malestar respecto a la atención o trato al público.
          </p>
        </div>

        {/* Datos Personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
              Nombre Completo / Razón Social <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre"
              type="text"
              required
              disabled={isSubmitting}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm rounded-sm"
              placeholder="Ej. Juan Pérez García"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
              DNI / RUC <span className="text-red-500">*</span>
            </label>
            <input
              name="documento"
              type="text"
              required
              disabled={isSubmitting}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm rounded-sm"
              placeholder="12345678 o 20600567668"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
              Teléfono de Contacto <span className="text-red-500">*</span>
            </label>
            <input
              name="telefono"
              type="tel"
              required
              disabled={isSubmitting}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm rounded-sm"
              placeholder="+51 987 654 321"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              name="correo"
              type="email"
              required
              disabled={isSubmitting}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm rounded-sm"
              placeholder="correo@ejemplo.com (Recibirá aquí su constancia)"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
            Dirección del Consumidor
          </label>
          <input
            name="direccion"
            type="text"
            disabled={isSubmitting}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm rounded-sm"
            placeholder="Av. Principal 123, Distrito, Ciudad"
          />
        </div>

        {/* Detalle */}
        <div>
          <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
            Detalle de la Reclamación <span className="text-red-500">*</span>
          </label>
          <textarea
            name="detalle"
            rows={5}
            required
            disabled={isSubmitting}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none rounded-sm"
            placeholder="Describa de manera clara y detallada los hechos que fundamentan su reclamo o queja..."
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
            Pedido Concreto del Consumidor <span className="text-red-500">*</span>
          </label>
          <textarea
            name="pedido"
            rows={3}
            required
            disabled={isSubmitting}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none rounded-sm"
            placeholder="Indique con precisión qué solución o acción solicita por parte de la empresa..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-dark font-bold px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full md:w-auto mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed rounded-sm text-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-dark" />
              <span>Registrando reclamación...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Enviar Reclamación</span>
            </>
          )}
        </button>
      </form>

      {/* Modal de Éxito Estandarizado */}
      <FormSuccessModal
        isOpen={Boolean(successData)}
        onClose={() => setSuccessData(null)}
        title="¡Reclamación Registrada con Éxito!"
        description={
          <>
            Hemos registrado su solicitud en nuestro Libro de Reclamaciones Virtual de conformidad con la Ley N° 29571.
            Se ha emitido y remitido su constancia digital oficial a <strong className="text-dark">{successData?.correo}</strong>.
          </>
        }
        details={
          successData ? (
            <div className="space-y-1.5">
              <p>
                <strong>N° de Hoja de Reclamación:</strong>{" "}
                <span className="text-amber-600 font-bold tracking-wide">{successData.claimCode}</span>
              </p>
              <p>
                <strong>Tipo registrado:</strong> {successData.tipo}
              </p>
              <p>
                <strong>Plazo de Respuesta Legal:</strong> 15 días hábiles improrrogables (Ley N° 31435 - INDECOPI).
              </p>
            </div>
          ) : undefined
        }
        closeButtonText="Entendido"
      />
    </>
  );
}
