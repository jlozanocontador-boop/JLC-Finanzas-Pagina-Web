"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Loader2,
  Pencil,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { despachoSupabase } from "@/lib/despachoSupabase";
import { formatMXN } from "@/components/servicios/quoteData";
import type { AsesoriaType, DateTimeSelection, BookingFormData } from "./BookingFlow";

async function notifyDespacho({
  asesoria,
  dateTime,
  formData,
}: {
  asesoria: AsesoriaType;
  dateTime: DateTimeSelection;
  formData: BookingFormData;
}) {
  try {
    await despachoSupabase.from("asesorias").insert({
      nombre: formData.nombre.toUpperCase(),
      rfc: "",
      correo: formData.correo ? formData.correo.toLowerCase() : "",
      contacto: formData.telefono,
      tramite: asesoria.label,
      oficina: formData.modalidad,
      fecha_cita: `${dateTime.date} ${dateTime.timeValue}`,
      fecha_revision: "",
      status: "Agendado",
      nota: `Tipo: ${asesoria.label} | Duración: ${asesoria.durationLabel} | Precio: ${asesoria.price} | Modalidad: ${formData.modalidad} | Hora: ${dateTime.timeValue}${
        formData.mensaje ? ` | Notas: ${formData.mensaje}` : ""
      }`,
    });
  } catch (err) {
    console.error("No se pudo notificar al despacho:", err);
  }
}

export default function PaymentStep({
  asesoria,
  dateTime,
  formData,
  onBack,
}: {
  asesoria: AsesoriaType;
  dateTime: DateTimeSelection;
  formData: BookingFormData;
  onBack: () => void;
}) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("solicitudes_cita").insert({
      nombre: formData.nombre,
      telefono: formData.telefono,
      correo: formData.correo || null,
      servicio_interes: formData.servicioInteres,
      fecha_preferida: dateTime.date,
      hora_preferida: dateTime.time,
      mensaje: formData.mensaje || null,
      tipo_asesoria: asesoria.label,
      precio_asesoria: asesoria.price,
      modalidad: formData.modalidad,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    notifyDespacho({ asesoria, dateTime, formData });
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h2 className="mt-4 text-xl font-bold text-navy">
          ¡Solicitud de asesoría enviada!
        </h2>
        <p className="mt-2 text-gray-600">
          Hemos recibido tu solicitud para el {dateTime.dateLabel} a las{" "}
          {dateTime.time}. Nos pondremos en contacto contigo para confirmar
          los detalles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
    >
      <div className="flex items-center justify-between gap-4 rounded-lg bg-gold/10 px-4 py-3">
        <p className="text-sm font-bold text-navy">
          {asesoria.label} — {formatMXN(asesoria.price)} · {dateTime.dateLabel}, {dateTime.time}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold"
        >
          <Pencil className="h-3.5 w-3.5" />
          Cambiar
        </button>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gold">
        Paso 4
      </p>
      <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-navy">
        <Lock className="h-5 w-5 text-gold" />
        Datos de pago
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Tus datos de pago están protegidos y se procesarán de forma segura.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-navy">
            Nombre en la tarjeta
          </label>
          <div className="relative mt-1.5">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Como aparece en la tarjeta"
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-navy">
            Número de tarjeta
          </label>
          <div className="relative mt-1.5">
            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-navy">
              Fecha de expiración
            </label>
            <input
              required
              type="text"
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/AA"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy">CVC</label>
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Ocurrió un error al enviar tu solicitud. Intenta de nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        Agendar Asesoría
      </button>
      <button
        type="button"
        onClick={onBack}
        className="mt-3 flex w-full items-center justify-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Regresar
      </button>
    </form>
  );
}
