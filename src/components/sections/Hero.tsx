import Link from "next/link";
import { Phone } from "lucide-react";

import { business } from "@/config/business";

const buttonBase =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-base font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:w-auto";

const fadeUp = "animate-fade-up motion-reduce:animate-none";

export function Hero() {
  const { hero, cta, contact } = business;

  return (
    <section className="relative isolate flex min-h-svh items-center bg-charcoal text-on-dark">
      <div
        aria-hidden="true"
        className="bg-diagonal-lines absolute inset-0 -z-10"
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p
            className={`${fadeUp} text-[0.8125rem] leading-[1.4] font-semibold tracking-[0.08em] text-on-dark-muted uppercase`}
          >
            {hero.eyebrow}
          </p>

          <h1
            className={`${fadeUp} mt-4 text-[2.5rem] leading-[1.05] font-bold tracking-[0.01em] text-balance uppercase [animation-delay:60ms] lg:text-[4rem]`}
          >
            {hero.heading}
          </h1>

          <p
            className={`${fadeUp} mt-6 max-w-[60ch] text-lg leading-[1.6] text-on-dark-muted [animation-delay:120ms] lg:text-xl`}
          >
            {hero.subheading}
          </p>

          <div
            className={`${fadeUp} mt-10 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:gap-4`}
          >
            <Link
              href={cta.href}
              className={`${buttonBase} bg-cta text-cta-foreground hover:bg-cta-hover`}
            >
              {cta.primary}
            </Link>

            <a
              href={contact.phoneHref}
              className={`${buttonBase} border border-on-dark text-on-dark hover:bg-on-dark/10`}
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              <span>{cta.call}</span>
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
