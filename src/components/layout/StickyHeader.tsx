"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const SCROLL_THRESHOLD_PX = 24;

function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

/**
 * Sticky header shell. After a little scrolling it sets data-scrolled, which
 * the header uses to shrink slightly and gain its shadow (DESIGN.md, Motion).
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > SCROLL_THRESHOLD_PX,
    () => false,
  );

  return (
    <header
      data-scrolled={scrolled}
      className="group/header sticky top-0 z-40 border-b border-border bg-background transition-shadow duration-200 data-[scrolled=true]:shadow-card"
    >
      {children}
    </header>
  );
}
