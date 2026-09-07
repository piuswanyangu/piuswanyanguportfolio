import Link from "next/link";
import { Container } from "@/components/layout/container";

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <div>
            <h2
              id="about-preview-heading"
              className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              About Me
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-foreground">
              I&apos;m a full-stack software engineer whose strongest interests are
              backend engineering, API design, data flows, automation, and
              system architecture.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              I build projects around operational workflows such as marketplace
              transactions, asynchronous monitoring, and controlled case
              reporting. I&apos;m continuing to deepen my backend, cloud, system
              design, and AI-integration skills through that work.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              More about me
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
