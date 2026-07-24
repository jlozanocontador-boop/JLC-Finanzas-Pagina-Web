import { Shield, Lock, CheckCircle2 } from "lucide-react";
import BackButton from "./BackButton";

const badges = [
  { icon: Shield, text: "Pagos 100% seguros" },
  { icon: Lock, text: "Información encriptada" },
  { icon: CheckCircle2, text: "Confirmación inmediata" },
];

export default function Hero() {
  return (
    <>
      <section className="relative bg-navy py-20">
        <BackButton />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Pagos
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Realiza tu Pago
          </h1>
          <p className="mt-4 text-white/70">
            Paga tus servicios de forma segura y sencilla. Elige el método de
            pago que prefieras.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:gap-10 sm:px-6 lg:px-8">
          {badges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-medium text-navy">
              <Icon className="h-4 w-4 text-gold" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
