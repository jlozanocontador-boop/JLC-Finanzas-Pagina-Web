"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Lock } from "lucide-react";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { supabase } from "@/lib/supabase";
import { formatMXN } from "@/components/servicios/quoteData";
import type { PaymentInfo } from "./PaymentFlow";

let mpInitialized = false;

type CardPaymentFormData = {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  installments: number;
  payer: { email?: string };
};

export default function CardPaymentStep({
  info,
  onBack,
}: {
  info: PaymentInfo;
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
          amount: info.monto,
          tramiteId: info.quotePath?.tramiteId,
          stepsRaw: info.quotePath?.stepsRaw,
          installments: cardFormData.installments,
          email: cardFormData.payer.email,
          description: info.servicio,
        }),
      });
      const paymentResult = await res.json();

      if (!res.ok) {
        throw new Error(paymentResult.error || "Ocurrió un error al procesar el pago.");
      }
      if (paymentResult.status !== "approved") {
        throw new Error(
          "Tu pago fue rechazado. Verifica los datos de tu tarjeta o intenta con otra."
        );
      }

      const { error } = await supabase.from("comprobantes_pago").insert({
        nombre: info.nombre,
        concepto_pago: info.servicio,
        monto: info.monto,
        referencia: String(paymentResult.id),
        notas: "Pagado con tarjeta a través de Mercado Pago",
      });

      if (error) {
        console.error(error);
        throw new Error(
          "Tu pago se procesó, pero hubo un problema al registrar tu comprobante. Contáctanos por WhatsApp para confirmar."
        );
      }

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
        <h2 className="mt-4 text-xl font-bold text-navy">¡Pago realizado!</h2>
        <p className="mt-2 text-gray-600">
          Tu pago de {formatMXN(info.monto)} por {info.servicio} se procesó
          correctamente. Nos pondremos en contacto contigo para confirmar los
          detalles.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold hover:bg-gold/10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Atrás
      </button>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-gold/10 px-4 py-3">
        <p className="text-sm font-bold text-navy">
          {info.servicio} — {formatMXN(info.monto)}
        </p>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gold">
        Paso 3
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
          initialization={{ amount: info.monto }}
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
    </div>
  );
}
