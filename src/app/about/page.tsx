import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Afrinex Solutions, a Kenya-based provider of digital assistance, data services, software development, AI, automation, and creative support.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <article className="mx-auto max-w-3xl text-center">
        <header className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
            About Afrinex
          </p>
          <h1 className="mt-3 text-[2rem] font-bold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-5xl">
            One partner for your digital needs.
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
            Afrinex Solutions helps individuals and businesses with online
            services, data, websites, and software.
          </p>
        </header>

        <section
          aria-labelledby="why-heading"
          className="mx-auto mt-12 max-w-[60ch] sm:mt-14"
        >
          <h2
            id="why-heading"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Why Afrinex exists
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground sm:text-lg">
            Finding help for different digital tasks can mean dealing with
            several providers. Afrinex brings these services together, giving
            you one place to explain your needs and agree on the right support.
          </p>
        </section>

        <aside className="mx-auto mt-12 max-w-[60ch] sm:mt-14">
          <p className="font-mono text-sm font-semibold text-accent">
            Based in Kenya. Available remotely.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            SHA and KRA assistance is for customers in Kenya. Website,
            software, data, and creative services are available remotely.
          </p>
        </aside>

        <section
          aria-labelledby="founder-heading"
          className="mx-auto mt-14 max-w-[60ch] sm:mt-16"
        >
          <Image
            src="/images/pius-wanyangu-profile.jpeg"
            alt="Pius Wanyangu, founder of Afrinex Solutions"
            width={413}
            height={413}
            className="mx-auto size-32 rounded-full border-2 border-border-strong object-cover shadow-[var(--shadow-soft)] sm:size-36"
          />
          <h2
            id="founder-heading"
            className="mt-5 text-2xl font-semibold tracking-tight text-foreground"
          >
            Pius Wanyangu
          </h2>
          <p className="mt-1 font-mono text-sm text-accent">
            Founder &amp; Software Engineer
          </p>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
            Pius leads the technical work directly, including full-stack web
            development, backend and API development, automation, data
            workflows, and browser-based testing.
          </p>
        </section>

        <div className="mt-14 flex flex-col justify-center gap-3 sm:mt-16 sm:flex-row">
          <Link
            href="/contact"
            className="interactive-action inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            Request a Service
          </Link>
          <Link
            href="/services"
            className="interactive-action inline-flex min-h-12 items-center justify-center rounded-md border border-border-interactive bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
          >
            Explore Services
          </Link>
        </div>
      </article>
    </Container>
  );
}
