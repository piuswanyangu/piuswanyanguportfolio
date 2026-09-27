import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { HowIBuild } from "@/components/sections/how-i-build";
import { LatestArticles } from "@/components/sections/latest-articles";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyAfrinex } from "@/components/sections/why-afrinex";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceShowcase />
      <FeaturedProjects />
      <WhyAfrinex />
      <HowIBuild />
      <Testimonials />
      <LatestArticles />
      <FaqSection />
      <ContactCta />
    </>
  );
}
