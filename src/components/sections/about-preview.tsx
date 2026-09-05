import Link from "next/link";
import { Container } from "@/components/layout/container";

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-sm font-medium tracking-wide text-accent">
              About
            </p>
            <h2
              id="about-preview-heading"
              className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Engineering with Purpose
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-foreground">
              I&apos;m a full-stack software engineer with a strong interest in
              backend engineering, automation, and AI-powered applications. I
              work across modern frontend and backend technologies to turn real
              operational problems into practical digital systems.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              My approach centers on maintainable architecture, reliable
              software, continuous learning, and building tools that solve useful
              problems. I&apos;m especially interested in technology that supports
              businesses and users across Africa and beyond while continuing to
              deepen my work in backend systems, cloud, automation, and
              AI-enabled software.
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
