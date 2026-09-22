import Link from "next/link";
import { Container } from "@/components/layout/container";
import { serviceCategories } from "@/data/services";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden py-14 sm:py-18 lg:py-22">
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Digital Services &bull; Software &bull; AI &amp; Automation
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-foreground sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.045em] lg:text-6xl xl:text-7xl"
          >
            Digital solutions that help you get things done and grow.
          </h1>

          <div className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              From online service assistance and data work to software
              development, AI, and automation, Afrinex Solutions helps
              individuals and businesses solve everyday digital challenges.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2.5 text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Request a Service
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center rounded-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              Explore Services
            </Link>
          </div>

          </div>

          <figure className="relative mx-auto w-full max-w-lg border border-border bg-surface-muted p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:justify-self-end">
            <figcaption className="sr-only">
              Afrinex Solutions brings its four service areas together under one
              practical technology partner.
            </figcaption>
            <div className="border border-border-strong bg-background px-5 py-4 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Afrinex Solutions</p>
              <p className="mt-2 text-sm text-muted-foreground">One practical technology partner</p>
            </div>
            <div aria-hidden="true" className="mx-auto h-6 w-px bg-border-strong" />
            <ul className="grid grid-cols-2 gap-3">
              {serviceCategories.map((category) => (
                <li
                  key={category}
                  className="flex min-h-16 items-center justify-center border border-border bg-surface px-3 py-3 text-center text-sm font-semibold leading-snug text-foreground"
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="mt-3 border-l-2 border-accent bg-accent-soft px-4 py-3 text-sm text-muted-foreground">
              Connected services shaped around the customer&apos;s actual need.
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
