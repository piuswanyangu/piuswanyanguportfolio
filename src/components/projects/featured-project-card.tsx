import Link from "next/link";
import { ProjectMedia } from "@/components/projects/project-media";
import type { Project } from "@/data/projects";

type FeaturedProjectCardProps = {
  project: Project;
  number: string;
  reverse?: boolean;
  priority?: boolean;
};

export function FeaturedProjectCard({
  project,
  number,
  reverse = false,
  priority = false,
}: FeaturedProjectCardProps) {
  return (
    <article className="group grid gap-8 border-t border-border py-12 transition-colors hover:border-accent/35 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16">
      <div className={reverse ? "lg:order-2" : undefined}>
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className={reverse ? "lg:order-1" : undefined}>
        <p className="font-mono text-xs font-medium text-secondary-accent">
          {number} / {project.category}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 text-lg font-medium leading-8 text-foreground">
          {project.valueProposition}
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 border-l-2 border-accent-soft pl-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Engineering contribution
          </p>
          <p className="mt-2 leading-7 text-muted-foreground">
            {project.solution}
          </p>
        </div>

        <ul
          aria-label={`${project.name} technologies`}
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-sm border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
          >
            Read Case Study
            <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
            <span className="sr-only">: {project.name}</span>
          </Link>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
            >
              GitHub<span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
            >
              Live Demo<span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
