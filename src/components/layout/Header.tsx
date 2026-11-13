import Link from "next/link";
import { CloudLightning, Headset, Phone } from "lucide-react";

import { BookButton } from "@/components/BookButton";
import { TextLink } from "@/components/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { StickyHeader } from "@/components/layout/StickyHeader";
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

/** Owner-editable storm banner. Renders nothing unless stormAlert.active is true. */
function StormAlert() {
  const { stormAlert } = business;
  if (!stormAlert.active) return null;

  return (
    <div role="region" aria-label={stormAlert.demoLabel} className="on-dark-section">
      <div className="container-site flex flex-col gap-x-5 gap-y-1 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-small flex items-start gap-3">
          <CloudLightning aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          <span>
            <span className="type-eyebrow mr-2 border border-on-dark/40 px-1.5 py-0.5 text-on-dark-muted">
              {stormAlert.demoLabel}
            </span>
            {stormAlert.message}
          </span>
        </p>
        <BookButton
          variant="link"
          service={stormAlert.service}
          className="type-small shrink-0 pl-7 whitespace-nowrap sm:pl-0"
        >
          {stormAlert.cta}
        </BookButton>
      </div>
    </div>
  );
}

export function Header() {
  const { nav, cta, contact, ai, utilityBar } = business;

  return (
    <>
      <StormAlert />

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

      <StickyHeader>
        <div className="container-site relative flex h-16 items-center justify-between gap-4 transition-[height] duration-200 group-data-[scrolled=true]/header:h-14 xl:h-20 xl:group-data-[scrolled=true]/header:h-16">
          <Logo />

          <nav aria-label="Main" className="hidden xl:block">
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

          <div className="hidden items-center gap-5 xl:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 font-semibold tabular-nums underline-offset-4 hover:underline"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {contact.phoneDisplay}
            </a>
            <TextLink />
            <BookButton>{cta.inspection}</BookButton>
          </div>

          <MobileMenu
            nav={nav}
            phoneHref={contact.phoneHref}
            phoneDisplay={contact.phoneDisplay}
            smsHref={contact.smsHref}
            callLabel={cta.call}
            textLabel={cta.text}
            ctaLabel={cta.inspection}
          />
        </div>
      </StickyHeader>
    </>
  );
}
