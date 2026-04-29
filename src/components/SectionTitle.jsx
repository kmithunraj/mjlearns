export default function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="mb-10 space-y-3 text-center">
      {badge && (
        <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-700">
          {badge}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-slate-600">{subtitle}</p>}
    </div>
  );
}
