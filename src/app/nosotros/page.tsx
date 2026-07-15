import PageHero from "@/components/PageHero";
import History from "@/components/nosotros/History";
import MisionVision from "@/components/nosotros/MisionVision";
import Values from "@/components/nosotros/Values";
import Differentiators from "@/components/nosotros/Differentiators";

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Conócenos"
        title="Sobre JLC Finanzas"
        subtitle="Somos un despacho fiscal comprometido con brindarte soluciones claras, profesionales y personalizadas."
      />
      <History />
      <MisionVision />
      <Values />
      <Differentiators />
    </>
  );
}
