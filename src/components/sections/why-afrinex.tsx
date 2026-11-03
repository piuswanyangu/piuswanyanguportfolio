import { Container } from "@/components/layout/container";
import { Icon, type IconName } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const principles: ReadonlyArray<{ title: string; description: string; icon: IconName }> = [
  {
    title: "One partner, multiple digital needs",
    description:
      "Get help with everyday online tasks, data work, creative support, and more advanced technology projects in one place.",
    icon: "layers",
  },
  {
    title: "Technology-focused",
    description:
      "We use modern software, AI, data, and automation where they genuinely make the solution clearer or more effective.",
    icon: "cpu",
  },
  {
    title: "Practical solutions",
    description:
      "The customer problem comes first. Technology is selected to support the work, not to add unnecessary complexity.",
    icon: "target",
  },
  {
    title: "Direct communication",
    description:
      "Discuss your request directly through the available email and WhatsApp contact channels.",
    icon: "message",
  },
];

export function WhyAfrinex() {
  return (
    <section aria-labelledby="why-afrinex-heading" className="section bg-accent-soft/60">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="why-afrinex-heading"
          eyebrow="Why Afrinex"
          title="Technology support grounded in real needs."
          align="left"
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title} data-reveal className="card card-lift p-7">
              <span className="icon-badge">
                <Icon name={principle.icon} className="size-6" />
              </span>
              <h3 className="title-3 mt-5 text-lg">{principle.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-7 text-muted-foreground">{principle.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
