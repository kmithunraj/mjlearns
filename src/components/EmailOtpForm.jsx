import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendOtp, sendOtp, verifyOtp } from "../lib/api";
import { setSession } from "../lib/session";

/**
 * Passwordless email + 6-digit OTP (matches backend `/api/auth/*`).
 */
export default function EmailOtpForm({ redirectTo = "/" }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendOtp({ email: email.trim() });
      setStep("otp");
      setOtp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    try {
      await resendOtp({ email: email.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await verifyOtp({ email: email.trim(), otp: otp.trim() });
      if (data.token && data.user) {
        setSession(data.token, data.user);
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {step === "email" ? (
        <form className="space-y-3" onSubmit={handleSendCode}>
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
          <p className="text-xs text-slate-500">
            We&apos;ll email you a one-time code. No password to remember.
          </p>
          <button
            className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Sending…" : "Email me a code"}
          </button>
        </form>
      ) : (
        <form className="space-y-3" onSubmit={handleVerify}>
          <p className="text-sm text-slate-600">
            Code sent to <span className="font-medium text-slate-900">{email}</span>
            <button
              className="ml-2 text-sm font-semibold text-violet-700 hover:text-violet-800"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError(null);
              }}
              type="button"
            >
              Change
            </button>
          </p>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="auth-otp">
              6-digit code
            </label>
            <input
              autoComplete="one-time-code"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tracking-widest outline-none placeholder:text-slate-400 focus:border-violet-500"
              id="auth-otp"
              inputMode="numeric"
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              pattern="\d{6}"
              placeholder="000000"
              required
              type="text"
              value={otp}
            />
          </div>
          <button
            className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            disabled={loading || otp.length !== 6}
            type="submit"
          >
            {loading ? "Verifying…" : "Verify and continue"}
          </button>
          <div className="text-center">
            <button
              className="text-sm font-semibold text-violet-700 hover:text-violet-800 disabled:opacity-50"
              disabled={loading}
              onClick={handleResend}
              type="button"
            >
              Resend code
            </button>
          </div>
        </form>
      )}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
