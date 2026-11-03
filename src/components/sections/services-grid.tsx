import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

/** Card grid of every service from the data file (3 / 2 / 1 columns). */
export function ServicesGrid() {
  return (
    <section aria-labelledby="services-grid-heading" className="section section-tint">
      <Container>
        <SectionHeading
          id="services-grid-heading"
          eyebrow="What We Do"
          title="Practical support for the work in front of you"
          description="Afrinex helps with the online services, data work, software, AI, automation, and creative support that people and businesses need to move forward with less friction."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 sm:max-lg:[&>li:last-child:nth-child(odd)]:col-span-2 sm:max-lg:[&>li:last-child:nth-child(odd)]:mx-auto sm:max-lg:[&>li:last-child:nth-child(odd)]:w-[calc(50%-0.75rem)] lg:[&>li:last-child:nth-child(3n+1)]:col-start-2">
          {services.map((service) => (
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
              <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted-foreground">{service.shortDescription}</p>
              <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Learn more
                <Icon name="arrowRight" className="size-4" />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn btn-primary">
            View all services
          </Link>
        </div>
      </Container>
    </section>
  );
}
