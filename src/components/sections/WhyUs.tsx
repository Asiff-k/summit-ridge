import Image from "next/image";

import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function WhyUs() {
  const { whyUs } = business;

  return (
    <section className="section-y border-b border-border bg-card">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Image
            src={whyUs.image.src}
            alt={whyUs.image.alt}
            width={1200}
            height={900}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading eyebrow={whyUs.eyebrow} heading={whyUs.heading} />
          </Reveal>
          <ul className="mt-8 grid gap-7">
            {whyUs.points.map((point, index) => (
              <li key={point.title}>
                <Reveal index={index} className="flex gap-4">
                  <Icon name={point.icon} className="mt-0.5" />
                  <div>
                    <h3 className="type-h3">{point.title}</h3>
                    <p className="mt-1 text-muted-foreground">{point.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
