"use client";

import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNetworkHealth } from "@/hooks/useNetworkHealth";
import { DeviceCard } from "@/components/DeviceCard";
import type { DeviceStatus } from "@/components/StatusBadge";
import type { NetworkDevice } from "@/hooks/useNetworkHealth";
import { Banner, BannerDescription, BannerTitle } from "@/components/ui/Banner";

gsap.registerPlugin(useGSAP);

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-border-hairline bg-surface-container-lowest p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-surface-container-highest" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-4 w-2/3 animate-pulse rounded bg-surface-container-highest" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-surface-container" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-full bg-surface-container-high" />
      </div>
      <div className="my-5 h-px animate-pulse bg-border-hairline" />
      <div className="grid grid-cols-3 gap-x-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-surface-container" />
            <div className="h-2 w-full animate-pulse rounded-full bg-surface-container-highest" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <Banner variant="destructive" className="bg-error-container text-on-error-container border-error mb-xl">
      <span className="material-symbols-outlined text-error" aria-hidden="true">wifi_off</span>
      <BannerTitle className="text-error font-bold ml-2">Error de conexión</BannerTitle>
      <BannerDescription className="ml-2">{message}. Reintentando automáticamente…</BannerDescription>
    </Banner>
  );
}

function mapStatus(s: NetworkDevice["status"]): DeviceStatus {
  if (s === "up") return "healthy";
  if (s === "down") return "critical";
  return "warning";
}

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function PaginationControls({ page, totalPages, setPage }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-md mt-xl pt-md border-t border-border-hairline">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="font-button-label text-button-label flex items-center gap-xs px-md py-sm rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
        Anterior
      </button>
      <span className="font-body-base text-body-base text-slate-muted">
        Página <strong className="font-bold text-on-surface">{page}</strong> de{" "}
        <strong className="font-bold text-on-surface">{totalPages}</strong>
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className="font-button-label text-button-label flex items-center gap-xs px-md py-sm rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}

function parseMetric(value: string | undefined, fallback = 0): number {
  if (!value || value === "N/A" || value === "unknown") {
    return fallback;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}

export function DashboardView() {
  const { 
    devices, 
    isLoading, 
    isError, 
    errorMessage, 
    page,
    setPage,
    totalPages,
  } = useNetworkHealth();

  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const onlineCount = useMemo(() => devices.filter(d => d.status === 'up').length, [devices]);
  const offlineCount = useMemo(() => devices.filter(d => d.status === 'down').length, [devices]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".dashboard-header-elem",
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );

        if (!isLoading && devices.length > 0) {
          gsap.fromTo(
            ".device-card",
            { autoAlpha: 0, scale: 0.95, y: 15 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "back.out(1.2)",
              stagger: 0.05,
              overwrite: "auto",
            },
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".dashboard-header-elem", { autoAlpha: 1, y: 0 });
        gsap.set(".device-card", { autoAlpha: 1, scale: 1, y: 0 });
      });
    },
    { scope: gridRef, dependencies: [isLoading, page] },
  );

  return (
    <main className="flex-grow pt-[100px] pb-xxl px-md md:px-lg w-full max-w-max-width-dashboard mx-auto" ref={gridRef}>
      
      {/* Dashboard Header */}
      <div className="dashboard-header-elem flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md" ref={headerRef}>
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">Gestión de Dispositivos</h1>
          <p className="font-body-base text-body-base text-slate-muted mt-sm">Monitoreo y telemetría en tiempo real de infraestructura técnica.</p>
        </div>
        {/* Global Stats */}
        <div className="flex gap-md w-full md:w-auto">
          <div className="bg-surface-container-lowest border border-border-hairline rounded-lg px-md py-sm flex items-center gap-sm flex-1 md:flex-none">
            <span className="material-symbols-outlined text-primary-container">check_circle</span>
            <div>
              <div className="font-caption-stats text-caption-stats text-slate-muted">Operativos</div>
              <div className="font-subheadline text-subheadline text-on-surface">
                {isLoading ? <span className="animate-pulse bg-surface-variant h-4 w-8 inline-block rounded"></span> : onlineCount}
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-border-hairline rounded-lg px-md py-sm flex items-center gap-sm flex-1 md:flex-none">
            <span className="material-symbols-outlined text-volcanic-red">error</span>
            <div>
              <div className="font-caption-stats text-caption-stats text-slate-muted">Críticos</div>
              <div className="font-subheadline text-subheadline text-on-surface">
                {isLoading ? <span className="animate-pulse bg-surface-variant h-4 w-8 inline-block rounded"></span> : offlineCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isError && errorMessage && <ErrorBanner message={errorMessage} />}

      {isLoading && (
        <div
          aria-label="Cargando equipos…"
          aria-busy="true"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!isLoading && devices.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {devices.map((device) => (
              <div key={device.id} className="device-card">
                <DeviceCard
                  id={device.id}
                  name={device.name}
                  status={mapStatus(device.status)}
                  ip={device.ip}
                  temperature={parseMetric(device.metrics?.temperature)}
                  cpu={parseMetric(device.metrics?.cpuUsage)}
                  memory={parseMetric(device.metrics?.memoryUsage)}
                />
              </div>
            ))}
            

          </div>
          <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}

      {!isLoading && !isError && devices.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-surface-container-lowest border border-border-hairline rounded-2xl mt-6">
          <div className="h-16 w-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 border border-border-hairline">
            <span className="material-symbols-outlined text-[32px] text-slate-muted">router</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface mb-2">Sin dispositivos registrados</h2>
          <p className="text-slate-muted max-w-md mx-auto mb-8">
            Actualmente no hay dispositivos monitoreados en la red.
          </p>
        </div>
      )}
    </main>
  );
}
