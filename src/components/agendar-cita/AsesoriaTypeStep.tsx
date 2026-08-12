import { MessageCircle, Users, Check, Clock, ArrowRight } from "lucide-react";
import { formatMXN } from "@/components/servicios/quoteData";
import { ASESORIA_PRICES } from "@/lib/asesoriaPricing";
import type { AsesoriaType } from "./BookingFlow";
import WhatsAppCard from "./WhatsAppCard";

const options: (AsesoriaType & {
  icon: typeof MessageCircle;
  tagline: string;
  description: string;
  features: string[];
})[] = [
  {
    id: "sencilla",
    label: "Asesoría Sencilla",
    price: ASESORIA_PRICES.sencilla,
    durationLabel: "25 min",
    slotInterval: 30,
    icon: MessageCircle,
    tagline: "Ideal para dudas específicas y concretas.",
    description: "Resolución de dudas puntuales y orientación general sobre tu situación fiscal.",
    features: [
      "Resolución de dudas puntuales",
      "Orientación sobre tu régimen y obligaciones",
      "Recomendaciones Inmediatas",
    ],
  },
  {
    id: "personalizada",
    label: "Asesoría Personalizada",
    price: ASESORIA_PRICES.personalizada,
    durationLabel: "55 min",
    slotInterval: 60,
    icon: Users,
    tagline: "Ideal para dudas más abiertas o revisar a detalle tu caso.",
    description: "Análisis a profundidad de tu situación, plan de acción y seguimiento cercano.",
    features: [
      "Análisis Completo",
      "Revisión a Detalle de tus Documentos",
      "Plan de acción personalizado",
      "Seguimiento posterior a la cita",
    ],
  },
];

export default function AsesoriaTypeStep({
  onSelect,
}: {
  onSelect: (type: AsesoriaType) => void;
}) {
  return (
    <div>
      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-wide text-gold">
          Paso 1
        </span>
        <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
          Elige el tipo de asesoría
        </h2>
        <p className="mt-2 text-gray-600">
          Selecciona la opción que mejor se ajuste a lo que necesitas.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {options.map(({ id, label, price, durationLabel, slotInterval, icon: Icon, tagline, description, features }) => (
          <button
            key={id}
            onClick={() => onSelect({ id, label, price, durationLabel, slotInterval })}
            className="group flex flex-col rounded-xl border border-gray-200 p-8 text-left transition hover:border-gold hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy">{label}</h3>
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <p className="text-4xl font-bold text-gold">{formatMXN(price)}</p>
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-sm font-semibold text-gray-600">
                <Clock className="h-4 w-4" />
                {durationLabel}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">{tagline}</p>
            <p className="mt-3 text-sm text-gray-600">{description}</p>

            <ul className="mt-4 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>

            <span className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition group-hover:bg-gold-light">
              Continuar Registro
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <WhatsAppCard />
      </div>
    </div>
  );
}
