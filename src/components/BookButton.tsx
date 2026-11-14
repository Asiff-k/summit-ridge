import type { ReactNode } from "react";

import {
  buttonClasses,
  textLinkClass,
  type ButtonVariant,
} from "@/components/button-styles";
import { BOOKING_ANCHOR } from "@/lib/prefill-store";
import { cn } from "@/lib/utils";

/**
 * Opens the booking widget, optionally with the service or address filled in.
 *
 * It renders a plain link to /#book with data attributes and has no JavaScript
 * of its own. One delegated click handler in SiteEffects.tsx picks up
 * [data-book] links and opens the widget in place when it is on the page.
 * Without JavaScript, or from a page with no widget, the link simply
 * navigates to the home page booking section.
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
  return (
    <a
      href={`/#${BOOKING_ANCHOR}`}
      data-book=""
      data-service={service}
      data-address={address}
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
