import { MessageCircle, Clock, Shield, Zap } from "lucide-react";

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
      <div className="rounded-xl bg-navy p-7">
        <h3 className="text-lg font-bold text-gold">¿Prefieres WhatsApp?</h3>
        <p className="mt-2 text-sm text-white/70">
          Si prefieres agendar tu cita directamente por WhatsApp, haz clic en
          el botón de abajo.
        </p>
        <a
          href="https://wa.me/528135780250"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" />
          Agendar por WhatsApp
        </a>
      </div>

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
