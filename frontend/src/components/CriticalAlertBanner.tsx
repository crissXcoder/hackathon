"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Loader2, BrainCircuit, Activity } from "lucide-react";
import { diagnoseDevice } from "@/services/api";
import { Banner, BannerDescription, BannerTitle } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface Props {
  deviceId: string;
  status: string;
}

export function CriticalAlertBanner({ deviceId, status }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, data: aiResult, isPending } = useMutation({
    mutationFn: () => diagnoseDevice(deviceId),
  });

  if (status !== "CRITICAL") return null;

  const handleDiagnoseClick = () => {
    setIsModalOpen(true);
    if (!aiResult) {
      mutate();
    }
  };

  return (
    <>
      <Banner variant="destructive" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div>
            <BannerTitle>¡Atención!</BannerTitle>
            <BannerDescription>
              Este dispositivo ha superado los 10 picos de rendimiento anómalos en el día.
            </BannerDescription>
          </div>
        </div>
        <Button
          onClick={handleDiagnoseClick}
          disabled={isPending}
          variant="destructive"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <BrainCircuit className="mr-2 h-5 w-5" />
              Diagnosticar con IA
            </>
          )}
        </Button>
      </Banner>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Diagnóstico de IA"
      >
        {isPending || !aiResult ? (
          <div className="flex flex-col items-center justify-center py-12 gap-5">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium animate-pulse text-center">
              Revisando manuales del fabricante y<br/> logs del dispositivo {deviceId}...
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="rounded-xl bg-muted p-5 border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Causa Raíz
              </h4>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">
                {aiResult.rootCause}
              </p>
            </div>

            <div className="rounded-xl bg-destructive/10 p-5 border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Impacto si no se resuelve
              </h4>
              <p className="text-sm text-destructive/80 leading-relaxed font-medium">
                {aiResult.impact}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-5 border border-primary/20">
              <h4 className="font-semibold text-primary mb-3">Pasos de Solución</h4>
              <ul className="text-sm text-foreground/80 space-y-2 list-disc list-inside pl-1">
                {aiResult.solutionSteps?.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isPending && aiResult && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar y Notificar NOC
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}