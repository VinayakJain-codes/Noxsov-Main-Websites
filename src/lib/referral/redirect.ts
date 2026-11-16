export function safePortalRedirect(target: string | null, role: "partner" | "admin") {
  const fallback = role === "admin" ? "/admin/referrals" : "/partner/dashboard";
  if (!target || !target.startsWith("/" + role + "/") || /[\\\s]/.test(target) || /%2f|%5c|%2e/i.test(target)) return fallback;
  const url = new URL(target, "https://portal.invalid");
  if (!url.pathname.startsWith("/" + role + "/") || url.pathname === "/" + role + "/login") {
    return fallback;
  }
  return url.pathname + url.search + url.hash;
}
