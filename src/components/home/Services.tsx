import Link from "next/link";
import {
  FileText,
  TrendingUp,
  Building2,
  ShieldCheck,
  Calculator,
  Briefcase,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Declaración Anual",
    description: "Presentamos tu declaración anual de forma correcta y puntual.",
  },
  {
    icon: TrendingUp,
    title: "Devoluciones SAT",
    description: "Recupera tu saldo a favor de manera rápida y segura.",
  },
  {
    icon: Building2,
    title: "Alta ante SAT",
    description: "Te damos de alta con las obligaciones fiscales correctas.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Fiscal",
    description: "Orientación personalizada para tomar mejores decisiones fiscales.",
  },
  {
    icon: Calculator,
    title: "Regularización Fiscal",
    description: "Ponte al corriente con el SAT sin complicaciones.",
  },
  {
    icon: Briefcase,
    title: "Facturación",
    description: "Apoyo con emisión de facturas y administración contable.",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Nuestros Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Soluciones fiscales a tu medida
          </h2>
          <p className="mt-4 text-gray-600">
            Ofrecemos una amplia gama de servicios fiscales y contables para
            que cumplas con tus obligaciones sin complicaciones.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gold/15">
                <Icon className="h-6 w-6 text-navy transition-colors group-hover:text-gold" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
              <Link
                href="/servicios"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light"
              >
                Más información
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Ver todos los servicios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
