import type { ReactNode } from "react";

/** Label above the control, plain-words error below it. */
export function Field({
  id,
  label,
  optional = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
        {optional ? (
          <span className="type-small ml-2 font-normal text-muted-foreground">
            Optional
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="type-small mt-2 text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="type-small mt-2 font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot spam trap. Hidden from sighted visitors and assistive technology;
 * bots that fill every field give themselves away. The server rejects any
 * submission where `company` is not empty.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** Reads the honeypot value from a submitted form. */
export function honeypotValue(form: HTMLFormElement): string {
  const value = new FormData(form).get("company");
  return typeof value === "string" ? value : "";
}

/** Shared validators, so every form applies the same rules. */
export function phoneError(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  return digits.length < 10 || digits.length > 11
    ? "Please enter a 10-digit phone number."
    : undefined;
}

export function nameError(name: string): string | undefined {
  return name.trim().length < 2 ? "Please enter your name." : undefined;
}

export function addressError(address: string): string | undefined {
  return address.trim().length < 5
    ? "Please enter the property address."
    : undefined;
}
