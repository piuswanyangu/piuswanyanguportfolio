import { Container } from "@/components/layout/container";
import { approvedTestimonials } from "@/data/testimonials";

export function Testimonials() {
  if (approvedTestimonials.length === 0) return null;
  return <section aria-labelledby="testimonials-heading" className="border-t border-border py-14 sm:py-18"><Container><div className="mx-auto max-w-2xl text-center"><h2 id="testimonials-heading" className="text-3xl font-semibold tracking-tight text-foreground">Client feedback</h2></div><div className="mt-9 grid gap-5 md:grid-cols-3">{approvedTestimonials.slice(0, 3).map((item) => <figure key={`${item.customerName}-${item.service}`} className="interactive-card rounded-lg border border-border bg-surface p-6"><blockquote className="leading-7 text-foreground">“{item.quote}”</blockquote><figcaption className="mt-5 text-sm text-muted-foreground"><strong className="block text-foreground">{item.customerName}</strong>{item.businessOrRole && <span className="block">{item.businessOrRole}</span>}<span className="mt-2 block font-mono text-xs text-accent">{item.service}</span></figcaption></figure>)}</div></Container></section>;
}
