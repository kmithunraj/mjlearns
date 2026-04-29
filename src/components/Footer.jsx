import { GraduationCap, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 overflow-hidden rounded-t-3xl border-t border-violet-500/30 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-900/40">
              <GraduationCap size={19} />
            </span>
            <div>
              <p className="text-lg font-bold text-white">
                MJ <span className="text-violet-300">LearnSphere</span>
              </p>
              <p className="text-xs text-slate-400">Career Companion</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Learn, practice, and get hired with a platform designed for career outcomes. We help
            learners turn preparation into offers.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Mail, label: "support@mjlearnsphere.com" },
              { icon: Phone, label: "+91 95974 30022" },
              { icon: MapPin, label: "Kanchipuram, Tamil Nadu" },
            ].map((item) => (
              <div
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300"
                key={item.label}
              >
                <item.icon size={13} className="text-violet-300" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-xl shadow-black/20">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-300">
            Quick Contact
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Have a question? Send a quick message and we will get back to you.
          </p>
          <form className="mt-4 space-y-3">
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500 transition focus:border-violet-400"
              placeholder="Your Name"
              type="text"
            />
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500 transition focus:border-violet-400"
              placeholder="Email Address"
              type="email"
            />
            <textarea
              className="h-24 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500 transition focus:border-violet-400"
              placeholder="Message"
            />
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
              type="submit"
            >
              Send Message <Send size={14} />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © 2026 MJ LearnSphere. Crafted for modern learners.
      </div>
    </footer>
  );
}
