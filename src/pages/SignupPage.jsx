import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <section className="grid min-h-[65vh] place-items-center py-14">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Start your MJ LearnSphere journey in minutes.</p>

        <form className="mt-5 space-y-3">
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500"
            placeholder="Full name"
            type="text"
          />
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500"
            placeholder="Email address"
            type="email"
          />
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            type="button"
          >
            Get Started
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-semibold text-violet-700 hover:text-violet-800" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
