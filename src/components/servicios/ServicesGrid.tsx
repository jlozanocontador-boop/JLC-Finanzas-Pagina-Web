"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, CalendarCheck, Check } from "lucide-react";
import { serviceCategories } from "./data";
import QuoteWizard from "./QuoteWizard";

export default function ServicesGrid() {
  const [activeQuote, setActiveQuote] = useState<"fiscal" | "contabilidad" | null>(null);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {serviceCategories.map(({ icon: Icon, title, description, badge, items, cta, quoteType }) => {
            const cardClass =
              "group flex flex-col rounded-xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:border-gold hover:bg-gold/5 hover:shadow-md";

            const cardContent = (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gold/15">
                  <Icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>

                <div className="mt-3 inline-flex w-fit rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                  {badge}
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {cta === "cotizar" ? (
                    <span className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold px-3 py-2.5 text-sm font-semibold text-navy transition group-hover:bg-gold-light">
                      <MessageCircle className="h-4 w-4" />
                      Ver más Información
                    </span>
                  ) : (
                    <span className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold px-3 py-2.5 text-sm font-semibold text-navy transition group-hover:bg-gold-light">
                      <CalendarCheck className="h-4 w-4" />
                      Agendar
                    </span>
                  )}
                </div>
              </>
            );

            if (cta === "cotizar" && quoteType) {
              return (
                <button key={title} onClick={() => setActiveQuote(quoteType)} className={cardClass}>
                  {cardContent}
                </button>
              );
            }

            return (
              <Link key={title} href="/agendar-cita" className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      {activeQuote && (
        <QuoteWizard type={activeQuote} onClose={() => setActiveQuote(null)} />
      )}
    </section>
  );
}
