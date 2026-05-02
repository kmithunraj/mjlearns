import { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";
import SectionTitle from "../components/SectionTitle";
import { fetchWorkshops } from "../lib/api";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchWorkshops();
        if (!cancelled) setWorkshops(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load workshops");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-10 md:py-14">
      <SectionTitle
        badge="Live"
        subtitle="Dates, pricing, and instructors load from the server."
        title="Workshops"
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        {loading && (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading workshops…</p>
        )}
        {!loading && error && (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">{error}</p>
        )}
        {!loading && !error && workshops.length === 0 && (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">No workshops scheduled yet.</p>
        )}
        {!loading && !error && workshops.map((w) => <WorkshopCard key={w.id} workshop={w} />)}
      </div>
    </section>
  );
}
