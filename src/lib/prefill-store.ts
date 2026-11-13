/**
 * Tiny client-side stores that let any button on the site open the booking
 * widget or the estimate form with some fields already filled in.
 *
 * Each store hands out a snapshot with a `nonce`. The widgets use the nonce
 * as a React key, so a new prefill simply remounts the form with new initial
 * values. When the target is on another page, the prefill is stashed in
 * sessionStorage and picked up after navigation.
 */

type Listener = () => void;

export type Prefill<T> = { nonce: number; data: Partial<T> };

function createPrefillStore<T>(storageKey: string) {
  const empty: Prefill<T> = { nonce: 0, data: {} };
  let snapshot = empty;
  let hydrated = false;
  const listeners = new Set<Listener>();

  function hydrate() {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (raw) {
        window.sessionStorage.removeItem(storageKey);
        snapshot = { nonce: 1, data: JSON.parse(raw) as Partial<T> };
      }
    } catch {
      // Storage can be unavailable (private mode). The form just starts empty.
    }
  }

  return {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      hydrate();
      return snapshot;
    },
    getServerSnapshot() {
      return empty;
    },
    set(data: Partial<T>) {
      hydrated = true;
      snapshot = { nonce: snapshot.nonce + 1, data };
      listeners.forEach((listener) => listener());
    },
    stash(data: Partial<T>) {
      try {
        window.sessionStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        // Ignore: the visitor still reaches the form, just without the prefill.
      }
    },
  };
}

export type BookingPrefill = { service: string; address: string };
export type EstimatePrefill = { address: string };

export const bookingStore = createPrefillStore<BookingPrefill>("prefill:booking");
export const estimateStore = createPrefillStore<EstimatePrefill>("prefill:estimate");

/** Element ids the openers look for. */
export const BOOKING_ANCHOR = "book";
export const ESTIMATE_ANCHOR = "estimate";

function jumpTo(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  // Instant jump: scrolling animation is not part of the motion spec.
  target.scrollIntoView({ block: "start" });
  target.focus({ preventScroll: true });
  return true;
}

/**
 * Opens the booking widget, optionally prefilled. Returns false when the
 * widget is not on this page; the caller should then let the link navigate
 * to `/#book`, where the stashed prefill is picked up.
 */
export function openBooking(prefill: Partial<BookingPrefill> = {}): boolean {
  if (!document.getElementById(BOOKING_ANCHOR)) {
    bookingStore.stash(prefill);
    return false;
  }
  bookingStore.set(prefill);
  return jumpTo(BOOKING_ANCHOR);
}

/** Starts the estimate form with the address already entered. */
export function openEstimate(prefill: Partial<EstimatePrefill> = {}): boolean {
  if (!document.getElementById(ESTIMATE_ANCHOR)) {
    estimateStore.stash(prefill);
    return false;
  }
  estimateStore.set(prefill);
  return jumpTo(ESTIMATE_ANCHOR);
}
