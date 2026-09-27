import Link from "next/link";
import { Container } from "@/components/layout/container";
import { serviceCategories, services } from "@/data/services";

export function ServiceCategories() {
  return (
    <section
      aria-labelledby="service-categories-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Services</p>
            <h2
              id="service-categories-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Help for everyday digital tasks and bigger technology needs.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Choose the area closest to what you need. Afrinex can help clarify the request before any work begins.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              Explore all services <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid border-t border-border sm:grid-cols-2">
            {serviceCategories.map((category, index) => {
              const categoryServices = services.filter(
                (service) => service.category === category,
              );

              return (
                <article
                  key={category}
                  className="border-b border-border py-6 sm:px-6 sm:first:border-r sm:nth-[3]:border-r"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[15rem] text-lg font-semibold tracking-tight text-foreground">
                      {category}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {categoryServices.map((service) => (
                      <li key={service.slug} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary-accent" />
                        {service.name}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
