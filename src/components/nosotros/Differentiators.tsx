import Link from "next/link";
import { CheckCircle2, Award, CalendarCheck } from "lucide-react";

const points = [
  {
    title: "Servicio 100% en línea",
    description: "Realiza tu proceso sin acudir a una oficina.",
  },
  {
    title: "Especialización en personas físicas",
    description:
      "RESICO, Arrendamiento, Actividad Empresarial, Servicios Profesionales y Plataformas Tecnológicas.",
  },
  {
    title: "Información clara",
    description: "Entiende qué se presenta, cuánto debes pagar y qué sigue.",
  },
  {
    title: "Seguimiento continuo",
    description: "Te mantendremos informados durante cada etapa del servicio.",
  },
];

export default function Differentiators() {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            ¿Qué nos hace diferentes?
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            ¿Por qué JLC Finanzas?
          </h2>
          <p className="mt-3 text-white/70">
            Atención fiscal clara, cercana y completamente en línea.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map(({ title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-white/70">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/10 p-10 text-center">
          <Award className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-4 text-2xl font-bold text-white">
            Atención directa y personalizada
          </p>
          <p className="mt-1 text-white/70">
            Recibes atención directa para resolver dudas y dar seguimiento a
            tu situación fiscal.
          </p>
          <Link
            href="/agendar-cita"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            <CalendarCheck className="h-4 w-4" />
            Agenda tu Cita
          </Link>
        </div>
      </div>
    </section>
  );
}
