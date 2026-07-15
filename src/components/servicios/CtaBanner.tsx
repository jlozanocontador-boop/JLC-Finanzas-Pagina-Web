import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="mt-4 text-white/70">
          Contáctanos y cuéntanos tu situación. Te orientamos sin compromiso
          sobre el servicio que necesitas.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/528135780250"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            <MessageCircle className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
          <Link
            href="/contacto"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ir a Contacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
