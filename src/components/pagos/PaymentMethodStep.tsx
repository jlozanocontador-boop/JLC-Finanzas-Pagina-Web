"use client";

import { ArrowLeft, ArrowRight, Building2, CreditCard } from "lucide-react";
import { formatMXN } from "@/components/servicios/quoteData";
import type { PaymentInfo } from "./PaymentFlow";

export default function PaymentMethodStep({
  info,
  onSelectCard,
  onSelectTransfer,
  onBack,
}: {
  info: PaymentInfo;
  onSelectCard: () => void;
  onSelectTransfer: () => void;
  onBack: () => void;
}) {
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
        Paso 2
      </p>
      <h2 className="mt-1 text-lg font-bold text-navy">
        Elige tu método de pago
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={onSelectCard}
          className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-gold hover:bg-gold/5 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15">
            <CreditCard className="h-6 w-6 text-gold" />
          </div>
          <h3 className="mt-4 font-bold text-navy">
            Tarjeta de Crédito/Débito
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Visa, Mastercard, American Express
          </p>
          <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold">
            Continuar
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>

        <button
          onClick={onSelectTransfer}
          className="group flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-gold hover:bg-gold/5 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15">
            <Building2 className="h-6 w-6 text-gold" />
          </div>
          <h3 className="mt-4 font-bold text-navy">Transferencia Bancaria</h3>
          <p className="mt-1 text-xs text-gray-500">
            Transferencia SPEI con datos CLABE
          </p>
          <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold">
            Continuar
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
