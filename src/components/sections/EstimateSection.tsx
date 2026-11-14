import { EstimateForm } from "@/components/EstimateForm";
import { LazyRoofEstimator } from "@/components/lazy/widgets";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";
import { ESTIMATE_ANCHOR } from "@/lib/prefill-store";

/** The 3-step estimate form beside the slider price guide. */
export function EstimateSection() {
  const { estimateForm, estimator, cta } = business;

  return (
    <section
      id={ESTIMATE_ANCHOR}
      tabIndex={-1}
      className="section-y scroll-mt-20 border-y border-border bg-card outline-none"
    >
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={estimateForm.eyebrow}
              heading={estimateForm.heading}
              text={estimateForm.text}
            />
          </Reveal>
          <div className="mt-8 [&>div]:bg-background">
            <EstimateForm config={estimateForm} bookLabel={cta.bookInspection} />
          </div>
        </div>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow={estimator.eyebrow}
              heading={estimator.heading}
              text={estimator.text}
            />
          </Reveal>
          <div className="mt-8 [&>div>*]:bg-background">
            <LazyRoofEstimator config={estimator} />
          </div>
        </div>
      </div>
    </section>
  );
}
