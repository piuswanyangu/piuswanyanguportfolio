import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  ["How do I request a service?", "Choose a service or use the contact page, then share your name, preferred contact details, and a short description of what you need."],
  ["Can Afrinex work remotely?", "Yes. Website, software, data, automation, and creative services can be delivered remotely. SHA and KRA assistance is for customers in Kenya."],
  ["What happens after an enquiry?", "Afrinex reviews your message, asks any necessary questions, and confirms whether the request can be supported."],
  ["When are scope and timelines agreed?", "The work, cost, and expected timeline are discussed and agreed before work begins."],
] as const;

export type FaqItem = { question: string; answer: string };

/** Native <details>/<summary> accordion: keyboard and screen-reader support built in. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((faq) => (
        <details key={faq.question} className="card-flat group overflow-hidden open:shadow-[var(--shadow-card)]">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-foreground transition-colors hover:text-accent">
            <span>{faq.question}</span>
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-open:rotate-45">
              <Icon name="plus" className="size-4" strokeWidth={2.4} />
            </span>
          </summary>
          <p className="px-6 pb-6 text-[0.9375rem] leading-7 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="section">
      <Container className="max-w-[52rem]">
        <SectionHeading id="faq-heading" eyebrow="Common questions" title="Before you enquire" />
        <div className="mt-12">
          <FaqList items={faqs.map(([question, answer]) => ({ question, answer }))} />
        </div>
      </Container>
    </section>
  );
}
