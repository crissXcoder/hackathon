"use client";

import Link from "next/link";
import { Server } from "lucide-react";
import { StatusBadge, type DeviceStatus } from "./StatusBadge";

export interface DeviceCardProps {
  id: string;
  name: string;
  status: DeviceStatus;
  temperature: number;
  cpu: number;
  memory: number;
  ip?: string;
}

interface MetricCellProps {
  label: string;
  value: string;
  valueClassName?: string;
  unit?: string;
}

function MetricCell({ label, value, valueClassName, unit }: MetricCellProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
        {label}
      </span>
      <span className={`text-lg font-bold tabular-nums leading-none ${valueClassName}`}>
        {value}
        {unit && (
          <span className="ml-0.5 text-xs font-normal opacity-70">{unit}</span>
        )}
      </span>
    </div>
  );
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
  const tempClass =
    temperature >= 75 ? "text-error" : "text-on-surface";

  return (
    <Link href={`/devices/${id}`} className="block focus:outline-none group">
      <div className="bg-surface-container-lowest border border-border-hairline rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md h-full min-h-[220px] flex flex-col relative group-hover:-translate-y-0.5">
        
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
          status === 'critical' ? 'bg-error' : 
          status === 'warning' ? 'bg-warning' : 
          'bg-primary'
        }`} />

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-6 mt-2">
            <div className="flex items-center gap-3 min-w-0">
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest border border-border-hairline"
              >
                <Server className="h-5 w-5 text-on-surface" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-on-surface leading-tight">
                  {name}
                </h3>
                {ip && (
                  <p className="mt-1 truncate text-xs font-mono text-slate-muted">
                    {ip}
                  </p>
                )}
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
          
          <div className="mt-auto">
            <div className="h-px bg-border-hairline w-full mb-4" />
            <div
              role="list"
              aria-label="Métricas del dispositivo"
              className="grid grid-cols-3 gap-x-2"
            >
              <div role="listitem">
                <MetricCell
                  label="Temp"
                  value={temperature.toFixed(1)}
                  unit="°C"
                  valueClassName={tempClass}
                />
              </div>
              <div role="listitem" className="border-x border-border-hairline px-2">
                <MetricCell
                  label="CPU"
                  value={cpu.toFixed(0)}
                  unit="%"
                  valueClassName={
                    cpu >= 90
                      ? "text-error"
                      : cpu >= 70
                      ? "text-warning"
                      : "text-on-surface"
                  }
                />
              </div>
              <div role="listitem" className="pl-2">
                <MetricCell
                  label="RAM"
                  value={memory.toFixed(0)}
                  unit="%"
                  valueClassName={
                    memory >= 90
                      ? "text-error"
                      : memory >= 75
                      ? "text-warning"
                      : "text-on-surface"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
