import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { getServiceDetails } from "@/data/service-details";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/site-config";

type ServicePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return createPageMetadata({ title: service.name, description: service.shortDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const details = getServiceDetails(service);

  return <Container className="py-12 sm:py-16 lg:py-20">
    <Link href="/services" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:text-accent-hover">← Back to Services</Link>
    <header className="mx-auto mt-8 max-w-3xl text-center">{service.serviceType === "assistance" && <span className="mx-auto mb-5 inline-flex h-16 items-center rounded-md bg-white px-4">{service.slug === "sha-registration-assistance" ? <Image src="/images/organizations/sha-logo.png" alt="Social Health Authority" width={422} height={90} className="h-10 w-auto object-contain" /> : <Image src="/images/organizations/kra-logo.webp" alt="Kenya Revenue Authority" width={152} height={37} className="h-10 w-auto object-contain" />}</span>}<p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{service.category}</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">{service.name}</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{service.shortDescription}</p></header>
    <div className="mx-auto mt-14 max-w-4xl space-y-12">
      <section aria-labelledby="who-heading" className="text-center"><h2 id="who-heading" className="text-2xl font-semibold text-foreground">Who this helps</h2><p className="mx-auto mt-4 max-w-[65ch] leading-7 text-muted-foreground">{details.whoItHelps}</p></section>
      <div className="grid gap-8 md:grid-cols-2"><section aria-labelledby="included-heading"><h2 id="included-heading" className="text-xl font-semibold text-foreground">What is included</h2><ul className="mt-4 space-y-3">{details.included.map((item) => <li key={item} className="flex gap-3 leading-7 text-muted-foreground"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></section><section aria-labelledby="prepare-heading"><h2 id="prepare-heading" className="text-xl font-semibold text-foreground">What to prepare</h2><ul className="mt-4 space-y-3">{details.prepare.map((item) => <li key={item} className="flex gap-3 leading-7 text-muted-foreground"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></section></div>
      <section aria-labelledby="process-heading"><h2 id="process-heading" className="text-center text-2xl font-semibold text-foreground">How the request works</h2><ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{details.process.map((item, index) => <li key={item} className="rounded-lg border border-border bg-surface p-5"><span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-sm leading-6 text-foreground">{item}</p></li>)}</ol></section>
      {service.serviceType === "assistance" && <CredentialSafetyNotice />}
      <section aria-labelledby="service-faq-heading"><h2 id="service-faq-heading" className="text-center text-2xl font-semibold text-foreground">Frequently asked questions</h2><div className="mt-6 divide-y divide-border border-y border-border">{details.faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></section>
      <div className="text-center"><Link href={`/contact?service=${encodeURIComponent(service.slug)}`} className="interactive-action inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">Request this service</Link></div>
    </div>
  </Container>;
}
