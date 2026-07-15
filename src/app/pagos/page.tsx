import Hero from "@/components/pagos/Hero";
import PaymentMethods from "@/components/pagos/PaymentMethods";
import ConfirmPaymentForm from "@/components/pagos/ConfirmPaymentForm";

export default function PagosPage() {
  return (
    <>
      <Hero />
      <PaymentMethods />
      <ConfirmPaymentForm />
    </>
  );
}
