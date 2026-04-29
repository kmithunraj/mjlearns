export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100">
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
        <Icon size={20} />
      </span>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
      <p className="text-sm leading-6 text-slate-600">{feature.desc}</p>
    </article>
  );
}
