import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, MessageCircle, ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";

const trustBadges = [
  "+500 clientes satisfechos",
  "Atención 100% en línea",
  "Respuesta en menos de 24 hrs",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-light">
            <ShieldCheck className="h-4 w-4" />
            Despacho Fiscal de Confianza
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            ¿Ocupado con tus <span className="text-gold">impuestos</span>?
            <br />
            Nosotros te ayudamos.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            En JLC Finanzas te apoyamos con trámites fiscales, declaraciones,
            asesoría y cumplimiento ante el SAT de forma clara, profesional y
            personalizada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/agendar-cita"
              className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendar Cita
            </Link>
            <a
              href="https://wa.me/528135780250"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar WhatsApp
            </a>
            <Link
              href="/servicios"
              className="flex items-center justify-center gap-2 rounded-lg border border-gold px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
            >
              Ver Servicios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:gap-8">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
