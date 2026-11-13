import { CalendarCheck, MessageSquare, Phone } from "lucide-react";

import { BookButton } from "@/components/BookButton";
import { ButtonLink } from "@/components/ButtonLink";
import { business } from "@/config/business";

/** Fixed bar on small screens: call, text, and book, always in reach. */
export function MobileCallBar() {
  const { cta, contact } = business;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-card md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <ButtonLink href={contact.phoneHref} variant="dark" className="px-2">
          <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {cta.callShort}
        </ButtonLink>
        <ButtonLink href={contact.smsHref} variant="outline" className="px-2">
          <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {cta.textShort}
        </ButtonLink>
        <BookButton className="px-2">
          <CalendarCheck aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {cta.book}
        </BookButton>
      </div>
    </div>
  );
}
