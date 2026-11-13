import { Suspense, type ReactNode } from "react";

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

/**
 * Each section below the hero sits in its own Suspense boundary so React
 * hydrates it as a separate, interruptible task. That keeps the main thread
 * free while the page loads; nothing here actually suspends.
 */
function Island({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default function Home() {
  const { faqSection, faqs } = business;

  return (
    <>
      <Hero />
      <Island>
        <FinancingBanner />
      </Island>
      <Island>
        <StatsBar />
      </Island>
      {/* Holds the #book anchor that every "Book" button on this page opens. */}
      <Island>
        <BookingSection />
      </Island>
      <Island>
        <EstimateSection />
      </Island>
      <Island>
        <ServicesGrid />
      </Island>
      <Island>
        <StormBand />
      </Island>
      <Island>
        <WhyUs />
      </Island>
      <Island>
        <Projects />
      </Island>
      <Island>
        <Reviews />
      </Island>
      <Island>
        <ServiceAreas />
      </Island>
      <Island>
        <QuizSection />
      </Island>
      <Island>
        <FaqSection
          eyebrow={faqSection.eyebrow}
          heading={faqSection.heading}
          items={faqs}
        />
      </Island>
      <Island>
        <FinalCta anchor="book-bottom" />
      </Island>
    </>
  );
}
