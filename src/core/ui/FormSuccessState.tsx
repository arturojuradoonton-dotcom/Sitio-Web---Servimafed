"use client";

import React from 'react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface FormSuccessStateProps {
  title: string;
  description: React.ReactNode;
  details?: React.ReactNode;
  actions?: React.ReactNode;
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

export function FormSuccessState({
  title,
  description,
  details,
  actions,
  onReset,
  resetLabel = "Enviar otra consulta",
  className = ""
}: FormSuccessStateProps) {
  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-sm p-8 shadow-sm transition-all animate-fadeIn ${className}`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-dark uppercase tracking-tight mb-2">
          {title}
        </h3>
        <div className="text-slate-600 text-sm font-light leading-relaxed max-w-lg mx-auto">
          {description}
        </div>
      </div>

      {details && (
        <div className="bg-white border border-slate-200 p-4 rounded-sm text-xs text-slate-500 mb-6 space-y-1">
          {details}
        </div>
      )}

      {actions && (
        <div className="mb-6">
          {actions}
        </div>
      )}

      {onReset && (
        <div className="text-center">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs font-bold text-dark hover:text-primary uppercase tracking-widest transition-colors py-2 px-4"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {resetLabel}
          </button>
        </div>
      )}
    </div>
  );
}
