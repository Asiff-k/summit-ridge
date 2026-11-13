"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The single scroll motion from DESIGN.md: fade up 12px over 400ms, once,
 * when the element enters the viewport. The styles live in globals.css under
 * [data-reveal] and are skipped for reduced motion and when scripting is off.
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
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "shown" : "pending"}
      style={{ transitionDelay: `${Math.min(index, 3) * 60}ms` }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
