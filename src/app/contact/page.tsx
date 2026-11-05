import { Suspense } from "react";
import { EnquiryForm, EnquiryFormWithParams } from "@/components/contact/enquiry-form";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { CredentialSafetyNotice } from "@/components/sections/credential-safety-notice";
import { Icon, type IconName } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import { createPageMetadata, siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Contact",
  fullTitle: "Contact Afrinex Solutions | WhatsApp & Email",
  description:
    "Contact Afrinex Solutions on WhatsApp or by email about KRA and SHA assistance, data services, software, AI, automation, design or website support in Kenya.",
  path: "/contact",
});

const firstMessageChecklist = [
  { label: "Your name", detail: "Add the name you want Afrinex to use when responding." },
  { label: "The service you need", detail: "Mention the support area, such as a registration task, data work, website, software, or automation request." },
  { label: "A short description of the task", detail: "Describe the goal, what is already in place, and any deadlines or priorities." },
  { label: "How you prefer to be contacted", detail: "Tell us whether email or WhatsApp is the best way to continue the conversation." },
] as const;

type InfoCard = { title: string; value: string; icon: IconName; href?: string; external?: boolean };

export default function ContactPage() {
  const infoCards: InfoCard[] = [
    { title: "Email", value: contact.email, icon: "mail", href: contact.emailUrl },
    { title: "WhatsApp", value: contact.phoneDisplay, icon: "whatsapp", href: contact.whatsappUrl, external: true },
    { title: "Location", value: `${siteConfig.contact.location} · remote delivery`, icon: "mapPin" },
  ];
  if (siteConfig.contact.responseTime) {
    infoCards.push({ title: "Response", value: siteConfig.contact.responseTime, icon: "clock" });
  }
  if (siteConfig.contact.hours) {
    infoCards.push({ title: "Hours", value: siteConfig.contact.hours, icon: "calendar" });
  }

  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title="Contact"
        description="Tell us what digital task, data work, software project, or professional support you need."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <h2 className="display-2 text-[1.75rem]">Talk to Afrinex directly</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Both channels open with a short starter message you can edit.
            </p>
            <ul className="mt-8 space-y-4">
              {infoCards.map((card) => {
                const content = (
                  <>
                    <span className="icon-badge">
                      <Icon name={card.icon} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">{card.title}</span>
                      <span className="mt-0.5 block break-words text-lg font-bold text-foreground">{card.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={card.title}>
                    {card.href ? (
                      <a
                        href={card.href}
                        target={card.external ? "_blank" : undefined}
                        rel={card.external ? "noopener noreferrer" : undefined}
                        className="card card-lift flex items-center gap-4 p-5"
                      >
                        {content}
                        {card.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : (
                      <div className="card flex items-center gap-4 p-5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <CredentialSafetyNotice />
            </div>
          </div>

          <section aria-labelledby="enquiry-heading" className="card border border-border p-6 sm:p-10">
            <h2 id="enquiry-heading" className="display-2 text-[1.75rem]">Start your enquiry</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Share the basic details needed to begin. Your message will open in WhatsApp or email for you to review and send.
            </p>
            <noscript>
              <p className="mt-6 rounded-[var(--radius-button)] border border-border bg-surface-muted p-4 text-sm leading-6 text-foreground">
                The enquiry form needs JavaScript. You can reach Afrinex directly by{" "}
                <a href={contact.emailUrl} className="font-semibold text-accent underline">email</a> or on{" "}
                <a href={contact.whatsappUrl} className="font-semibold text-accent underline">WhatsApp</a>.
              </p>
            </noscript>
            <div className="mt-8">
              {/* The fallback is the full form, server-rendered, so this area is never blank. */}
              <Suspense fallback={<EnquiryForm />}>
                <EnquiryFormWithParams />
              </Suspense>
            </div>
          </section>
        </Container>
      </section>

      <section aria-labelledby="first-message-heading" className="section section-tint">
        <Container>
          <div className="max-w-2xl">
            <span aria-hidden="true" className="heading-bar" />
            <h2 id="first-message-heading" className="display-2 mt-5">What to include in your first message</h2>
            <p className="lead mt-4">
              Adding these details helps Afrinex understand the request and reply with something useful.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {firstMessageChecklist.map((item) => (
              <li key={item.label} className="card p-6">
                <Icon name="checkCircle" className="size-7 text-accent" />
                <h3 className="mt-4 font-bold text-foreground">{item.label}</h3>
                <p className="mt-2 text-[0.9375rem] leading-7 text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
