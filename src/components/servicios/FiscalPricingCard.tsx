import {
  FileText,
  TrendingUp,
  Building2,
  Home,
  RefreshCw,
  Search,
  UserPlus,
  Stamp,
  Coins,
  ChevronRight,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { fiscalTramites, formatMXN } from "./quoteData";

const ICONS: Record<string, LucideIcon> = {
  "declaracion-anual": FileText,
  devoluciones: TrendingUp,
  "alta-sat": UserPlus,
  "alta-local-sat": Building2,
  constancia: FileText,
  "cambio-domicilio": Home,
  regularizacion: RefreshCw,
  "revision-fiscal": Search,
  "renovacion-fiel": RefreshCw,
  "sellos-digitales": Stamp,
};

const FIXED_PRICE_IDS = [
  "constancia",
  "cambio-domicilio",
  "regularizacion",
  "revision-fiscal",
  "alta-local-sat",
];

export default function FiscalPricingCard({
  onOpenQuote,
}: {
  onOpenQuote: () => void;
}) {
  const fixedPrice = fiscalTramites.filter((t) => FIXED_PRICE_IDS.includes(t.id));
  const custom = fiscalTramites.filter((t) => !FIXED_PRICE_IDS.includes(t.id));

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-gold hover:shadow-md">
      <h3 className="text-2xl font-bold text-navy">Servicios Fiscales</h3>
      <p className="mt-2 text-sm text-gray-600">
        Trámites puntuales y esporádicos para resolver una necesidad
        específica, sin compromiso de permanencia.
      </p>
      <div className="mt-3 inline-flex w-fit rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
        Pago único por trámite
      </div>

      <div className="mt-5 rounded-lg bg-gold/5 p-4">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 shrink-0 text-gold" />
          <p className="text-sm font-bold text-navy">Precio fijo</p>
        </div>
        <ul className="mt-2 divide-y divide-gray-100">
          {fixedPrice.map((t) => {
            const Icon = ICONS[t.id] ?? FileText;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="flex w-full items-center gap-2 py-2 text-left text-xs text-gray-700 transition hover:text-navy"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span className="flex-1">{t.label}</span>
                  <span className="whitespace-nowrap font-semibold text-navy">
                    {formatMXN(t.price!)}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 shrink-0 text-navy" />
          <p className="text-sm font-bold text-navy">Cotización personalizada</p>
        </div>
        <ul className="mt-2 divide-y divide-gray-200">
          {custom.map((t) => {
            const Icon = ICONS[t.id] ?? FileText;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="flex w-full items-center gap-2 py-2 text-left text-xs text-gray-700 transition hover:text-navy"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span className="flex-1">{t.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <a
        href="https://wa.me/528135780250"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-green-500 px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-green-50"
      >
        <MessageCircle className="h-4 w-4 text-green-500" />
        Consultar por WhatsApp
      </a>
    </div>
  );
}
