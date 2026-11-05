import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { ContactCta } from "@/components/sections/contact-cta";
import { Icon, type IconName } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata, siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About",
  fullTitle: "About Afrinex Solutions | Kenya-Based Digital Services",
  description:
    "Learn about Afrinex Solutions, a Kenya-based provider of digital assistance, data services, software development, AI, automation, and creative support.",
  path: "/about",
});

const values: ReadonlyArray<{ title: string; icon: IconName }> = [
  { title: "Practical understanding of the real task", icon: "target" },
  { title: "Clear communication before work begins", icon: "message" },
  { title: "Technology used where it adds value", icon: "cpu" },
  { title: "Remote delivery, with Kenya-based support", icon: "globe" },
];

const stack = ["Next.js", "React", "TypeScript", "Django", "PostgreSQL", "Docker", "Playwright"] as const;

export default function AboutPage() {
  const founderLinks = [
    siteConfig.social.linkedin ? { label: "LinkedIn", href: siteConfig.social.linkedin, icon: "linkedin" as const } : null,
    siteConfig.social.github ? { label: "GitHub", href: siteConfig.social.github, icon: "github" as const } : null,
  ].filter((link) => link !== null);

  return (
    <>
      <PageBanner
        eyebrow="About Afrinex"
        title="One partner for the digital tasks that keep work moving."
        description="Afrinex Solutions helps people and businesses with the practical digital work that needs to get done, from online assistance and data handling to software, automation, and creative support."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <section aria-labelledby="story-heading" className="section">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-md" data-reveal>
            <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-2/3 w-2/3 rounded-[var(--radius-card)] bg-accent-soft" />
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
              <Image
                src="/images/pius-wanyangu-profile.jpeg"
                alt="Pius Wanyangu, founder of Afrinex Solutions"
                fill
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div data-reveal>
            <span aria-hidden="true" className="heading-bar" />
            <p className="eyebrow mt-5">Why it exists</p>
            <h2 id="story-heading" className="display-2 mt-2">
              Bringing digital support together in one clear place.
            </h2>
            <p className="lead mt-5">
              Different digital needs often sit across multiple providers and processes. Afrinex brings these needs together so people can explain the problem once and work with a partner who helps them decide on the right next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/services" className="btn btn-primary">Our Services</Link>
              <Link href="/contact" className="btn btn-outline">Request a Service</Link>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach-heading" className="section section-tint">
        <Container>
          <SectionHeading id="approach-heading" eyebrow="Mission & approach" title="How Afrinex works" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title} data-reveal className="card card-lift p-7 text-center">
                <span className="icon-badge mx-auto size-14 rounded-full">
                  <Icon name={value.icon} className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-7 text-foreground">{value.title}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="founder-heading" className="section">
        <Container className="max-w-[60rem]">
          <SectionHeading id="founder-heading" eyebrow="Leadership" title="Meet the founder" />
          <article className="card mt-12 grid gap-8 p-6 sm:grid-cols-[10rem_1fr] sm:items-start sm:p-10">
            <div className="relative mx-auto size-40 overflow-hidden rounded-full ring-4 ring-accent-soft sm:mx-0">
              <Image
                src="/images/pius-wanyangu-profile.jpeg"
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="title-3 text-2xl">{siteConfig.founder.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{siteConfig.founder.role}</p>
              <p className="mt-4 leading-8 text-muted-foreground">
                Pius leads the technical work directly, from software and backend development to automation, data workflows, and browser-based testing. The aim is simple: understand the real need, agree on the right solution, and deliver a practical outcome without unnecessary friction.
              </p>

              <h4 className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-foreground">Tools &amp; stack</h4>
              <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {stack.map((item) => (
                  <li key={item} className="chip bg-surface-muted font-medium">{item}</li>
                ))}
              </ul>

              {founderLinks.length > 0 && (
                <ul className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
                  {founderLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline min-h-11 px-5"
                      >
                        <Icon name={link.icon} className="size-4" />
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
