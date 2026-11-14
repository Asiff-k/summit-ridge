import type { ReactNode } from "react";

/**
 * The scroll fade-up from DESIGN.md: 12px over 400ms, once, when the element
 * enters the viewport. This renders plain HTML with no JavaScript of its own.
 * One observer in SiteEffects.tsx flips data-reveal to "shown"; the styles
 * live in globals.css and are skipped for reduced motion and when scripting
 * is off.
 *
 * `index` staggers siblings by 60ms, capped at four steps.
 */
export function Reveal({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      data-reveal="pending"
      // SiteEffects changes data-reveal outside React, sometimes before this
      // part of the page has hydrated.
      suppressHydrationWarning
      style={index > 0 ? { transitionDelay: `${Math.min(index, 3) * 60}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
