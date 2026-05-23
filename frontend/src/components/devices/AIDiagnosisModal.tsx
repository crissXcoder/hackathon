"use client";

import React, { useState, useEffect } from "react";

export interface AIDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId: string;
}

const loadingStrings = [
  "Analizando anomalías...",
  "Consultando manuales técnicos...",
  "Verificando historial de telemetría...",
  "Generando plan de acción..."
];

export function AIDiagnosisModal({ isOpen, onClose, deviceId }: AIDiagnosisModalProps) {
  const [status, setStatus] = useState<'loading' | 'report'>('loading');
  const [textIndex, setTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setStatus('loading');
      setTextIndex(0);
      setTextOpacity(1);
      setIsClosing(false);
      return;
    }

    // Handle text rotation
    let stringIndex = 0;
    const textInterval = setInterval(() => {
      stringIndex = (stringIndex + 1) % loadingStrings.length;
      setTextOpacity(0);
      setTimeout(() => {
        setTextIndex(stringIndex);
        setTextOpacity(1);
      }, 200);
    }, 1200);

    // Transition from loading to report after 3.5 seconds
    const statusTimeout = setTimeout(() => {
      clearInterval(textInterval);
      setStatus('report');
    }, 3500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(statusTimeout);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      id="modal-overlay"
      className={`fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex justify-center items-center p-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-modal-enter flex flex-col max-h-[921px] border border-border-hairline">
        
        {/* STATE 1: LOADING */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-huge px-lg animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mb-lg flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-surface-container-highest rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <span className="material-symbols-outlined text-display-lg-mobile text-primary">smart_toy</span>
            </div>
            
            <h2 
              className="font-headline-md text-headline-md text-primary text-center mb-md transition-opacity duration-200" 
              style={{ opacity: textOpacity }}
            >
              {loadingStrings[textIndex]}
            </h2>
            
            <p className="font-body-base text-body-base text-slate-muted text-center mb-xl">
              El motor de IA está revisando la telemetría en tiempo real.
            </p>
            
            <div className="w-full max-w-md space-y-md">
              <div className="h-4 animate-shimmer rounded-full w-full"></div>
              <div className="h-4 animate-shimmer rounded-full w-5/6 mx-auto"></div>
              <div className="h-4 animate-shimmer rounded-full w-4/6 mx-auto"></div>
            </div>
          </div>
        )}

        {/* STATE 2: REPORT */}
        {status === 'report' && (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-lg border-b border-border-hairline bg-surface-bright shrink-0">
              <div className="flex items-center gap-md">
                <div className="bg-primary-container text-on-primary-container p-sm rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined filled">analytics</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Diagnóstico IA Completado</h2>
                  <p className="font-caption-stats text-caption-stats text-slate-muted mt-xs">
                    ID de Incidencia: #CGL-8492 • Análisis completado a las {new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button 
                aria-label="Cerrar modal" 
                className="text-slate-muted hover:text-on-surface transition-colors p-sm rounded-full hover:bg-surface-container"
                onClick={handleClose}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body Scrollable */}
            <div className="p-lg overflow-y-auto flex flex-col gap-lg bg-surface-container-lowest">
              {/* Root Cause */}
              <div className="bg-surface-container-low border border-border-hairline rounded-lg p-lg">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-primary">memory</span>
                  <h3 className="font-subheadline text-subheadline text-on-surface">Causa Raíz Identificada</h3>
                </div>
                <p className="font-body-base text-body-base text-on-surface-variant">
                  Se detectó una fluctuación de voltaje asimétrica en la subestación principal debido a la degradación térmica en el banco de capacitores B-2. El patrón coincide en un 98.4% con fallos reportados en manuales técnicos de mantenimiento preventivo.
                </p>
              </div>

              {/* Impact */}
              <div className="bg-error-container border border-error/20 rounded-lg p-md flex items-start gap-md">
                <span className="material-symbols-outlined text-volcanic-red mt-xs">warning</span>
                <div>
                  <h4 className="font-button-label text-button-label text-on-error-container mb-xs">Impacto en la Red</h4>
                  <p className="font-body-base text-body-base text-on-error-container/90">
                    Posible interrupción del servicio en el sector Norte (Aprox. 1,200 abonados) si no se corrige en las próximas 2 horas. Pérdida de eficiencia energética calculada en 4.2%.
                  </p>
                </div>
              </div>

              {/* Solution Steps */}
              <div>
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-tertiary">checklist</span>
                  <h3 className="font-subheadline text-subheadline text-on-surface">Pasos de Solución Recomendados</h3>
                </div>
                <div className="flex flex-col gap-sm">
                  {/* Step 1 */}
                  <label className="flex items-start gap-md p-md border border-border-hairline rounded-lg bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer group">
                    <div className="mt-xs">
                      <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest transition-all" type="checkbox" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-button-label text-button-label text-on-surface mb-xs">Aislar banco de capacitores B-2</span>
                      <code className="block font-mono text-sm text-slate-muted bg-surface-container-high px-sm py-xs rounded">CMD: net_isolate --target=sub_main_B2</code>
                    </div>
                  </label>
                  {/* Step 2 */}
                  <label className="flex items-start gap-md p-md border border-border-hairline rounded-lg bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer group">
                    <div className="mt-xs">
                      <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest transition-all" type="checkbox" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-button-label text-button-label text-on-surface mb-xs">Redirigir carga de tensión al banco B-3</span>
                      <code className="block font-mono text-sm text-slate-muted bg-surface-container-high px-sm py-xs rounded">CMD: load_balance --source=B2 --dest=B3</code>
                    </div>
                  </label>
                  {/* Step 3 */}
                  <label className="flex items-start gap-md p-md border border-border-hairline rounded-lg bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer group">
                    <div className="mt-xs">
                      <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest transition-all" type="checkbox" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-button-label text-button-label text-on-surface mb-xs">Generar orden de trabajo para equipo en campo</span>
                      <span className="block font-body-base text-body-base text-on-surface-variant text-sm">Asignar cuadrilla de mantenimiento preventivo zona Norte.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-lg border-t border-border-hairline bg-surface flex items-center justify-end gap-md shrink-0 rounded-b-xl">
              <button 
                className="px-lg py-md rounded-DEFAULT border border-outline-variant text-on-surface-variant font-button-label text-button-label hover:bg-surface-container-highest transition-colors duration-300"
                onClick={handleClose}
              >
                Cerrar reporte
              </button>
              <button className="px-lg py-md rounded-DEFAULT bg-primary text-on-primary font-button-label text-button-label hover:scale-98 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center gap-sm">
                <span className="material-symbols-outlined text-[20px]">build</span>
                Aplicar Corrección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
