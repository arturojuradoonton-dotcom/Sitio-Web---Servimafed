"use client";

import React, { useState, useEffect } from 'react';
import { useSchedulerStore } from '@/modules/Scheduling/store/useSchedulerStore';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Wrench, 
  CheckCircle2, 
  Loader2,
  Truck,
  Clock,
  Paperclip
} from 'lucide-react';

import { sendVisitRequest } from '@/core/actions/sendVisitRequest';

export default function ScheduleVisitModal() {
  const { isOpen, close } = useSchedulerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [equipment, setEquipment] = useState('');
  const [year, setYear] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form states on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFullName('');
        setPhone('');
        setEmail('');
        setEquipment('');
        setYear('');
        setServiceType('');
        setPreferredDate('');
        setPreferredTime('');
        setFile(null);
        setComments('');
        setErrors({});
        setIsSuccess(false);
        setSubmitError(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = 'Obligatorio';
    if (!phone.trim()) tempErrors.phone = 'Obligatorio';
    if (!serviceType) tempErrors.serviceType = 'Obligatorio';
    if (!preferredDate) tempErrors.preferredDate = 'Obligatorio';
    
    // File size validation (5MB max)
    if (file && file.size > 5 * 1024 * 1024) {
      tempErrors.file = 'El archivo no debe exceder 5MB';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('equipment', equipment);
      formData.append('year', year);
      formData.append('serviceType', serviceType);
      formData.append('preferredDate', preferredDate);
      formData.append('preferredTime', preferredTime);
      formData.append('comments', comments);
      if (file) {
        formData.append('file', file);
      }

      const response = await sendVisitRequest(formData);

      if (response.success) {
        setIsSuccess(true);
        // Auto close after 2.5 seconds
        setTimeout(() => {
          close();
        }, 2500);
      } else {
        setSubmitError(response.error || 'Ocurrió un error al enviar la solicitud.');
      }
    } catch (error) {
      setSubmitError('Error de red. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={close}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white text-dark border-t-[5px] border-primary shadow-2xl transition-all duration-300 transform scale-100 flex flex-col max-h-[90vh] overflow-hidden rounded-sm">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm sm:text-base uppercase tracking-widest text-dark">Agendar Visita Técnica</h3>
          </div>
          <button 
            onClick={close}
            className="text-gray-400 hover:text-dark transition-colors p-1 cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wider text-dark mb-3">¡Solicitud Registrada!</h4>
              <p className="text-gray-500 font-light text-sm max-w-sm mx-auto leading-relaxed">
                Su cita ha sido agendada con éxito. Un ingeniero se comunicará con usted a la brevedad para confirmar los detalles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-2">
                Complete el formulario a continuación para programar una inspección o mantenimiento de sus equipos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Column 1: Información de contacto */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[13px] text-dark uppercase tracking-wide border-b border-gray-100 pb-2">Información de contacto</h4>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Nombre / Razón Social *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Teléfono *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. +51 987 654 321"
                        className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="correo@empresa.com"
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2: Detallado de equipos */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[13px] text-dark uppercase tracking-wide border-b border-gray-100 pb-2">Detallado de equipos</h4>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Vehículo, marca y modelo</label>
                    <div className="relative">
                      <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        placeholder="Ej. Excavadora CAT 336D"
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Año</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <select 
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 pl-10 pr-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm appearance-none"
                      >
                        <option value="">Seleccionar Año</option>
                        {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Tipo de Servicio *</label>
                    <div className="relative">
                      <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <select 
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className={`w-full bg-gray-50 border ${errors.serviceType ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 pl-10 pr-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm appearance-none`}
                      >
                        <option value="" disabled>Seleccione una opción...</option>
                        <option value="preventivo">Mantenimiento Preventivo</option>
                        <option value="reparacion">Reparación de Componentes</option>
                        <option value="soldadura">Mecanizado y Soldadura</option>
                        <option value="diagnostico">Evaluación y Diagnóstico</option>
                        <option value="repuestos">Suministro de Repuestos</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                        ▼
                      </div>
                    </div>
                    {errors.serviceType && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.serviceType}</p>}
                  </div>
                </div>

                {/* Column 3: Detalles de la cita */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[13px] text-dark uppercase tracking-wide border-b border-gray-100 pb-2">Detalles de la cita</h4>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Fecha Sugerida *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <input 
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className={`w-full bg-gray-50 border ${errors.preferredDate ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm`}
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.preferredDate}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Hora Preferida</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <input 
                        type="time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 px-10 py-3 text-sm text-dark font-light focus:outline-none transition-all rounded-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Adjuntar Archivo</label>
                    <div className="relative w-full bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 flex items-center px-4 py-2 rounded-sm h-[46px]">
                      <Paperclip className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer ml-6 border border-gray-300 text-[11px] font-medium px-3 py-1 bg-white hover:bg-gray-100 transition-colors text-dark mr-3 whitespace-nowrap rounded-sm">
                        Seleccionar
                      </label>
                      <span className="text-[11px] text-gray-500 truncate flex-1">
                        {file ? file.name : 'Ninguno...'}
                      </span>
                    </div>
                    {errors.file && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.file}</p>}
                  </div>
                </div>
              </div>

              {/* Descripción de la falla */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-widest mb-1.5">Descripción de la Falla (Opcional)</label>
                <textarea 
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Describa el problema o los síntomas de su equipo..."
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 p-4 text-sm text-dark font-light focus:outline-none transition-all rounded-sm resize-none placeholder-gray-400"
                />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-sm flex items-center justify-center">
                  {submitError}
                </div>
              )}

              {/* Footer (Button exactly as requested visually positioned, but styled to standard) */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-gray-100">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-[#ffcc00] text-dark px-10 py-3.5 uppercase text-xs font-bold tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer min-w-[180px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Entregar'
                  )}
                </button>
                <p className="text-gray-500 text-xs font-light">
                  Tenga en cuenta que la fecha y la hora solicitadas podrían no estar disponibles.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
