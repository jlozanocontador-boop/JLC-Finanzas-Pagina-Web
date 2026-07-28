import PageHero from "@/components/PageHero";
import Steps from "@/components/agendar-cita/Steps";
import BookingFlow from "@/components/agendar-cita/BookingFlow";

export default function AgendarCitaPage() {
  return (
    <>
      <PageHero
        label="Agenda tu Cita"
        title="Reserva tu Asesoría"
        subtitle="Elige el servicio, fecha y hora que prefieras. Te contactaremos para confirmar tu cita."
      />
      <Steps />
      <BookingFlow />
    </>
  );
}
