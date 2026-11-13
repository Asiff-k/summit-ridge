import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

// Stub so the hero CTA resolves. The real contact page comes later.
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-16 md:px-8 lg:py-24">
      <h1 className="text-[2.5rem] leading-[1.05] font-bold tracking-[0.01em] uppercase lg:text-[4rem]">
        Contact Us
      </h1>
    </main>
  );
}
