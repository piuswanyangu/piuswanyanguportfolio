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

      <header className="content-enter mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="font-mono text-sm font-medium text-secondary-accent">
            {project.category}
          </p>
          <h1 className="mt-4 break-words text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 text-xl font-medium leading-8 text-foreground">
            {project.valueProposition}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            {project.summary}
          </p>

          <ul
            aria-label={`${project.name} technologies`}
            className="mt-7 flex flex-wrap gap-2"
          >
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-sm border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>

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
        </div>
        <ProjectMedia project={project} priority />
      </header>

      <div className="mt-16 lg:mt-20">
        <CaseStudySection number="01" title="Overview">
          <p>{project.summary}</p>
        </CaseStudySection>
        <CaseStudySection number="02" title="The Problem">
          <p>{project.problem}</p>
        </CaseStudySection>
        <CaseStudySection number="04" title="Solution">
          <p>{project.solution}</p>
        </CaseStudySection>
        {project.architecture && (
          <CaseStudySection number="05" title="Architecture">
            <ArchitectureDiagram
              projectName={project.name}
              steps={project.architecture}
            />
          </CaseStudySection>
        )}
        {project.features && (
          <CaseStudySection number="06" title="Key Features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="border-l-2 border-accent-soft pl-4">
                  {feature}
                </li>
              ))}
            </ul>
          </CaseStudySection>
        )}
        {project.engineeringDecisions && (
          <CaseStudySection number="07" title="Engineering Decisions">
            <EngineeringDecisions decisions={project.engineeringDecisions} />
          </CaseStudySection>
        )}
        {project.testing && (
          <CaseStudySection number="09" title="Testing">
            <p>{project.testing}</p>
          </CaseStudySection>
        )}
      </div>
    </Container>
  );
}
