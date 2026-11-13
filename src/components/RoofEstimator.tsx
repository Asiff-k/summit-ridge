"use client";

import { useId, useState } from "react";

import { BookButton } from "@/components/BookButton";
import { choiceClass } from "@/components/button-styles";
import type { Business } from "@/config/business";
import { cn } from "@/lib/utils";

type EstimatorConfig = Business["estimator"];

/**
 * Slider estimator. No satellite lookup: roof area is home size / stories x
 * roofFactor, priced per square foot by material. Every number comes from
 * business.ts so the owner can tune it.
 */
export function RoofEstimator({ config }: { config: EstimatorConfig }) {
  const uid = useId();
  const [size, setSize] = useState<number>(config.homeSize.default);
  const [storiesIndex, setStoriesIndex] = useState(0);
  const [materialKey, setMaterialKey] = useState<string>(config.defaultMaterial);

  const stories = config.stories[storiesIndex];
  const material =
    config.materials.find((entry) => entry.key === materialKey) ?? config.materials[0];

  const roofArea = (size / stories.count) * config.roofFactor;
  const round = (amount: number) =>
    Math.round(amount / config.roundTo) * config.roundTo;
  const low = round(roofArea * material.lowPerSqFt * stories.priceMultiplier);
  const high = round(roofArea * material.highPerSqFt * stories.priceMultiplier);
  const money = (amount: number) =>
    `${config.currency}${amount.toLocaleString("en-US")}`;

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 lg:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`${uid}-size`} className="font-semibold">
          {config.homeSize.label}
        </label>
        <output htmlFor={`${uid}-size`} className="font-semibold tabular-nums">
          {size.toLocaleString("en-US")} {config.homeSize.unit}
        </output>
      </div>
      <input
        id={`${uid}-size`}
        type="range"
        min={config.homeSize.min}
        max={config.homeSize.max}
        step={config.homeSize.step}
        value={size}
        onChange={(event) => setSize(Number(event.target.value))}
        className="mt-2 h-11 w-full cursor-pointer accent-primary"
      />

      <fieldset className="mt-5">
        <legend className="font-semibold">{config.storiesLabel}</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {config.stories.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              aria-pressed={index === storiesIndex}
              onClick={() => setStoriesIndex(index)}
              className={cn(choiceClass, "h-12 font-semibold tabular-nums")}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-semibold">{config.materialLabel}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {config.materials.map((entry) => (
            <button
              key={entry.key}
              type="button"
              aria-pressed={entry.key === materialKey}
              onClick={() => setMaterialKey(entry.key)}
              className={cn(choiceClass, "min-h-12 px-2 py-2 leading-tight font-semibold")}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-6 border-t border-border pt-6">
        <p className="type-small text-muted-foreground">{config.resultLabel}</p>
        <p className="mt-1 font-heading text-[2.5rem] leading-none font-bold tabular-nums lg:text-5xl">
          {money(low)} – {money(high)}
        </p>
        <p className="type-small mt-2 text-muted-foreground tabular-nums">
          {config.roofAreaLabel}: {Math.round(roofArea).toLocaleString("en-US")}{" "}
          {config.homeSize.unit}
        </p>
      </div>

      <BookButton service={config.service} className="mt-6 w-full sm:w-auto">
        {config.cta}
      </BookButton>
    </div>
  );
}
