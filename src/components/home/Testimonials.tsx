import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Excelente servicio. Me ayudaron con mi declaración anual y obtuve mi devolución en tiempo récord. Muy profesionales y atentos.",
    name: "María González",
    role: "Freelancer",
  },
  {
    quote:
      "Llevaba años sin declarar y estaba preocupado. JLC Finanzas me regularizó sin problemas. Ahora estoy tranquilo con mi situación fiscal.",
    name: "Carlos Ramírez",
    role: "Emprendedor",
  },
  {
    quote:
      "La asesoría personalizada que recibí fue increíble. Me explicaron todo de forma clara y sencilla. Los recomiendo ampliamente.",
    name: "Ana López",
    role: "Pequeño Negocio",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Testimonios
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-gray-600">
            La confianza de nuestros clientes es nuestro mayor logro. Conoce
            sus experiencias.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm italic text-gray-600">&ldquo;{quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
