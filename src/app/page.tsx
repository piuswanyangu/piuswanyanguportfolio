import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FounderTrust } from "@/components/sections/founder-trust";
import { Hero } from "@/components/sections/hero";
import { HowIBuild } from "@/components/sections/how-i-build";
import { ServiceCategories } from "@/components/sections/service-categories";
import { WhyAfrinex } from "@/components/sections/why-afrinex";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <WhyAfrinex />
      <HowIBuild />
      <FeaturedProjects />
      <FounderTrust />
      <ContactCta />
    </>
  );
}
