import Link from "next/link";
import { Phone } from "lucide-react";
import type { ReactNode } from "react";

import { business } from "@/config/business";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-base leading-none font-semibold whitespace-nowrap transition-colors duration-150";

const variants = {
  /** Amber. Reserved for calls to action. */
  cta: "bg-cta text-cta-foreground hover:bg-cta-hover",
  /** Charcoal fill, for a second action on light backgrounds. */
  dark: "bg-primary text-primary-foreground hover:bg-primary/90",
  /** Charcoal outline on light backgrounds. */
  outline: "border border-foreground text-foreground hover:bg-foreground/5",
  /** Off-white outline on charcoal backgrounds. */
  "outline-on-dark": "border border-on-dark text-on-dark hover:bg-on-dark/10",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "cta",
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

/** Tap-to-call button showing the phone number. */
export function CallButton({
  variant = "outline",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
}) {
  const { cta, contact } = business;
  return (
    <ButtonLink href={contact.phoneHref} variant={variant} className={className}>
      <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
      <span>{cta.call}</span>
      <span className="tabular-nums">{contact.phoneDisplay}</span>
    </ButtonLink>
  );
}
