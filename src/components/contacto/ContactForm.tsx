"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { error } = await supabase.from("mensajes_contacto").insert({
      nombre: data.get("nombre") as string,
      telefono: (data.get("telefono") as string) || null,
      correo: data.get("correo") as string,
      asunto: data.get("asunto") as string,
      mensaje: data.get("mensaje") as string,
    });

    setLoading(false);
    if (error) {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="mt-4 text-xl font-bold text-navy">¡Mensaje enviado!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Gracias por escribirnos. Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
    >
      <h2 className="text-xl font-bold text-navy">Envíanos un mensaje</h2>
      <p className="mt-1 text-sm text-gray-600">
        Completa el formulario y te responderemos en menos de 24 horas.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-navy">Nombre *</label>
          <input
            required
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Teléfono</label>
          <input
            name="telefono"
            type="tel"
            placeholder="(55) 1234-5678"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">
            Correo electrónico *
          </label>
          <input
            required
            name="correo"
            type="email"
            placeholder="tu@correo.com"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">Asunto *</label>
          <input
            required
            name="asunto"
            type="text"
            placeholder="¿En qué podemos ayudarte?"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-navy">Mensaje *</label>
          <textarea
            required
            name="mensaje"
            rows={4}
            placeholder="Describe tu situación o consulta..."
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
          <Send className="h-4 w-4" />
        )}
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
}
