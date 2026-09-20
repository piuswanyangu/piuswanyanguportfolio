import Link from "next/link";
import { Container } from "@/components/layout/container";
import { contact } from "@/data/contact";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Start a conversation</p>
            <h2
              id="contact-cta-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Have something you need help with?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Whether it is an online service, data task, website, software project,
              or automation idea, tell Afrinex what you need.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-0 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Request a Service
              </Link>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-sm text-foreground transition-colors hover:text-accent"
              >
                WhatsApp <span aria-hidden="true" className="ml-1">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
