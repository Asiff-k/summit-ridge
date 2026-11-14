import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { TextLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/PageHero";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  ...business.seo.pages.contact,
});

export default function ContactPage() {
  const { contactPage, contact, address, hours, services } = business;

  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        lead={contactPage.lead}
      />

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <h2 className="type-h2">{contactPage.formHeading}</h2>
            <div className="mt-8">
              <ContactForm
                services={services.map((service) => service.name)}
                preferredTimes={contactPage.preferredTimes}
                submitLabel={contactPage.submitLabel}
                submittingLabel={contactPage.submittingLabel}
                successHeading={contactPage.successHeading}
                successMessage={contactPage.successMessage}
                errorMessage={contactPage.errorMessage}
              />
            </div>
          </div>

          <aside>
            <h2 className="type-h3">{contactPage.detailsHeading}</h2>
            <address className="mt-4 space-y-1 not-italic">
              <a
                href={contact.phoneHref}
                className="flex min-h-11 items-center gap-3 text-lg font-semibold tabular-nums underline-offset-4 hover:underline"
              >
                <Phone aria-hidden="true" className="size-5" strokeWidth={1.5} />
                {contact.phoneDisplay}
              </a>
              <TextLink className="pl-8" />
              <a
                href={contact.emailHref}
                className="flex min-h-11 items-center gap-3 wrap-anywhere underline-offset-4 hover:underline"
              >
                <Mail aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
                {contact.email}
              </a>
              <p className="flex gap-3 pt-2">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" strokeWidth={1.5} />
                <span>
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </p>
            </address>

            <h2 className="type-h3 mt-10">{business.hoursHeading}</h2>
            <dl className="mt-4 border-t border-border">
              {hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex justify-between gap-4 border-b border-border py-3"
                >
                  <dt>{entry.days}</dt>
                  <dd className="text-right text-muted-foreground tabular-nums">
                    {entry.hours}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="type-small mt-4 text-muted-foreground">
              {business.emergencyNote}
            </p>

            {/*
              MAP EMBED PLACEHOLDER
              Replace this box with the map iframe for the client's address.
            */}
            <div
              data-placeholder="map-embed"
              className="mt-10 flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-foreground/40 bg-card text-center text-muted-foreground"
            >
              <MapPin aria-hidden="true" className="size-7" strokeWidth={1.5} />
              <p className="type-small">{contactPage.mapPlaceholder}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
