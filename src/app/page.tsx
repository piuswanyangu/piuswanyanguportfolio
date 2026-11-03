import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureStrip } from "@/components/sections/feature-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { HowIBuild } from "@/components/sections/how-i-build";
import { IntroSplit } from "@/components/sections/intro-split";
import { LatestArticles } from "@/components/sections/latest-articles";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyAfrinex } from "@/components/sections/why-afrinex";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSplit />
      <FeatureStrip />
      <ServicesGrid />
      <HowIBuild />
      <FeaturedProjects />
      <WhyAfrinex />
      <Testimonials />
      <LatestArticles />
      <FaqSection />
      <ContactCta />
    </>
  );
}
