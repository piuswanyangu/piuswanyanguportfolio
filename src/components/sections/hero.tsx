import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-16 sm:py-20 lg:py-24 xl:py-28">
      <Container>
        <div className="max-w-4xl">
          <div className="hero-reveal">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Full-Stack Software Engineer
            </p>
            <p className="mt-5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Pius Wanyangu
            </p>
          </div>

          <h1
            id="hero-heading"
            className="hero-reveal hero-reveal-2 mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-5xl 2xl:text-6xl"
          >
            Building software that solves real-world problems.
          </h1>

          <p className="hero-reveal hero-reveal-3 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            I design, build, and deploy scalable web systems, AI-powered
            applications, and business automation solutions.
          </p>

          <div className="hero-reveal hero-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-[background-color,transform] hover:-translate-y-px hover:bg-accent-hover active:translate-y-0"
            >
              Explore My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,transform] hover:-translate-y-px hover:border-accent/40 hover:bg-accent-soft active:translate-y-0"
            >
              Let&apos;s Talk
            </Link>
          </div>

          <div className="hero-reveal hero-reveal-5 mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span aria-hidden="true" className="status-pulse size-2 rounded-full bg-secondary-accent" />
              Available for opportunities &amp; freelance projects
            </span>
            <Link
              href="/cv"
              className="rounded-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              View CV
            </Link>
          </div>

          <p className="hero-reveal hero-reveal-5 mt-9 font-mono text-xs leading-6 text-muted-foreground sm:text-sm">
            Next.js · React · TypeScript · Python · Django · PostgreSQL · Docker · AI
          </p>
        </div>
      </Container>
    </section>
  );
}
