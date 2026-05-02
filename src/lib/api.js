const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * API base for fetch: production uses VITE_API_URL; local dev uses same-origin `/api` (Vite proxy).
 */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (base) return `${base}${p}`;
  return p;
}

async function readErrorMessage(res) {
  try {
    const data = await res.json();
    if (data && typeof data.message === "string") return data.message;
  } catch {
    /* ignore */
  }
  return res.statusText || `Request failed (${res.status})`;
}

export async function fetchJson(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
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
