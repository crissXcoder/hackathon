"use client";

import { useDeviceDetail } from "@/hooks/useDeviceDetail";
import { DeviceDetailSkeleton } from "@/components/devices/DeviceDetailSkeleton";
import { AIDiagnosisModal } from "@/components/devices/AIDiagnosisModal";
import Link from "next/link";
import { useState } from "react";

export interface DeviceDetailClientProps {
  id: string;
}

export function DeviceDetailClient({ id }: DeviceDetailClientProps) {
  const { data: device, isLoading, isError, error } = useDeviceDetail(id);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);

  if (isLoading) {
    return <DeviceDetailSkeleton />;
  }

  if (isError || !device) {
    return (
      <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="font-headline-md text-headline-md text-error mb-2">Error al cargar dispositivo</h2>
        <p className="text-on-surface/80">{error?.message || "No se pudo obtener la información."}</p>
        <Link href="/" className="mt-6 flex items-center gap-2 px-6 py-3 rounded-lg border border-border-hairline bg-surface hover:bg-surface-dim transition-colors font-button-label text-button-label">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  // Derive status properties
  const isCritical = device.status === 'critical';
  const isWarning = device.status === 'warning';
  
  const statusTextColor = isCritical ? 'text-error' : isWarning ? 'text-secondary-fixed-dim' : 'text-primary';
  const statusDotColor = isCritical ? 'bg-error' : isWarning ? 'bg-secondary-fixed-dim' : 'bg-primary';
  const statusLabel = isCritical ? 'Crítico' : isWarning ? 'Advertencia' : 'Normal / Óptimo';

  // Format helpers
  const cpuVal = device.cpu ?? 0;
  const ramVal = device.memory ?? 0;
  const tempVal = device.temperature ?? 0;

  const getMetricColor = (val: number, isTemp = false) => {
    const thresholdCritical = isTemp ? 80 : 90;
    const thresholdWarning = isTemp ? 70 : 75;
    if (val >= thresholdCritical) return 'text-error';
    if (val >= thresholdWarning) return 'text-secondary-fixed-dim';
    return 'text-on-surface';
  };

  return (
    <div className="bg-background text-on-background font-body-base antialiased min-h-screen flex flex-col pt-20">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-nav-glass border-b border-white/10 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center w-full px-lg max-w-max-width-dashboard mx-auto h-20">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="text-headline-md font-headline-md font-extrabold text-on-primary">Coopeguanacaste RL</span>
          </div>
          {/* Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-lg">
            <Link href="/" className="text-on-primary/90 font-medium hover:text-on-primary transition-colors font-button-label text-button-label hover:scale-105 duration-300 ease-in-out">
              Dashboard
            </Link>
            <Link href="#" className="text-on-primary/90 font-medium hover:text-on-primary transition-colors font-button-label text-button-label hover:scale-105 duration-300 ease-in-out">
              Facturación
            </Link>
            <Link href="#" className="text-secondary-fixed font-bold border-b-2 border-secondary-fixed pb-1 font-button-label text-button-label hover:scale-105 duration-300 ease-in-out">
              Sostenibilidad
            </Link>
            <Link href="#" className="text-on-primary/90 font-medium hover:text-on-primary transition-colors font-button-label text-button-label hover:scale-105 duration-300 ease-in-out">
              Transparencia
            </Link>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-md">
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20 text-on-primary focus-within:border-secondary-fixed transition-colors">
              <span className="material-symbols-outlined mr-2 opacity-70">search</span>
              <input className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all text-on-primary placeholder-on-primary/50" placeholder="Buscar..." type="text" />
            </div>
            <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-button-label text-button-label hover:scale-105 duration-300 ease-in-out shadow-sm transition-all">
              Oficina Virtual
            </button>
            <button aria-label="Account" className="text-on-primary hover:text-secondary-fixed transition-colors p-2 hover:scale-105 duration-300 ease-in-out">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            <button aria-label="Help" className="text-on-primary hover:text-secondary-fixed transition-colors p-2 hover:scale-105 duration-300 ease-in-out">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-max-width-content mx-auto px-lg py-xl flex flex-col gap-lg">
        {/* Critical Alert Banner */}
        {isCritical && (
          <div className="bg-error-container border border-error text-on-error-container rounded-2xl p-4 flex items-center gap-md shadow-sm">
            <span className="material-symbols-outlined text-error animate-subtle-pulse icon-fill">warning</span>
            <p className="font-subheadline text-subheadline m-0 flex-grow">
              Alerta Crítica: Se han detectado métricas fuera de umbral en este dispositivo.
            </p>
          </div>
        )}
        {isWarning && !isCritical && (
          <div className="bg-secondary-fixed/20 border border-secondary-fixed-dim text-on-secondary-container rounded-2xl p-4 flex items-center gap-md shadow-sm">
            <span className="material-symbols-outlined text-secondary-fixed-dim icon-fill">warning</span>
            <p className="font-subheadline text-subheadline m-0 flex-grow">
              Advertencia: El dispositivo presenta advertencias por umbrales elevados.
            </p>
          </div>
        )}

        {/* Device Header Section */}
        <section className="bg-surface-container-lowest border border-border-hairline rounded-2xl p-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-lg z-10">
            <div className={`p-4 rounded-xl ${isCritical ? 'bg-error-container/30 text-error' : isWarning ? 'bg-secondary-fixed/20 text-secondary-fixed-dim' : 'bg-surface-container-high text-primary'}`}>
              <span className="material-symbols-outlined text-[48px]">router</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface m-0 mb-xs">{device.name}</h1>
              <p className={`font-subheadline text-subheadline m-0 flex items-center gap-2 ${statusTextColor}`}>
                <span className={`w-2 h-2 rounded-full ${statusDotColor} ${isCritical ? 'animate-subtle-pulse' : ''}`}></span>
                Estado: {statusLabel}
              </p>
              <p className="font-caption-stats text-caption-stats text-slate-muted mt-2">
                ID: {device.id} | IP: {device.ip || "No disponible"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-md z-10 w-full md:w-auto">
            <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border-hairline text-charcoal-clay bg-surface hover:bg-surface-dim transition-colors font-button-label text-button-label w-full md:w-auto justify-center duration-300">
              <span className="material-symbols-outlined">arrow_back</span>
              Regresar
            </Link>
            <button 
              onClick={() => setIsDiagnosticModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-button-label text-button-label w-full md:w-auto justify-center hover:shadow-[0_0_15px_rgba(0,94,47,0.4)] duration-300 transition-all shadow-md"
            >
              <span className="material-symbols-outlined">memory</span>
              Diagnosticar con IA
            </button>
          </div>
        </section>

        {/* Bento Grid for Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* CPU Widget */}
          <div className="bg-surface-container-lowest border border-border-hairline rounded-2xl p-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-subheadline text-subheadline text-slate-muted">CPU Usage</span>
              <span className={`material-symbols-outlined ${getMetricColor(cpuVal)}`}>
                {cpuVal > 80 ? 'trending_up' : 'trending_flat'}
              </span>
            </div>
            <div>
              <div className={`font-display-lg text-display-lg ${getMetricColor(cpuVal)}`}>{cpuVal.toFixed(0)}%</div>
              <div className="font-caption-stats text-caption-stats text-slate-muted mt-1">Tiempo real</div>
            </div>
          </div>
          
          {/* RAM Widget */}
          <div className="bg-surface-container-lowest border border-border-hairline rounded-2xl p-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-subheadline text-subheadline text-slate-muted">Memoria RAM</span>
              <span className={`material-symbols-outlined ${getMetricColor(ramVal)}`}>
                {ramVal > 85 ? 'warning' : 'memory'}
              </span>
            </div>
            <div>
              <div className={`font-display-lg text-display-lg ${getMetricColor(ramVal)}`}>{ramVal.toFixed(0)}%</div>
              <div className="font-caption-stats text-caption-stats text-slate-muted mt-1">Estable</div>
            </div>
          </div>
          
          {/* Temp Widget */}
          <div className="bg-surface-container-lowest border border-border-hairline rounded-2xl p-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-subheadline text-subheadline text-slate-muted">Temperatura</span>
              <span className={`material-symbols-outlined ${getMetricColor(tempVal, true)}`}>thermostat</span>
            </div>
            <div>
              <div className={`font-display-lg text-display-lg ${getMetricColor(tempVal, true)}`}>{tempVal.toFixed(1)}°C</div>
              <div className="font-caption-stats text-caption-stats text-slate-muted mt-1">
                {tempVal > 80 ? 'Umbral excedido (80°C)' : 'Rango Normal'}
              </div>
            </div>
          </div>
        </div>

        {/* History Table Section */}
        <section className="bg-surface-container-lowest border border-border-hairline rounded-2xl shadow-sm overflow-hidden mt-md">
          <div className="px-lg py-md border-b border-border-hairline bg-surface-bright flex justify-between items-center">
            <h2 className="font-subheadline text-subheadline text-on-surface m-0">Historial de Telemetría (Picos recientes)</h2>
            <button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-dim transition-colors">
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-hairline bg-surface font-button-label text-button-label text-slate-muted">
                  <th className="p-4 font-semibold">Timestamp</th>
                  <th className="p-4 font-semibold">Métrica (%)</th>
                  <th className="p-4 font-semibold">RAM (%)</th>
                  <th className="p-4 font-semibold">Temperatura (°C)</th>
                  <th className="p-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="font-body-base text-body-base text-on-surface">
                {device.peaks && device.peaks.length > 0 ? (
                  device.peaks.map((peak, idx) => {
                    const isPeakCritical = peak.value >= 90;
                    const isPeakWarning = peak.value >= 75 && peak.value < 90;
                    
                    return (
                      <tr 
                        key={idx} 
                        className={`border-b border-border-hairline transition-colors ${
                          isPeakCritical 
                            ? 'bg-error-container/30 hover:bg-error-container/50' 
                            : isPeakWarning 
                              ? 'bg-secondary-fixed/10 hover:bg-surface-dim' 
                              : 'hover:bg-surface-dim'
                        }`}
                      >
                        <td className="p-4 py-5 whitespace-nowrap">
                          {new Date(peak.timestamp).toLocaleString("es-CR", { dateStyle: "short", timeStyle: "short" })}
                        </td>
                        <td className={`p-4 py-5 ${isPeakCritical ? 'font-semibold text-error' : ''}`}>
                          {peak.value.toFixed(1)}%
                        </td>
                        <td className="p-4 py-5 opacity-80">{peak.ram != null ? `${peak.ram.toFixed(0)}%` : '--'}</td>
                        <td className="p-4 py-5 opacity-80">{peak.temp != null ? `${peak.temp.toFixed(1)}°C` : '--'}</td>
                        <td className="p-4 py-5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isPeakCritical 
                              ? 'bg-error-container text-on-error-container' 
                              : isPeakWarning 
                                ? 'bg-secondary-fixed text-on-secondary-fixed' 
                                : 'bg-surface-container-high text-primary'
                          }`}>
                            {isPeakCritical ? 'Crítico' : isPeakWarning ? 'Advertencia' : 'Normal'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-muted">
                      No hay historial de telemetría reciente para este dispositivo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-lg py-md border-t border-border-hairline bg-surface flex justify-center">
            <button className="text-primary hover:text-primary-container font-button-label text-button-label transition-colors">
              Ver historial completo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-border-hairline w-full py-huge px-lg mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl max-w-max-width-content mx-auto">
          <div className="col-span-1 md:col-span-1 flex flex-col items-start opacity-80 hover:opacity-100 transition-opacity">
            <div className="text-headline-md font-headline-md text-primary mb-md">
              Coopeguanacaste RL
            </div>
            <p className="font-caption-stats text-caption-stats text-slate-muted">
              © 2024 Coopeguanacaste R.L. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="col-span-1 flex flex-col gap-sm">
            <Link className="text-slate-muted hover:text-primary transition-colors font-body-base text-body-base hover:translate-x-1 duration-300 inline-block w-fit" href="#">Regulación</Link>
            <Link className="text-slate-muted hover:text-primary transition-colors font-body-base text-body-base hover:translate-x-1 duration-300 inline-block w-fit" href="#">Contacto</Link>
          </div>
          <div className="col-span-1 flex flex-col gap-sm">
            <Link className="text-slate-muted hover:text-primary transition-colors font-body-base text-body-base hover:translate-x-1 duration-300 inline-block w-fit" href="#">Aviso de Privacidad</Link>
            <Link className="text-slate-muted hover:text-primary transition-colors font-body-base text-body-base hover:translate-x-1 duration-300 inline-block w-fit" href="#">Términos de Servicio</Link>
          </div>
          <div className="col-span-1 flex items-center justify-end md:items-start md:justify-start">
            <span className="font-caption-stats text-caption-stats text-slate-muted opacity-50">Sistema de Telemetría v2.1</span>
          </div>
        </div>
      </footer>

      {/* IA Diagnosis Modal */}
      <AIDiagnosisModal 
        isOpen={isDiagnosticModalOpen} 
        onClose={() => setIsDiagnosticModalOpen(false)} 
        deviceId={id} 
      />
    </div>
  );
}
