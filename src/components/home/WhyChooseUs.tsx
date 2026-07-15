import Image from "next/image";
import { Users, Award, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Cada cliente recibe un trato único y cercano.",
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description: "Años de experiencia resolviendo situaciones fiscales.",
  },
  {
    icon: Zap,
    title: "Rapidez y Eficiencia",
    description: "Trámites ágiles con resultados en tiempo récord.",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento Garantizado",
    description: "Tu situación fiscal siempre en orden ante el SAT.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            ¿Por qué elegirnos?
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Tu tranquilidad fiscal es nuestra prioridad
          </h2>
          <p className="mt-4 text-gray-600">
            En JLC Finanzas combinamos experiencia, tecnología y un trato
            cercano para brindarte soluciones fiscales que realmente
            funcionan. No somos un despacho más, somos tu aliado financiero.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80"
              alt="Asesores de JLC Finanzas"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-xl bg-gold px-6 py-4 shadow-lg sm:left-10">
            <p className="text-2xl font-bold text-navy">+500</p>
            <p className="text-sm font-medium text-navy/80">Clientes satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
