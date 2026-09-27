import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const trabajamosCon = [
  "RESICO",
  "Actividad Empresarial y Profesional",
  "Arrendamiento",
  "Plataformas Tecnológicas",
  "Regularizaciones, declaraciones anuales, trámites y asesorías",
];

export default function History() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Oficina de JLC Finanzas"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-wide text-gold">
              Nuestra Historia
            </span>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              JLC Finanzas
            </h2>
            <p className="mt-4 text-lg font-semibold text-navy">
              Contabilidad y servicios fiscales con atención clara,
              personalizada y en línea.
            </p>
            <p className="mt-4 text-gray-600">
              JLC Finanzas es un despacho enfocado principalmente en personas
              físicas, emprendedores y pequeños negocios. Nuestro objetivo es
              facilitar el cumplimiento de sus obligaciones fiscales mediante
              procesos sencillos, comunicación directa y atención digital.
            </p>

            <h3 className="mt-8 text-xl font-bold text-navy">
              ¿Cómo trabajamos?
            </h3>
            <p className="mt-3 text-gray-600">
              Buscamos que cada cliente entienda qué se presenta, cuánto debe
              pagar y cuáles son los siguientes pasos.
            </p>
            <p className="mt-4 text-gray-600">Trabajamos principalmente con:</p>
            <ul className="mt-3 space-y-2">
              {trabajamosCon.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
