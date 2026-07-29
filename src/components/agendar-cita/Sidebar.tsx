import { Clock, Shield, Zap } from "lucide-react";

const infoItems = [
  {
    icon: Clock,
    text: "Horario: Lun - Jue 19:00-23:00 · Vie y Sáb cerrado · Dom 8:00-14:00",
  },
  { icon: Shield, text: "Tu información es confidencial y segura" },
  { icon: Zap, text: "Confirmación en menos de 24 horas" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
        <h3 className="text-base font-bold text-navy">Información importante</h3>
        <ul className="mt-4 space-y-3">
          {infoItems.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-gray-600">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
