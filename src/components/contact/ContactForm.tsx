"use client";

import { CircleCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { inputClass } from "@/components/button-styles";
import { Field, Honeypot, honeypotValue } from "@/components/form/Field";

type FieldName =
  | "name"
  | "phone"
  | "email"
  | "address"
  | "service"
  | "message"
  | "preferredTime";

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = {
  name: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  message: "",
  preferredTime: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) {
    errors.phone = "Please enter a 10-digit phone number.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Please choose a service.";
  }

  if (values.message.length > 2000) {
    errors.message = "Please keep your message under 2,000 characters.";
  }

  return errors;
}

export function ContactForm({
  services,
  preferredTimes,
  submitLabel,
  submittingLabel,
  successHeading,
  successMessage,
  errorMessage,
}: {
  services: readonly string[];
  preferredTimes: readonly string[];
  submitLabel: string;
  submittingLabel: string;
  successHeading: string;
  successMessage: string;
  errorMessage: string;
}) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const update = (name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const checkField = (name: FieldName) => {
    const message = validate(values)[name];
    setErrors((current) => ({ ...current, [name]: message }));
  };

  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onBlur: () => checkField(name),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formType: "contact",
          company: honeypotValue(event.currentTarget),
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-card p-6 lg:p-8"
      >
        <CircleCheck aria-hidden="true" className="size-8" strokeWidth={1.5} />
        <h2 className="type-h3 mt-4">{successHeading}</h2>
        <p className="mt-2 text-muted-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative rounded-lg border border-border bg-card p-6 lg:p-8"
    >
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="address" label="Property address" optional error={errors.address}>
          <input
            {...fieldProps("address")}
            type="text"
            autoComplete="street-address"
            onChange={(event) => update("address", event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="service" label="Service needed" error={errors.service}>
          <select
            {...fieldProps("service")}
            required
            onChange={(event) => update("service", event.target.value)}
            className={inputClass}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
            <option value="Not sure">Not sure</option>
          </select>
        </Field>

        <Field
          id="preferredTime"
          label="Best time to call"
          optional
          error={errors.preferredTime}
        >
          <select
            {...fieldProps("preferredTime")}
            onChange={(event) => update("preferredTime", event.target.value)}
            className={inputClass}
          >
            <option value="">No preference</option>
            {preferredTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label="Message" optional error={errors.message}>
            <textarea
              {...fieldProps("message")}
              rows={5}
              onChange={(event) => update("message", event.target.value)}
              className={`${inputClass} h-auto py-3`}
            />
          </Field>
        </div>
      </div>

      {status === "failed" ? (
        <p role="alert" className="mt-5 font-medium text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-cta px-6 text-base font-semibold text-cta-foreground transition-colors duration-150 hover:bg-cta-hover disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
