import Link from "next/link";
import { Headset, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { business } from "@/config/business";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={business.name}
      className="inline-flex flex-col leading-none"
    >
      <span className="font-heading text-2xl leading-none font-bold tracking-[0.01em] uppercase">
        {business.logo.primary}
      </span>
      <span
        className={`type-eyebrow mt-1 ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}
      >
        {business.logo.secondary}
      </span>
    </Link>
  );
}

export function Header() {
  const { nav, cta, contact, ai, utilityBar } = business;

  return (
    <>
      {/* Utility bar. Scrolls away; the header below it sticks. */}
      <div className="border-b border-border bg-card">
        <div className="container-site flex min-h-11 items-center justify-center gap-6 sm:justify-between">
          <p className="type-small hidden text-muted-foreground sm:block">
            {utilityBar.note}
          </p>
          {/*
            AI RECEPTIONIST PLACEHOLDER
            Not wired up yet. For now this dials the main office line.
            Replace the href (or attach a click handler) when Vapi is connected.
          */}
          <a
            href={contact.phoneHref}
            data-placeholder="ai-receptionist"
            className="type-small inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            <Headset aria-hidden="true" className="size-4" strokeWidth={1.5} />
            {ai.receptionistLabel}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background shadow-card">
        <div className="container-site relative flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center font-medium underline-offset-8 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 font-semibold tabular-nums underline-offset-4 hover:underline"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {contact.phoneDisplay}
            </a>
            <ButtonLink href={cta.href}>{cta.inspection}</ButtonLink>
          </div>

          <MobileMenu
            nav={nav}
            phoneHref={contact.phoneHref}
            phoneDisplay={contact.phoneDisplay}
            callLabel={cta.call}
            ctaLabel={cta.inspection}
            ctaHref={cta.href}
          />
        </div>
      </header>
    </>
  );
}
