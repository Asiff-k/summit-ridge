"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { openBooking } from "@/lib/prefill-store";

const COUNT_DURATION_MS = 1200;

function countUp(element: HTMLElement) {
  const target = Number(element.dataset.countTo);
  const suffix = element.dataset.countSuffix ?? "";
  if (!Number.isFinite(target)) return;

  const format = (value: number) =>
    `${Math.round(value).toLocaleString("en-US")}${suffix}`;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = format(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * The site's only always-on client code. It renders nothing and replaces what
 * used to be dozens of small client components:
 *
 * - one IntersectionObserver drives every scroll fade-up ([data-reveal]) and
 *   every count-up number ([data-count-to]);
 * - one click listener makes every booking link ([data-book]) open the
 *   booking widget in place.
 *
 * No animation library is involved.
 */
export function SiteEffects() {
  const pathname = usePathname();

  // Scroll effects. Re-scans after each navigation, when new markup arrives.
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          if (element.dataset.reveal) element.dataset.reveal = "shown";
          if (element.dataset.countTo && !reducedMotion) countUp(element);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>('[data-reveal="pending"], [data-count-to]')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  // Booking links.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-book]",
      );
      if (!link) return;

      const { service, address } = link.dataset;
      const opened = openBooking({
        ...(service ? { service } : {}),
        ...(address ? { address } : {}),
      });
      // When the widget is on this page we jump to it. Otherwise the link
      // navigates to /#book and the stashed prefill is picked up there.
      if (opened) event.preventDefault();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
