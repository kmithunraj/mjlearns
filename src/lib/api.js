const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/** Shown when the server returns HTML (e.g. index.html) instead of JSON. */
export const API_HTML_RESPONSE_HINT =
  "The app received a web page instead of API data. " +
  "For a production build, set VITE_API_URL to your backend base URL (e.g. https://your-api.onrender.com) and rebuild. " +
  "For local dev, run the backend on port 4000 and use npm run dev (Vite proxies /api). " +
  "vite preview does not use the dev proxy unless you set VITE_API_URL.";

/**
 * API base for fetch: production uses VITE_API_URL; local dev uses same-origin `/api` (Vite proxy).
 */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (base) return `${base}${p}`;
  return p;
}

function responseLooksLikeHtml(text, contentType) {
  const ct = (contentType || "").toLowerCase();
  if (ct.includes("text/html")) return true;
  return /^\s*</.test(text);
}

export async function fetchJson(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  if (responseLooksLikeHtml(text, res.headers.get("content-type"))) {
    throw new Error(API_HTML_RESPONSE_HINT);
  }
  if (!res.ok) {
    let msg = res.statusText || `Request failed (${res.status})`;
    try {
      const data = JSON.parse(text || "{}");
      if (data && typeof data.message === "string") msg = data.message;
    } catch {
      /* keep msg */
    }
    throw new Error(msg);
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(API_HTML_RESPONSE_HINT);
  }
}

export async function fetchWorkshops() {
  return fetchJson("/api/workshops");
}

/** @param {{ email: string }} body */
export function sendOtp(body) {
  return fetchJson("/api/auth/send-otp", { method: "POST", body: JSON.stringify(body) });
}

/** @param {{ email: string }} body */
export function resendOtp(body) {
  return fetchJson("/api/auth/resend-otp", { method: "POST", body: JSON.stringify(body) });
}

/** @param {{ email: string, otp: string }} body */
export function verifyOtp(body) {
  return fetchJson("/api/auth/verify-otp", { method: "POST", body: JSON.stringify(body) });
}
