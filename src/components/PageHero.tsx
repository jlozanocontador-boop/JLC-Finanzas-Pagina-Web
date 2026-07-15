export default function PageHero({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-wide text-gold">
          {label}
        </span>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-white/70">{subtitle}</p>
      </div>
    </section>
  );
}
