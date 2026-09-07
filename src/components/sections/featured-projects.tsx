import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="featured-projects-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Selected Projects
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Systems I have built while developing my full-stack and backend
            engineering skills.
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
