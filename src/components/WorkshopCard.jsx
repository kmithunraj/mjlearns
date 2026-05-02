import { BadgeCheck, Calendar, IndianRupee, User } from "lucide-react";
import ReserveSeatButton from "./ReserveSeatButton";
import { formatWorkshopPrice, formatWorkshopWhen } from "../lib/workshopFormat";

export default function WorkshopCard({ workshop: w, onRegistered }) {
  return (
    <article className="rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Workshop</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">{w.title}</h2>
      <p className="mt-3 inline-flex items-center gap-2 text-lg font-bold text-violet-800">
        <IndianRupee className="shrink-0" size={22} strokeWidth={2.5} aria-hidden />
        <span>{formatWorkshopPrice(w.price)}</span>
        {Number(w.price) > 0 ? <span className="text-sm font-normal text-slate-600">per seat</span> : null}
      </p>
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
          {formatWorkshopPrice(w.price)}
        </span>
        {w.registered ? (
          <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800">
            <BadgeCheck size={18} aria-hidden />
            Registered
          </span>
        ) : (
          <ReserveSeatButton onRegistered={onRegistered} workshopId={Number(w.id)} />
        )}
      </div>
    </article>
  );
}
