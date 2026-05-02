import { Link } from "react-router-dom";
import EmailOtpForm from "../components/EmailOtpForm";

export default function LoginPage() {
  return (
    <section className="grid min-h-[65vh] place-items-center py-14">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in with your email and a one-time code.</p>

        <div className="mt-6">
          <EmailOtpForm />
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          New here?{" "}
          <Link className="font-semibold text-violet-700 hover:text-violet-800" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
