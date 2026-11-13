import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business, type Service } from "@/config/business";

export function ServiceCards() {
  const services: readonly Service[] = business.services;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <li key={service.slug}>
          <Reveal index={index % 3} className="h-full">
            <article className="relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-shadow duration-150 focus-within:shadow-card hover:shadow-card">
              <Icon name={service.icon} />
              <h3 className="type-h3 mt-5">{service.name}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">
                {service.summary}
              </p>
              <Link
                href={`/services/${service.slug}`}
                aria-label={`${business.cta.learnMore}: ${service.name}`}
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 after:absolute after:inset-0 after:rounded-lg"
              >
                {business.cta.learnMore}
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Link>
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
