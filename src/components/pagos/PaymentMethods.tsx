import { CreditCard, Building2, Smartphone, Banknote } from "lucide-react";

const methods = [
  {
    icon: CreditCard,
    title: "Tarjeta de Crédito/Débito",
    detail: "Visa, Mastercard, American Express",
  },
  {
    icon: Building2,
    title: "Transferencia Bancaria",
    detail: "CLABE: 0123 4567 8901 2345 67",
  },
  {
    icon: Smartphone,
    title: "SPEI / CoDi",
    detail: "Transferencia electrónica inmediata",
  },
  {
    icon: Banknote,
    title: "Depósito en Efectivo",
    detail: "Banco: BBVA | Cuenta: 123456789",
  },
];

export default function PaymentMethods() {
  return (
    <section className="bg-gray-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Métodos de Pago
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Formas de Pago Disponibles
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="rounded-xl bg-white p-7 text-center shadow-sm ring-1 ring-gray-100"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
