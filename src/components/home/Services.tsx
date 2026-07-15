"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  TrendingUp,
  Building2,
  ShieldCheck,
  Calculator,
  Briefcase,
  Plus,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Declaración Anual",
    description: "Presentamos tu declaración anual de forma correcta y puntual.",
  },
  {
    icon: TrendingUp,
    title: "Devoluciones SAT",
    description: "Recupera tu saldo a favor de manera rápida y segura.",
  },
  {
    icon: Building2,
    title: "Alta ante SAT",
    description: "Te damos de alta con las obligaciones fiscales correctas.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Fiscal",
    description: "Orientación personalizada para tomar mejores decisiones fiscales.",
  },
  {
    icon: Calculator,
    title: "Regularización Fiscal",
    description: "Ponte al corriente con el SAT sin complicaciones.",
  },
  {
    icon: Briefcase,
    title: "Facturación",
    description: "Apoyo con emisión de facturas y administración contable.",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Nuestros Servicios
          </span>
          <h2 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">
            Soluciones fiscales a tu medida
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ofrecemos una amplia gama de servicios fiscales y contables para
            que cumplas con tus obligaciones sin complicaciones.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {services.map(({ icon: Icon, title, description }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={title}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 p-6 text-left"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <Icon className="h-7 w-7 text-navy" />
                  </div>
                  <span className="flex-1 text-xl font-bold text-navy sm:text-2xl">
                    {title}
                  </span>
                  <Plus
                    className={`h-6 w-6 shrink-0 text-gold transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 pl-[calc(3.5rem+1.25rem+1.5rem)] text-gray-600 sm:text-lg">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Ver todos los servicios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
