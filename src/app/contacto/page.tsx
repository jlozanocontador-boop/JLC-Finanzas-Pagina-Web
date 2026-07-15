import PageHero from "@/components/PageHero";
import InfoCards from "@/components/contacto/InfoCards";
import ContactForm from "@/components/contacto/ContactForm";
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ContactForm />
          <MapAndSocial />
        </div>
      </section>
    </>
  );
}
