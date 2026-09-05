import { Container } from "@/components/layout/container";
import { capabilityGroups } from "@/data/technical-capabilities";

export function TechnicalCapabilities() {
  return (
    <section
      aria-labelledby="technical-capabilities-heading"
      className="border-y border-border bg-surface-muted py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium tracking-wide text-accent">
            Technical capabilities
          </p>
          <h2
            id="technical-capabilities-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Tools Behind the Work
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            My stack spans frontend development, backend systems, databases,
            automation, and deployment tooling. I choose technologies around the
            problem rather than forcing every project into the same stack.
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="border-t border-border pt-6">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-sm border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
