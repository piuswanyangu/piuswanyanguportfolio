import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Explore projects demonstrating Pius Wanyangu's full-stack development, backend architecture, automation, and AI-enabled product work.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Selected work"
        title="Projects"
        description="Three systems covering marketplace workflows, API monitoring and background processing, and structured case reporting."
      />

      <div className="mt-12">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            number={String(index + 1).padStart(2, "0")}
            reverse={index % 2 === 1}
            priority={index === 0}
          />
        ))}
      </div>
    </Container>
  );
}
