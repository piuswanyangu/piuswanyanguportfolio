import { Container } from "@/components/layout/container";

const principles = [
  {
    title: "One partner, multiple digital needs",
    description:
      "Get help with everyday online tasks, data work, creative support, and more advanced technology projects in one place.",
  },
  {
    title: "Technology-focused",
    description:
      "We use modern software, AI, data, and automation where they genuinely make the solution clearer or more effective.",
  },
  {
    title: "Practical solutions",
    description:
      "The customer problem comes first. Technology is selected to support the work, not to add unnecessary complexity.",
  },
  {
    title: "Direct communication",
    description:
      "Discuss your request directly through the available email and WhatsApp contact channels.",
  },
] as const;

export function WhyAfrinex() {
  return (
    <section
      aria-labelledby="why-afrinex-heading"
      className="section-enter border-t border-border bg-surface-muted py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Why Afrinex</p>
          <h2 id="why-afrinex-heading" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Technology support grounded in real needs.
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li key={principle.title} className="interactive-card rounded-lg border border-border bg-surface p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-soft font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-semibold text-foreground">{principle.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{principle.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
