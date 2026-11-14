"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Plain placeholder block shown until a lazy widget has loaded. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("size-full rounded-lg border border-border bg-card", className)}
    />
  );
}

/**
 * Mounts its children shortly before they scroll into view (300px early).
 * Until then it shows a skeleton. `className` must reserve the widget's
 * height (a min-height or an aspect ratio) so nothing shifts when it loads.
 */
export function LazyMount({
  children,
  className,
  skeletonClassName,
}: {
  children: ReactNode;
  /** Sizing for the wrapper. It stays in place after the widget mounts. */
  className: string;
  skeletonClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("grid", className)}>
      {mounted ? children : <Skeleton className={skeletonClassName} />}
    </div>
  );
}
