import { Phone, Mail, MapPin, Clock } from "lucide-react";

const cards = [
  { icon: Phone, title: "Teléfono", value: "(81) 3578-0250" },
  { icon: Mail, title: "Correo", value: "jlozanocontador@gmail.com" },
  { icon: MapPin, title: "Ubicación", value: "Dos Ríos, Guadalupe, México" },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun - Jue: 19:00 - 23:00\nVie - Sáb: Cerrado\nDom: 8:00 - 14:00",
  },
];

export default function InfoCards() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, value }) => (
            <div
              key={title}
              className="rounded-xl bg-white p-7 text-center shadow-sm ring-1 ring-gray-100"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
              <p className="mt-1 whitespace-pre-line text-sm text-gray-600">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
