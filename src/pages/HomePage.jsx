import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import SectionTitle from "../components/SectionTitle";
import { features, heroWords, journeyCards, stats } from "../data/siteData";

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 px-6 py-20 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} /> AI Career Studio
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Build your next career chapter with{" "}
              <span className="text-cyan-300">{heroWords[wordIndex]}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-violet-100">
              MJ LearnSphere combines learning plans, interview simulations, and placement guidance
              into one workflow built for job-ready outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-900/20 transition hover:bg-cyan-200 hover:text-slate-950"
                to="/courses"
              >
                Explore Programs <ArrowRight size={16} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                to="/features"
              >
                See Platform Features
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <p className="mb-5 text-sm font-semibold text-violet-100">Career Journey Loop</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {journeyCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    className="rounded-xl border border-white/20 bg-slate-950/20 p-4 text-violet-50"
                    key={item.title}
                  >
                    <Icon className="mb-2 text-cyan-300" size={18} />
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 mb-14 grid gap-4 md:mt-8 md:grid-cols-4">
        {stats.map((stat) => (
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={stat.label}>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="pb-10">
        <SectionTitle
          badge="Platform"
          subtitle="A full learning-to-placement frontend experience with reusable components."
          title="Everything you need in one flow"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.slice(0, 6).map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </section>
    </>
  );
}
