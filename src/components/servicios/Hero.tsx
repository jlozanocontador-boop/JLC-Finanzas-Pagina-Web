import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-wide text-gold">
          Nuestros Servicios
        </span>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Servicios Fiscales y Contables
        </h1>
        <p className="mt-4 text-white/70">
          Soluciones completas para personas físicas, freelancers,
          emprendedores y pequeños negocios. Cumple con el SAT sin
          complicaciones.
        </p>
      </div>
    </section>
  );
}
