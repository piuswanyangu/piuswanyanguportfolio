import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icons";
import { contact } from "@/data/contact";

type ContactCtaProps = {
  title?: string;
  description?: string;
  /** Contact link, e.g. with a `?service=` prefill. */
  requestHref?: string;
};

/** Full-width brand band closing most pages. */
export function ContactCta({
  title = "Have something you need help with?",
  description = "Whether it is an online service, data task, website, software project, or automation idea, tell Afrinex what you need.",
  requestHref = "/contact",
}: ContactCtaProps) {
  return (
    <section aria-labelledby="contact-cta-heading" className="on-brand relative overflow-hidden bg-brand-band text-on-brand">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        className="pointer-events-none absolute -left-20 -top-20 size-80 opacity-10"
      >
        <circle cx="100" cy="100" r="96" strokeWidth="2" />
        <circle cx="100" cy="100" r="66" strokeWidth="2" />
      </svg>
      <Container className="relative py-16 text-center sm:py-20">
        <span aria-hidden="true" className="mx-auto block h-1 w-14 rounded-full bg-on-brand/70" />
        <h2 id="contact-cta-heading" className="display-2 mt-5 text-on-brand">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-on-brand-muted">{description}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={requestHref} className="btn btn-on-brand">
            Request a Service
          </Link>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-on-brand">
            <Icon name="whatsapp" className="size-4" />
            WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
