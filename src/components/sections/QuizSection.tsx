import { Reveal } from "@/components/Reveal";
import { RoofQuiz } from "@/components/RoofQuiz";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/config/business";

export function QuizSection() {
  const { quiz } = business;

  return (
    <section className="section-y border-t border-border bg-card">
      <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={quiz.eyebrow} heading={quiz.heading} text={quiz.text} />
        </Reveal>
        <div className="[&>div]:bg-background">
          <RoofQuiz config={quiz} />
        </div>
      </div>
    </section>
  );
}
