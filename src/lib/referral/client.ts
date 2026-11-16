export async function loadPortalJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok || !data.success || data.authenticated === false) {
    throw new Error(data.error || "Unable to load the portal. Sign in again if your session expired.");
  }
  return data;
}
