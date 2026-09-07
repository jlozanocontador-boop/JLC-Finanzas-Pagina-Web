import PageHero from "@/components/PageHero";
import History from "@/components/nosotros/History";
import Values from "@/components/nosotros/Values";
import Differentiators from "@/components/nosotros/Differentiators";

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Conócenos"
        title="Sobre JLC Finanzas"
        subtitle="Somos un despacho fiscal enfocado en personas físicas y emprendedores, con atención personalizada y servicios 100% en línea."
      />
      <History />
      <Values />
      <Differentiators />
    </>
  );
}
