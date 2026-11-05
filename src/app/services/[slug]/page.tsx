import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { ContactCta } from "@/components/sections/contact-cta";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { FaqList } from "@/components/sections/faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { Icon } from "@/components/ui/icons";
import { getServiceDetails } from "@/data/service-details";
import { serviceSeo } from "@/data/service-seo";
import { services } from "@/data/services";
import { absoluteUrl, createPageMetadata, serviceGroupHref, siteConfig } from "@/lib/site-config";

type ServicePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  const seo = serviceSeo[service.slug];
  return createPageMetadata({
    title: seo?.title ?? service.name,
    description: seo?.description ?? service.shortDescription,
    path: `/services/${service.slug}`,
    image: `/services/${service.slug}/opengraph-image`,
  });
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7 text-muted-foreground">
          <Icon name="checkCircle" className="mt-1 size-5 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const details = getServiceDetails(service);
  const group = siteConfig.serviceGroups.find((item) => item.category === service.category);
  const requestHref = `/contact?service=${encodeURIComponent(service.slug)}`;
  const pageUrl = absoluteUrl(`/services/${service.slug}`);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: service.name,
          description: serviceSeo[service.slug]?.description ?? service.shortDescription,
          serviceType: service.name,
          category: service.category,
          url: pageUrl,
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: { "@type": "Country", name: "Kenya" },
        }}
      />
      <PageBanner
        eyebrow={service.category}
        title={service.name}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={requestHref} className="btn btn-primary">Request this service</Link>
          {group && (
            <Link href={serviceGroupHref(group.id)} className="btn btn-outline">
              More {group.shortLabel.toLowerCase()} services
            </Link>
          )}
        </div>
      </PageBanner>

      <section aria-labelledby="who-heading" className="section">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <span className="icon-badge size-16 rounded-xl">
              <Icon name={service.icon} className="size-8" />
            </span>
            <h2 id="who-heading" className="display-2 mt-6">Who this helps</h2>
            <p className="lead mt-4">{details.whoItHelps}</p>
            {service.category === "Digital & Online Services" && (
              <p className="mt-6 flex gap-3 text-[0.9375rem] leading-7 text-muted-foreground">
                <Icon name="shield" className="mt-1 size-5 shrink-0 text-accent" />
                Afrinex Solutions is an independent service provider and is not affiliated with SHA or KRA.
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <section aria-labelledby="included-heading" className="card p-7">
              <h3 id="included-heading" className="title-3">What is included</h3>
              <CheckList items={details.included} />
            </section>
            <section aria-labelledby="prepare-heading" className="card p-7">
              <h3 id="prepare-heading" className="title-3">What to prepare</h3>
              <CheckList items={details.prepare} />
            </section>
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="section section-tint">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span aria-hidden="true" className="heading-bar mx-auto" />
            <h2 id="process-heading" className="display-2 mt-5">How the request works</h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.process.map((item, index) => (
              <li key={item} className="card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-semibold leading-7 text-foreground">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="service-faq-heading" className="section">
        <Container className="max-w-[52rem]">
          <div className="text-center">
            <span aria-hidden="true" className="heading-bar mx-auto" />
            <h2 id="service-faq-heading" className="display-2 mt-5">Frequently asked questions</h2>
          </div>
          <div className="mt-10">
            <FaqList items={details.faqs} />
          </div>
          {service.serviceType === "assistance" && (
            <div className="mt-10">
              <CredentialSafetyNotice />
            </div>
          )}
        </Container>
      </section>

      <ContactCta
        title={`Need help with ${service.name}?`}
        description="Send a short enquiry. Scope, cost, and the expected timeline are agreed before work begins."
        requestHref={requestHref}
      />
    </>
  );
}
