import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden py-14 sm:py-18 lg:py-22">
      <div aria-hidden="true" className="hero-media-layer" />
      <div aria-hidden="true" className="hero-readability-layer" />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Digital Services &bull; Software &bull; AI &amp; Automation
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-6xl xl:text-7xl"
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

          <ul className="mt-10 flex max-w-3xl flex-wrap gap-x-5 gap-y-3 border-t border-border pt-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {[
              "Digital Services",
              "Data",
              "Software",
              "AI & Automation",
              "Creative Services",
            ].map((capability) => (
              <li key={capability} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary-accent" />
                {capability}
              </li>
            ))}
          </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-lg border border-border bg-surface-muted p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:justify-self-end">
            <figcaption className="sr-only">
              Afrinex Solutions connects digital services, data, software, AI, and automation capabilities.
            </figcaption>
            <div className="border border-border-strong bg-background px-5 py-4 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Afrinex Solutions</p>
              <p className="mt-2 text-sm text-muted-foreground">One practical technology partner</p>
            </div>
            <div aria-hidden="true" className="mx-auto h-6 w-px bg-border-strong" />
            <div className="grid grid-cols-2 gap-3">
              {["Digital", "Data", "Software", "AI & Automation"].map((item) => (
                <div key={item} className="border border-border bg-surface px-4 py-4 text-center text-sm font-semibold text-foreground">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-3 border-l-2 border-accent bg-accent-soft px-4 py-3 text-sm text-muted-foreground">
              Connected services shaped around the customer&apos;s actual need.
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
