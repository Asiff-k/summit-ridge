import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { buttonClasses, type ButtonVariant } from "@/components/button-styles";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";

export type { ButtonVariant };

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
  const classes = buttonClasses(variant, className);

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

/** Click-to-text button. Opens the visitor's SMS app. */
export function TextButton({
  variant = "outline",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
}) {
  const { cta, contact } = business;
  return (
    <ButtonLink href={contact.smsHref} variant={variant} className={className}>
      <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} />
      {cta.text}
    </ButtonLink>
  );
}

/** Click-to-text as a plain link, for use beside a phone number. */
export function TextLink({ className }: { className?: string }) {
  const { cta, contact } = business;
  return (
    <a
      href={contact.smsHref}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline",
        className,
      )}
    >
      <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} />
      {cta.text}
    </a>
  );
}

/** Call and text side by side: the pair shown wherever the phone number is a button. */
export function CallTextButtons({
  variant = "outline",
}: {
  variant?: ButtonVariant;
}) {
  return (
    <>
      <CallButton variant={variant} />
      <TextButton variant={variant} />
    </>
  );
}
