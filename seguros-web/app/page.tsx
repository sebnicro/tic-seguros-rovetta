import { getDashboardData } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const { kpis, polizasPorEstado, siniestrosPorTipo, siniestrosPorMes } = data;

  const maxTipo = Math.max(...siniestrosPorTipo.map((t) => t.value), 1);
  const maxMes = Math.max(...siniestrosPorMes.map((m) => m.value), 1);
  const totalPolizas = polizasPorEstado.reduce((acc, curr) => acc + curr.value, 0) || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Inicio / Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Métricas e indicadores en tiempo real alimentados directamente desde la base de datos.
        </p>
      </div>

      {/* 4 KPIs Obligatorios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Clientes</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{kpis.totalClientes}</p>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-full text-2xl">👥</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pólizas Activas</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{kpis.polizasActivas}</p>
          </div>
          <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full text-2xl">📄</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Siniestros Abiertos</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{kpis.siniestrosAbiertos}</p>
          </div>
          <span className="p-3 bg-amber-50 text-amber-600 rounded-full text-2xl">⚠️</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Siniestros Cerrados</p>
            <p className="text-3xl font-bold text-slate-600 mt-1">{kpis.siniestrosCerrados}</p>
          </div>
          <span className="p-3 bg-slate-100 text-slate-600 rounded-full text-2xl">✅</span>
        </div>
      </div>

      {/* 3 Gráficos Obligatorios alimentados por SQL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico 1: Pólizas por estado */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Pólizas por Estado</h2>
            <p className="text-xs text-slate-400 mb-4">Distribución porcentual de cartera</p>
            <div className="space-y-4">
              {polizasPorEstado.map((item) => {
                const pct = Math.round((item.value / totalPolizas) * 100);
                const color =
                  item.label === "ACTIVA"
                    ? "bg-emerald-500"
                    : item.label === "VENCIDA"
                    ? "bg-slate-400"
                    : "bg-rose-500";
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span>{item.label}</span>
                      <span>{item.value} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 pt-3 border-t">Consulta: GROUP BY estado</p>
        </div>

        {/* Gráfico 2: Siniestros por tipo */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Siniestros por Tipo</h2>
            <p className="text-xs text-slate-400 mb-4">Frecuencia por clasificación</p>
            <div className="space-y-3">
              {siniestrosPorTipo.map((item) => {
                const pct = Math.round((item.value / maxTipo) * 100);
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span className="truncate pr-2">{item.label}</span>
                      <span className="font-semibold text-slate-800">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="h-2.5 rounded-full bg-blue-500" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 pt-3 border-t">Consulta: GROUP BY tipo</p>
        </div>

        {/* Gráfico 3: Siniestros por mes */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Siniestros por Mes</h2>
            <p className="text-xs text-slate-400 mb-4">Evolución temporal</p>
            <div className="flex items-end justify-between h-44 pt-6 pb-2 px-2 border-b border-slate-200">
              {siniestrosPorMes.map((item) => {
                const heightPct = Math.round((item.value / maxMes) * 100);
                return (
                  <div key={item.label} className="flex flex-col items-center flex-1 mx-1 h-full justify-end group">
                    <span className="text-[11px] font-bold text-slate-700 mb-1 opacity-80 group-hover:opacity-100">
                      {item.value}
                    </span>
                    <div
                      className="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600"
                      style={{ height: `${Math.max(heightPct, 15)}%` }}
                    ></div>
                    <span className="text-[10px] text-slate-500 mt-2 rotate-[-30deg] origin-top-left">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 pt-3 border-t">Consulta: strftime('%Y-%m', fecha)</p>
        </div>
      </div>
    </div>
  );
}
