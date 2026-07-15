export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-wide text-gold">
          JLC Finanzas
        </span>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-gray-600">
          Esta sección está en construcción. Pronto tendrá el contenido
          completo migrado desde la versión anterior del sitio.
        </p>
      </div>
    </section>
  );
}
