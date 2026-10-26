"use client";

import { useState } from "react";
import { createPoliza, updatePoliza, deletePoliza } from "@/lib/actions";

export default function PolizasClient({
  initialPolizas,
  clientes,
  coberturas,
}: {
  initialPolizas: any[];
  clientes: any[];
  coberturas: any[];
}) {
  const [editingPoliza, setEditingPoliza] = useState<any | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestión de Pólizas</h1>
        <p className="text-sm text-slate-500 mt-1">
          Asignación y seguimiento de contratos vinculados a clientes y coberturas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingPoliza ? "✏️ Modificar Póliza" : "➕ Emitir Nueva Póliza"}
          </h2>
          <form
            action={async (formData) => {
              if (editingPoliza) {
                await updatePoliza(formData);
                setEditingPoliza(null);
              } else {
                await createPoliza(formData);
              }
            }}
            className="space-y-4"
          >
            {editingPoliza && <input type="hidden" name="id_poliza" value={editingPoliza.id_poliza} />}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">N° de Póliza *</label>
              <input
                required
                name="numero_poliza"
                defaultValue={editingPoliza?.numero_poliza || `POL-2026-${Math.floor(100 + Math.random() * 900)}`}
                key={editingPoliza ? `num-${editingPoliza.id_poliza}` : "new-pol"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Cliente *</label>
              <select
                required
                name="id_cliente"
                defaultValue={editingPoliza?.id_cliente || ""}
                key={editingPoliza ? `cli-${editingPoliza.id_cliente}` : "new-cli"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleccione un cliente --</option>
                {clientes.map((c) => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.apellido}, {c.nombre} (DNI: {c.dni})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Plan / Cobertura</label>
              <select
                name="id_cobertura"
                defaultValue={editingPoliza?.id_cobertura || ""}
                key={editingPoliza ? `cob-${editingPoliza.id_cobertura}` : "new-cob"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Sin Cobertura Asignada --</option>
                {coberturas.map((cob) => (
                  <option key={cob.id_cobertura} value={cob.id_cobertura}>
                    {cob.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Fecha Inicio *</label>
                <input
                  type="date"
                  required
                  name="fecha_inicio"
                  defaultValue={editingPoliza?.fecha_inicio || new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Vencimiento *</label>
                <input
                  type="date"
                  required
                  name="fecha_fin"
                  defaultValue={
                    editingPoliza?.fecha_fin ||
                    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Estado</label>
              <select
                name="estado"
                defaultValue={editingPoliza?.estado || "ACTIVA"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVA">ACTIVA</option>
                <option value="VENCIDA">VENCIDA</option>
                <option value="CANCELADA">CANCELADA</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md text-sm transition shadow-sm"
              >
                {editingPoliza ? "Actualizar Póliza" : "Guardar Póliza"}
              </button>
              {editingPoliza && (
                <button
                  type="button"
                  onClick={() => setEditingPoliza(null)}
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
            <span className="text-xs font-bold uppercase text-slate-600">Pólizas en Cartera</span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              {initialPolizas.length} registradas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">Póliza</th>
                  <th className="py-3 px-4">Cliente / DNI</th>
                  <th className="py-3 px-4">Cobertura</th>
                  <th className="py-3 px-4">Vigencia</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {initialPolizas.map((p) => {
                  const badgeColor =
                    p.estado === "ACTIVA"
                      ? "bg-emerald-100 text-emerald-800"
                      : p.estado === "VENCIDA"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-rose-100 text-rose-800";
                  return (
                    <tr key={p.id_poliza} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{p.numero_poliza}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{p.cliente_nombre}</div>
                        <div className="text-xs text-slate-500 font-mono">DNI: {p.cliente_dni}</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-700">
                        {p.cobertura_nombre || "Sin especificar"}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        {p.fecha_inicio} al {p.fecha_fin}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingPoliza(p)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`¿Eliminar la póliza ${p.numero_poliza}?`)) {
                              try {
                                await deletePoliza(p.id_poliza);
                              } catch {
                                alert("No se puede eliminar: tiene siniestros o pagos asociados.");
                              }
                            }
                          }}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded"
                        >
                          Baja
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
