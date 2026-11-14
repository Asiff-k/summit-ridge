import { MapPin } from "lucide-react";

import { LazyZipChecker } from "@/components/lazy/widgets";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function ServiceAreas() {
  const { serviceAreasSection, serviceAreas, coverage } = business;

  return (
    <section className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={serviceAreasSection.eyebrow}
            heading={serviceAreasSection.heading}
            text={serviceAreasSection.text}
          />
        </Reveal>

        <Reveal className="grid gap-6">
          <LazyZipChecker config={coverage} />

          <ul className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {serviceAreas.map((city) => (
              <li
                key={city}
                className="flex min-h-14 items-center gap-2 border-r border-b border-border bg-card px-4 font-medium"
              >
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                />
                {city}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
