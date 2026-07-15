import Link from "next/link";
import { CalendarCheck, MessageCircle } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          ¿Listo para poner en orden tus finanzas?
        </h2>
        <p className="mt-4 text-white/70">
          Agenda una cita hoy y recibe asesoría personalizada. Tu primera
          consulta es sin compromiso.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/agendar-cita"
            className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar Cita Gratis
          </Link>
          <a
            href="https://wa.me/528135780250"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
