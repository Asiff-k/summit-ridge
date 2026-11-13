"use client";

import { useState, type FormEvent } from "react";

import { buttonClasses, inputClass } from "@/components/button-styles";
import { Field, addressError } from "@/components/form/Field";
import type { Business } from "@/config/business";
import { ESTIMATE_ANCHOR, openEstimate } from "@/lib/prefill-store";

/** Hero card: an address field that starts the estimate form further down. */
export function HeroEstimateCard({
  config,
}: {
  config: Business["hero"]["estimateCard"];
}) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = addressError(address);
    setError(found);
    if (found) {
      document.getElementById("hero-address")?.focus();
      return;
    }
    openEstimate({ address: address.trim() });
  }

  return (
    <form
      noValidate
      action={`#${ESTIMATE_ANCHOR}`}
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-6 text-foreground shadow-card lg:p-8"
    >
      <h2 className="type-h3">{config.heading}</h2>
      <p className="mt-2 text-muted-foreground">{config.text}</p>

      <div className="mt-5">
        <Field id="hero-address" label={config.addressLabel} error={error}>
          <input
            id="hero-address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder={config.addressPlaceholder}
            value={address}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "hero-address-error" : undefined}
            onChange={(event) => {
              setAddress(event.target.value);
              if (error) setError(undefined);
            }}
            className={inputClass}
          />
        </Field>
      </div>

      <button type="submit" className={buttonClasses("cta", "mt-4 w-full")}>
        {config.submit}
      </button>
      <p className="type-small mt-3 text-muted-foreground">{config.note}</p>
    </form>
  );
}
