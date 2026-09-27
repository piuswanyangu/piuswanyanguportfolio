import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ServiceIcon } from "@/components/services/service-icon";
import { serviceCategories } from "@/data/services";

const categoryIds = {
  "Digital & Online Services": "digital-online-services",
  "Data Services": "data-services",
  "Software & Technology": "software-technology",
  "Creative & Professional": "creative-professional",
} as const;

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

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 text-sm font-semibold sm:flex-row sm:items-center lg:max-w-2xl">
            <Link
              href="/contact"
              className="interactive-action inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-foreground hover:bg-accent-hover"
            >
              Request a Service
            </Link>
            <Link
              href="/services"
              className="interactive-action inline-flex min-h-12 items-center justify-center rounded-md border border-border-interactive bg-surface px-6 py-3 text-foreground hover:border-accent hover:text-accent"
            >
              Explore Services
            </Link>
          </div>

          </div>

          <figure className="relative mx-auto w-full max-w-lg overflow-visible rounded-xl bg-surface-muted p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:justify-self-end">
            <figcaption className="sr-only">
              Afrinex Solutions brings its four service areas together under one
              practical technology partner.
            </figcaption>
            <div className="mx-auto max-w-sm text-center">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Afrinex Solutions</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">One practical technology partner for everyday tasks and ambitious ideas.</p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {serviceCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/services#${categoryIds[category]}`}
                    className="interactive-card flex min-h-28 flex-col items-center justify-center rounded-lg border border-border bg-surface px-4 py-5 text-center text-sm font-semibold leading-snug text-foreground"
                  >
                    <span className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                      <ServiceIcon category={category} className="size-5" />
                    </span>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
            
          </figure>
        </div>
      </Container>
    </section>
  );
}
