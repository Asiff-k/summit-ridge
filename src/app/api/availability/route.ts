import { connection } from "next/server";

import { bookingProvider } from "@/lib/booking";

/**
 * GET /api/availability           -> { days }   the bookable days ahead
 * GET /api/availability?date=ISO  -> { slots }  time slots for one day
 *
 * Availability is mocked for now (see src/lib/booking/mock-provider.ts).
 */
export async function GET(request: Request) {
  // Depends on today's date, so never prerender.
  await connection();

  const date = new URL(request.url).searchParams.get("date");

  if (!date) {
    return Response.json({ days: await bookingProvider.getDays() });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  const slots = await bookingProvider.getSlots(date);
  if (!slots) {
    return Response.json({ error: "Date is not bookable" }, { status: 404 });
  }

  return Response.json({ date, slots });
}
