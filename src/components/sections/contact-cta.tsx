import Link from "next/link";
import { Container } from "@/components/layout/container";
import { contact } from "@/data/contact";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="border-t border-border py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="max-w-3xl">
            <p className="font-mono text-sm font-medium tracking-wide text-accent">
              Contact
            </p>
            <h2
              id="contact-cta-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Let&apos;s Build Something Useful
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              I&apos;m open to software engineering opportunities, freelance
              projects, product collaborations, and conversations with businesses
              looking to improve their digital workflows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={contact.emailUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-[background-color,transform] hover:-translate-y-px hover:bg-accent-hover active:translate-y-0"
              >
                Email Me
              </a>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-[background-color,border-color,transform] hover:-translate-y-px hover:border-accent/40 hover:bg-accent-soft"
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
