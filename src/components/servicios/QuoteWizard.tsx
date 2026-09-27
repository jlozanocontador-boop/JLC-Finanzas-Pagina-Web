"use client";

import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import Modal from "@/components/Modal";
import {
  fiscalTramites,
  contabilidadRegimenes,
  formatMXN,
  type ContabilidadRegimen,
} from "./quoteData";

type QuoteType = "fiscal" | "contabilidad";

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

function FiscalServicesList() {
  const sorted = [...fiscalTramites].sort((a, b) =>
    a.label.localeCompare(b.label, "es")
  );

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-navy">
        Estos son los trámites que realizamos:
      </p>
      <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
        {sorted.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-4 py-3 text-sm text-navy"
          >
            <Check className="h-4 w-4 shrink-0 text-gold" />
            {t.label}
          </li>
        ))}
      </ul>
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
  return (
    <Modal
      title={type === "fiscal" ? "Cotiza tu Servicio Fiscal" : "Cotiza tu Servicio de Contabilidad"}
      onClose={onClose}
      maxWidthClass={type === "contabilidad" ? "max-w-2xl" : "max-w-lg"}
    >
      {type === "fiscal" ? <FiscalServicesList /> : <ContabilidadWizard />}
    </Modal>
  );
}
