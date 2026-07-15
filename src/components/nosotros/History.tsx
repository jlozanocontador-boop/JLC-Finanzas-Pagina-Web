import Image from "next/image";

export default function History() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
            alt="Oficina de JLC Finanzas"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-gold">
            Nuestra Historia
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
            Un despacho que nació para simplificar lo fiscal
          </h2>
          <p className="mt-5 text-gray-600">
            JLC Finanzas surge de la necesidad de ofrecer un servicio fiscal
            diferente: cercano, claro y accesible. Sabemos que los temas de
            impuestos pueden ser confusos y estresantes, por eso nos
            dedicamos a hacer que el proceso sea lo más sencillo posible
            para ti.
          </p>
          <p className="mt-4 text-gray-600">
            Nuestro equipo está formado por profesionales con amplia
            experiencia en el ámbito fiscal y contable mexicano. Nos
            especializamos en atender a personas físicas, freelancers,
            emprendedores y pequeños negocios que buscan cumplir con sus
            obligaciones ante el SAT sin complicaciones.
          </p>
          <p className="mt-4 text-gray-600">
            Creemos en la atención personalizada, en explicar las cosas de
            forma clara y en construir relaciones de confianza a largo plazo
            con nuestros clientes.
          </p>
        </div>
      </div>
    </section>
  );
}
