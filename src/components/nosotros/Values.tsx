import { Shield, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Construimos relaciones basadas en la transparencia y la honestidad con cada uno de nuestros clientes.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description:
      "Nos dedicamos a resolver tus necesidades fiscales con responsabilidad y dedicación.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Utilizamos herramientas tecnológicas para ofrecerte un servicio ágil y moderno.",
  },
  {
    icon: Users,
    title: "Cercanía",
    description: "Te tratamos como persona, no como un número. Tu situación es única y así la atendemos.",
  },
];

export default function Values() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Nuestros Valores
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Lo que nos define
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl bg-gray-50 p-7 text-center ring-1 ring-gray-100"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
