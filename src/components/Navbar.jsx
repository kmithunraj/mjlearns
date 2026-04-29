import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../data/siteData";
import BrandLogo from "./BrandLogo";

const linkBase =
  "rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-violet-50 hover:text-violet-700";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
        <BrandLogo />

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-violet-100 text-violet-700" : "text-slate-600"}`
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-700/25 transition hover:bg-violet-700"
            to="/signup"
          >
            Get Started
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-xl border border-slate-300 p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                key={item.path}
                onClick={() => setOpen(false)}
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                className="rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700"
                onClick={() => setOpen(false)}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="rounded-xl bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-violet-700"
                onClick={() => setOpen(false)}
                to="/signup"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
