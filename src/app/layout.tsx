import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { ChatSlot } from "@/components/layout/ChatSlot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { SiteEffects } from "@/components/SiteEffects";
import { business } from "@/config/business";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const { seo } = business;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seo.siteUrl,
    siteName: business.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: business.hero.image.src, alt: business.hero.image.alt }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <ChatSlot />
        <JsonLd />
        <SiteEffects />
      </body>
    </html>
  );
}
