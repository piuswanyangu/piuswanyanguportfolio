import { Container } from "@/components/layout/container";
import { capabilityGroups } from "@/data/technical-capabilities";

export function TechnicalCapabilities() {
  return (
    <section
      aria-labelledby="technical-capabilities-heading"
      className="border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <div>
          <h2
            id="technical-capabilities-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Engineering Stack
          </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Technologies I use across interfaces, APIs, data models,
              background work, and deployment.
            </p>
          </div>
          <dl className="border-t border-border">
            {capabilityGroups.map((group) => (
              <div key={group.title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {group.title.replace(" Engineering", "")}
                </dt>
                <dd className="leading-7 text-foreground">
                  {group.skills.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
