import SectionTitle from "../components/SectionTitle";
import { pillars } from "../data/siteData";

export default function AboutPage() {
  return (
    <section className="py-14">
      <SectionTitle
        badge="About"
        subtitle="MJ LearnSphere helps learners become interview-ready and placement-ready with modern AI workflows."
        title="Built for ambitious career transitions"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-300"
              key={pillar.title}
            >
              <span className="mb-4 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700">
                <Icon size={20} />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
