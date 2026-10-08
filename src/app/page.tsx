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

const trustPoints = [
  { value: "4", label: "Service groups", detail: "Digital, data, software, creative" },
  { value: "2", label: "Direct contact channels", detail: "Email & WhatsApp" },
  { value: "1", label: "Founder-led model", detail: "Technical guidance stays direct" },
  { value: "Remote", label: "Delivery model", detail: "Kenya-based support, available remotely" },
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-label="Afrinex trust signals" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface-muted/60 p-5 shadow-sm">
                <p className="text-3xl font-semibold tracking-[-0.05em] text-foreground">{item.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
