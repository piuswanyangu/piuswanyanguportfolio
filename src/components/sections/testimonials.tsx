import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { approvedTestimonials, type Testimonial } from "@/data/testimonials";

type TestimonialsProps = { items?: readonly Testimonial[] };

/** Renders nothing until at least one approved testimonial exists. */
export function Testimonials({ items = approvedTestimonials }: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="section">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow="Client feedback" title="What clients say" />
        <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <li key={`${item.name}-${item.location}`} data-reveal className="card relative px-7 pb-8 pt-12 text-center">
              {item.photo && (
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  width={72}
                  height={72}
                  className="absolute -top-9 left-1/2 size-[4.5rem] -translate-x-1/2 rounded-full object-cover ring-4 ring-background"
                />
              )}
              <figure>
                <blockquote className="italic leading-8 text-foreground">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-6">
                  <span className="block font-bold text-foreground">{item.name}</span>
                  {item.businessOrRole && <span className="block text-sm text-muted-foreground">{item.businessOrRole}</span>}
                  <span className="mt-1 block text-sm font-medium text-accent">{item.location}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
