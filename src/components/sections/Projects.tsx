import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function Projects() {
  const { projects } = business;

  return (
    <section className="section-y">
      <div className="container-site">
        <Reveal>
          <SectionHeading eyebrow={projects.eyebrow} heading={projects.heading} />
        </Reveal>

        <ul className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <li key={`${project.neighborhood}-${project.jobType}`}>
              <Reveal index={index % 3}>
                <figure>
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  <figcaption className="mt-3">
                    <span className="block font-semibold">
                      {project.neighborhood}
                    </span>
                    <span className="type-small block text-muted-foreground">
                      {project.jobType}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="type-small mt-8 text-muted-foreground">
          {projects.sampleNote}
        </p>
      </div>
    </section>
  );
}
