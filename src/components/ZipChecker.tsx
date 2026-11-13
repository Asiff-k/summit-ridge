"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useState, type FormEvent } from "react";

import { BookButton } from "@/components/BookButton";
import { buttonClasses, inputClass } from "@/components/button-styles";
import type { Business } from "@/config/business";
import { fill } from "@/lib/template";

type CoverageConfig = Business["coverage"];

type Result = { zip: string; covered: boolean };

/** Answers "do you cover my ZIP?" from the list in business.ts, then offers booking. */
export function ZipChecker({ config }: { config: CoverageConfig }) {
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = zip.trim();
    if (!/^\d{5}$/.test(value)) {
      setError(config.invalid);
      setResult(null);
      return;
    }
    setError(undefined);
    setResult({
      zip: value,
      covered: (config.zips as readonly string[]).includes(value),
    });
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="zip-check" className="type-h3 block">
          {config.heading}
        </label>
        <div className="mt-4 flex gap-3">
          <input
            id="zip-check"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder={config.placeholder}
            aria-label={config.label}
            value={zip}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "zip-check-error" : undefined}
            onChange={(event) => {
              setZip(event.target.value.replace(/\D/g, ""));
              if (error) setError(undefined);
            }}
            className={`${inputClass} max-w-40 tabular-nums`}
          />
          <button type="submit" className={buttonClasses("dark")}>
            {config.submit}
          </button>
        </div>
        {error ? (
          <p id="zip-check-error" className="type-small mt-2 font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </form>

      <div aria-live="polite">
        {result ? (
          <div className="mt-5 border-t border-border pt-5">
            <p className="flex items-center gap-2 text-lg font-semibold">
              {result.covered ? (
                <CircleCheck aria-hidden="true" className="size-6 shrink-0" strokeWidth={1.5} />
              ) : (
                <CircleX aria-hidden="true" className="size-6 shrink-0" strokeWidth={1.5} />
              )}
              {fill(result.covered ? config.yes : config.no, { zip: result.zip })}
            </p>
            <p className="mt-1 text-muted-foreground">
              {result.covered ? config.yesText : config.noText}
            </p>
            {result.covered ? (
              <BookButton address={result.zip} className="mt-4 w-full sm:w-auto">
                {config.cta}
              </BookButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
