import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { contact } from "@/data/contact";
import { projects } from "@/data/projects";
import { capabilityGroups } from "@/data/technical-capabilities";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "CV",
  description:
    "Review Pius Wanyangu's professional profile, technical skills, selected projects, experience, and training.",
  path: "/cv",
});

export default function CvPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Curriculum vitae"
        title="CV"
        description="An overview of my engineering profile, technical capabilities, selected work, experience, and training."
      />

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
        <a
          href={contact.emailUrl}
          className="rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
        >
          {contact.email}
        </a>
        <Link
          href="/contact"
          className="rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
        >
          Contact details
        </Link>
      </div>

      <div className="mt-12 space-y-12">
        <section aria-labelledby="profile-heading" className="border-t border-border pt-8">
          <h2 id="profile-heading" className="text-2xl font-semibold tracking-tight">
            Professional Profile
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Pius Wanyangu is a Full-Stack Software Engineer focused on practical
            web systems, backend engineering, workflow automation, and AI-powered
            applications.
          </p>
        </section>

        <section aria-labelledby="cv-skills-heading" className="border-t border-border pt-8">
          <h2 id="cv-skills-heading" className="text-2xl font-semibold tracking-tight">
            Technical Skills
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {capabilityGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold text-foreground">{group.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {group.skills.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cv-projects-heading" className="border-t border-border pt-8">
          <h2 id="cv-projects-heading" className="text-2xl font-semibold tracking-tight">
            Selected Projects
          </h2>
          <div className="mt-6 grid gap-7 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug}>
                <p className="font-mono text-xs text-secondary-accent">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded-sm transition-colors hover:text-accent"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {project.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading" className="border-t border-border pt-8">
          <h2 id="experience-heading" className="text-2xl font-semibold tracking-tight">
            Experience
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            <li>
              <p className="font-semibold text-foreground">QA Intern</p>
              <p className="mt-1 text-muted-foreground">AgizaTech</p>
            </li>
            <li>
              <p className="font-semibold text-foreground">Data Entry</p>
              <p className="mt-1 text-muted-foreground">Global Light Ministry</p>
            </li>
            <li>
              <p className="font-semibold text-foreground">
                Freelance Web Development & IT Support
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="education-heading" className="border-t border-border pt-8">
          <h2 id="education-heading" className="text-2xl font-semibold tracking-tight">
            Education & Training
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            <li>
              <p className="font-semibold text-foreground">Software Development</p>
              <p className="mt-1 text-muted-foreground">
                Modcom Institute of Technology
              </p>
            </li>
            <li>
              <p className="font-semibold text-foreground">
                Software Engineering Training
              </p>
              <p className="mt-1 text-muted-foreground">ALX</p>
            </li>
            <li>
              <p className="font-semibold text-foreground">Virtual Assistant</p>
              <p className="mt-1 text-muted-foreground">ALX</p>
            </li>
            <li>
              <p className="font-semibold text-foreground">
                AI Career Essentials
              </p>
              <p className="mt-1 text-muted-foreground">ALX</p>
            </li>
            <li>
              <p className="font-semibold text-foreground">
                Professional Foundations
              </p>
              <p className="mt-1 text-muted-foreground">ALX</p>
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
