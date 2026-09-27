import { Container } from "@/components/layout/container";

const faqs = [
  ["How do I request a service?", "Choose a service or use the contact page, then share your name, preferred contact details, and a short description of what you need."],
  ["Can Afrinex work remotely?", "Yes. Website, software, data, automation, and creative services can be delivered remotely. SHA and KRA assistance is for customers in Kenya."],
  ["What happens after an enquiry?", "Afrinex reviews your message, asks any necessary questions, and confirms whether the request can be supported."],
  ["When are scope and timelines agreed?", "The work, cost, and expected timeline are discussed and agreed before work begins."],
] as const;

export function FaqSection() {
  return <section aria-labelledby="faq-heading" className="section-enter border-t border-border py-14 sm:py-18"><Container><div className="mx-auto max-w-3xl"><div className="text-center"><p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Common questions</p><h2 id="faq-heading" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Before you enquire</h2></div><div className="mt-9 divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex min-h-7 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground marker:content-none"><span>{question}</span><span aria-hidden="true" className="text-accent group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl pr-8 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></div></Container></section>;
}
