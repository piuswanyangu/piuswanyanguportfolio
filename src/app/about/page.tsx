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
    <Container className="py-14 sm:py-18 lg:py-22">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">About Afrinex</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          One partner for the digital tasks that keep work moving.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Afrinex Solutions helps people and businesses with the practical digital work that needs to get done, from online assistance and data handling to software, automation, and creative support.
        </p>
      </header>

      <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)] p-3">
          <Image
            src="/images/pius-wanyangu-profile.jpeg"
            alt="Pius Wanyangu, founder of Afrinex Solutions"
            width={800}
            height={800}
            className="h-full min-h-[22rem] w-full rounded-[1.4rem] object-cover"
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Why it exists</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Bringing digital support together in one clear place.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Different digital needs often sit across multiple providers and processes. Afrinex brings these needs together so people can explain the problem once and work with a partner who helps them decide on the right next step.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {[
              "Practical understanding of the real task",
              "Clear communication before work begins",
              "Technology used where it adds value",
              "Remote delivery, with Kenya-based support",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-surface-muted p-4 text-sm leading-6 text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="founder-heading" className="mt-16 border-t border-border pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Leadership</p>
          <h2 id="founder-heading" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pius Wanyangu
          </h2>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground">
            Founder &amp; Software Engineer
          </p>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Pius leads the technical work directly, from software and backend development to automation, data workflows, and browser-based testing. The aim is simple: understand the real need, agree on the right solution, and deliver a practical outcome without unnecessary friction.
          </p>
        </div>
      </section>

      <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/contact" className="primary-button px-6 py-3">Request a Service</Link>
        <Link href="/services" className="secondary-button px-6 py-3">Explore Services</Link>
      </div>
    </Container>
  );
}
