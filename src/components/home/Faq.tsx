"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Qué documentos necesito para mi declaración anual?",
    answer:
      "Generalmente necesitas tu constancia de situación fiscal, constancia de retenciones, comprobantes de deducciones personales y acceso al portal del SAT. Nosotros te guiamos paso a paso.",
  },
  {
    question: "¿Cuánto tarda el servicio?",
    answer:
      "Depende del trámite. Una declaración anual puede estar lista en 24-48 horas. Trámites de regularización pueden tomar de 1 a 2 semanas según la complejidad.",
  },
  {
    question: "¿Atienden por WhatsApp?",
    answer:
      "¡Sí! Puedes contactarnos directamente por WhatsApp para resolver dudas, enviar documentos y dar seguimiento a tu trámite.",
  },
  {
    question: "¿Se puede hacer todo en línea?",
    answer:
      "Sí, la mayoría de nuestros servicios se realizan 100% en línea. Solo necesitas enviarnos tus documentos de forma digital.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "Aceptamos transferencia bancaria, pago con tarjeta en línea y depósito en efectivo. Puedes realizar tu pago desde nuestra sección de pagos.",
  },
  {
    question: "¿Qué pasa si tengo declaraciones atrasadas?",
    answer:
      "No te preocupes. Podemos ayudarte a regularizar tu situación fiscal presentando las declaraciones pendientes y negociando con el SAT si es necesario.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Preguntas Frecuentes
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Resolvemos tus dudas
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-lg border border-gray-200"
              >
                <button
                  className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
