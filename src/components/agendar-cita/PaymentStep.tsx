"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Lock, Pencil } from "lucide-react";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { supabase } from "@/lib/supabase";
import { despachoSupabase } from "@/lib/despachoSupabase";
import { formatMXN } from "@/components/servicios/quoteData";
import type { AsesoriaType, DateTimeSelection, BookingFormData } from "./BookingFlow";

let mpInitialized = false;

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

type CardPaymentFormData = {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: { email?: string };
};

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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!mpInitialized && publicKey) {
      initMercadoPago(publicKey, { locale: "es-MX" });
      mpInitialized = true;
    }
  }, []);

  async function handleCardSubmit(cardFormData: CardPaymentFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/pagos/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: cardFormData.token,
          issuer_id: cardFormData.issuer_id,
          payment_method_id: cardFormData.payment_method_id,
          asesoriaId: asesoria.id,
          installments: cardFormData.installments,
          email: cardFormData.payer.email,
          description: `${asesoria.label} — ${dateTime.dateLabel} ${dateTime.time}`,
        }),
      });
      const paymentResult = await res.json();

      if (!res.ok) {
        console.error("Detalle del error de Mercado Pago:", paymentResult);
        const detailText = paymentResult.detail
          ? ` (${paymentResult.detail})`
          : "";
        throw new Error(
          (paymentResult.error || "Ocurrió un error al procesar el pago.") + detailText
        );
      }
      if (paymentResult.status !== "approved") {
        throw new Error(
          "Tu pago fue rechazado. Verifica los datos de tu tarjeta o intenta con otra."
        );
      }

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
        throw new Error(
          "Tu pago se procesó, pero hubo un problema al guardar tu solicitud. Contáctanos por WhatsApp para confirmar tu cita."
        );
      }

      notifyDespacho({ asesoria, dateTime, formData });
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error al procesar el pago.";
      setErrorMessage(message);
      setStatus("error");
      throw err;
    }
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
    <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
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
        Tus datos de pago están protegidos y se procesan de forma segura a
        través de Mercado Pago.
      </p>

      <div className="mt-6">
        {status === "loading" && (
          <div className="mb-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando tu pago...
          </div>
        )}
        <CardPayment
          initialization={{
            amount: asesoria.price,
            payer: formData.correo ? { email: formData.correo } : undefined,
          }}
          customization={{
            visual: { hideFormTitle: true },
          }}
          onSubmit={handleCardSubmit}
          onError={(err) => console.error("Card Payment Brick error:", err)}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mt-3 flex w-full items-center justify-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Regresar
      </button>
    </div>
  );
}
