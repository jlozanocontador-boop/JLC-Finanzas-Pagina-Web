import PageHero from "@/components/PageHero";
import Steps from "@/components/agendar-cita/Steps";
import BookingForm from "@/components/agendar-cita/BookingForm";
import Sidebar from "@/components/agendar-cita/Sidebar";

export default function AgendarCitaPage() {
  return (
    <>
      <PageHero
        label="Agenda tu Cita"
        title="Reserva tu Asesoría"
        subtitle="Elige el servicio, fecha y hora que prefieras. Te contactaremos para confirmar tu cita."
      />
      <Steps />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <Sidebar />
        </div>
      </section>
    </>
  );
}
