"use client";

import Link from "next/link";
import { ArrowRight, FileText, Home, Briefcase, type LucideIcon } from "lucide-react";
import { track } from "@vercel/analytics";

const groupedAudiences: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: FileText,
    title: "Soy RESICO",
    description: "Declaraciones mensuales, facturación y seguimiento.",
  },
  {
    icon: Home,
    title: "Rento una propiedad",
    description: "Declaraciones de arrendamiento y revisión mensual.",
  },
  {
    icon: Briefcase,
    title: "Trabajo por mi cuenta",
    description: "Atención para profesionistas y actividad empresarial.",
  },
];

function AudienceRow({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function AudienceSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Para quién es
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Encuentra el servicio que necesitas
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="divide-y divide-gray-100 overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-100">
            {groupedAudiences.map((audience) => (
              <AudienceRow key={audience.title} {...audience} />
            ))}
          </div>
          <Link
            href="/agendar-cita"
            onClick={() => track("agendar_click", { location: "home_audience" })}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            Agendar Asesoría
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
