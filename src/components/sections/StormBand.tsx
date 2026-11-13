import { ButtonLink } from "@/components/ButtonLink";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function StormBand() {
  const { stormDamage, cta } = business;

  return (
    <section className="on-dark-section section-y relative isolate">
      <div aria-hidden="true" className="bg-diagonal-lines absolute inset-0 -z-10" />

      <div className="container-site grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            onDark
            eyebrow={stormDamage.eyebrow}
            heading={stormDamage.heading}
            text={stormDamage.text}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={cta.href}>{stormDamage.cta}</ButtonLink>
            <ButtonLink href="/storm-damage" variant="outline-on-dark">
              {cta.learnMore}
            </ButtonLink>
          </div>
        </Reveal>

        <ProcessSteps steps={stormDamage.steps} onDark />
      </div>
    </section>
  );
}
