import { ArrowRight, Calendar, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import SectionTitle from "../components/SectionTitle";
import { features, heroWords, journeyCards, stats } from "../data/siteData";
import { fetchWorkshops } from "../lib/api";

function formatWorkshopWhen(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(d);
}

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [workshops, setWorkshops] = useState([]);
  const [workshopsError, setWorkshopsError] = useState(null);
  const [workshopsLoading, setWorkshopsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchWorkshops();
        if (!cancelled) setWorkshops(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setWorkshopsError(e instanceof Error ? e.message : "Could not load workshops");
      } finally {
        if (!cancelled) setWorkshopsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
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
                to="/#live-workshop"
              >
                View live workshop <ArrowRight size={16} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                to="/courses"
              >
                Explore programs
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                to="/features"
              >
                See platform features
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

      <section className="mt-6 scroll-mt-24" id="live-workshop">
        <SectionTitle
          badge="Live"
          subtitle="Book your seat for the next session — details from our server."
          title="Upcoming workshop"
        />
        <div className="mx-auto max-w-3xl">
          {workshopsLoading && (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading workshop…</p>
          )}
          {!workshopsLoading && workshopsError && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
              {workshopsError} — start the API on port 4000 or set <code className="font-mono">VITE_API_URL</code>.
            </p>
          )}
          {!workshopsLoading && !workshopsError && workshops.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              No workshops scheduled yet.
            </p>
          )}
          {!workshopsLoading &&
            !workshopsError &&
            workshops.map((w) => (
              <article
                className="rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm"
                key={w.id}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Featured</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{w.title}</h2>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="shrink-0 text-violet-600" size={18} />
                    {formatWorkshopWhen(w.date)}
                  </span>
                  {w.instructor ? (
                    <span className="inline-flex items-center gap-2">
                      <User className="shrink-0 text-violet-600" size={18} />
                      Led by {w.instructor}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{w.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    {Number(w.price) === 0 ? "Free" : `₹${w.price}`}
                  </span>
                  <Link
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
                    to="/signup"
                  >
                    Reserve a seat <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
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
