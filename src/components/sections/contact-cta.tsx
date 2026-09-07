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
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <h2
            id="contact-cta-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Contact
          </h2>
          <div className="max-w-2xl">
            <h3
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              Interested in working together?
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              I&apos;m open to software engineering roles, freelance development
              work, and technical collaborations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={contact.emailUrl}
                className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Email Pius
              </a>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-sm text-foreground transition-colors hover:text-accent"
              >
                WhatsApp Me
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              Contact details
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
