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
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">What we offer</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">Services</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Practical digital support for individuals and businesses. Choose the service closest to what you need, then tell us about your request.
        </p>
      </header>

      <div className="mt-16 space-y-20">
        {serviceCategories.map((category) => {
          const details = categoryDetails[category];
          const categoryServices = services.filter((service) => service.category === category);

          return (
            <section key={category} id={details.id} aria-labelledby={`${details.id}-heading`} className="scroll-mt-24">
              <div className="mx-auto max-w-2xl text-center">
                <span className="mx-auto inline-flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent"><ServiceIcon category={category} className="size-6" /></span>
                <h2 id={`${details.id}-heading`} className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{category}</h2>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">{details.description}</p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <article key={service.slug} className="interactive-card flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center">
                    <div className="flex h-16 w-full items-center justify-center text-accent"><ServiceMark service={service} /></div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{service.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{service.shortDescription}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">Useful when you want clear, guided support without having to work through the task alone.</p>
                    <Link href={`/contact?service=${encodeURIComponent(service.name)}`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover">Request this service</Link>
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
