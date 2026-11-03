import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected founder projects demonstrating software development, backend systems, automation, testing, and practical product work.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageBanner
        eyebrow="Selected work"
        title="Work & Case Studies"
        description="Founder projects presented as evidence of technical capability. They are not represented as Afrinex client engagements."
        breadcrumbs={[{ label: "Work", href: "/work" }]}
      />

      <section aria-label="Projects" className="section section-tint">
        <Container className="space-y-8">
          {projects.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              number={String(index + 1).padStart(2, "0")}
              reverse={index % 2 === 1}
              priority={index === 0}
              headingLevel="h2"
            />
          ))}
        </Container>
      </section>

      <ContactCta
        title="Need similar work for your business?"
        description="These projects show the engineering capability behind Afrinex. If you need software, data work, automation, AI, a website, or other digital support, describe what you are trying to achieve and Afrinex will confirm whether it can help."
      />
    </>
  );
}
