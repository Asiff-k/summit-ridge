"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { buttonClasses, choiceClass, inputClass } from "@/components/button-styles";
import { DrawnCheck } from "@/components/DrawnCheck";
import {
  Field,
  Honeypot,
  addressError,
  honeypotValue,
  nameError,
  phoneError,
} from "@/components/form/Field";
import type { Business } from "@/config/business";
import { fetchDays, fetchSlots, submitBooking } from "@/lib/booking/client";
import type {
  BookingConfirmation,
  BookingDay,
  BookingSlot,
} from "@/lib/booking/types";
import { bookingStore } from "@/lib/prefill-store";
import { fill } from "@/lib/template";
import { cn } from "@/lib/utils";

type BookingConfig = Business["booking"];

type Props = {
  config: BookingConfig;
  /** Service names for the dropdown. */
  services: readonly string[];
  className?: string;
};

/**
 * Inline inspection booking: pick a day, pick a time, enter details, confirm.
 * All data comes through src/lib/booking/client.ts, so the backend can change
 * (mock today, Supabase later) without touching this component.
 */
export function BookingWidget(props: Props) {
  const prefill = useSyncExternalStore(
    bookingStore.subscribe,
    bookingStore.getSnapshot,
    bookingStore.getServerSnapshot,
  );

  // A new prefill (for example "Book this" on a service card) remounts the
  // flow with that service or address already filled in.
  return (
    <BookingFlow
      key={prefill.nonce}
      {...props}
      initialService={prefill.data.service}
      initialAddress={prefill.data.address}
    />
  );
}

type Details = { service: string; name: string; phone: string; address: string };
type DetailErrors = Partial<Record<keyof Details, string>>;

function validate(details: Details): DetailErrors {
  return {
    name: nameError(details.name),
    phone: phoneError(details.phone),
    address: addressError(details.address),
  };
}

function BookingFlow({
  config,
  services,
  className,
  initialService,
  initialAddress,
}: Props & { initialService?: string; initialAddress?: string }) {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const [days, setDays] = useState<BookingDay[] | "error" | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<BookingSlot[] | "error" | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({
    service:
      initialService && services.includes(initialService)
        ? initialService
        : config.defaultService,
    name: "",
    phone: "",
    address: initialAddress ?? "",
  });
  const [errors, setErrors] = useState<DetailErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "taken" | "failed">("idle");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Guards against a slow slots response arriving after another day was picked.
  const latestDate = useRef<string | null>(null);

  function loadSlots(nextDate: string) {
    latestDate.current = nextDate;
    setDate(nextDate);
    setTime(null);
    setSlots(null);
    fetchSlots(nextDate)
      .then((result) => {
        if (latestDate.current === nextDate) setSlots(result);
      })
      .catch(() => {
        if (latestDate.current === nextDate) setSlots("error");
      });
  }

  useEffect(() => {
    let cancelled = false;
    fetchDays()
      .then((result) => {
        if (cancelled) return;
        setDays(result);
        // Start on the first open day so times are visible straight away.
        const firstOpen = result.find((day) => day.open);
        if (firstOpen) loadSlots(firstOpen.date);
      })
      .catch(() => {
        if (!cancelled) setDays("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (name: keyof Details, value: string) => {
    setDetails((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const inputProps = (name: keyof Details) => ({
    id: fieldId(name),
    name,
    value: details[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !time) return;

    const found = validate(details);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Details)[]).find(
      (name) => found[name],
    );
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("sending");
    const result = await submitBooking({
      date,
      time,
      ...details,
      company: honeypotValue(event.currentTarget),
    });

    if (result.ok) {
      setConfirmation(result.confirmation);
      setStatus("idle");
      return;
    }
    if (result.reason === "slot_taken") {
      setStatus("taken");
      loadSlots(date);
      return;
    }
    setStatus("failed");
  }

  function reset() {
    setConfirmation(null);
    setTime(null);
    setStatus("idle");
    if (date) loadSlots(date);
  }

  const cardClass = cn(
    "rounded-lg border border-border bg-card p-5 text-foreground sm:p-6",
    className,
  );

  if (confirmation) {
    return (
      <div role="status" className={cardClass}>
        <DrawnCheck />
        <h3 className="type-h3 mt-4">
          {fill(config.confirmedHeading, {
            day: confirmation.dayName,
            time: confirmation.timeLabel,
          })}
        </h3>
        <p className="mt-2 text-muted-foreground">{config.confirmedText}</p>
        <dl className="mt-5 grid gap-2 border-t border-border pt-5">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{details.service}</dt>
            <dd className="font-semibold tabular-nums">
              {confirmation.dateLabel}, {confirmation.timeLabel}
            </dd>
          </div>
        </dl>
        <p className="type-small mt-5 text-muted-foreground">{config.demoNote}</p>
        <button
          type="button"
          onClick={reset}
          className={buttonClasses("outline", "mt-5 w-full sm:w-auto")}
        >
          {config.bookAnother}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn(cardClass, "relative")}>
      <fieldset>
        <legend className="font-semibold">{config.dayLegend}</legend>
        {days === null ? (
          <p className="mt-3 text-muted-foreground">{config.loadingDays}</p>
        ) : days === "error" ? (
          <p role="alert" className="mt-3 font-medium text-destructive">
            {config.loadError}
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                disabled={!day.open}
                aria-pressed={day.date === date}
                onClick={() => loadSlots(day.date)}
                className={cn(choiceClass, "flex min-h-14 flex-col items-center justify-center px-1 py-2 leading-tight")}
              >
                <span className="type-small font-semibold">{day.weekday}</span>
                <span className="type-small tabular-nums">
                  {day.open ? day.label : config.closedLabel}
                </span>
              </button>
            ))}
          </div>
        )}
      </fieldset>

      {date ? (
        <fieldset className="mt-6">
          <legend className="font-semibold">{config.slotLegend}</legend>
          {slots === null ? (
            <p className="mt-3 text-muted-foreground">{config.loadingSlots}</p>
          ) : slots === "error" ? (
            <p role="alert" className="mt-3 font-medium text-destructive">
              {config.loadError}
            </p>
          ) : slots.some((slot) => slot.available) ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  aria-pressed={slot.time === time}
                  onClick={() => {
                    setTime(slot.time);
                    if (status === "taken") setStatus("idle");
                  }}
                  className={cn(
                    choiceClass,
                    "h-12 px-1 text-[0.9375rem] font-medium tabular-nums disabled:line-through",
                  )}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-muted-foreground">{config.noSlots}</p>
          )}
          {status === "taken" ? (
            <p role="alert" className="mt-3 font-medium text-destructive">
              {config.slotTakenError}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {date && time ? (
        <fieldset className="mt-6">
          <legend className="font-semibold">{config.detailsLegend}</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field id={fieldId("name")} label="Name" error={errors.name}>
              <input
                {...inputProps("name")}
                type="text"
                autoComplete="name"
                required
                onChange={(event) => update("name", event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field id={fieldId("phone")} label="Phone" error={errors.phone}>
              <input
                {...inputProps("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                onChange={(event) => update("phone", event.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id={fieldId("address")}
                label={config.addressLabel}
                error={errors.address}
              >
                <input
                  {...inputProps("address")}
                  type="text"
                  autoComplete="street-address"
                  required
                  onChange={(event) => update("address", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id={fieldId("service")} label={config.serviceLabel}>
                <select
                  {...inputProps("service")}
                  onChange={(event) => update("service", event.target.value)}
                  className={inputClass}
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <Honeypot />

          {status === "failed" ? (
            <p role="alert" className="mt-4 font-medium text-destructive">
              {config.submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className={buttonClasses("cta", "mt-5 w-full")}
          >
            {status === "sending" ? config.confirming : config.confirm}
          </button>
        </fieldset>
      ) : null}
    </form>
  );
}
