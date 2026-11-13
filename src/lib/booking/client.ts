import type {
  BookingConfirmation,
  BookingDay,
  BookingRequest,
  BookingSlot,
} from "./types";

/**
 * Browser-side calls to the booking API. The booking UI only uses these three
 * functions, so the backend behind /api/availability and /api/book can change
 * without touching any component.
 */

export async function fetchDays(): Promise<BookingDay[]> {
  const response = await fetch("/api/availability");
  if (!response.ok) throw new Error(`Days request failed: ${response.status}`);
  const data = (await response.json()) as { days: BookingDay[] };
  return data.days;
}

export async function fetchSlots(date: string): Promise<BookingSlot[]> {
  const response = await fetch(`/api/availability?date=${encodeURIComponent(date)}`);
  if (!response.ok) throw new Error(`Slots request failed: ${response.status}`);
  const data = (await response.json()) as { slots: BookingSlot[] };
  return data.slots;
}

export type SubmitBookingResult =
  | { ok: true; confirmation: BookingConfirmation }
  | { ok: false; reason: "slot_taken" | "failed" };

export async function submitBooking(
  request: BookingRequest & { company: string },
): Promise<SubmitBookingResult> {
  try {
    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (response.status === 409) return { ok: false, reason: "slot_taken" };
    if (!response.ok) return { ok: false, reason: "failed" };
    const data = (await response.json()) as { confirmation: BookingConfirmation };
    return { ok: true, confirmation: data.confirmation };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
