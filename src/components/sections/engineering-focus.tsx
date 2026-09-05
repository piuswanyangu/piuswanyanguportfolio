import { Container } from "@/components/layout/container";

const focusAreas = [
  {
    number: "01",
    title: "Full-Stack Web Applications",
    description:
      "Responsive interfaces connected to dependable backend services, built with maintainable architecture and production use in mind.",
  },
  {
    number: "02",
    title: "Backend Systems & APIs",
    description:
      "Structured APIs and business logic with thoughtful authentication, authorization, database design, and reliability.",
  },
  {
    number: "03",
    title: "Workflow Automation",
    description:
      "Software workflows that replace repetitive manual processes, reduce administrative overhead, and improve operational consistency.",
  },
  {
    number: "04",
    title: "AI-Powered Applications",
    description:
      "Useful AI integrated into product workflows for assistance, search, analysis, recommendations, and automation—not as a gimmick.",
  },
] as const;

export function EngineeringFocus() {
  return (
    <section
      aria-labelledby="engineering-focus-heading"
      className="border-y border-border bg-surface-muted py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium tracking-wide text-accent">
            Engineering focus
          </p>
          <h2
            id="engineering-focus-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            What I Build
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            I build practical software systems that bring together thoughtful
            interfaces, reliable backend engineering, workflow automation, and
            useful AI.
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {focusAreas.map((area) => (
            <article key={area.number} className="border-t border-border pt-6">
              <p className="font-mono text-xs font-medium text-secondary-accent">
                {area.number}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
