"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

type NavItem = { label: string; href: string };

/** Phone button and hamburger menu shown below the lg breakpoint. */
export function MobileMenu({
  nav,
  phoneHref,
  phoneDisplay,
  callLabel,
  ctaLabel,
  ctaHref,
}: {
  nav: readonly NavItem[];
  phoneHref: string;
  phoneDisplay: string;
  callLabel: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div
      className="flex items-center gap-1 lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <a
        href={phoneHref}
        aria-label={`${callLabel} ${phoneDisplay}`}
        className="inline-flex size-11 items-center justify-center rounded-md hover:bg-foreground/5"
      >
        <Phone aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </a>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-md px-2 font-semibold hover:bg-foreground/5"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
        )}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-border bg-background shadow-card"
        >
          <nav aria-label="Main" className="container-site py-4">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={phoneHref}
                onClick={close}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground px-6 font-semibold"
              >
                <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
                <span>{callLabel}</span>
                <span className="tabular-nums">{phoneDisplay}</span>
              </a>
              <Link
                href={ctaHref}
                onClick={close}
                className="inline-flex h-12 items-center justify-center rounded-md bg-cta px-6 font-semibold text-cta-foreground hover:bg-cta-hover"
              >
                {ctaLabel}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
