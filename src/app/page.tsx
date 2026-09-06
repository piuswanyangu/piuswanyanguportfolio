import type { Metadata } from "next";
import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { HowIBuild } from "@/components/sections/how-i-build";
import { TechnicalCapabilities } from "@/components/sections/technical-capabilities";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <TechnicalCapabilities />
      <HowIBuild />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
