"use client";

import Link from "next/link";
import Image from "next/image";
import { Calculator } from "lucide-react";
import { track } from "@vercel/analytics";

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
            Despacho Fiscal
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            Servicios fiscales para personas físicas, emprendedores y
            pequeños negocios. Recibe atención directa, explicaciones claras
            y seguimiento por WhatsApp.
          </p>

          <div className="mt-8">
            <Link
              href="/servicios"
              onClick={() => track("nav_click", { location: "hero", target: "servicios" })}
              className="flex w-fit items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
            >
              <Calculator className="h-4 w-4" />
              Nuestros Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
