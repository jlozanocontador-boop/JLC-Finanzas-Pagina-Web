"use client";

import { useState } from "react";
import { ArrowLeft, Building2, Check, Copy, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatMXN } from "@/components/servicios/quoteData";
import type { PaymentInfo } from "./PaymentFlow";

const BANCO = "Mercado Pago";
const CLABE = "722969010228337883";

export default function TransferPaymentStep({
  info,
  onBack,
}: {
  info: PaymentInfo;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CLABE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendWhatsApp() {
    const lines = [
      "Hola, ya realicé mi transferencia y quiero confirmar mi pago:",
      `Nombre: ${info.nombre}`,
      `Servicio: ${info.servicio}`,
      `Monto: ${formatMXN(info.monto)}`,
      "Adjunto mi comprobante de transferencia.",
    ];
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/528135780250?text=${message}`, "_blank");

    supabase
      .from("comprobantes_pago")
      .insert({
        nombre: info.nombre,
        concepto_pago: info.servicio,
        monto: info.monto,
        notas: "Pago por transferencia bancaria",
      })
      .then(({ error }) => {
        if (error) console.error("Error al guardar comprobante:", error);
      });

    setSent(true);
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <button
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
        <Building2 className="h-5 w-5 text-gold" />
        Transferencia bancaria
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Realiza tu transferencia con estos datos y después envíanos tu
        comprobante.
      </p>

      <div className="mt-6 rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Banco
        </p>
        <p className="mt-1 text-base font-bold text-navy">{BANCO}</p>

        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-400">
          CLABE
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-lg font-bold tracking-wide text-navy">{CLABE}</p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copiar
              </>
            )}
          </button>
        </div>
      </div>

      {sent ? (
        <p className="mt-6 rounded-lg bg-gold/10 px-4 py-3 text-center text-sm font-medium text-navy">
          ¡Listo! Te esperamos en WhatsApp para confirmar tu pago.
        </p>
      ) : (
        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" />
          Ya transferí, enviar comprobante por WhatsApp
        </button>
      )}
    </div>
  );
}
