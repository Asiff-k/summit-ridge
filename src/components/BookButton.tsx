"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  buttonClasses,
  textLinkClass,
  type ButtonVariant,
} from "@/components/button-styles";
import { BOOKING_ANCHOR, openBooking } from "@/lib/prefill-store";
import { cn } from "@/lib/utils";

/**
 * Opens the booking widget, optionally with the service or address filled in.
 * It is a real link to /#book, so it still works without JavaScript and from
 * pages that have no widget of their own.
 */
export function BookButton({
  service,
  address,
  variant = "cta",
  className,
  children,
}: {
  service?: string;
  address?: string;
  variant?: ButtonVariant | "link";
  className?: string;
  children: ReactNode;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const prefill = {
      ...(service ? { service } : {}),
      ...(address ? { address } : {}),
    };
    // If the widget is on this page, jump to it. Otherwise fall through to
    // the link, and the stashed prefill is picked up on the home page.
    if (openBooking(prefill)) event.preventDefault();
  }

  return (
    <a
      href={`/#${BOOKING_ANCHOR}`}
      onClick={handleClick}
      className={
        variant === "link"
          ? cn(textLinkClass, className)
          : buttonClasses(variant, className)
      }
    >
      {children}
    </a>
  );
}
