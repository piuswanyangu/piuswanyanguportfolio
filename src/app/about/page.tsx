import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Afrinex Solutions and its practical approach to digital services, software, AI, automation, and data support.",
  path: "/about",
});

const workAreas = [
  {
    title: "Digital assistance",
    body: "Practical assistance with selected online processes, including SHA and KRA-related registration and returns tasks.",
  },
  {
    title: "Data services",
    body: "Data entry, cleaning, and analysis for clearer, more useful information.",
  },
  {
    title: "Software and technology",
    body: "Software development, AI-powered solutions, automation services, and website maintenance.",
  },
  {
    title: "Creative and professional support",
    body: "Graphic design and LinkedIn profile optimization for clearer communication and positioning.",
  },
] as const;

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22 ">
      <article className="max-w-4xl">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">About</p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">
            Practical help with digital work.
          </h1>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Afrinex Solutions helps individuals and businesses handle digital tasks, build digital solutions, and work smarter with technology.
            </p>
            <p>
              The company brings digital assistance, data work, software development, AI, automation, and creative support into one practical service offering.
            </p>
            <p>
              Afrinex Solutions was founded by Pius Wanyangu, Founder &amp; Software Engineer. More founder and company information will be added as the website develops.
            </p>
          </div>
        </header>

        <section aria-labelledby="work-heading" className="mt-16 border-t border-border pt-8 sm:mt-20">
          <h2 id="work-heading" className="text-2xl font-semibold tracking-tight text-foreground">What Afrinex works on</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {workAreas.map((area) => (
              <div key={area.title} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <h3 className="font-semibold text-foreground">{area.title}</h3>
                <p className="max-w-2xl leading-7 text-muted-foreground">{area.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="independence-heading" className="mt-16 border-t border-border pt-8 sm:mt-20">
          <h2 id="independence-heading" className="text-2xl font-semibold tracking-tight text-foreground">Independent assistance</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Government-related services are provided as independent assistance. Afrinex Solutions is not KRA, SHA, eCitizen, the Government of Kenya, or an official representative of those institutions.
          </p>
        </section>
      </article>

      <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:mt-20 sm:flex-row">
        <Link
          href="/services"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Explore Services
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
        >
          Request a Service
        </Link>
      </div>
    </Container>
  );
}
