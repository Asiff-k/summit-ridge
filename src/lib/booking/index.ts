import { mockBookingProvider } from "./mock-provider";
import type { BookingProvider } from "./types";

/**
 * The active booking provider. To move to Supabase, write a provider that
 * implements BookingProvider and assign it here. Nothing else changes.
 */
export const bookingProvider: BookingProvider = mockBookingProvider;

export type * from "./types";
