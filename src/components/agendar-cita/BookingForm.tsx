"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/components/servicios/data";
import { supabase } from "@/lib/supabase";

const timeSlots = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { error } = await supabase.from("solicitudes_cita").insert({
      nombre: data.get("nombre") as string,
      telefono: data.get("telefono") as string,
      correo: (data.get("correo") as string) || null,
      servicio_interes: data.get("servicio_interes") as string,
      fecha_preferida: data.get("fecha_preferida") as string,
      hora_preferida: data.get("hora_preferida") as string,
      mensaje: (data.get("mensaje") as string) || null,
    });

    setLoading(false);
    if (error) {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="mt-4 text-xl font-bold text-navy">
          ¡Solicitud enviada!
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Gracias por agendar tu cita. Te contactaremos en menos de 24 horas
          para confirmar los detalles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
    >
      <h2 className="text-xl font-bold text-navy">Completa tus datos</h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-navy">
            Nombre completo *
          </label>
          <input
            required
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Teléfono *</label>
          <input
            required
            name="telefono"
            type="tel"
            placeholder="(55) 1234-5678"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">
            Correo electrónico
          </label>
          <input
            name="correo"
            type="email"
            placeholder="tu@correo.com"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">
            Servicio de interés *
          </label>
          <select
            required
            name="servicio_interes"
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
          >
            <option value="" disabled>
              Selecciona un servicio
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
            Fecha preferida *
          </label>
          <input
            required
            name="fecha_preferida"
            type="date"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">
            Hora preferida *
          </label>
          <select
            required
            name="hora_preferida"
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-gold focus:outline-none"
          >
            <option value="" disabled>
              Selecciona hora
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">
            Mensaje adicional
          </label>
          <textarea
            name="mensaje"
            rows={4}
            placeholder="Cuéntanos brevemente tu situación o dudas..."
            className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CalendarCheck className="h-4 w-4" />
        )}
        {loading ? "Enviando..." : "Enviar Solicitud de Cita"}
      </button>
    </form>
  );
}
