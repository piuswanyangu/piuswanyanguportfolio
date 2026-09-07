import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Pius Wanyangu approaches practical software, reliable systems, automation, and AI-enabled applications.",
  path: "/about",
});

const workAreas = [
  {
    title: "Backend systems",
    body: "APIs, authentication, data models, background jobs, and the logic that keeps an application working reliably.",
  },
  {
    title: "Full-stack applications",
    body: "Interfaces built with Next.js and React, connected to practical backend services and databases.",
  },
  {
    title: "Automation",
    body: "Background processing, repeatable workflows, monitoring, and tools that reduce manual work.",
  },
  {
    title: "AI integrations",
    body: "Adding useful AI capabilities to applications where they support a clear product workflow.",
  },
] as const;

const learningAreas = ["System design", "Architecture", "Cloud", "Algorithms and problem solving"] as const;
const opportunities = [
  "Software engineering opportunities",
  "Backend and full-stack work",
  "Freelance development projects",
  "Technical collaborations",
] as const;

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22 ">
      <article className="max-w-4xl">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em]  text-accent">About</p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">
            Hi, I&apos;m Pius.
          </h1>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              I&apos;m a full-stack software developer, but most of the technical work I enjoy sits on the backend.
            </p>
            <p>
              I like working on APIs, databases, authentication, background jobs, and the parts of an application that users do not always see but depend on for the product to work correctly.
            </p>
            <p>
              I also build frontend applications with Next.js and React. That lets me take a project from its interface through the backend logic, data, and deployment.
            </p>
            <p>
              Most of my recent learning has come from building marketplace systems, API monitoring tools, case-management workflows, automation, and AI-supported applications. I learn by building, then reviewing how the system behaves and where it can be improved.
            </p>
          </div>
        </header>

        <section aria-labelledby="work-heading" className="mt-16 border-t border-border pt-8 sm:mt-20">
          <h2 id="work-heading" className="text-2xl font-semibold tracking-tight text-foreground">What I work on</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {workAreas.map((area) => (
              <div key={area.title} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <h3 className="font-semibold text-foreground">{area.title}</h3>
                <p className="max-w-2xl leading-7 text-muted-foreground">{area.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-12 border-t border-border pt-8 sm:mt-20 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="learning-heading">
            <h2 id="learning-heading" className="text-2xl font-semibold tracking-tight text-foreground">How I am improving</h2>
            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              I&apos;m continuing to strengthen my backend engineering depth while studying the wider decisions behind dependable software.
            </p>
            <ul className="mt-6 space-y-3 font-mono text-sm text-foreground">
              {learningAreas.map((area) => <li key={area} className="border-l-2 border-accent pl-3">{area}</li>)}
            </ul>
          </section>

          <section aria-labelledby="opportunities-heading">
            <h2 id="opportunities-heading" className="text-2xl font-semibold tracking-tight text-foreground">What I&apos;m looking for</h2>
            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              I&apos;m open to work where I can contribute, keep learning, and help turn a real requirement into working software.
            </p>
            <ul className="mt-6 space-y-3 font-mono text-sm text-foreground">
              {opportunities.map((item) => <li key={item} className="border-l-2 border-border-strong pl-3">{item}</li>)}
            </ul>
          </section>
        </div>
      </article>

      <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:mt-20 sm:flex-row">
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
