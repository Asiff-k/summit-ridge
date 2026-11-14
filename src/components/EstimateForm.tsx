"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { buttonClasses, inputClass } from "@/components/button-styles";
import { Field, addressError } from "@/components/form/Field";
import type { Business } from "@/config/business";
import { estimateStore } from "@/lib/prefill-store";
import { fill } from "@/lib/template";

type EstimateConfig = Business["estimateForm"];

const TOTAL_STEPS = 3;

/** Steps 2 and 3 live in their own chunk, fetched when the visitor gets there. */
const loadSteps = () => import("@/components/EstimateSteps");
const EstimateSteps = dynamic(
  () => loadSteps().then((module) => module.EstimateSteps),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="mt-6 min-h-72" />,
  },
);

type Props = { config: EstimateConfig; bookLabel: string };

/**
 * Three-step estimate request: address, problem type, then contact details
 * (asked for last) with an optional photo. Posts to /api/contact.
 *
 * Step 1 is server-rendered and light. The rest loads on demand.
 */
export function EstimateForm(props: Props) {
  const prefill = useSyncExternalStore(
    estimateStore.subscribe,
    estimateStore.getSnapshot,
    estimateStore.getServerSnapshot,
  );

  // An address from the hero card remounts the form on step 2.
  return (
    <EstimateFlow
      key={prefill.nonce}
      {...props}
      initialAddress={prefill.data.address}
    />
  );
}

function EstimateFlow({
  config,
  bookLabel,
  initialAddress,
}: Props & { initialAddress?: string }) {
  const uid = useId();
  const addressId = `${uid}-address`;

  const startsWithAddress = Boolean(initialAddress && !addressError(initialAddress));
  const [step, setStep] = useState(startsWithAddress ? 2 : 1);
  const [address, setAddress] = useState(initialAddress ?? "");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  // Returning to step 1 puts focus back on the address field.
  const addressInput = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (step === 1) addressInput.current?.focus({ preventScroll: true });
  }, [step]);

  function submitAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = addressError(address);
    setError(found);
    if (found) {
      addressInput.current?.focus();
      return;
    }
    setStep(2);
  }

  const stepLabel = fill(config.stepLabel, { current: step, total: TOTAL_STEPS });

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 lg:p-8">
      {sent ? null : (
        <>
          <div className="flex items-baseline justify-between gap-4">
            <p className="type-small font-semibold">{stepLabel}</p>
            <p className="type-small text-muted-foreground">
              {config.steps[step - 1]}
            </p>
          </div>
          <div
            role="progressbar"
            aria-label={stepLabel}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-valuenow={step}
            className="mt-2 h-2 overflow-hidden rounded-sm bg-border"
          >
            <div
              className="h-full bg-primary"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </>
      )}

      {step === 1 ? (
        <form noValidate onSubmit={submitAddress} className="mt-6">
          <Field id={addressId} label={config.addressLabel} error={error}>
            <input
              ref={addressInput}
              id={addressId}
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder={config.addressPlaceholder}
              value={address}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${addressId}-error` : undefined}
              // Start fetching the next steps as soon as the visitor engages.
              onFocus={() => void loadSteps()}
              onChange={(event) => {
                setAddress(event.target.value);
                if (error) setError(undefined);
              }}
              className={inputClass}
            />
          </Field>
          <button
            type="submit"
            className={buttonClasses("cta", "mt-5 w-full sm:w-auto")}
          >
            {config.next}
          </button>
        </form>
      ) : (
        <EstimateSteps
          config={config}
          bookLabel={bookLabel}
          address={address}
          step={step}
          onStepChange={setStep}
          sent={sent}
          onSent={() => setSent(true)}
        />
      )}
    </div>
  );
}
