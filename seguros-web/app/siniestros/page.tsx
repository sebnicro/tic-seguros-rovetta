import { getSiniestros, getPolizas } from "@/lib/actions";
import SiniestrosClient from "./SiniestrosClient";

export const dynamic = "force-dynamic";

export default async function SiniestrosPage() {
  const [siniestrosRaw, polizasRaw] = await Promise.all([
    getSiniestros(),
    getPolizas(),
  ]);

  const siniestros = siniestrosRaw.map((s: any) => ({
    id_siniestro: Number(s.id_siniestro),
    id_poliza: Number(s.id_poliza),
    fecha: String(s.fecha),
    tipo: String(s.tipo),
    descripcion: s.descripcion ? String(s.descripcion) : null,
    estado: String(s.estado),
    numero_poliza: String(s.numero_poliza),
    cliente_nombre: String(s.cliente_nombre),
  }));

  const polizas = polizasRaw.map((p: any) => ({
    id_poliza: Number(p.id_poliza),
    numero_poliza: String(p.numero_poliza),
    cliente_nombre: String(p.cliente_nombre),
    estado: String(p.estado),
  }));

  return <SiniestrosClient initialSiniestros={siniestros} polizas={polizas} />;
}
