import { useState } from "react";
import { AlertTriangle, Loader2, Bot, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useMutation } from "@tanstack/react-query";
import { diagnoseDevice } from "@/services/api";

export interface CriticalAlertBannerProps {
  deviceId: string;
  peaksCount: number;
}

export function CriticalAlertBanner({ deviceId, peaksCount }: CriticalAlertBannerProps) {
  const [showModal, setShowModal] = useState(false);

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => diagnoseDevice(deviceId),
    onSuccess: () => setShowModal(true),
  });

  if (peaksCount <= 10) return null;

  const handleDiagnose = () => {
    mutate();
  };

  return (
    <>
      <div className="bg-error/10 border-2 border-error/50 rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-error/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-error" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-error">¡Atención! Estado Crítico</h3>
            <p className="text-on-surface/80">
              Este dispositivo ha superado los 10 picos de rendimiento anómalos en el día ({peaksCount} picos registrados).
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleDiagnose}
          disabled={isPending}
          className="bg-error hover:bg-error/90 text-white shadow-lg shadow-error/20 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
          size="lg"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Bot className="h-5 w-5" />
              Diagnosticar con IA
            </>
          )}
        </Button>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Diagnóstico de IA"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-hairline pb-3">
            <p className="text-sm text-slate-muted">
              Reporte generado para: <span className="font-mono text-primary">{deviceId}</span>
            </p>
            <span className="px-2 py-1 bg-surface-container text-xs font-mono rounded-md border border-border-hairline">
              v1.0-AI-ENGINE
            </span>
          </div>

          {data ? (
            <div className="space-y-4">
              <div className="p-4 bg-surface-container rounded-lg border-l-4 border-l-warning shadow-sm">
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-warning" />
                  Causa Raíz
                </h4>
                <p className="text-sm text-on-surface/90 font-mono leading-relaxed">
                  {data.rootCause}
                </p>
              </div>

              <div className="p-4 bg-error/5 rounded-lg border border-error/20">
                <h4 className="text-sm font-bold text-error uppercase tracking-wider mb-2">
                  Impacto Proyectado
                </h4>
                <p className="text-sm text-error/90 font-mono">
                  {data.impact}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3">
                  Pasos de Resolución Sugeridos
                </h4>
                <ul className="space-y-2">
                  {data.solutionSteps?.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-surface-container-lowest border border-border-hairline rounded-md">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-on-surface/90">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-muted text-sm font-mono">
              Esperando resultados del análisis...
            </div>
          )}
          
          <div className="flex justify-end pt-4 border-t border-border-hairline">
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cerrar Reporte
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
