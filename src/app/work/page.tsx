import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { PageCta } from "@/components/sections/page-cta";
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
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Selected work"
        title="Work & Case Studies"
        description="Founder projects presented as evidence of technical capability. They are not represented as Afrinex client engagements."
      />

      <div className="mt-12">
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
      </div>

      <PageCta
        title="Need similar work for your business?"
        description="These projects show the engineering capability behind Afrinex. If you need software, data work, automation, AI, a website, or other digital support, describe what you are trying to achieve and Afrinex will confirm whether it can help."
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </Container>
  );
}
