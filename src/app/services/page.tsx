import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCards } from "@/components/sections/ServicesGrid";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  ...business.seo.pages.services,
});

export default function ServicesPage() {
  const { servicesPage, processSection, process } = business;

  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        lead={servicesPage.lead}
      />

      <section className="section-y">
        <div className="container-site">
          <ServiceCards />
        </div>
      </section>

      <section className="section-y border-y border-border bg-card">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={processSection.eyebrow}
              heading={processSection.heading}
            />
          </Reveal>
          <ProcessSteps steps={process} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
