import { PortalError } from "./session";

export function field(value: unknown, label: string, max: number, required: true): string;
export function field(value: unknown, label: string, max: number, required?: false): string | undefined;
export function field(value: unknown, label: string, max: number, required = false) {
  if (value === undefined && !required) return undefined;
  if (typeof value !== "string" || value.trim().length > max || (required && !value.trim())) {
    throw new PortalError(`${label} must ${required ? "be provided and " : ""}contain at most ${max} characters.`);
  }
  return value.trim();
}

export function emailAddress(value: unknown) {
  const email = field(value, "Email", 254, true).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new PortalError("Enter a valid email address.");
  return email;
}

export function dateTime(value: unknown, label: string) {
  const input = field(value, label, 40);
  const date = input ? new Date(input) : new Date();
  if (Number.isNaN(date.getTime())) throw new PortalError(`Enter a valid ${label.toLowerCase()}.`);
  return date.toISOString();
}


export function objectFields(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new PortalError("Expected a JSON object.");
  }
  return value as Record<string, unknown>;
}

export async function portalBody(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new PortalError("Send the request as JSON.", 415);
  }
  let value: unknown;
  try {
    value = await request.json();
  } catch {
    throw new PortalError("Invalid JSON request.");
  }
  return objectFields(value);
}
