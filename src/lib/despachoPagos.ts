import { despachoSupabase } from "./despachoSupabase";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function notifyDespachoPago({
  nombre,
  servicio,
  monto,
  descripcion,
}: {
  nombre: string;
  servicio: string;
  monto: number;
  descripcion: string;
}) {
  try {
    await despachoSupabase.from("registro_pagos").insert({
      cliente_id: null,
      cliente_nombre: nombre,
      monto,
      tipo_servicio: servicio,
      fecha: todayISO(),
      descripcion,
      tipo_movimiento: "venta",
    });
  } catch (err) {
    console.error("No se pudo notificar el pago al despacho:", err);
  }
}
