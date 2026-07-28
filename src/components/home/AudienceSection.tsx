import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const audiences = [
  {
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
    title: "Soy RESICO",
    description:
      "Declaraciones mensuales, facturación, revisión de ingresos y gastos, orientación y cumplimiento ante el SAT.",
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    title: "Rento una propiedad",
    description:
      "Cálculo y presentación de declaraciones de arrendamiento, revisión de facturas y seguimiento mensual.",
  },
  {
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    title: "Trabajo por mi cuenta",
    description:
      "Atención para profesionistas, prestadores de servicios y personas con actividad empresarial.",
  },
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    title: "Tengo declaraciones pendientes",
    description:
      "Revisamos tu situación, identificamos obligaciones atrasadas y preparamos un plan para regularizarte.",
  },
];

export default function AudienceSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Para quién es
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            ¿Cómo podemos ayudarte?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ image, title, description }) => (
            <div
              key={title}
              className="flex flex-col overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-100"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{description}</p>
                <Link
                  href="/servicios"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light"
                >
                  Ver servicio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
