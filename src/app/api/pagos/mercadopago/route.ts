import { Payment } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { ASESORIA_PRICES } from "@/lib/asesoriaPricing";
import { resolveFiscalQuote, type QuoteStep } from "@/components/servicios/quoteData";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    token,
    issuer_id,
    payment_method_id,
    asesoriaId,
    tramiteId,
    stepsRaw,
    amount,
    installments,
    email,
    description,
  } = body;

  // El servidor nunca confía en el monto que manda el navegador si puede
  // recalcularlo por sí mismo:
  // - Asesorías tienen un catálogo fijo de precios (ASESORIA_PRICES).
  // - Los servicios fiscales del cotizador se recalculan repitiendo el
  //   mismo recorrido de preguntas (tramiteId + steps) contra quoteData.ts.
  // Solo cuando un pago no viene de ninguno de los dos (monto acordado a
  // mano en /pagos) se usa el monto reportado por el cliente, igual que ya
  // ocurre con las transferencias bancarias.
  let transaction_amount: number | undefined;
  if (asesoriaId) {
    transaction_amount = ASESORIA_PRICES[asesoriaId];
  } else if (tramiteId) {
    let steps: QuoteStep[] = [];
    try {
      steps = stepsRaw ? JSON.parse(stepsRaw) : [];
    } catch {
      steps = [];
    }
    const resolved = resolveFiscalQuote(tramiteId, steps);
    transaction_amount = resolved?.price;
  } else {
    transaction_amount = Number(amount);
  }

  if (!token || !payment_method_id || !transaction_amount || transaction_amount <= 0 || !email) {
    return Response.json(
      { error: "Faltan datos requeridos para procesar el pago." },
      { status: 400 }
    );
  }

  try {
    const itemTitle = description || "Servicio JLC Finanzas";

    const payment = new Payment(mpClient);
    const result = await payment.create({
      body: {
        transaction_amount: Number(transaction_amount),
        token,
        description: itemTitle,
        statement_descriptor: "JLC FINANZAS",
        installments: installments ? Number(installments) : 1,
        payment_method_id,
        issuer_id: issuer_id ? Number(issuer_id) : undefined,
        payer: { email },
        additional_info: {
          items: [
            {
              id: "servicio-jlc",
              title: itemTitle,
              description: itemTitle,
              quantity: 1,
              unit_price: Number(transaction_amount),
              currency_id: "MXN",
            },
          ],
        },
      },
    });

    return Response.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch (error) {
    console.error("Error al crear el pago en Mercado Pago:", error);
    return Response.json(
      { error: "No se pudo procesar el pago." },
      { status: 500 }
    );
  }
}
