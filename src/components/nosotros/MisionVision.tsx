import { Target, Eye } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Brindar servicios fiscales y contables de alta calidad, con atención personalizada y soluciones claras que permitan a nuestros clientes cumplir con sus obligaciones tributarias de forma eficiente, segura y sin estrés.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser el despacho fiscal de referencia en México para personas físicas y emprendedores, reconocido por nuestra excelencia en el servicio, innovación tecnológica y compromiso con el éxito financiero de nuestros clientes.",
  },
];

export default function MisionVision() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
        {items.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5">
              <Icon className="h-6 w-6 text-navy" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
            <p className="mt-3 text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
