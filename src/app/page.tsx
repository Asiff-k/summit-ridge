import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import { StormBand } from "@/components/sections/StormBand";
import { WhyUs } from "@/components/sections/WhyUs";
import { business } from "@/config/business";

export default function Home() {
  const { faqSection, faqs } = business;

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <StormBand />
      <WhyUs />
      <Projects />
      <Reviews />
      <ServiceAreas />
      <FaqSection
        eyebrow={faqSection.eyebrow}
        heading={faqSection.heading}
        items={faqs}
      />
      <FinalCta />
    </>
  );
}
