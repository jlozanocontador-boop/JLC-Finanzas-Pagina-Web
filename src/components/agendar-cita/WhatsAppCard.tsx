import { MessageCircle } from "lucide-react";

export default function WhatsAppCard() {
  return (
    <div className="rounded-xl bg-navy p-7">
      <h3 className="text-lg font-bold text-gold">¿Prefieres WhatsApp?</h3>
      <p className="mt-2 text-sm text-white/70">
        Si prefieres agendar tu cita directamente por WhatsApp, haz clic en el
        botón de abajo.
      </p>
      <a
        href="https://wa.me/528135780250?text=Hola%2C%20Me%20interesa%20agendar%20una%20Asesoria%20Fiscal%20con%20ustedes."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
      >
        <MessageCircle className="h-4 w-4" />
        Agendar por WhatsApp
      </a>
    </div>
  );
}
