import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, register } from "../lib/api";
import { postAuthRedirectPath } from "../lib/authRedirect";
import { setSession } from "../lib/session";

export default function EmailPasswordForm({ mode, redirectTo = "/" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const afterAuthPath = postAuthRedirectPath(searchParams, redirectTo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data =
        mode === "signup"
          ? await register({ email: email.trim(), password })
          : await login({ email: email.trim(), password });
      if (data.token && data.user) {
        setSession(data.token, data.user);
        navigate(afterAuthPath, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="auth-email">
          Email
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500"
          id="auth-email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="auth-password">
          Password
        </label>
        <input
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500"
          id="auth-password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isSignup ? "At least 8 characters" : "Your password"}
          required
          type="password"
          value={password}
        />
        {isSignup ? <p className="mt-1 text-xs text-slate-500">Use at least 8 characters.</p> : null}
      </div>
      <button
        className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
      </button>
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
