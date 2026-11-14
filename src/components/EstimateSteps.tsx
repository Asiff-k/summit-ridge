"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { BookButton } from "@/components/BookButton";
import { buttonClasses, choiceClass, inputClass } from "@/components/button-styles";
import { DrawnCheck } from "@/components/DrawnCheck";
import { Field, Honeypot, nameError, phoneError } from "@/components/form/Field";
import { Icon } from "@/components/Icon";
import type { Business } from "@/config/business";
import { cn } from "@/lib/utils";

type EstimateConfig = Business["estimateForm"];

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

/**
 * Steps 2 and 3 of the estimate form, and its success state. Loaded on demand
 * by EstimateForm.tsx, which owns the address, the step number, and the
 * progress bar.
 */
export function EstimateSteps({
  config,
  bookLabel,
  address,
  step,
  onStepChange,
  sent,
  onSent,
}: {
  config: EstimateConfig;
  bookLabel: string;
  address: string;
  step: number;
  onStepChange: (step: number) => void;
  sent: boolean;
  onSent: () => void;
}) {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const [problemKey, setProblemKey] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  const problem = config.problems.find((entry) => entry.key === problemKey);

  // Move focus to the new step's heading so keyboard and screen reader users
  // land in the right place.
  const stepHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    stepHeading.current?.focus({ preventScroll: true });
  }, [step, sent]);

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const photo = data.get("photo");
    const found = {
      name: nameError(name),
      phone: phoneError(phone),
      photo:
        photo instanceof File && photo.size > MAX_PHOTO_BYTES
          ? config.photoTooLarge
          : undefined,
    };
    setErrors(found);
    const firstInvalid = (["name", "phone", "photo"] as const).find(
      (field) => found[field],
    );
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    data.set("formType", "estimate");
    data.set("address", address);
    data.set("problem", problem?.label ?? "");
    data.set("service", problem?.service ?? "");
    if (photo instanceof File && photo.size === 0) data.delete("photo");

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("idle");
      onSent();
    } catch {
      setStatus("failed");
    }
  }

  if (sent) {
    return (
      <div role="status">
        <DrawnCheck />
        <h3 ref={stepHeading} tabIndex={-1} className="type-h3 mt-4">
          {config.successHeading}
        </h3>
        <p className="mt-2 text-muted-foreground">{config.successMessage}</p>
        <BookButton
          service={problem?.service}
          address={address}
          className="mt-6 w-full sm:w-auto"
        >
          {bookLabel}
        </BookButton>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="mt-6">
        <h3 ref={stepHeading} tabIndex={-1} className="font-semibold">
          {config.problemLegend}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {config.problems.map((entry) => (
            <button
              key={entry.key}
              type="button"
              aria-pressed={entry.key === problemKey}
              onClick={() => {
                setProblemKey(entry.key);
                onStepChange(3);
              }}
              className={cn(
                choiceClass,
                "flex min-h-28 flex-col items-center justify-center gap-3 p-3 text-center font-semibold",
              )}
            >
              <Icon name={entry.icon} className="size-8" />
              {entry.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onStepChange(1)}
          className={buttonClasses("outline", "mt-5")}
        >
          {config.back}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submitDetails} className="relative mt-6">
      <h3 ref={stepHeading} tabIndex={-1} className="sr-only">
        {config.steps[2]}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Name" error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id={fieldId("phone")} label="Phone" error={errors.phone}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            id={fieldId("photo")}
            label={config.photoLabel}
            optional
            hint={config.photoHint}
            error={errors.photo}
          >
            <input
              id={fieldId("photo")}
              name="photo"
              type="file"
              accept="image/*"
              aria-invalid={errors.photo ? true : undefined}
              aria-describedby={
                errors.photo ? `${fieldId("photo")}-error` : `${fieldId("photo")}-hint`
              }
              className={cn(
                inputClass,
                "h-auto py-2.5 file:mr-3 file:rounded-sm file:border file:border-foreground file:bg-transparent file:px-3 file:py-1 file:font-semibold",
              )}
            />
          </Field>
        </div>
      </div>

      <Honeypot />

      {status === "failed" ? (
        <p role="alert" className="mt-4 font-medium text-destructive">
          {config.errorMessage}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onStepChange(2)}
          className={buttonClasses("outline")}
        >
          {config.back}
        </button>
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses("cta")}
        >
          {status === "sending" ? config.submitting : config.submit}
        </button>
      </div>
    </form>
  );
}
