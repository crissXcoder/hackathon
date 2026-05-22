import { DashboardContainer } from "@/components/DashboardContainer";

export const metadata = {
  title: "NOC Dashboard | Coopeguanacaste",
  description: "Panel de control y monitoreo de dispositivos de red.",
};

export default function DevicesPage() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-surface-container-lowest border-b border-border-hairline px-6 py-4 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">NOC Dashboard</h1>
            <p className="text-sm text-slate-muted">Monitoreo en tiempo real de infraestructura</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-surface-container px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-on-surface">Sistema Activo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Area */}
      <DashboardContainer />
    </div>
  );
}
