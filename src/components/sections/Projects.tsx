import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function Projects() {
  const { projects } = business;

  return (
    <section className="section-y">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={projects.eyebrow}
            heading={projects.heading}
            text={projects.text}
          />
        </Reveal>

        <ul className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <li key={`${project.neighborhood}-${project.jobType}`}>
              <Reveal index={index % 3}>
                <figure>
                  <BeforeAfter
                    before={project.before}
                    after={project.after}
                    beforeLabel={projects.beforeLabel}
                    afterLabel={projects.afterLabel}
                    label={`${project.neighborhood}, ${project.jobType}`}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="mt-3 flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-semibold">
                        {project.neighborhood}
                      </span>
                      <span className="type-small block text-muted-foreground">
                        {project.jobType}
                      </span>
                    </span>
                    <span className="type-small shrink-0 text-muted-foreground">
                      {projects.sampleLabel}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="type-small mt-8 max-w-[70ch] text-muted-foreground">
          {projects.sampleNote}
        </p>
      </div>
    </section>
  );
}
