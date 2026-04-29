import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-white">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">404</p>
        <h1 className="mt-2 text-4xl font-bold">This learning route does not exist</h1>
        <p className="mt-3 text-slate-300">Let us guide you back to the main dashboard.</p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          to="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
