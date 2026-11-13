import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BookButton } from "@/components/BookButton";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business, type Service } from "@/config/business";

export function ServiceCards() {
  const services: readonly Service[] = business.services;
  const { cta } = business;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <li key={service.slug}>
          <Reveal index={index % 3} className="h-full">
            {/* The one hover lift in DESIGN.md: 4px up, with the card shadow. */}
            <article className="relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-[translate,box-shadow] duration-150 focus-within:shadow-card hover:-translate-y-1 hover:shadow-card motion-reduce:hover:translate-y-0">
              <Icon name={service.icon} />
              <h3 className="type-h3 mt-5">{service.name}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">
                {service.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                {/* The stretched ::after makes the whole card open the service page. */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 after:absolute after:inset-0 after:rounded-lg"
                >
                  {cta.learnMore}
                  <span className="sr-only">
                    {" "}
                    {cta.learnMoreJoin} {service.name}
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </Link>
                <BookButton
                  variant="outline"
                  service={service.name}
                  className="relative z-10 h-11 px-4"
                >
                  <span>{cta.bookThis}</span>
                  <span className="sr-only">: {service.name}</span>
                </BookButton>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function ServicesGrid() {
  const { servicesSection } = business;

  return (
    <section id="services" className="section-y">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={servicesSection.eyebrow}
            heading={servicesSection.heading}
            text={servicesSection.text}
          />
        </Reveal>
        <div className="mt-10 lg:mt-12">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}
