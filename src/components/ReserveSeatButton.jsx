import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postWorkshopRegistration } from "../lib/api";
import { AUTH_CHANGED_EVENT, getStoredToken } from "../lib/session";

const btnClass =
  "inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60";

export default function ReserveSeatButton({ workshopId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [hasToken, setHasToken] = useState(() => !!getStoredToken());

  useEffect(() => {
    const sync = () => setHasToken(!!getStoredToken());
    window.addEventListener(AUTH_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const loginHref = `/login?next=workshop&workshopId=${workshopId}`;
  const signupHref = `/signup?next=workshop&workshopId=${workshopId}`;

  const handleReserve = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const data = await postWorkshopRegistration(workshopId);
      setMessage(data.message || "Seat reserved. Complete payment to confirm.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reserve");
    } finally {
      setLoading(false);
    }
  };

  if (!hasToken) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Link className={btnClass} to={loginHref}>
          Reserve a seat <ArrowRight size={16} />
        </Link>
        <span className="text-xs text-slate-600">
          or{" "}
          <Link className="font-semibold text-violet-700 hover:text-violet-800" to={signupHref}>
            create an account
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button className={btnClass} disabled={loading} onClick={handleReserve} type="button">
        {loading ? "Reserving…" : "Reserve a seat"} <ArrowRight size={16} />
      </button>
      {message ? <p className="text-sm font-medium text-emerald-800">{message}</p> : null}
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
    </div>
  );
}
