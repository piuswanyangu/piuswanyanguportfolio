import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium tracking-wide text-accent">
            Selected work
          </p>
          <h2
            id="featured-projects-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Featured Projects
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Selected projects demonstrating full-stack product engineering,
            backend architecture, workflow automation, and practical AI
            integration.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              number={String(index + 1).padStart(2, "0")}
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </div>

        <Link
          href="/projects"
          className="mt-4 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
        >
          View all projects
        </Link>
      </Container>
    </section>
  );
}
