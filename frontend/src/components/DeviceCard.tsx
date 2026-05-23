"use client";

import Link from "next/link";
import type { DeviceStatus } from "./StatusBadge";

export interface DeviceCardProps {
  id: string;
  name: string;
  status: DeviceStatus;
  temperature: number;
  cpu: number;
  memory: number;
  ip?: string;
}

export function DeviceCard({
  id,
  name,
  status,
  temperature,
  cpu,
  memory,
  ip,
}: DeviceCardProps) {
  // Determinar el estilo base y configuraciones según el estado
  const isCritical = status === "critical";
  const isWarning = status === "warning";
  const isHealthy = status === "healthy";

  const cardBaseClass = "block bg-surface-container-lowest border rounded-xl p-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg group";
  const cardBorderClass = isCritical ? "border-volcanic-red/30 shadow-[0_0_15px_rgba(220,38,38,0.05)] relative overflow-hidden" : "border-border-hairline";

  const iconBgClass = isCritical ? "bg-error-container text-volcanic-red" : isWarning ? "bg-surface-container text-primary" : "bg-surface-container text-primary";
  const iconName = "router"; // Por simplicidad usamos un ícono genérico, pero podríamos mapearlo por tipo de dispositivo si existiera en la prop

  const titleHoverClass = isCritical ? "group-hover:text-volcanic-red" : "group-hover:text-primary";

  const badgeWrapperClass = isCritical 
    ? "bg-error-container text-on-error-container" 
    : isWarning 
    ? "bg-secondary-fixed text-on-secondary-fixed-variant"
    : "bg-primary-fixed text-on-primary-fixed-variant";

  const badgeDotClass = isCritical
    ? "" // Para crítico se usa el ícono warning en vez de un dot en el mockup
    : isWarning
    ? "bg-secondary-container"
    : "bg-primary-container animate-subtle-pulse";

  const badgeText = isCritical ? "Crítico" : isWarning ? "Advertencia" : "Óptimo";

  // Helpers para color de barra y texto según severidad
  const getMetricColor = (val: number, thresholdWarn: number, thresholdCrit: number) => {
    if (val >= thresholdCrit) return { text: "text-volcanic-red font-bold", bar: "bg-volcanic-red" };
    if (val >= thresholdWarn) return { text: "text-secondary-container font-bold", bar: "bg-secondary-container" };
    return { text: "text-on-surface font-medium", bar: "bg-primary-container" };
  };

  const cpuColor = getMetricColor(cpu, 70, 90);
  const ramColor = getMetricColor(memory, 75, 90);
  const tempColor = getMetricColor(temperature, 60, 80);

  return (
    <Link href={`/devices/${id}`} className={`${cardBaseClass} ${cardBorderClass}`}>
      {isCritical && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-error-container rounded-full blur-3xl -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
      )}

      <div className={`flex justify-between items-start mb-md ${isCritical ? 'relative z-10' : ''}`}>
        <div className="flex items-center gap-sm">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgClass}`}>
            <span className="material-symbols-outlined">{iconName}</span>
          </div>
          <div>
            <h3 className={`font-subheadline text-subheadline text-on-surface transition-colors ${titleHoverClass}`}>
              {name}
            </h3>
            <p className="font-caption-stats text-caption-stats text-slate-muted">
              {ip || "IP no asignada"}
            </p>
          </div>
        </div>
        
        <span className={`inline-flex items-center gap-xs px-2 py-1 rounded-full font-caption-stats text-caption-stats ${badgeWrapperClass}`}>
          {isCritical ? (
            <span className="material-symbols-outlined text-[12px]">warning</span>
          ) : (
            <span className={`w-2 h-2 rounded-full ${badgeDotClass}`}></span>
          )}
          {badgeText}
        </span>
      </div>

      <div className={`space-y-sm ${isCritical ? 'relative z-10' : ''}`}>
        {/* CPU */}
        <div>
          <div className="flex justify-between font-caption-stats text-caption-stats mb-xs">
            <span className="text-slate-muted flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">memory</span> Carga (CPU)
            </span>
            <span className={cpuColor.text}>{cpu.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
            <div className={`h-1.5 rounded-full ${cpuColor.bar}`} style={{ width: `${Math.min(100, Math.max(0, cpu))}%` }}></div>
          </div>
        </div>

        {/* RAM */}
        <div>
          <div className="flex justify-between font-caption-stats text-caption-stats mb-xs">
            <span className="text-slate-muted flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">save</span> Memoria
            </span>
            <span className={ramColor.text}>{memory.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
            <div className={`h-1.5 rounded-full ${ramColor.bar}`} style={{ width: `${Math.min(100, Math.max(0, memory))}%` }}></div>
          </div>
        </div>

        {/* Temperatura */}
        <div>
          <div className="flex justify-between font-caption-stats text-caption-stats mb-xs">
            <span className="text-slate-muted flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">thermostat</span> Temperatura
            </span>
            <span className={tempColor.text}>{temperature.toFixed(0)}°C</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
            <div className={`h-1.5 rounded-full ${tempColor.bar}`} style={{ width: `${Math.min(100, Math.max(0, temperature))}%` }}></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
