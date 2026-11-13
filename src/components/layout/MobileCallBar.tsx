import { Phone } from "lucide-react";

import { ButtonLink } from "@/components/ButtonLink";
import { business } from "@/config/business";

/** Fixed bar on small screens: call and free inspection, always in reach. */
export function MobileCallBar() {
  const { cta, contact } = business;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-card md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <ButtonLink href={contact.phoneHref} variant="dark" className="px-3">
          <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {cta.callShort}
        </ButtonLink>
        <ButtonLink href={cta.href} className="px-3">
          {cta.inspection}
        </ButtonLink>
      </div>
    </div>
  );
}
