import { business } from "@/config/business";

import type { BookingDay } from "./types";

/**
 * Turns the working hours and slot length in business.ts into bookable days
 * and time slots. Pure calendar maths; knows nothing about what is taken.
 */

const { booking } = business;

const DAY_MS = 24 * 60 * 60 * 1000;

function todayInBusinessZone(): Date {
  // "en-CA" formats as YYYY-MM-DD.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: booking.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return new Date(`${iso}T00:00:00Z`);
}

function hoursFor(date: Date) {
  const weekday = date.getUTCDay();
  return booking.workingHours.find((entry) => entry.day === weekday);
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function format(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(date);
}

/** "10:00" becomes "10:00 am". */
export function formatTime(time: string): string {
  const total = toMinutes(time);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours < 12 ? "am" : "pm";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** The next `daysAhead` days, starting tomorrow in the business time zone. */
export function listDays(): BookingDay[] {
  const today = todayInBusinessZone();
  return Array.from({ length: booking.daysAhead }, (_, index) => {
    const date = new Date(today.getTime() + (index + 1) * DAY_MS);
    return {
      date: date.toISOString().slice(0, 10),
      weekday: format(date, { weekday: "short" }),
      label: format(date, { month: "short", day: "numeric" }),
      open: Boolean(hoursFor(date)),
    };
  });
}

/** Slot start times for a date, or null if that date cannot be booked. */
export function listSlotTimes(date: string): string[] | null {
  const day = listDays().find((entry) => entry.date === date);
  if (!day || !day.open) return null;

  const hours = hoursFor(new Date(`${date}T00:00:00Z`));
  if (!hours) return null;

  const times: string[] = [];
  const close = toMinutes(hours.close);
  for (
    let start = toMinutes(hours.open);
    start + booking.slotMinutes <= close;
    start += booking.slotMinutes
  ) {
    times.push(fromMinutes(start));
  }
  return times;
}

/** Display labels for a confirmed date and time. */
export function describeSlot(date: string, time: string) {
  const day = new Date(`${date}T00:00:00Z`);
  return {
    dayName: format(day, { weekday: "long" }),
    dateLabel: format(day, { month: "long", day: "numeric" }),
    timeLabel: formatTime(time),
  };
}
