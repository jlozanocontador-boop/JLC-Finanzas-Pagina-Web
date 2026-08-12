"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Search, CreditCard, Plus, Check, X } from "lucide-react";
import Modal from "@/components/Modal";
import {
  fiscalTramites,
  contabilidadRegimenes,
  formatMXN,
  type FiscalTramite,
  type FollowUp,
  type FollowUpOption,
  type ContabilidadRegimen,
  type NumberInputConfig,
  type QuoteStep,
} from "./quoteData";

type QuoteType = "fiscal" | "contabilidad";
type CartItem = { summary: string; price: number };

function OptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-navy transition hover:border-gold hover:bg-gold/5"
    >
      {label}
    </button>
  );
}

function NumberInputStep({
  config,
  onSubmit,
}: {
  config: NumberInputConfig;
  onSubmit: (value: number) => void;
}) {
  const [value, setValue] = useState("");
  const parsed = parseFloat(value);
  const isValid = value.trim() !== "" && !isNaN(parsed) && parsed >= 0;

  return (
    <div>
      <label className="mb-4 block text-sm font-semibold text-navy">
        {config.question}
      </label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={config.placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
      />
      <button
        onClick={() => isValid && onSubmit(parsed)}
        disabled={!isValid}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continuar
      </button>
    </div>
  );
}

function StepHeader({
  step,
  totalSteps,
  onBack,
}: {
  step: number;
  totalSteps?: number;
  onBack?: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold hover:bg-gold/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Atrás
        </button>
      ) : (
        <span />
      )}
      <span className="text-xs font-medium text-gray-400">
        {totalSteps ? `Paso ${step} de ${totalSteps}` : `Paso ${step}`}
      </span>
    </div>
  );
}

function CartSummary({ cart }: { cart: CartItem[] }) {
  if (cart.length === 0) return null;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mb-5 rounded-lg bg-gray-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
        Servicios agregados
      </p>
      <ul className="space-y-1.5">
        {cart.map((item, i) => (
          <li key={i} className="flex items-start justify-between gap-3 text-sm text-navy">
            <span>{item.summary}</span>
            <span className="shrink-0 font-semibold">{formatMXN(item.price)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-sm font-bold text-navy">
        <span>Subtotal</span>
        <span>{formatMXN(total)}</span>
      </div>
    </div>
  );
}

function ResultStep({
  summary,
  price,
  payHref,
  onBack,
  onAddAnother,
}: {
  summary: string;
  price: number;
  payHref: string;
  onBack?: () => void;
  onAddAnother: () => void;
}) {
  return (
    <div className="text-center">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold hover:bg-gold/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Atrás
        </button>
      )}
      <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
      <p className="mt-4 text-sm text-gray-600">{summary}</p>
      <p className="mt-3 text-3xl font-bold text-navy">{formatMXN(price)}</p>
      <p className="mt-1 text-xs text-gray-400">
        Este precio corresponde a una revisión previa. La cotización final se te enviará después de dicha revisión.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={payHref}
          className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
        >
          <CreditCard className="h-4 w-4" />
          Contratar Servicio — Ir a Pago
        </Link>
        <button
          onClick={onAddAnother}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          Agregar otro servicio
        </button>
      </div>
    </div>
  );
}

function FiscalWizard({
  onAddToCart,
}: {
  onAddToCart: (item: CartItem) => void;
}) {
  const [tramite, setTramite] = useState<FiscalTramite | null>(null);
  const [selections, setSelections] = useState<FollowUpOption[]>([]);
  const [steps, setSteps] = useState<QuoteStep[]>([]);
  const [search, setSearch] = useState("");

  const selectOption = (opt: FollowUpOption) => {
    if (opt.redirectToId) {
      const redirectTramite = fiscalTramites.find((t) => t.id === opt.redirectToId);
      if (redirectTramite?.price !== undefined) {
        setTramite(redirectTramite);
        setSelections([]);
        setSteps([]);
      }
      return;
    }
    setSelections([...selections, opt]);
    setSteps([...steps, { label: opt.label }]);
  };

  if (tramite) {
    const lastNode = selections.length > 0 ? selections[selections.length - 1] : tramite;
    const currentFollowUp: FollowUp | null = lastNode.followUp ?? null;
    const currentNumberInput: NumberInputConfig | null = lastNode.numberInput ?? null;

    const goBack = () => {
      if (selections.length > 0) {
        setSelections(selections.slice(0, -1));
        setSteps(steps.slice(0, -1));
      } else {
        setTramite(null);
        setSteps([]);
      }
    };

    let resolvedPrice: number | undefined;
    for (let i = selections.length - 1; i >= 0; i--) {
      if (selections[i].price !== undefined) {
        resolvedPrice = selections[i].price;
        break;
      }
    }
    if (resolvedPrice === undefined) resolvedPrice = tramite.price;

    if (!currentFollowUp && !currentNumberInput && resolvedPrice !== undefined) {
      const summary = [tramite.label, ...selections.map((s) => s.label)].join(" — ");
      const price = resolvedPrice;
      const payHref = `/pagos?tramiteId=${encodeURIComponent(tramite.id)}&steps=${encodeURIComponent(JSON.stringify(steps))}`;
      return (
        <ResultStep
          summary={summary}
          price={price}
          payHref={payHref}
          onBack={goBack}
          onAddAnother={() => onAddToCart({ summary, price })}
        />
      );
    }

    if (currentNumberInput) {
      return (
        <div>
          <StepHeader step={selections.length + 2} onBack={goBack} />
          <NumberInputStep
            config={currentNumberInput}
            onSubmit={(value) => {
              setSelections([
                ...selections,
                {
                  label: `${currentNumberInput.summaryLabel}: ${formatMXN(value)}`,
                  price: currentNumberInput.computePrice(value),
                },
              ]);
              setSteps([...steps, { value }]);
            }}
          />
        </div>
      );
    }

    if (currentFollowUp) {
      return (
        <div>
          <StepHeader step={selections.length + 2} onBack={goBack} />
          <p className="mb-4 text-sm font-semibold text-navy">
            {currentFollowUp.question}
          </p>
          <div className="space-y-2">
            {currentFollowUp.options.map((opt) => (
              <OptionButton
                key={opt.label}
                label={opt.label}
                onClick={() => selectOption(opt)}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  const filteredTramites = fiscalTramites.filter((t) =>
    t.label.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <StepHeader step={1} />
      <p className="mb-4 text-sm font-semibold text-navy">
        ¿Qué trámite necesitas?
      </p>

      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca tu trámite..."
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
        {filteredTramites.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">
            No encontramos un trámite con ese nombre.
          </p>
        ) : (
          filteredTramites.map((t) => (
            <OptionButton
              key={t.id}
              label={t.label}
              onClick={() => {
                setTramite(t);
                setSelections([]);
                setSteps([]);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function waHrefForPlan(regimenLabel: string, planLabel: "Básico" | "Avanzado") {
  const message = `Quiero contratar el servicio de la Contabilidad Mensual "${planLabel}" del régimen ${regimenLabel}`;
  return `https://wa.me/528135780250?text=${encodeURIComponent(message)}`;
}

function PlanValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
        <Check className="h-3.5 w-3.5" />
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span className="text-xs font-medium text-navy">{value}</span>;
}

function ComparisonTable({ regimen }: { regimen: ContabilidadRegimen }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-2/5 p-2 text-left align-bottom text-xs font-bold uppercase tracking-wide text-gray-400">
              Concepto
            </th>
            <th className="rounded-t-lg bg-gray-50 p-3 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-navy">
                Básico
              </p>
              <p className="mt-1 text-lg font-bold text-navy">
                {formatMXN(regimen.basicoPrice)}
                <span className="text-xs font-normal text-gray-500">/mes</span>
              </p>
            </th>
            <th className="rounded-t-lg bg-gold/10 p-3 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-gold">
                Avanzado
              </p>
              <p className="mt-1 text-lg font-bold text-navy">
                {formatMXN(regimen.avanzadoPrice)}
                <span className="text-xs font-normal text-gray-500">/mes</span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {regimen.rows.map((row) => (
            <tr key={row.label} className="border-t border-gray-100">
              <td className="p-2 text-sm text-gray-600">{row.label}</td>
              <td className="bg-gray-50 p-2 text-center">
                <PlanValue value={row.basico} />
              </td>
              <td className="bg-gold/10 p-2 text-center">
                <PlanValue value={row.avanzado} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td className="rounded-b-lg bg-gray-50 p-3">
              <a
                href={waHrefForPlan(regimen.label, "Básico")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg border border-navy px-3 py-2 text-xs font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Cotizar ahora
              </a>
            </td>
            <td className="rounded-b-lg bg-gold/10 p-3">
              <a
                href={waHrefForPlan(regimen.label, "Avanzado")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-navy transition hover:bg-gold-light"
              >
                Cotizar ahora
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function ContabilidadWizard() {
  const [regimen, setRegimen] = useState<ContabilidadRegimen | null>(null);

  if (regimen) {
    return (
      <div>
        <StepHeader step={2} onBack={() => setRegimen(null)} />
        <p className="mb-4 text-sm font-semibold text-navy">
          {regimen.label} — Compara los planes
        </p>
        <ComparisonTable regimen={regimen} />
      </div>
    );
  }

  return (
    <div>
      <StepHeader step={1} />
      <p className="mb-4 text-sm font-semibold text-navy">
        ¿Cuál es tu régimen fiscal?
      </p>
      <div className="space-y-2">
        {contabilidadRegimenes.map((r) => (
          <OptionButton key={r.id} label={r.label} onClick={() => setRegimen(r)} />
        ))}
      </div>
    </div>
  );
}

export default function QuoteWizard({
  type,
  onClose,
}: {
  type: QuoteType;
  onClose: () => void;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const addToCart = (item: CartItem) => {
    setCart((c) => [...c, item]);
    setResetKey((k) => k + 1);
  };

  return (
    <Modal
      title={type === "fiscal" ? "Cotiza tu Servicio Fiscal" : "Cotiza tu Servicio de Contabilidad"}
      onClose={onClose}
      maxWidthClass={type === "contabilidad" ? "max-w-2xl" : "max-w-lg"}
    >
      <CartSummary cart={cart} />
      {type === "fiscal" ? (
        <FiscalWizard key={resetKey} onAddToCart={addToCart} />
      ) : (
        <ContabilidadWizard key={resetKey} />
      )}
    </Modal>
  );
}
