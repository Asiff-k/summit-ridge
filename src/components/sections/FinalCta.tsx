import { ButtonLink, CallButton } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { business } from "@/config/business";

export function FinalCta() {
  const { finalCta, cta } = business;

  return (
    <section className="section-y">
      <Reveal className="container-site">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="type-h2">{finalCta.heading}</h2>
          <p className="type-lead mt-4 text-muted-foreground">{finalCta.text}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <ButtonLink href={cta.href}>{cta.inspection}</ButtonLink>
            <CallButton />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
