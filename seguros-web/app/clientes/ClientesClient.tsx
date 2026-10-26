"use client";

import { useState } from "react";
import { createCliente, updateCliente, deleteCliente } from "@/lib/actions";

interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string | null;
  telefono: string | null;
}

export default function ClientesClient({ initialClientes }: { initialClientes: Cliente[] }) {
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [search, setSearch] = useState("");

  const filtered = initialClientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.apellido.toLowerCase().includes(search.toLowerCase()) ||
      c.dni.includes(search)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestión de Clientes</h1>
          <p className="text-sm text-slate-500 mt-1">Alta, baja, modificación y consulta de asegurados.</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="🔍 Buscar por apellido, nombre o DNI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Alta / Edición */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingCliente ? "✏️ Modificar Cliente" : "➕ Registrar Nuevo Cliente"}
          </h2>
          <form
            action={async (formData) => {
              if (editingCliente) {
                await updateCliente(formData);
                setEditingCliente(null);
              } else {
                await createCliente(formData);
              }
            }}
            className="space-y-4"
          >
            {editingCliente && (
              <input type="hidden" name="id_cliente" value={editingCliente.id_cliente} />
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nombre *</label>
              <input
                required
                name="nombre"
                defaultValue={editingCliente?.nombre || ""}
                key={editingCliente ? `nom-${editingCliente.id_cliente}` : "new-nom"}
                placeholder="Ej. Juan Carlos"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Apellido *</label>
              <input
                required
                name="apellido"
                defaultValue={editingCliente?.apellido || ""}
                key={editingCliente ? `ape-${editingCliente.id_cliente}` : "new-ape"}
                placeholder="Ej. Alvarez"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">DNI *</label>
              <input
                required
                name="dni"
                defaultValue={editingCliente?.dni || ""}
                key={editingCliente ? `dni-${editingCliente.id_cliente}` : "new-dni"}
                placeholder="Ej. 34567890"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={editingCliente?.email || ""}
                key={editingCliente ? `mail-${editingCliente.id_cliente}` : "new-mail"}
                placeholder="Ej. usuario@correo.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Teléfono</label>
              <input
                name="telefono"
                defaultValue={editingCliente?.telefono || ""}
                key={editingCliente ? `tel-${editingCliente.id_cliente}` : "new-tel"}
                placeholder="Ej. 1145238910"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition shadow-sm"
              >
                {editingCliente ? "Actualizar" : "Guardar (INSERT)"}
              </button>
              {editingCliente && (
                <button
                  type="button"
                  onClick={() => setEditingCliente(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-3 rounded-md text-sm transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla de Clientes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <span className="text-xs font-bold uppercase text-slate-600">Asegurados Registrados</span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {filtered.length} encontrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">DNI</th>
                  <th className="py-3 px-4">Apellido y Nombre</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((c) => (
                  <tr key={c.id_cliente} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">{c.dni}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {c.apellido}, {c.nombre}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500">
                      <div>{c.email || "—"}</div>
                      <div>{c.telefono || "—"}</div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingCliente(c)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Desea eliminar al cliente ${c.apellido}, ${c.nombre}?`)) {
                            try {
                              await deleteCliente(c.id_cliente);
                            } catch (e: any) {
                              alert("No se puede eliminar: el cliente tiene pólizas asociadas.");
                            }
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      No se encontraron clientes registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
