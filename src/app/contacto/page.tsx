import PageHero from "@/components/PageHero";
import InfoCards from "@/components/contacto/InfoCards";
import MapAndSocial from "@/components/contacto/MapAndSocial";

export default function ContactoPage() {
  return (
    <>
      <PageHero
        label="Contacto"
        title="¿Cómo podemos ayudarte?"
        subtitle="Estamos listos para resolver tus dudas fiscales. Contáctanos por el medio que prefieras."
      />
      <InfoCards />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <MapAndSocial />
        </div>
      </section>
    </>
  );
}
