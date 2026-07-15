import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/528135780250"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enviar WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
