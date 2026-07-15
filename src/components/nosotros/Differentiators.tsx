import Link from "next/link";
import { CheckCircle2, Award, CalendarCheck } from "lucide-react";

const points = [
  "Atención personalizada y directa, sin intermediarios",
  "Comunicación clara y sin tecnicismos innecesarios",
  "Procesos 100% digitales para tu comodidad",
  "Respuesta rápida por WhatsApp y correo",
  "Experiencia comprobada con personas físicas y emprendedores",
  "Precios justos y transparentes, sin costos ocultos",
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
            No somos un despacho más
          </h2>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-white/80">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/10 p-10 text-center">
          <Award className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-4 text-3xl font-bold text-white">+500 Clientes</p>
          <p className="mt-1 text-white/70">
            confían en nosotros para sus trámites fiscales
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
