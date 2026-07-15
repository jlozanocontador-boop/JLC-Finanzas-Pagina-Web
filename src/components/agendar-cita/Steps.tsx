import { Calendar, Phone, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    step: "Paso 1",
    title: "Elige fecha y hora",
    description: "Selecciona el día y horario que mejor te convenga.",
  },
  {
    icon: Phone,
    step: "Paso 2",
    title: "Confirmación",
    description: "Te contactamos para confirmar tu cita por WhatsApp o llamada.",
  },
  {
    icon: MessageCircle,
    step: "Paso 3",
    title: "Asesoría",
    description: "Recibe atención personalizada en la fecha acordada.",
  },
];

export default function Steps() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gold">{step}</p>
                <h3 className="mt-0.5 text-base font-bold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
