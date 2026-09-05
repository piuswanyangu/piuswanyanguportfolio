import Link from "next/link";
import { Container } from "@/components/layout/container";

export function EngineeringNotes() {
  return (
    <section
      aria-labelledby="engineering-notes-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-sm font-medium tracking-wide text-accent">
              Writing
            </p>
            <h2
              id="engineering-notes-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Engineering Notes
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-foreground">
              Technical notes on system design, backend architecture, delivery,
              and lessons from building software are in preparation.
            </p>
            <Link
              href="/writing"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              Visit Engineering Notes
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
