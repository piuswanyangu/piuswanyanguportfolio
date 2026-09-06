import Link from "next/link";
import { Container } from "@/components/layout/container";
import { contact } from "@/data/contact";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-14 sm:py-18 lg:py-22 xl:py-24">
      <Container>
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Backend-focused / Full-stack
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Pius Wanyangu
          </h1>

          <p className="mt-5 text-xl font-medium tracking-[-0.015em] text-foreground sm:text-2xl">
            Full-Stack Software Engineer
          </p>

          <div className="mt-7 max-w-2xl space-y-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              I build full-stack applications with a strong focus on backend
              systems, APIs, automation, and dependable data flows.
            </p>
            <p>
              My recent work includes marketplace workflows, API monitoring,
              background processing, and case-management systems.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2.5 text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Projects
            </Link>
            <a
              href={contact.emailUrl}
              className="inline-flex min-h-11 items-center rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              Email Pius
            </a>
            <Link
              href="/cv"
              className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
            >
              CV
            </Link>
          </div>

          <dl className="mt-10 grid max-w-3xl gap-4 border-t border-border pt-5 font-mono text-xs sm:grid-cols-3">
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground">Focus</dt>
              <dd className="mt-1.5 text-foreground">Backend systems &amp; APIs</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground">Core stack</dt>
              <dd className="mt-1.5 text-foreground">Next.js / Django / PostgreSQL</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-muted-foreground">Also building</dt>
              <dd className="mt-1.5 text-foreground">Automation / AI integrations</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
