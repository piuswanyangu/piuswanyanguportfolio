import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Pius Wanyangu approaches practical software, reliable systems, automation, and AI-enabled applications.",
  path: "/about",
});

const aboutSections = [
  {
    title: "What I build",
    body: "I work across frontend and backend development, with a strong interest in APIs, data flows, workflow automation, and AI integrations.",
  },
  {
    title: "What I pay attention to",
    body: "I focus on permissions, data models, clear system boundaries, failure cases, and the path from an interface action to stored data or background work.",
  },
  {
    title: "How I approach a build",
    body: "I start with the users, workflow, and constraints, then define the application logic, API boundaries, data model, validation, and delivery path.",
  },
  {
    title: "What I am developing",
    body: "I am continuing to deepen my backend, cloud, automation, and system-design skills through full-stack projects and AI-enabled software.",
  },
] as const;

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="About"
        title="About Pius"
        description="I work across the application stack, with the strongest interest in backend systems, API design, automation, and system architecture."
      />

      <div className="mt-12 grid gap-x-14 gap-y-10 border-t border-border pt-8 md:grid-cols-2 lg:gap-x-20">
        {aboutSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
        >
          Contact
        </Link>
      </div>
    </Container>
  );
}
