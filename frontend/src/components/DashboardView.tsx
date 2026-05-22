"use client";

import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Activity, Wifi, ChevronLeft, ChevronRight, Server, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useNetworkHealth } from "@/hooks/useNetworkHealth";
import { DeviceCard } from "@/components/DeviceCard";
import type { DeviceStatus } from "@/components/StatusBadge";
import type { NetworkDevice } from "@/hooks/useNetworkHealth";
import { Banner, BannerDescription, BannerTitle } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-border-hairline bg-surface-container-lowest p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-surface-container-highest" />
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
            <div className="h-6 w-1/2 animate-pulse rounded bg-surface-container-highest" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <Banner variant="destructive" className="bg-error-container text-on-error-container border-error">
      <Wifi className="h-5 w-5 shrink-0 text-error" aria-hidden="true" />
      <BannerTitle className="text-error font-bold">Error de conexión</BannerTitle>
      <BannerDescription>{message}. Reintentando automáticamente…</BannerDescription>
    </Banner>
  );
}

function mapStatus(s: NetworkDevice["status"]): DeviceStatus {
  if (s === "up") return "healthy";
  if (s === "down") return "critical";
  return "warning";
}

interface StatsCardsProps {
  total: number;
  online: number;
  offline: number;
  isFetching: boolean;
}

function StatsCards({ total, online, offline, isFetching }: StatsCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".stat-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Card */}
      <div className="stat-card bg-surface-container-lowest border border-border-hairline rounded-xl p-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-muted mb-1 flex items-center">
            <Server className="w-4 h-4 mr-1.5" /> Equipos Totales
          </p>
          <p className="text-3xl font-bold text-on-surface">{total}</p>
        </div>
        {isFetching && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        )}
      </div>

      {/* Online Card */}
      <div className="stat-card bg-surface-container-lowest border border-border-hairline border-l-4 border-l-primary rounded-xl p-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-muted mb-1 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-primary" /> En Línea
          </p>
          <p className="text-3xl font-bold text-on-surface">{online}</p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
          {total > 0 ? Math.round((online / total) * 100) : 0}%
        </div>
      </div>

      {/* Offline Card */}
      <div className="stat-card bg-surface-container-lowest border border-border-hairline border-l-4 border-l-error rounded-xl p-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-muted mb-1 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5 text-error" /> Fuera de Línea
          </p>
          <p className="text-3xl font-bold text-on-surface">{offline}</p>
        </div>
        {offline > 0 && (
          <div className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            Atención requerida
          </div>
        )}
      </div>
    </div>
  );
}

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function PaginationControls({ page, totalPages, setPage }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-border-hairline">
      <Button
        variant="secondary"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Anterior
      </Button>
      <span className="text-sm text-slate-muted">
        Página <strong className="font-semibold text-on-surface">{page}</strong> de{" "}
        <strong className="font-semibold text-on-surface">{totalPages}</strong>
      </span>
      <Button
        variant="secondary"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className="bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary"
      >
        Siguiente
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
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
    isFetching, 
    isError, 
    errorMessage, 
    total,
    page,
    setPage,
    totalPages,
  } = useNetworkHealth();

  const gridRef = useRef<HTMLDivElement>(null);

  // Compute stats locally based on fetched devices since we don't have global online/offline counts from hook easily
  // Alternatively, just count from the current page
  const onlineCount = useMemo(() => devices.filter(d => d.status === 'up').length, [devices]);
  const offlineCount = useMemo(() => devices.filter(d => d.status === 'down').length, [devices]);

  useGSAP(
    () => {
      if (isLoading || devices.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".device-card", { autoAlpha: 1, scale: 1, y: 0 });
      });
    },
    { scope: gridRef, dependencies: [isLoading, page] },
  );

  return (
    <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
      <div className="space-y-6">

        {!isLoading && !isError && (
          <StatsCards
            total={total}
            online={onlineCount} // This is an approximation for the current page, ideally from API
            offline={offlineCount}
            isFetching={isFetching}
          />
        )}

        {isError && errorMessage && <ErrorBanner message={errorMessage} />}

        {isLoading && (
          <div
            aria-label="Cargando equipos…"
            aria-busy="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!isLoading && devices.length > 0 && (
          <div className="bg-surface-bright rounded-2xl p-6 border border-border-hairline shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-bold text-on-surface">Equipos en Red</h2>
            </div>
            
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
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
          </div>
        )}

        {!isLoading && !isError && devices.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-surface-container-lowest border border-border-hairline rounded-2xl mt-6">
            <div className="h-16 w-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 border border-border-hairline">
              <Server className="h-8 w-8 text-slate-muted" />
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-2">Sin dispositivos registrados</h2>
            <p className="text-slate-muted max-w-md mx-auto mb-8">
              Actualmente no hay dispositivos monitoreados en la red.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
