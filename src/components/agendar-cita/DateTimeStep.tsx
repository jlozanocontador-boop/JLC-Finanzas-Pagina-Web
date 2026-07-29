"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, Clock, CalendarCheck } from "lucide-react";
import Modal from "@/components/Modal";
import type { AsesoriaType, DateTimeSelection } from "./BookingFlow";

const weekdayLabels = ["D", "L", "M", "M", "J", "V", "S"];
const monthLabels = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isClosed(date: Date) {
  const day = date.getDay();
  return day === 5 || day === 6; // Viernes, Sábado
}

function formatDateISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateLabel(date: Date) {
  const weekdayFull = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
  ][date.getDay()];
  return `${weekdayFull}, ${date.getDate()} de ${monthLabels[date.getMonth()]}`;
}

type TimeSlot = { label: string; value: string };

function buildSlot(totalMinutes: number): TimeSlot {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const mm = String(m).padStart(2, "0");
  return {
    label: `${h}:${mm}${suffix}`,
    value: `${String(h).padStart(2, "0")}:${mm}`,
  };
}

function generateSlots(startHour: number, endHour: number, intervalMinutes: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let t = startHour * 60; t < endHour * 60; t += intervalMinutes) {
    slots.push(buildSlot(t));
  }
  return slots;
}

export default function DateTimeStep({
  asesoria,
  onSelect,
  onBack,
}: {
  asesoria: AsesoriaType;
  onSelect: (value: DateTimeSelection) => void;
  onBack: () => void;
}) {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [pendingSlot, setPendingSlot] = useState<TimeSlot | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrevMonth = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());

  const timeSlots =
    selectedDay?.getDay() === 0
      ? generateSlots(8, 14, asesoria.slotInterval)
      : generateSlots(19, 23, asesoria.slotInterval);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold hover:bg-gold/10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Atrás
      </button>

      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-wide text-gold">
          Paso 2
        </span>
        <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
          Elige fecha y hora
        </h2>
        <p className="mt-2 text-gray-600">
          Selecciona el día y horario que mejor te convenga.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-start gap-6 lg:flex-row">
        <div className="w-full max-w-xs shrink-0 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => canGoPrevMonth && setViewDate(new Date(year, month - 1, 1))}
              disabled={!canGoPrevMonth}
              aria-label="Mes anterior"
              className="flex h-7 w-7 items-center justify-center rounded-full text-navy transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm font-bold text-navy">
              {monthLabels[month]} {year}
            </p>
            <button
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Mes siguiente"
              className="flex h-7 w-7 items-center justify-center rounded-full text-navy transition hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-0.5 text-center text-[11px] font-semibold text-gray-400">
            {weekdayLabels.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-0.5">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const disabled = date < today || isClosed(date);
              const isSelected = selectedDay && formatDateISO(selectedDay) === formatDateISO(date);
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => setSelectedDay(date)}
                  className={`aspect-square rounded-md text-xs font-medium transition ${
                    isSelected
                      ? "bg-gold text-navy"
                      : disabled
                      ? "cursor-not-allowed text-gray-300"
                      : "text-navy hover:bg-gold/15"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex-1 rounded-xl border border-gray-200 p-4">
          {selectedDay ? (
            <>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
                <Clock className="h-4 w-4 text-gold" />
                {formatDateLabel(selectedDay)}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    onClick={() => setPendingSlot(slot)}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-navy transition hover:border-gold hover:bg-gold/5"
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
              <Clock className="h-6 w-6 text-gray-300" />
              <p className="mt-3 text-sm text-gray-500">
                Selecciona un día en el calendario para ver los horarios
                disponibles.
              </p>
            </div>
          )}
        </div>
      </div>

      {pendingSlot && selectedDay && (
        <Modal title="Confirma tu cita" onClose={() => setPendingSlot(null)}>
          <div className="text-center">
            <CalendarCheck className="mx-auto h-12 w-12 text-gold" />
            <p className="mt-4 text-sm text-gray-600">
              ¿Confirmas tu cita para el
            </p>
            <p className="mt-1 text-lg font-bold text-navy">
              {formatDateLabel(selectedDay)}
            </p>
            <p className="text-lg font-bold text-navy">a las {pendingSlot.label}</p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() =>
                  onSelect({
                    date: formatDateISO(selectedDay),
                    dateLabel: formatDateLabel(selectedDay),
                    time: pendingSlot.label,
                    timeValue: pendingSlot.value,
                  })
                }
                className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
              >
                <CalendarCheck className="h-4 w-4" />
                Sí, Continuar
              </button>
              <button
                onClick={() => setPendingSlot(null)}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gray-50"
              >
                Elegir otro horario
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
