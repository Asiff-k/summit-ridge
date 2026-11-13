/**
 * Contact form endpoint. PLACEHOLDER: it only logs the request to the server
 * console. Nothing is stored or emailed yet. Supabase will be connected later.
 */

const FIELDS = [
  "name",
  "phone",
  "email",
  "address",
  "service",
  "message",
  "preferredTime",
] as const;

const MAX_LENGTH = 2000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  // Keep only the known fields, as trimmed strings of a sane length.
  const input = body as Record<string, unknown>;
  const submission: Record<string, string> = {};
  for (const field of FIELDS) {
    const value = input[field];
    submission[field] =
      typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
  }

  const phoneDigits = submission.phone.replace(/\D/g, "");
  const valid =
    submission.name.length >= 2 &&
    phoneDigits.length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) &&
    submission.service.length > 0;

  if (!valid) {
    return Response.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 422 },
    );
  }

  console.log("[contact] New inspection request:", submission);

  return Response.json({ ok: true });
}
