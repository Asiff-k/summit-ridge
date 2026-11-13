/** Shapes shared by the booking API routes, the provider, and the UI. */

export type BookingDay = {
  /** ISO date, e.g. "2026-11-19". */
  date: string;
  /** Short weekday, e.g. "Thu". */
  weekday: string;
  /** Short date, e.g. "Nov 19". */
  label: string;
  /** False on days outside working hours. */
  open: boolean;
};

export type BookingSlot = {
  /** 24-hour start time, e.g. "10:00". */
  time: string;
  /** Display time, e.g. "10:00 am". */
  label: string;
  available: boolean;
};

export type BookingRequest = {
  date: string;
  time: string;
  service: string;
  name: string;
  phone: string;
  address: string;
};

export type BookingConfirmation = {
  id: string;
  date: string;
  time: string;
  /** Full weekday, e.g. "Thursday". */
  dayName: string;
  dateLabel: string;
  timeLabel: string;
};

export type BookingResult =
  | { ok: true; confirmation: BookingConfirmation }
  | { ok: false; reason: "slot_taken" | "invalid" };

/**
 * The one seam between the site and wherever bookings live. The API routes
 * only talk to this interface, so replacing the mock with Supabase means
 * writing a new provider and changing one line in ./index.ts. The UI never
 * changes.
 */
export interface BookingProvider {
  getDays(): Promise<BookingDay[]>;
  /** Returns null when the date is not a bookable day. */
  getSlots(date: string): Promise<BookingSlot[] | null>;
  createBooking(request: BookingRequest): Promise<BookingResult>;
}
