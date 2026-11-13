"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1200;

function format(value: number, suffix: string): string {
  return `${Math.round(value).toLocaleString("en-US")}${suffix}`;
}

/**
 * Counts up from zero to `value` the first time it scrolls into view. The
 * server renders the final number, so it is correct without JavaScript and
 * under reduced motion (where no counting happens at all).
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    element.textContent = format(0, suffix);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = format(value * eased, suffix);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = format(value, suffix);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {format(value, suffix)}
    </span>
  );
}
