import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { serviceCategories, services } from "@/data/services";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore digital assistance, data, software, AI, automation, creative, and professional services from Afrinex Solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="What we offer"
        title="Services"
        description="Practical digital services and technology support for individuals and businesses. Government-related services are independent assistance services; Afrinex Solutions is not affiliated with KRA, SHA, eCitizen, or the Government of Kenya."
      />

      <div className="mt-12 space-y-12">
        {serviceCategories.map((category) => {
          const categoryServices = services.filter(
            (service) => service.category === category,
          );

          return (
            <section key={category} aria-labelledby={`category-${categoryServices[0].serviceType}`}>
              <h2
                id={`category-${categoryServices[0].serviceType}`}
                className="border-b border-border pb-4 text-2xl font-semibold tracking-tight text-foreground"
              >
                {category}
              </h2>
              <div className="divide-y divide-border">
                {categoryServices.map((service) => (
                  <article
                    key={service.slug}
                    className="grid gap-2 py-5 sm:grid-cols-[minmax(12rem,1fr)_minmax(0,2fr)] sm:gap-8"
                  >
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="max-w-2xl leading-7 text-muted-foreground">
                      {service.shortDescription}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
