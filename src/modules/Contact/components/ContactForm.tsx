"use client";

import React, { useState } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { sendContactRequest } from '@/core/actions/sendContactRequest';
import { FormSuccessModal } from '@/core/ui/FormSuccessModal';
import type { ContactFormData, ContactFormErrors } from '../types/contact.types';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    companyName: '',
    phone: '',
    email: '',
    requirement: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<ContactFormData | null>(null);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Ingrese la razón social o su nombre';
    }

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = 'Ingrese un teléfono de contacto';
    } else if (cleanPhone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Ingrese un número telefónico válido (mínimo 7 dígitos)';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Ingrese un correo electrónico válido';
      }
    }

    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Especifique el requerimiento técnico o falla';
    } else if (formData.requirement.trim().length < 5) {
      newErrors.requirement = 'Por favor detalle un poco más su requerimiento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactRequest(formData);

      if (result.success) {
        setLastSubmitted({ ...formData });
        setIsSuccess(true);
        setFormData({
          companyName: '',
          phone: '',
          email: '',
          requirement: '',
        });
      } else {
        setErrorMessage(result.error || 'Ocurrió un error al enviar la solicitud.');
      }
    } catch {
      setErrorMessage('Error de conexión. Por favor verifique su conexión a internet o intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-light text-dark mb-2 uppercase tracking-tight">
        Envíanos una <span className="font-bold text-primary">Solicitud</span>
      </h2>
      <div className="w-12 h-1 bg-primary mb-8"></div>

      <p className="text-gray-500 font-light mb-8 leading-relaxed text-sm">
        Si requiere una cotización para mantenimiento de flota, inspecciones estructurales o repuestos OEM, complete el siguiente formulario oficial.
      </p>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-start gap-3 rounded-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div className="space-y-1">
            <p className="font-semibold">{errorMessage}</p>
            <p className="text-slate-600">
              Si el problema persiste, puede comunicarse directamente a nuestra central telefónica al{' '}
              <a href="tel:+51993667182" className="underline font-bold text-red-800">
                +51 993 667 182
              </a>.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
                  Razón Social / Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-50 border px-4 py-3 focus:outline-none focus:ring-1 transition-colors font-light text-sm ${
                    errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'
                  }`}
                  placeholder="Ej. Minera o Constructora S.A.C."
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
                  Teléfono de Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-50 border px-4 py-3 focus:outline-none focus:ring-1 transition-colors font-light text-sm ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'
                  }`}
                  placeholder="Ej. +51 987 654 321"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 font-light">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
                Correo Corporativo <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full bg-gray-50 border px-4 py-3 focus:outline-none focus:ring-1 transition-colors font-light text-sm ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'
                }`}
                placeholder="contacto@empresa.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-light">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2 text-xs uppercase tracking-widest">
                Requerimiento Técnico <span className="text-red-500">*</span>
              </label>
              <textarea
                name="requirement"
                rows={5}
                value={formData.requirement}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full bg-gray-50 border px-4 py-3 focus:outline-none focus:ring-1 transition-colors font-light text-sm resize-none ${
                  errors.requirement ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'
                }`}
                placeholder="Especifique tipo de maquinaria, modelo, horas de operación o repuesto solicitado..."
              ></textarea>
              {errors.requirement && (
                <p className="text-red-500 text-xs mt-1 font-light">{errors.requirement}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-dark font-bold px-8 py-4 uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full md:w-auto mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-dark" />
                  <span>Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud</span>
                </>
              )}
            </button>
          </form>

      <FormSuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="¡Solicitud Recibida con Éxito!"
        description={
          <>
            Estimado/a <strong className="text-dark">{lastSubmitted?.companyName || 'cliente'}</strong>, hemos registrado su requerimiento.
            Nuestro equipo comercial y de soporte técnico se comunicará al teléfono <strong className="text-dark">{lastSubmitted?.phone}</strong> en un plazo estimado de <span className="text-primary font-bold">2 a 4 horas laborables</span>.
          </>
        }
        details={
          lastSubmitted?.requirement ? (
            <>
              <p className="font-bold text-gray-700">Requerimiento registrado:</p>
              <p className="italic text-gray-600 font-light">&ldquo;{lastSubmitted.requirement}&rdquo;</p>
            </>
          ) : undefined
        }
        closeButtonText="Entendido"
      />
    </div>
  );
}
