import { Container } from "@/components/layout/container";

const workflow = [
  [
    "Tell us what you need",
    "Share the digital task, service request, or technology problem you want help with.",
  ],
  [
    "We assess the request",
    "We review the requirement, clarify important details, and confirm whether Afrinex can help.",
  ],
  [
    "We agree on the solution",
    "Before work begins, we align on the practical approach and what the requested service includes.",
  ],
  [
    "We deliver",
    "We complete the agreed work and communicate the result through the appropriate channel.",
  ],
] as const;

export function HowIBuild() {
  return (
    <section
      aria-labelledby="how-i-build-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="max-w-2xl">
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

        <ol className="mt-10 border-t border-border sm:mt-12">
          {workflow.map(([title, description], index) => (
            <li key={title} className="grid gap-3 border-b border-border py-6 md:grid-cols-[4rem_14rem_1fr] md:gap-6">
              <p className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
