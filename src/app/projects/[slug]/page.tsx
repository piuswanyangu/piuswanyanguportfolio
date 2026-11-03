import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { CaseStudySection } from "@/components/projects/case-study-section";
import { EngineeringDecisions } from "@/components/projects/engineering-decisions";
import { ProjectMedia } from "@/components/projects/project-media";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageBanner } from "@/components/layout/page-banner";
import { Icon } from "@/components/ui/icons";
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
      title: `${project.name} | Afrinex Solutions`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
      images: project.socialImage
        ? [{ url: project.socialImage, alt: `${project.name} case study` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Afrinex Solutions`,
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
    <>
      <PageBanner
        eyebrow={`Founder project · ${project.category}`}
        title={project.name}
        description={project.valueProposition}
        breadcrumbs={[
          { label: "Work", href: "/work" },
          { label: project.name, href: `/projects/${project.slug}` },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.status && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent-foreground">
              <span className="sr-only">Status: </span>
              {project.status}
            </span>
          )}
          <ul aria-label={`${project.name} technologies`} className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology} className="chip py-1 text-[0.8125rem]">{technology}</li>
            ))}
          </ul>
        </div>
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Demo <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </Link>
            )}
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Icon name="github" className="size-4" />
                GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </Link>
            )}
          </div>
        )}
        {!project.githubUrl && !project.liveUrl && (
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Public repository and live demo links are not currently provided.
          </p>
        )}
      </PageBanner>

      <Container className="section">
        <div className={`mx-auto ${project.image ? "max-w-4xl" : "max-w-2xl"}`}>
          <ProjectMedia project={project} priority sizes="(min-width: 1024px) 896px, 100vw" />
        </div>

        <div className="mt-12 lg:mt-16">
        <CaseStudySection id="overview" title="Overview">
          <p>{project.summary}</p>
        </CaseStudySection>
        <CaseStudySection id="problem" title="Problem">
          <p>{project.problem}</p>
        </CaseStudySection>
        <CaseStudySection id="implementation" title="What Afrinex Delivered">
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
        {project.seo && (
          <CaseStudySection id="seo" title="SEO">
            <p>{project.seo}</p>
          </CaseStudySection>
        )}
        {project.limitations && (
          <CaseStudySection id="limitations" title="Current Limitations">
            <p>{project.limitations}</p>
          </CaseStudySection>
        )}
        {project.learning && (
          <CaseStudySection id="engineering-insights" title="Engineering Insights">
            <p>{project.learning}</p>
          </CaseStudySection>
        )}
        {project.screenshots && (
          <CaseStudySection id="screenshots" title="Screenshots">
            <div className="space-y-6">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src} className="overflow-hidden border border-border bg-surface-muted">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    sizes="(min-width: 1280px) 768px, (min-width: 768px) 75vw, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          </CaseStudySection>
        )}
      </div>

      </Container>

      <ContactCta
        title="Have a similar project in mind?"
        description="This case study documents founder-built work demonstrating the engineering capability behind Afrinex. If you need comparable software, data, automation, or website work, describe your requirement and Afrinex will confirm whether it can help."
      />
    </>
  );
}
