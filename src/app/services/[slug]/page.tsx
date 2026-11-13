import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { BookButton } from "@/components/BookButton";
import { CallTextButtons } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { business, type Service } from "@/config/business";

const services: readonly Service[] = business.services;

function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: `${service.summary} ${service.description}`,
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const { servicesPage, servicePage, processSection, process, stormDamage, cta } =
    business;
  const steps = service.useClaimProcess ? stormDamage.steps : process;

  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        heading={service.name}
        lead={service.summary}
        image={service.image}
      >
        <BookButton service={service.name}>{cta.bookInspection}</BookButton>
        <CallTextButtons variant="outline-on-dark" />
      </PageHero>

      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading heading={servicePage.includesHeading} />
            <p className="mt-4 max-w-[60ch] text-muted-foreground">
              {service.description}
            </p>
          </Reveal>

          <Reveal>
            <ul className="border-t border-border">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-border py-4"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-border bg-card">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={processSection.eyebrow}
              heading={processSection.heading}
            />
          </Reveal>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <FaqSection heading={servicePage.faqHeading} items={service.faqs} />

      <FinalCta />
    </>
  );
}
