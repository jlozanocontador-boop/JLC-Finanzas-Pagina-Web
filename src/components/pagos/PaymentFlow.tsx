"use client";

import { useState } from "react";
import PaymentInfoStep from "./PaymentInfoStep";
import PaymentMethodStep from "./PaymentMethodStep";
import CardPaymentStep from "./CardPaymentStep";
import TransferPaymentStep from "./TransferPaymentStep";

export type QuotePath = { tramiteId: string; stepsRaw: string };

export type PaymentInfo = {
  nombre: string;
  servicio: string;
  monto: number;
  quotePath?: QuotePath;
};

type Step = "info" | "method" | "card" | "transfer";

export default function PaymentFlow({
  lockedServicio,
  lockedMonto,
  quotePath,
}: {
  lockedServicio?: string;
  lockedMonto?: number;
  quotePath?: QuotePath;
}) {
  const [step, setStep] = useState<Step>("info");
  const [info, setInfo] = useState<PaymentInfo | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {step === "info" && (
          <PaymentInfoStep
            initialData={info}
            lockedServicio={lockedServicio}
            lockedMonto={lockedMonto}
            onSubmit={(data) => {
              setInfo({ ...data, quotePath });
              setStep("method");
            }}
          />
        )}

        {step === "method" && info && (
          <PaymentMethodStep
            info={info}
            onSelectCard={() => setStep("card")}
            onSelectTransfer={() => setStep("transfer")}
            onBack={() => setStep("info")}
          />
        )}

        {step === "card" && info && (
          <CardPaymentStep info={info} onBack={() => setStep("method")} />
        )}

        {step === "transfer" && info && (
          <TransferPaymentStep info={info} onBack={() => setStep("method")} />
        )}
      </div>
    </section>
  );
}
