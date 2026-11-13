import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Faq } from "@/config/business";

export function FaqSection({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading: string;
  items: readonly Faq[];
}) {
  return (
    <section className="section-y border-y border-border bg-card">
      <div className="container-site grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} />
        </Reveal>
        <Reveal>
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}
