"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface FormSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  details?: React.ReactNode;
  closeButtonText?: string;
}

export function FormSuccessModal({
  isOpen,
  onClose,
  title,
  description,
  details,
  closeButtonText = "Entendido"
}: FormSuccessModalProps) {
  // Lock scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-sm shadow-2xl border-t-4 border-primary p-6 sm:p-8 text-center z-10 transform transition-all duration-300 scale-100"
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

        {/* Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-dark uppercase tracking-tight mb-3">
          {title}
        </h3>

        {/* Description */}
        <div className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-6">
          {description}
        </div>

        {/* Details Box */}
        {details && (
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 text-xs text-gray-600 mb-6 text-left space-y-1">
            {details}
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-primary hover:bg-[#ffcc00] text-dark font-bold py-3.5 px-6 uppercase text-xs tracking-widest transition-all rounded-sm shadow-sm cursor-pointer"
        >
          {closeButtonText}
        </button>
      </div>
    </div>
  );
}
