import Link from "next/link";
import { ProjectMedia } from "@/components/projects/project-media";
import type { Project } from "@/data/projects";

/**
 * The card is used directly under a page `h1` (on /work) and under a section
 * `h2` (on the homepage), so the caller declares the correct level.
 */
type ProjectHeadingLevel = "h2" | "h3";

/**
 * `compact` is the homepage teaser: enough to judge relevance, with the full
 * problem/implementation breakdown left to /work and the case study itself.
 */
type ProjectCardVariant = "compact" | "detailed";

type FeaturedProjectCardProps = {
  project: Project;
  number: string;
  reverse?: boolean;
  priority?: boolean;
  headingLevel?: ProjectHeadingLevel;
  variant?: ProjectCardVariant;
};

export function FeaturedProjectCard({
  project,
  number,
  reverse = false,
  priority = false,
  headingLevel = "h3",
  variant = "detailed",
}: FeaturedProjectCardProps) {
  const Heading = headingLevel;
  const isCompact = variant === "compact";

  return (
    <article data-reveal className={`card group grid gap-8 p-5 sm:p-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center ${isCompact ? "xl:gap-12" : "xl:gap-14 xl:p-10"}`}>
      <div className={`order-2 ${reverse ? "xl:order-2" : "xl:order-1"}`}>
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className={`order-1 ${reverse ? "xl:order-1" : "xl:order-2"}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          <span className="text-accent">Project {number}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
          {project.status && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
              <span className="sr-only">Status: </span>
              {project.status}
            </span>
          )}
        </div>
        <Heading
          className={
            isCompact
              ? "title-3 mt-4 text-2xl sm:text-3xl"
              : "display-2 mt-4"
          }
        >
          {project.name}
        </Heading>

        {isCompact ? (
          <>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {project.valueProposition}
            </p>
            <p className="mt-4 font-mono text-xs leading-6 text-muted-foreground">
              {project.technologies.join(" / ")}
            </p>
          </>
        ) : (
          <dl className="mt-6 space-y-5">
            <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-accent">Problem</dt>
              <dd className="leading-7 text-muted-foreground">{project.problem}</dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-accent">Implemented</dt>
              <dd className="leading-7 text-foreground">{project.solution}</dd>
            </div>
            {project.plannedWork && (
              <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-accent">Planned</dt>
                <dd className="leading-7 text-muted-foreground">{project.plannedWork}</dd>
              </div>
            )}
            <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-accent">Stack</dt>
              <dd className="font-mono text-xs leading-6 text-muted-foreground">
                {project.technologies.join(" / ")}
              </dd>
            </div>
          </dl>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
          <Link href={`/projects/${project.slug}`} className="btn btn-primary">
            Case study
            <span className="sr-only">: {project.name}</span>
          </Link>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
            >
              GitHub <span aria-hidden="true">↗</span><span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
            >
              Live Demo <span aria-hidden="true">↗</span><span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
