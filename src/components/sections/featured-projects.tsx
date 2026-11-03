import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectMedia } from "@/components/projects/project-media";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));

  return (
    <section aria-labelledby="featured-projects-heading" className="section section-tint">
      <Container>
        <SectionHeading
          id="featured-projects-heading"
          eyebrow="Engineering proof"
          title="Selected Work"
          description="Explore selected software projects built by our founder that demonstrate the engineering capabilities behind Afrinex Solutions."
        />

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <li key={project.slug} data-reveal className="card card-lift relative flex flex-col overflow-hidden">
              <div className="p-3 pb-0">
                <ProjectMedia
                  project={project}
                  fixedAspect
                  priority={index === 0}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  <span>{project.category}</span>
                  {project.status && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{project.status}</span>
                  )}
                </div>
                <h3 className="title-3 mt-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:outline-none"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted-foreground">{project.valueProposition}</p>
                <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Case study
                  <Icon name="arrowRight" className="size-4" />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/work" className="btn btn-outline">
            View selected work
          </Link>
        </div>
      </Container>
    </section>
  );
}
