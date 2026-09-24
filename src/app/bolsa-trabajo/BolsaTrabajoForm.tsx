"use client";

import { useState, useRef } from "react";
import { Send, AlertCircle } from "lucide-react";
import { sendJobApplication } from "@/core/actions/sendJobApplication";
import { FormSuccessModal } from "@/core/ui/FormSuccessModal";

export default function BolsaTrabajoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await sendJobApplication(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Error al enviar la postulación.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-light">{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Nombre Completo *</label>
          <input name="nombre" type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="Juan Pérez García" required />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Teléfono *</label>
          <input name="telefono" type="tel" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="+51 987 654 321" required />
        </div>
      </div>
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Correo Electrónico *</label>
        <input name="correo" type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" placeholder="correo@ejemplo.com" required />
      </div>
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Área de Interés *</label>
        <select name="area" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm" required>
          <option value="">Seleccione un área</option>
          <option value="mecanica">Mecánica de Maquinaria Pesada</option>
          <option value="soldadura">Soldadura y Mecanizado</option>
          <option value="electronica">Electrónica y Diagnóstico</option>
          <option value="logistica">Logística y Repuestos</option>
          <option value="ingenieria">Ingeniería de Proyectos</option>
          <option value="administracion">Administración y Finanzas</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Mensaje / Experiencia</label>
        <textarea name="mensaje" rows={4} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm resize-none" placeholder="Cuéntenos brevemente su experiencia profesional..." />
      </div>
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">Adjuntar CV (PDF)</label>
        <input name="cv" type="file" accept=".pdf,.doc,.docx" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-light text-sm file:mr-4 file:py-1 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-primary file:text-dark file:uppercase file:tracking-widest file:cursor-pointer" />
      </div>

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="bg-primary text-dark font-medium px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full md:w-auto mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <Send className="w-4 h-4" />
        )}
        {status === "loading" ? "Enviando..." : "Enviar Postulación"}
      </button>

      <FormSuccessModal
        isOpen={status === "success"}
        onClose={() => setStatus("idle")}
        title="¡Postulación Enviada con Éxito!"
        description="Hemos recibido sus datos y su currículum vitae correctamente. Nuestro equipo de Recursos Humanos revisará su perfil y se pondrá en contacto si hay una vacante disponible."
        closeButtonText="Entendido"
      />
    </form>
  );
}
