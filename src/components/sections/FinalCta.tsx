import { CallTextButtons } from "@/components/ButtonLink";
import { LazyBookingWidget } from "@/components/lazy/widgets";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";
import { BOOKING_ANCHOR } from "@/lib/prefill-store";

/**
 * Closing band: the booking widget itself, not a link to another page.
 * `anchor` is the element id. Pages without the hero-area booking section use
 * the default, so "Book" buttons land here; the home page passes another id.
 */
export function FinalCta({ anchor = BOOKING_ANCHOR }: { anchor?: string }) {
  const { finalCta, booking, services } = business;

  return (
    <section id={anchor} tabIndex={-1} className="section-y scroll-mt-20 outline-none">
      <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={finalCta.eyebrow}
            heading={finalCta.heading}
            text={finalCta.text}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <CallTextButtons />
          </div>
        </Reveal>

        <LazyBookingWidget
          config={booking}
          services={services.map((service) => service.name)}
        />
      </div>
    </section>
  );
}
