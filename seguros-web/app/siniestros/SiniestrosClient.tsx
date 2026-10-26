"use client";

import { useState } from "react";
import { createSiniestro, updateSiniestro, updateSiniestroEstado, deleteSiniestro } from "@/lib/actions";

export default function SiniestrosClient({
  initialSiniestros,
  polizas,
}: {
  initialSiniestros: any[];
  polizas: any[];
}) {
  const [editingSiniestro, setEditingSiniestro] = useState<any | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestión de Siniestros</h1>
        <p className="text-sm text-slate-500 mt-1">
          Registro, seguimiento y cierre de reclamos o accidentes vinculados a pólizas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingSiniestro ? "✏️ Modificar Siniestro" : "➕ Registrar Siniestro"}
          </h2>
          <form
            action={async (formData) => {
              if (editingSiniestro) {
                await updateSiniestro(formData);
                setEditingSiniestro(null);
              } else {
                await createSiniestro(formData);
              }
            }}
            className="space-y-4"
          >
            {editingSiniestro && (
              <input type="hidden" name="id_siniestro" value={editingSiniestro.id_siniestro} />
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Póliza Asociada *</label>
              <select
                required
                name="id_poliza"
                defaultValue={editingSiniestro?.id_poliza || ""}
                key={editingSiniestro ? `pol-${editingSiniestro.id_poliza}` : "new-pol-select"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar póliza --</option>
                {polizas.map((p) => (
                  <option key={p.id_poliza} value={p.id_poliza}>
                    {p.numero_poliza} - {p.cliente_nombre} ({p.estado})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Fecha del Evento *</label>
              <input
                type="date"
                required
                name="fecha"
                defaultValue={editingSiniestro?.fecha || new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tipo de Siniestro *</label>
              <select
                required
                name="tipo"
                defaultValue={editingSiniestro?.tipo || "Caída a nivel"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="Caída a nivel">Caída a nivel</option>
                <option value="Accidente de tránsito">Accidente de tránsito</option>
                <option value="Lesión deportiva">Lesión deportiva</option>
                <option value="Fractura ósea">Fractura ósea</option>
                <option value="Corte profundo">Corte profundo</option>
                <option value="Quemadura">Quemadura</option>
                <option value="Golpe / Contusión">Golpe / Contusión</option>
                <option value="Otro">Otro evento</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Descripción</label>
              <textarea
                name="descripcion"
                rows={3}
                defaultValue={editingSiniestro?.descripcion || ""}
                placeholder="Detalle de los hechos, atención recibida, etc."
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Estado</label>
              <select
                name="estado"
                defaultValue={editingSiniestro?.estado || "ABIERTO"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="ABIERTO">ABIERTO</option>
                <option value="EN PROCESO">EN PROCESO</option>
                <option value="CERRADO">CERRADO</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md text-sm transition shadow-sm"
              >
                {editingSiniestro ? "Actualizar Siniestro" : "Registrar Siniestro"}
              </button>
              {editingSiniestro && (
                <button
                  type="button"
                  onClick={() => setEditingSiniestro(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-3 rounded-md text-sm transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <span className="text-xs font-bold uppercase text-slate-600">Registro de Siniestros</span>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              {initialSiniestros.length} casos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Póliza / Titular</th>
                  <th className="py-3 px-4">Tipo & Detalle</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {initialSiniestros.map((s) => {
                  const badgeColor =
                    s.estado === "ABIERTO"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : s.estado === "EN PROCESO"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800";
                  return (
                    <tr key={s.id_siniestro} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 text-xs font-mono text-slate-600">{s.fecha}</td>
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-800 text-xs">{s.numero_poliza}</div>
                        <div className="text-xs text-slate-600">{s.cliente_nombre}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{s.tipo}</div>
                        <div className="text-xs text-slate-500 max-w-xs truncate">{s.descripcion || "—"}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                            {s.estado}
                          </span>
                          {/* Botón directo de alternar Abierto / Cerrado para la demo frente al profesor */}
                          {s.estado === "ABIERTO" && (
                            <button
                              onClick={() => updateSiniestroEstado(s.id_siniestro, "CERRADO")}
                              className="text-[10px] bg-slate-200 hover:bg-emerald-600 hover:text-white px-2 py-0.5 rounded transition font-medium"
                              title="Cerrar siniestro rápidamente"
                            >
                              ✓ Cerrar
                            </button>
                          )}
                          {s.estado === "CERRADO" && (
                            <button
                              onClick={() => updateSiniestroEstado(s.id_siniestro, "ABIERTO")}
                              className="text-[10px] bg-slate-200 hover:bg-amber-600 hover:text-white px-2 py-0.5 rounded transition font-medium"
                              title="Reabrir siniestro"
                            >
                              ↺ Reabrir
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingSiniestro(s)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`¿Eliminar el siniestro #${s.id_siniestro}?`)) {
                              await deleteSiniestro(s.id_siniestro);
                            }
                          }}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
