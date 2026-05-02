import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WorkshopCard from "../components/WorkshopCard";
import SectionTitle from "../components/SectionTitle";
import { fetchWorkshops, postWorkshopRegistration } from "../lib/api";
import { getStoredToken } from "../lib/session";

export default function WorkshopsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserveBanner, setReserveBanner] = useState(null);

  const reserveId = searchParams.get("reserve");

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

  useEffect(() => {
    if (!reserveId || !/^\d+$/.test(reserveId) || !getStoredToken()) return;

    let cancelled = false;
    (async () => {
      try {
        const data = await postWorkshopRegistration(Number(reserveId));
        if (!cancelled) {
          setReserveBanner({ type: "ok", text: data.message || "Seat reserved. Complete payment to confirm." });
        }
      } catch (e) {
        if (!cancelled) {
          setReserveBanner({
            type: "err",
            text: e instanceof Error ? e.message : "Could not complete reservation",
          });
        }
      } finally {
        if (!cancelled) {
          const next = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
          next.delete("reserve");
          setSearchParams(next, { replace: true });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reserveId, setSearchParams]);

  return (
    <section className="py-10 md:py-14">
      <SectionTitle
        badge="Live"
        subtitle="Dates, pricing, and instructors load from the server."
        title="Workshops"
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        {reserveBanner ? (
          <p
            className={
              reserveBanner.type === "ok"
                ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
                : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
            }
            role="status"
          >
            {reserveBanner.text}
          </p>
        ) : null}
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
