import Hero from "@/components/pagos/Hero";
import PaymentFlow from "@/components/pagos/PaymentFlow";
import { resolveFiscalQuote, type QuoteStep } from "@/components/servicios/quoteData";

export default async function PagosPage({
  searchParams,
}: {
  searchParams: Promise<{ tramiteId?: string; steps?: string }>;
}) {
  const { tramiteId, steps: stepsRaw } = await searchParams;

  let lockedServicio: string | undefined;
  let lockedMonto: number | undefined;

  if (tramiteId) {
    let steps: QuoteStep[] = [];
    try {
      steps = stepsRaw ? JSON.parse(stepsRaw) : [];
    } catch {
      steps = [];
    }

    // El precio se recalcula aquí, en el servidor, a partir del mismo
    // árbol de trámites que usa el cotizador — nunca se confía en un
    // monto que venga directo de la URL.
    const resolved = resolveFiscalQuote(tramiteId, steps);
    if (resolved) {
      lockedServicio = resolved.summary;
      lockedMonto = resolved.price;
    }
  }

  return (
    <>
      <Hero />
      <PaymentFlow
        lockedServicio={lockedServicio}
        lockedMonto={lockedMonto}
        quotePath={tramiteId && lockedMonto !== undefined ? { tramiteId, stepsRaw: stepsRaw ?? "[]" } : undefined}
      />
    </>
  );
}
