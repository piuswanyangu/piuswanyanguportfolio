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
    <article className="group grid gap-8 border-t border-border py-10 transition-colors hover:border-accent/35 sm:py-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start xl:gap-16 xl:py-14">
      <div className={`order-2 ${reverse ? "xl:order-2" : "xl:order-1"}`}>
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className={`order-1 ${reverse ? "xl:order-1" : "xl:order-2"}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>Project {number}</span>
          <span>{project.category}</span>
          {project.status && (
            <span className="inline-flex items-center gap-2 text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary-accent" />
              Status: {project.status}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
          {project.name}
        </h3>
        <dl className="mt-6 space-y-5">
          <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Problem</dt>
            <dd className="leading-7 text-muted-foreground">{project.problem}</dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Implemented</dt>
            <dd className="leading-7 text-foreground">{project.solution}</dd>
          </div>
          {project.plannedWork && (
            <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Planned</dt>
              <dd className="leading-7 text-muted-foreground">{project.plannedWork}</dd>
            </div>
          )}
          <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Stack</dt>
            <dd className="font-mono text-xs leading-6 text-muted-foreground">
              {project.technologies.join(" / ")}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
          >
            Case study
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
