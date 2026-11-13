"use client";

import Image from "next/image";
import { useState } from "react";

import type { ImageAsset } from "@/config/business";

/**
 * Before/after comparison. A native range input covers the photo, so dragging,
 * touch, and the arrow keys all work without custom pointer code.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  sizes,
}: {
  before: ImageAsset;
  after: ImageAsset;
  beforeLabel: string;
  afterLabel: string;
  /** Accessible name for the slider, e.g. the project name. */
  label: string;
  sizes: string;
}) {
  const [position, setPosition] = useState(50);

  const tagClass =
    "type-small pointer-events-none absolute top-3 rounded-sm bg-charcoal/85 px-2 py-1 font-semibold text-on-dark";

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg select-none">
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" />
      </div>

      <span className={`${tagClass} left-3`}>{beforeLabel}</span>
      <span className={`${tagClass} right-3`}>{afterLabel}</span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        aria-label={`${beforeLabel} / ${afterLabel}: ${label}`}
        aria-valuetext={`${position}% ${beforeLabel}`}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="peer absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />

      {/* Visible handle. It follows the hidden range input above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-surface peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-cta"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-1/2 items-center justify-center rounded-full border border-charcoal/20 bg-surface text-charcoal shadow-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
