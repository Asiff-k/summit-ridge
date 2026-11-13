import { BookingSection } from "@/components/sections/BookingSection";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FinancingBanner } from "@/components/sections/FinancingBanner";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { QuizSection } from "@/components/sections/QuizSection";
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
      <FinancingBanner />
      <StatsBar />
      {/* Holds the #book anchor that every "Book" button on this page opens. */}
      <BookingSection />
      <EstimateSection />
      <ServicesGrid />
      <StormBand />
      <WhyUs />
      <Projects />
      <Reviews />
      <ServiceAreas />
      <QuizSection />
      <FaqSection
        eyebrow={faqSection.eyebrow}
        heading={faqSection.heading}
        items={faqs}
      />
      <FinalCta anchor="book-bottom" />
    </>
  );
}
