import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { PageCta } from "@/components/sections/page-cta";
import { ServiceIcon } from "@/components/services/service-icon";
import { serviceCategories, services, type Service } from "@/data/services";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore digital assistance, data, software, AI, automation, creative, and professional services from Afrinex Solutions.",
  path: "/services",
});

const categoryDetails = {
  "Digital & Online Services": { id: "digital-online-services", description: "Practical help with selected online processes and government service platforms." },
  "Data Services": { id: "data-services", description: "Turn everyday records and spreadsheets into information that is easier to use." },
  "Software & Technology": { id: "software-technology", description: "Build, improve, and maintain digital tools around a clear business need." },
  "Creative & Professional": { id: "creative-professional", description: "Present your work or business more clearly with practical creative support." },
} as const;

function ServiceMark({ service }: { service: Service }) {
  if (service.slug === "sha-registration-assistance") {
    return <span className="inline-flex h-14 max-w-full items-center rounded-md bg-white px-3"><Image src="/images/organizations/sha-logo.png" alt="Social Health Authority" width={422} height={90} className="h-9 w-auto max-w-full object-contain" /></span>;
  }

  if (service.slug.startsWith("kra-") || service.slug === "etims-assistance") {
    return <span className="inline-flex h-14 max-w-full items-center rounded-md bg-white px-3"><Image src="/images/organizations/kra-logo.webp" alt="Kenya Revenue Authority" width={152} height={37} className="h-9 w-auto max-w-full object-contain" /></span>;
  }

  return <ServiceIcon category={service.category} className="size-7" />;
}

export default function ServicesPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">What we offer</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          Practical digital support built around the real task.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Afrinex helps with the online services, data work, software, AI, automation, and creative support that people and businesses need to move forward with less friction.
        </p>
      </header>

      <div className="mt-16 space-y-20">
        {serviceCategories.map((category) => {
          const details = categoryDetails[category];
          const categoryServices = services.filter((service) => service.category === category);

          return (
            <section key={category} id={details.id} aria-labelledby={`${details.id}-heading`} className="scroll-mt-24">
              <div className="mx-auto max-w-3xl text-center">
                <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-border"><ServiceIcon category={category} className="size-6" /></span>
                <h2 id={`${details.id}-heading`} className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{category}</h2>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">{details.description}</p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {categoryServices.map((service) => (
                  <article key={service.slug} className="interactive-card flex h-full flex-col rounded-[1.5rem] border border-border bg-surface p-6 shadow-sm">
                    <div className="flex h-16 w-full items-center justify-center rounded-2xl border border-border bg-surface-muted text-accent">
                      <ServiceMark service={service} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{service.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{service.shortDescription}</p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">Useful when you need clear, guided support without having to figure out the task alone.</p>
                    <Link href={`/services/${service.slug}`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover">
                      View service details
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-3xl sm:mt-20"><CredentialSafetyNotice /></div>
      <div className="mx-auto max-w-3xl text-center">
        <PageCta title="Not sure which service fits?" description="Describe what you are trying to get done. Afrinex will review the request and help identify the most suitable next step before work begins." secondary={{ href: "/work", label: "See selected work" }} centered />
      </div>
    </Container>
  );
}
