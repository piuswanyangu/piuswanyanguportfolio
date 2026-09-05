import { Container } from "@/components/layout/container";

const workflow = [
  ["Discover", "Understand users, business needs, and practical constraints."],
  ["Design", "Shape clear journeys, interfaces, and product requirements."],
  ["Architect", "Define system boundaries, APIs, data models, and infrastructure."],
  ["Build", "Implement maintainable frontend and backend systems."],
  ["Test", "Validate behavior, edge cases, and system integration."],
  ["Deploy", "Prepare delivery workflows and ship dependable software."],
  ["Observe", "Monitor behavior and identify failures or bottlenecks."],
  ["Improve", "Use feedback and evidence to guide the next iteration."],
] as const;

export function HowIBuild() {
  return (
    <section
      aria-labelledby="how-i-build-heading"
      className="border-y border-border bg-surface-muted py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium tracking-wide text-accent">
            Engineering process
          </p>
          <h2
            id="how-i-build-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            How I Build Software
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A practical process that connects product understanding with sound
            engineering and continuous improvement.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map(([title, description], index) => (
            <li key={title} className="bg-surface p-6">
              <p className="font-mono text-xs text-secondary-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
