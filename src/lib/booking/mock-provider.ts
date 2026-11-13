import { describeSlot, formatTime, listDays, listSlotTimes } from "./schedule";
import type { BookingProvider } from "./types";

/**
 * MOCK booking provider. Availability is made up: a fixed share of slots is
 * marked taken using a hash of the date and time, so the calendar looks the
 * same on every request. Bookings are kept in memory and logged to the
 * server console. They are lost when the server restarts.
 */

const booked = new Set<string>();

function key(date: string, time: string): string {
  return `${date} ${time}`;
}

/** Deterministic: roughly a third of slots look taken. */
function looksTaken(date: string, time: string): boolean {
  let hash = 0;
  for (const char of key(date, time)) {
    hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  }
  return hash % 10 < 3;
}

function isAvailable(date: string, time: string): boolean {
  return !looksTaken(date, time) && !booked.has(key(date, time));
}

export const mockBookingProvider: BookingProvider = {
  async getDays() {
    return listDays();
  },

  async getSlots(date) {
    const times = listSlotTimes(date);
    if (!times) return null;
    return times.map((time) => ({
      time,
      label: formatTime(time),
      available: isAvailable(date, time),
    }));
  },

  async createBooking(request) {
    const times = listSlotTimes(request.date);
    if (!times || !times.includes(request.time)) {
      return { ok: false, reason: "invalid" };
    }
    if (!isAvailable(request.date, request.time)) {
      return { ok: false, reason: "slot_taken" };
    }

    booked.add(key(request.date, request.time));

    const confirmation = {
      id: `SR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      date: request.date,
      time: request.time,
      ...describeSlot(request.date, request.time),
    };

    console.log("[book] New inspection booking (mock, not stored):", {
      ...request,
      confirmationId: confirmation.id,
    });

    return { ok: true, confirmation };
  },
};
