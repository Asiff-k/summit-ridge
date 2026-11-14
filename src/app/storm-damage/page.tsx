import type { Metadata } from "next";
import { Check } from "lucide-react";

import { BookButton } from "@/components/BookButton";
import { CallTextButtons } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/storm-damage",
  ...business.seo.pages.stormDamage,
});

export default function StormDamagePage() {
  const { stormDamage, stormAlert } = business;
  const { page } = stormDamage;

  return (
    <>
      <PageHero
        eyebrow={stormDamage.eyebrow}
        heading={page.heading}
        lead={page.lead}
        image={stormDamage.image}
      >
        <BookButton service={stormAlert.service}>{stormDamage.cta}</BookButton>
        <CallTextButtons variant="outline-on-dark" />
      </PageHero>

      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading heading={page.claimHeading} text={page.claimText} />
          </Reveal>
          <div>
            <ProcessSteps steps={stormDamage.steps} />
            <p className="type-small mt-10 max-w-[65ch] border-l-2 border-border pl-4 text-muted-foreground">
              {page.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-border bg-card">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading heading={page.signsHeading} />
          </Reveal>
          <Reveal>
            <ul className="border-t border-border">
              {page.signs.map((sign) => (
                <li key={sign} className="flex gap-3 border-b border-border py-4">
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading heading={page.firstStepsHeading} />
          </Reveal>
          <ProcessSteps steps={page.firstSteps} />
        </div>
      </section>

      <FaqSection heading={page.faqHeading} items={page.faqs} />

      <FinalCta />
    </>
  );
}
