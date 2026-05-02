/**
 * After login/signup, return user to workshops with ?reserve= when they came from "Reserve a seat".
 * Login URL: `/login?next=workshop&workshopId=123`
 */
export function postAuthRedirectPath(searchParams, fallback = "/") {
  const next = searchParams.get("next");
  const wid = searchParams.get("workshopId");
  if (next === "workshop" && wid && /^\d+$/.test(wid)) {
    return `/workshops?reserve=${wid}`;
  }
  return fallback;
}
