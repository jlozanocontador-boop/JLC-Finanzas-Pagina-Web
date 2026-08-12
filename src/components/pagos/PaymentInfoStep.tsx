"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { services } from "@/components/servicios/data";
import { formatMXN } from "@/components/servicios/quoteData";
import type { PaymentInfo } from "./PaymentFlow";

export default function PaymentInfoStep({
  initialData,
  lockedServicio,
  lockedMonto,
  onSubmit,
}: {
  initialData: PaymentInfo | null;
  lockedServicio?: string;
  lockedMonto?: number;
  onSubmit: (data: PaymentInfo) => void;
}) {
  const isLocked = Boolean(lockedServicio && lockedMonto !== undefined);

  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [servicio, setServicio] = useState(initialData?.servicio ?? "");
  const [monto, setMonto] = useState(initialData ? String(initialData.monto) : "");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLocked) {
      onSubmit({ nombre, servicio: lockedServicio!, monto: lockedMonto! });
    } else {
      onSubmit({ nombre, servicio, monto: parseFloat(monto) });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15">
          <Upload className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gold">
            Paso 1
          </p>
          <h2 className="text-lg font-bold text-navy">Datos del pago</h2>
        </div>
      </div>

      {isLocked && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-gold/10 px-4 py-3">
          <p className="text-sm font-bold text-navy">
            {lockedServicio} — {formatMXN(lockedMonto!)}
          </p>
        </div>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-navy">
            Nombre completo *
          </label>
          <input
            required
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        {!isLocked && (
          <>
            <div>
              <label className="text-sm font-medium text-navy">
                Servicio a pagar *
              </label>
              <select
                required
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  Selecciona el servicio a pagar
                </option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-navy">
                Monto a pagar *
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="$0.00 MXN"
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
              />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
      >
        Continuar
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
