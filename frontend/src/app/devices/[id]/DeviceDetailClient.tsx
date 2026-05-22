"use client";

import { useDeviceDetail } from "@/hooks/useDeviceDetail";
import { DeviceDetailSkeleton } from "@/components/devices/DeviceDetailSkeleton";
import { CriticalAlertBanner } from "@/components/CriticalAlertBanner";
import { StatusBadge } from "@/components/StatusBadge";
import { Server, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export interface DeviceDetailClientProps {
  id: string;
}

export function DeviceDetailClient({ id }: DeviceDetailClientProps) {
  const { data: device, isLoading, isError, error } = useDeviceDetail(id);

  if (isLoading) {
    return <DeviceDetailSkeleton />;
  }

  if (isError || !device) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-error mb-2">Error al cargar dispositivo</h2>
        <p className="text-on-surface/80">{error?.message || "No se pudo obtener la información."}</p>
        <Link href="/dashboard" className="mt-6">
          <Button variant="secondary" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-primary hover:underline gap-1 mb-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <CriticalAlertBanner deviceId={device.id} status={device.status === 'critical' ? 'CRITICAL' : device.status?.toUpperCase() ?? ''} />

      <Card className="overflow-hidden border-border-hairline bg-surface-container-lowest">
        {/* Top Accent Line */}
        <div className={`h-1.5 w-full ${
          device.status === 'critical' ? 'bg-error' : 
          device.status === 'warning' ? 'bg-warning' : 
          'bg-primary'
        }`} />

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface-container-highest border border-border-hairline">
                <Server className="h-7 w-7 text-on-surface" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-on-surface">{device.name}</h1>
                <p className="text-sm font-mono text-slate-muted mt-1">{device.ip || "IP no disponible"}</p>
              </div>
            </div>
            <StatusBadge status={device.status === 'ok' ? 'healthy' : device.status} />
          </div>

          <div className="h-px bg-border-hairline w-full mb-6" />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border-hairline">
            <div className="flex flex-col gap-1 pt-4 md:pt-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">Temperatura</span>
              <span className={`text-3xl font-bold tabular-nums leading-none ${(device.temperature ?? 0) >= 75 ? "text-error" : "text-on-surface"}`}>
                {device.temperature?.toFixed(1) ?? "--"}<span className="text-lg opacity-70 ml-1">°C</span>
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-4 md:pt-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">CPU</span>
              <span className={`text-3xl font-bold tabular-nums leading-none ${(device.cpu ?? 0) >= 90 ? "text-error" : (device.cpu ?? 0) >= 70 ? "text-warning" : "text-on-surface"}`}>
                {device.cpu?.toFixed(0) ?? "--"}<span className="text-lg opacity-70 ml-1">%</span>
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-4 md:pt-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">Memoria RAM</span>
              <span className={`text-3xl font-bold tabular-nums leading-none ${(device.memory ?? 0) >= 90 ? "text-error" : (device.memory ?? 0) >= 75 ? "text-warning" : "text-on-surface"}`}>
                {device.memory?.toFixed(0) ?? "--"}<span className="text-lg opacity-70 ml-1">%</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border-hairline bg-surface-container-lowest">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border-hairline/50">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Historial de Picos</CardTitle>
          </div>
          <div className="px-3 py-1 bg-surface-container rounded-full border border-border-hairline">
            <span className="text-sm font-bold text-on-surface">{device.peaksCount ?? 0}</span>
            <span className="text-xs text-slate-muted ml-1 uppercase">Total</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {(device.peaks?.length ?? 0) > 0 ? (
            <div className="divide-y divide-border-hairline/50">
              {device.peaks?.map((peak, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 hover:bg-surface-container/50 transition-colors">
                  <span className="text-sm font-mono text-on-surface/80">
                    {new Date(peak.timestamp).toLocaleString("es-CR", {
                      dateStyle: "short",
                      timeStyle: "medium"
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tabular-nums text-warning">{peak.value.toFixed(1)}</span>
                    <span className="text-xs text-slate-muted">ms / %</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-on-surface/60 text-sm">No se han registrado picos anómalos recientemente.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
