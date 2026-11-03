import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

const workflow = [
  ["Tell us what you need", "Share the service or business problem you need help with."],
  ["We review your request", "We clarify the details and confirm how we can help."],
  ["Agree on the work", "We confirm the scope, cost, and expected timeline with you."],
  ["Receive your solution", "We complete the agreed work and explain the next steps."],
] as const;

/** Numbered steps: connected horizontally on desktop, a vertical timeline on mobile. */
export function HowIBuild() {
  return (
    <section aria-labelledby="how-it-works-heading" className="section">
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Process"
          title="How It Works"
          description="A clear process from the first conversation to the agreed delivery."
        />

        <ol className="relative mx-auto mt-14 grid max-w-md gap-10 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {/* Connector: vertical on mobile, horizontal through the circle centres on desktop. */}
          <span aria-hidden="true" className="absolute bottom-8 left-8 top-8 w-0.5 bg-accent-soft lg:inset-x-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:top-10 lg:h-0.5 lg:w-auto" />
          {workflow.map(([title, description], index) => (
            <li key={title} data-reveal className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground ring-8 ring-background lg:size-20 lg:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-2 lg:pt-6">
                <h3 className="title-3 text-lg">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-7 text-muted-foreground">{description}</p>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <Link href="/contact" className="btn btn-primary">
            Request a Service
          </Link>
        </div>
      </Container>
    </section>
  );
}
