import { Link } from "react-router-dom";
import EmailPasswordForm from "../components/EmailPasswordForm";

export default function SignupPage() {
  return (
    <section className="grid min-h-[65vh] place-items-center py-14">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Choose an email and password (minimum 8 characters).</p>

        <div className="mt-6">
          <EmailPasswordForm mode="signup" />
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-semibold text-violet-700 hover:text-violet-800" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
