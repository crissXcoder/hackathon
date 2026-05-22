import { useState } from "react";
import { AlertTriangle, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export interface CriticalAlertBannerProps {
  deviceId: string;
  peaksCount: number;
}

export function CriticalAlertBanner({ deviceId, peaksCount }: CriticalAlertBannerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // We only render this if peaksCount > 10, but the component itself shouldn't decide its visibility unless requested. 
  // However, the prompt says "Este componente SOLO debe renderizarse si la data recibida... indica que el contador de picos es > 10".
  // We can enforce it here as well for safety.
  if (peaksCount <= 10) return null;

  const handleDiagnose = () => {
    setIsAnalyzing(true);
    // Simulate API call for AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowModal(true);
    }, 2000);
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
          disabled={isAnalyzing}
          className="bg-error hover:bg-error/90 text-white shadow-lg shadow-error/20 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
          size="lg"
        >
          {isAnalyzing ? (
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
        <div className="space-y-4">
          <p className="text-sm text-slate-muted">
            Análisis generado para el dispositivo <span className="font-mono text-on-surface">{deviceId}</span>
          </p>
          <div className="p-4 bg-surface-container rounded-lg border border-border-hairline prose prose-sm prose-invert max-w-none">
            <p>
              Basado en el patrón de picos de rendimiento recientes, la anomalía sugiere un posible <strong>memory leak</strong> (fuga de memoria) asociado con el proceso principal en horas pico, seguido por thrashing del CPU. 
            </p>
            <ul>
              <li><strong>Recomendación 1:</strong> Reiniciar el servicio de aplicación principal.</li>
              <li><strong>Recomendación 2:</strong> Auditar los logs de la última actualización desplegada.</li>
              <li><strong>Recomendación 3:</strong> Incrementar temporalmente los umbrales de alerta para evitar fatiga de alertas.</li>
            </ul>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
