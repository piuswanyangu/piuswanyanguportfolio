import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { contact } from "@/data/contact";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Afrinex Solutions about digital assistance, data services, software, AI, automation, design, and website support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Tell us what digital task, data work, software project, or professional support you need. For now, contact is available by email or WhatsApp."
      />

      <section
        aria-labelledby="contact-options-heading"
        className="mt-12 border-t border-border pt-8"
      >
        <h2 id="contact-options-heading" className="sr-only">
          Contact options
        </h2>
        <dl className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <dt className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email Afrinex
            </dt>
            <dd className="mt-3">
              <a
                href={contact.emailUrl}
                className="rounded-sm text-lg font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
              >
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              WhatsApp Afrinex
            </dt>
            <dd className="mt-3">
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm text-lg font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
              >
                {contact.phone}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </Container>
  );
}
