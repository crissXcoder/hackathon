"use client";

export type DeviceStatus = "healthy" | "warning" | "critical";

interface StatusBadgeProps {
  status: DeviceStatus;
  showLabel?: boolean;
}

const STATUS_CONFIG: Record<
  DeviceStatus,
  { bg: string; text: string; dot: string; border: string; label: string; ariaLabel: string }
> = {
  healthy: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    dot: 'bg-primary',
    border: 'border-primary/20',
    label: "En línea",
    ariaLabel: "Estado: En línea",
  },
  warning: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    dot: 'bg-warning',
    border: 'border-warning/20',
    label: "Advertencia",
    ariaLabel: "Estado: Advertencia",
  },
  critical: {
    bg: 'bg-error/10',
    text: 'text-error',
    dot: 'bg-error',
    border: 'border-error/20',
    label: "Crítico",
    ariaLabel: "Estado: Crítico",
  },
};

export function StatusBadge({ status, showLabel = true }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["warning"];

  return (
    <div 
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text} border ${cfg.border}`}
      aria-label={cfg.ariaLabel}
    >
      <span className="relative flex h-2 w-2 shrink-0 mr-1.5">
        {status === "critical" && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${cfg.dot} opacity-60`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${cfg.dot}`} />
      </span>
      {showLabel && <span>{cfg.label}</span>}
    </div>
  );
}
