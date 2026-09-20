import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";

export function FounderTrust() {
  return (
    <section
      aria-labelledby="founder-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 lg:gap-16">
          <figure className="mx-auto w-40 overflow-hidden rounded-full border-2 border-border-strong bg-surface shadow-[var(--shadow-soft)] md:mx-0 md:w-48">
            <Image
              src="/images/pius-wanyangu-profile.jpeg"
              alt="Pius Wanyangu, founder of Afrinex Solutions"
              width={413}
              height={413}
              sizes="(min-width: 768px) 192px, 160px"
              className="h-auto w-full"
            />
          </figure>

          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Founder</p>
            <h2 id="founder-heading" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Pius Wanyangu
            </h2>
            <p className="mt-2 font-mono text-sm text-muted-foreground">Founder &amp; Software Engineer</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Afrinex Solutions was founded by Pius Wanyangu, a software engineer focused on building practical digital solutions using modern software, data, AI, and automation.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              About Afrinex <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
