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
    body: "I work across frontend and backend development, with a strong interest in backend engineering, workflow automation, and AI-powered applications that address real operational needs.",
  },
  {
    title: "Engineering philosophy",
    body: "I value maintainable architecture, clear system boundaries, and reliable behavior. Technology choices should serve the product and its users rather than add complexity without purpose.",
  },
  {
    title: "How I approach problems",
    body: "I start by understanding the user, business need, and constraints, then connect interface design, application logic, data, testing, and delivery into one coherent system.",
  },
  {
    title: "Where I am growing",
    body: "I continue to deepen my capabilities in backend systems, cloud, automation, and AI-enabled software, with particular interest in useful technology for businesses and users across Africa and beyond.",
  },
] as const;

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="About"
        title="About Pius"
        description="A full-stack software engineer focused on turning real operational needs into practical digital systems."
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
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-[background-color,transform] hover:-translate-y-px hover:bg-accent-hover active:translate-y-0"
        >
          Explore My Work
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,transform] hover:-translate-y-px hover:border-accent/40 hover:bg-accent-soft"
        >
          Start a Conversation
        </Link>
      </div>
    </Container>
  );
}
