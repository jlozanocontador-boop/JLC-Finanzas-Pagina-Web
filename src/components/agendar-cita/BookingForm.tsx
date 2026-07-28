"use client";

import { useState, type FormEvent } from "react";
import { CreditCard, Pencil, Phone, Video } from "lucide-react";
import { services } from "@/components/servicios/data";
import { formatMXN } from "@/components/servicios/quoteData";
import type { AsesoriaType, DateTimeSelection, BookingFormData } from "./BookingFlow";

const modalidades: { id: BookingFormData["modalidad"]; label: string; icon: typeof Phone }[] = [
  { id: "Llamada", label: "Llamada", icon: Phone },
  { id: "Videollamada", label: "Videollamada", icon: Video },
];

export default function BookingForm({
  asesoria,
  dateTime,
  initialData,
  onSubmit,
  onChangeAsesoria,
  onChangeDateTime,
}: {
  asesoria: AsesoriaType;
  dateTime: DateTimeSelection;
  initialData: BookingFormData | null;
  onSubmit: (data: BookingFormData) => void;
  onChangeAsesoria: () => void;
  onChangeDateTime: () => void;
}) {
  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [telefono, setTelefono] = useState(initialData?.telefono ?? "");
  const [correo, setCorreo] = useState(initialData?.correo ?? "");
  const [servicioInteres, setServicioInteres] = useState(initialData?.servicioInteres ?? "");
  const [modalidad, setModalidad] = useState<BookingFormData["modalidad"] | "">(
    initialData?.modalidad ?? ""
  );
  const [mensaje, setMensaje] = useState(initialData?.mensaje ?? "");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modalidad) return;
    onSubmit({ nombre, telefono, correo, servicioInteres, modalidad, mensaje });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-gold/10 px-4 py-3">
          <p className="text-sm font-bold text-navy">
            {asesoria.label} — {formatMXN(asesoria.price)}
          </p>
          <button
            type="button"
            onClick={onChangeAsesoria}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold"
          >
            <Pencil className="h-3.5 w-3.5" />
            Cambiar
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-lg bg-gold/10 px-4 py-3">
          <p className="text-sm font-bold text-navy">
            {dateTime.dateLabel} — {dateTime.time}
          </p>
          <button
            type="button"
            onClick={onChangeDateTime}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold"
          >
            <Pencil className="h-3.5 w-3.5" />
            Cambiar
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gold">
        Paso 3
      </p>
      <h2 className="mt-1 text-xl font-bold text-navy">Completa tus datos</h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-navy">Nombre *</label>
          <input
            required
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Teléfono *</label>
          <input
            required
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="(55) 1234-5678"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu@correo.com"
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="text-sm font-medium text-navy">
            Servicio de interés *
          </label>
          <select
            required
            value={servicioInteres}
            onChange={(e) => setServicioInteres(e.target.value)}
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

        <div className="sm:col-span-3">
          <label className="text-sm font-medium text-navy">Modalidad *</label>
          <div className="mt-1.5 grid grid-cols-2 gap-3">
            {modalidades.map(({ id, label, icon: Icon }) => {
              const active = modalidad === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setModalidad(id)}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-gray-200 text-gray-600 hover:border-gold/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="text-sm font-medium text-navy">
            Cuéntanos brevemente tu situación para darte una asesoría de la
            mejor manera
          </label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            placeholder="Escribe aquí..."
            className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
      >
        <CreditCard className="h-4 w-4" />
        Ir a Pago
      </button>
    </form>
  );
}
