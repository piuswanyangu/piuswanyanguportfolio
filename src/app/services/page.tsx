import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { ContactCta } from "@/components/sections/contact-cta";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { ServiceIcon } from "@/components/services/service-icon";
import { Icon } from "@/components/ui/icons";
import { services, type Service } from "@/data/services";
import { createPageMetadata, siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Digital, Data & Software Services in Kenya",
  description:
    "KRA, SHA and eTIMS assistance, data entry and analysis, website and software development, AI, automation and design services from Afrinex Solutions in Kenya.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="What we offer"
        title="Practical digital support built around the real task."
        description="Afrinex helps with the online services, data work, software, AI, automation, and creative support that people and businesses need to move forward with less friction."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      {/* In-page group navigation, pinned under the site header. */}
      <nav
        aria-label="Service groups"
        className="sticky top-[var(--header-height)] z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <Container>
          <ul className="-mx-1 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {siteConfig.serviceGroups.map((group) => (
              <li key={group.id} className="shrink-0">
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <ServiceIcon category={group.category} className="size-4" />
                  {group.category}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {siteConfig.serviceGroups.map((group, groupIndex) => {
        const groupServices = services.filter((service) => service.category === group.category);

        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            className={`section scroll-mt-[calc(var(--header-height)+4rem)] ${groupIndex % 2 === 1 ? "section-tint" : ""}`}
          >
            <Container>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span aria-hidden="true" className="heading-bar" />
                  <div className="mt-5 flex items-center gap-4">
                    <span className="icon-badge">
                      <ServiceIcon category={group.category} className="size-6" />
                    </span>
                    <h2 id={`${group.id}-heading`} className="display-2">{group.category}</h2>
                  </div>
                  <p className="lead mt-4">{group.description}</p>
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(group.category)}`}
                  className="text-link shrink-0"
                >
                  Ask about {group.shortLabel.toLowerCase()} services
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </div>

              {group.id === "digital-online-services" && (
                <p className="mt-6 flex max-w-3xl gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-5 py-4 text-[0.9375rem] leading-7 text-foreground">
                  <Icon name="shield" className="mt-1 size-5 shrink-0 text-accent" />
                  <span>Afrinex Solutions is an independent service provider and is not affiliated with SHA or KRA.</span>
                </p>
              )}

              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {groupServices.map((service) => {
                  const { whoItsFor } = service as Service;
                  return (
                    <li key={service.slug} data-reveal className="card card-lift relative flex flex-col p-7 sm:p-8">
                      <span className="icon-badge">
                        <Icon name={service.icon} className="size-6" />
                      </span>
                      <h3 className="title-3 mt-5 text-xl">
                        <Link
                          href={`/services/${service.slug}`}
                          className="rounded-sm transition-colors after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] hover:text-accent focus-visible:outline-none"
                        >
                          {service.name}
                        </Link>
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-7 text-muted-foreground">{service.shortDescription}</p>
                      {whoItsFor && (
                        <p className="mt-3 text-sm leading-6 text-foreground">
                          <span className="font-semibold">Who it&apos;s for: </span>
                          {whoItsFor}
                        </p>
                      )}
                      <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent">
                        View service details
                        <Icon name="arrowRight" className="size-4" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        );
      })}

      <Container className="max-w-[52rem] py-16 sm:py-20">
        <CredentialSafetyNotice />
      </Container>

      <ContactCta
        title="Not sure which service fits?"
        description="Describe what you are trying to get done. Afrinex will review the request and help identify the most suitable next step before work begins."
      />
    </>
  );
}
