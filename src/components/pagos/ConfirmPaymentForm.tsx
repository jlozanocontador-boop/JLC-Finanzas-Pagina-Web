"use client";

import { useState, type FormEvent } from "react";
import { Upload, MessageCircle, Lock } from "lucide-react";
import { services } from "@/components/servicios/data";
import { supabase } from "@/lib/supabase";

export default function ConfirmPaymentForm() {
  const [name, setName] = useState("");
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const lines = [
      "Hola, quiero confirmar mi pago:",
      `Nombre: ${name}`,
      `Concepto: ${concept}`,
      `Monto: $${amount} MXN`,
    ];
    if (reference) lines.push(`Referencia/Folio: ${reference}`);
    if (notes) lines.push(`Notas: ${notes}`);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/528135780250?text=${message}`, "_blank");

    supabase
      .from("comprobantes_pago")
      .insert({
        nombre: name,
        concepto_pago: concept,
        monto: parseFloat(amount),
        referencia: reference || null,
        notas: notes || null,
      })
      .then(({ error }) => {
        if (error) console.error("Error al guardar comprobante:", error);
      });
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15">
              <Upload className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Confirmar Pago</h2>
              <p className="text-sm text-gray-600">
                Envía los datos de tu pago para confirmación
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-navy">
                Nombre completo *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-navy">
                Concepto de pago *
              </label>
              <select
                required
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  Selecciona el servicio pagado
                </option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-navy">
                  Monto pagado *
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="$0.00 MXN"
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy">
                  Referencia / Folio
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Número de referencia"
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-navy">
                Notas adicionales
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Información adicional sobre tu pago..."
                className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar Comprobante por WhatsApp
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <Lock className="h-3.5 w-3.5" />
            Tu información está protegida y es confidencial
          </p>
        </form>
      </div>
    </section>
  );
}
