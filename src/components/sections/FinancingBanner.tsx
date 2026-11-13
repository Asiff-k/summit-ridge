import { BookButton } from "@/components/BookButton";
import { business } from "@/config/business";

/** Financing teaser. The amount is an example and is labelled as one. */
export function FinancingBanner() {
  const { financing } = business;
  if (!financing.active) return null;

  return (
    <section className="border-b border-border">
      <div className="container-site flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="type-eyebrow border border-foreground/40 px-2 py-1 text-muted-foreground">
              {financing.exampleLabel}
            </span>
            <span className="text-lg font-semibold">{financing.lead}</span>
            <span className="font-heading text-4xl leading-none font-bold tabular-nums">
              {financing.amount}
              <span className="text-2xl">{financing.period}</span>
            </span>
          </p>
          <p className="type-small mt-2 text-muted-foreground">{financing.note}</p>
        </div>
        <BookButton
          variant="outline"
          service={financing.service}
          className="w-full shrink-0 md:w-auto"
        >
          {financing.cta}
        </BookButton>
      </div>
    </section>
  );
}
