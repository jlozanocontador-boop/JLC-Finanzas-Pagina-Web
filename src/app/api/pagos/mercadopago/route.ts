import { Payment } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { ASESORIA_PRICES } from "@/lib/asesoriaPricing";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    token,
    issuer_id,
    payment_method_id,
    asesoriaId,
    installments,
    email,
    description,
  } = body;

  const transaction_amount = ASESORIA_PRICES[asesoriaId];

  if (!token || !payment_method_id || !transaction_amount || !email) {
    return Response.json(
      { error: "Faltan datos requeridos para procesar el pago." },
      { status: 400 }
    );
  }

  try {
    const payment = new Payment(mpClient);
    const result = await payment.create({
      body: {
        transaction_amount: Number(transaction_amount),
        token,
        description,
        installments: installments ? Number(installments) : 1,
        payment_method_id,
        issuer_id: issuer_id ? Number(issuer_id) : undefined,
        payer: { email },
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
