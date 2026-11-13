import { bookingProvider } from "@/lib/booking";

/**
 * POST /api/book  -> { ok, confirmation }
 *
 * PLACEHOLDER: the mock provider only logs the booking to the server console
 * and remembers it in memory. Nothing is stored, emailed, or texted yet.
 */

const MAX_LENGTH = 300;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

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
  const input = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (text(input.company)) {
    console.log("[book] Dropped a submission with the honeypot field filled.");
    return Response.json({ ok: false, error: "Rejected" }, { status: 400 });
  }

  const booking = {
    date: text(input.date),
    time: text(input.time),
    service: text(input.service),
    name: text(input.name),
    phone: text(input.phone),
    address: text(input.address),
  };

  const phoneDigits = booking.phone.replace(/\D/g, "");
  const valid =
    /^\d{4}-\d{2}-\d{2}$/.test(booking.date) &&
    /^\d{2}:\d{2}$/.test(booking.time) &&
    booking.name.length >= 2 &&
    phoneDigits.length >= 10 &&
    phoneDigits.length <= 11 &&
    booking.address.length >= 5;

  if (!valid) {
    return Response.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 422 },
    );
  }

  const result = await bookingProvider.createBooking(booking);

  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.reason },
      { status: result.reason === "slot_taken" ? 409 : 422 },
    );
  }

  return Response.json({ ok: true, confirmation: result.confirmation });
}
