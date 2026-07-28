import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Calculator } from "lucide-react";

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
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Tu contabilidad y obligaciones ante el{" "}
            <span className="text-gold">SAT</span>, atendidas en línea
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            Servicios fiscales para personas físicas, emprendedores y
            pequeños negocios. Recibe atención directa, explicaciones claras
            y seguimiento por WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/servicios"
              className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
            >
              <Calculator className="h-4 w-4" />
              Cotizar Nuestro Servicio
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
          </div>
        </div>
      </div>
    </section>
  );
}
