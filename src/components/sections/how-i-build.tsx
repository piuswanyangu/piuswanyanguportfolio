import { Container } from "@/components/layout/container";

const workflow = [
  [
    "Tell us what you need",
    "Share the service or business problem you need help with.",
  ],
  [
    "We review your request",
    "We clarify the details and confirm how we can help.",
  ],
  [
    "Agree on the work",
    "We confirm the scope, cost, and expected timeline with you.",
  ],
  [
    "Receive your solution",
    "We complete the agreed work and explain the next steps.",
  ],
] as const;

export function HowIBuild() {
  return (
    <section
      aria-labelledby="how-i-build-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-i-build-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            How It Works
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A clear process from the first conversation to the agreed delivery.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map(([title, description], index) => (
            <li key={title} className="interactive-card rounded-lg border border-border bg-surface p-6">
              <p className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-center font-mono text-xs text-accent-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
