import { AiCallCard } from "@/components/AiCallCard";
import { BookingWidget } from "@/components/BookingWidget";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";
import { BOOKING_ANCHOR } from "@/lib/prefill-store";

/** Booking right after the hero, beside the AI receptionist demo call. */
export function BookingSection() {
  const { booking, aiCall, services } = business;

  return (
    <section
      id={BOOKING_ANCHOR}
      tabIndex={-1}
      className="section-y scroll-mt-20 outline-none"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={booking.eyebrow}
              heading={booking.heading}
              text={booking.text}
            />
          </Reveal>
          <div className="mt-8">
            <BookingWidget
              config={booking}
              services={services.map((service) => service.name)}
            />
          </div>
        </div>

        <div>
          <Reveal>
            <p className="type-eyebrow text-muted-foreground">{aiCall.eyebrow}</p>
            <h2 className="type-h3 mt-3">{aiCall.heading}</h2>
            <p className="mt-2 text-muted-foreground">{aiCall.text}</p>
          </Reveal>
          <div className="mt-8">
            <AiCallCard config={aiCall} />
          </div>
        </div>
      </div>
    </section>
  );
}
