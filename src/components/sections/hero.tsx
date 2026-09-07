import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RotatingRole } from "@/components/sections/rotating-role";
import { contact } from "@/data/contact";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden py-14 sm:py-18 lg:py-20 xl:py-22">
      <Container>
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] xl:gap-14 2xl:gap-20">
          <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Backend-focused / Full-stack
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Pius Wanyangu
          </h1>

          <RotatingRole />

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

          <div className="relative mx-auto w-[14.5rem] sm:w-[16.5rem] lg:w-[18.5rem] xl:mx-0 xl:justify-self-end">
            <div aria-hidden="true" className="hero-orbit hero-orbit-primary" />
            <div aria-hidden="true" className="hero-orbit hero-orbit-secondary" />

            <div className="hero-portrait-frame relative z-10 mx-auto aspect-square w-[11.25rem] overflow-hidden rounded-full sm:w-[13.75rem] lg:w-[15.625rem] xl:w-[17.5rem]">
              <Image
                src="/images/pius-wanyangu-profile.jpeg"
                alt="Pius Wanyangu"
                fill
                preload
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 250px, (min-width: 640px) 220px, 180px"
                className="object-cover object-center"
              />
            </div>

            <dl className="pointer-events-none absolute inset-0 z-20 hidden min-[1360px]:block" aria-hidden="true">
              <div className="absolute -left-14 top-12 border-l border-border pl-3 font-mono text-[0.6875rem] leading-5">
                <dt className="uppercase tracking-[0.14em] text-foreground">Backend</dt>
                <dd className="text-muted-foreground">APIs / Data / Systems</dd>
              </div>
              <div className="absolute -right-14 bottom-14 border-r border-border pr-3 text-right font-mono text-[0.6875rem] leading-5">
                <dt className="uppercase tracking-[0.14em] text-foreground">AI integration</dt>
                <dd className="text-muted-foreground">Automation / Applications</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
