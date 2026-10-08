import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { contact } from "@/data/contact";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Afrinex Solutions about digital assistance, data services, software, AI, automation, design, and website support.",
  path: "/contact",
});

const firstMessageChecklist = [
  {
    label: "Your name",
    detail: "Add the name you want Afrinex to use when responding.",
  },
  {
    label: "The service you need",
    detail: "Mention the support area, such as a registration task, data work, website, software, or automation request.",
  },
  {
    label: "A short description of the task",
    detail: "Describe the goal, what is already in place, and any deadlines or priorities.",
  },
  {
    label: "How you prefer to be contacted",
    detail: "Tell us whether email or WhatsApp is the best way to continue the conversation.",
  },
] as const;

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Tell us what digital task, data work, software project, or professional support you need."
      />

      <section aria-labelledby="enquiry-heading" className="mt-12 rounded-lg border border-border bg-surface p-6 sm:p-8">
        <h2 id="enquiry-heading" className="text-2xl font-semibold tracking-tight text-foreground">Start your enquiry</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Share the basic details needed to begin. Your message will open in WhatsApp or email for you to review and send.</p>
        <Suspense fallback={<p className="mt-6 text-sm text-muted-foreground">Loading enquiry options…</p>}><EnquiryForm /></Suspense>
      </section>

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
                rel="noopener noreferrer"
                className="rounded-sm text-lg font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
              >
                {contact.phone}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="first-message-heading"
        className="mt-12 border-t border-border pt-8"
      >
        <h2
          id="first-message-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          What to include in your first message
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Both channels open with a short starter message you can edit. Adding
          these details helps Afrinex understand the request and reply with
          something useful.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {firstMessageChecklist.map((item) => (
            <li key={item.label} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary-accent"
              />
              <span>
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12">
        <CredentialSafetyNotice />
      </div>
    </Container>
  );
}
import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
