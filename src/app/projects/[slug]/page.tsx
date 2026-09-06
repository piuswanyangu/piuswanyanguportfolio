import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { CaseStudySection } from "@/components/projects/case-study-section";
import { EngineeringDecisions } from "@/components/projects/engineering-decisions";
import { ProjectMedia } from "@/components/projects/project-media";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | Pius Wanyangu`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
      images: project.socialImage
        ? [{ url: project.socialImage, alt: `${project.name} case study` }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: `${project.name} | Pius Wanyangu`,
      description: project.summary,
      images: project.socialImage ? [project.socialImage] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        ← Back to Projects
      </Link>

      <header className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] xl:items-start xl:gap-16">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>{project.category}</span>
            {project.status && (
              <span className="inline-flex items-center gap-2 text-foreground">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary-accent" />
                Status: {project.status}
              </span>
            )}
          </div>
          <h1 className="mt-4 break-words text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 text-xl font-medium leading-8 text-foreground">
            {project.valueProposition}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            {project.summary}
          </p>

          <p
            aria-label={`${project.name} technologies`}
            className="mt-7 font-mono text-xs leading-6 text-muted-foreground"
          >
            {project.technologies.join(" / ")}
          </p>

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                  Live Demo<span className="sr-only"> (opens in a new tab)</span>
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent-soft"
                >
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </Link>
              )}
            </div>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <p className="mt-7 font-mono text-xs leading-6 text-muted-foreground">
              Public repository and live demo links are not currently provided.
            </p>
          )}
        </div>
        <ProjectMedia project={project} priority />
      </header>

      <div className="mt-16 lg:mt-20">
        <CaseStudySection id="overview" title="Overview">
          <p>{project.summary}</p>
        </CaseStudySection>
        <CaseStudySection id="problem" title="Problem">
          <p>{project.problem}</p>
        </CaseStudySection>
        <CaseStudySection id="implementation" title="Implementation">
          <p>{project.solution}</p>
        </CaseStudySection>
        {project.plannedWork && (
          <CaseStudySection id="planned-work" title="Planned Work">
            <p>{project.plannedWork}</p>
          </CaseStudySection>
        )}
        {project.architecture && (
          <CaseStudySection id="architecture" title="Architecture">
            <ArchitectureDiagram
              projectName={project.name}
              steps={project.architecture}
            />
          </CaseStudySection>
        )}
        {project.features && (
          <CaseStudySection id="features" title="Implemented Features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="border-l-2 border-border pl-4">
                  {feature}
                </li>
              ))}
            </ul>
          </CaseStudySection>
        )}
        {project.engineeringDecisions && (
          <CaseStudySection id="decisions" title="Engineering Decisions">
            <EngineeringDecisions decisions={project.engineeringDecisions} />
          </CaseStudySection>
        )}
        {project.testing && (
          <CaseStudySection id="testing" title="Testing">
            <p>{project.testing}</p>
          </CaseStudySection>
        )}
      </div>
    </Container>
  );
}
