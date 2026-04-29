import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandLogo() {
  return (
    <Link className="group inline-flex items-center gap-3" to="/">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-700/25 transition group-hover:scale-105">
        <GraduationCap size={20} />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-bold text-slate-900">
          MJ <span className="text-violet-600">LearnSphere</span>
        </span>
        <span className="block text-xs text-slate-500">Career Companion</span>
      </span>
    </Link>
  );
}
