/**
 * DRAFT — NOT REVIEWED. These terms are a structural draft for a Kenya-based
 * digital services business. They must be reviewed (ideally by a qualified
 * advocate) and every "TODO: review" marker resolved before they are relied on
 * or indexed. They are not legal advice.
 */
import Link from "next/link";
import { LegalPage, Todo } from "@/components/legal/legal-page";
import { contact } from "@/data/contact";
import { createPageMetadata, siteConfig } from "@/lib/site-config";

export const metadata = {
  ...createPageMetadata({
    title: "Terms of Service",
    description: "Terms that apply when you use the Afrinex Solutions website or request a service.",
    path: "/terms",
  }),
  // TODO(Pius): remove once the terms have been reviewed and finalised.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      description="The terms that apply when you use this website or request a service from Afrinex Solutions."
      lastUpdated="Draft, not yet published"
    >
      <h2>1. About these terms</h2>
      <p>
        These terms apply to your use of this website and to services provided by {siteConfig.name}. By sending an enquiry or agreeing to work with us, you accept these terms. <Todo />
      </p>

      <h2>2. Our services</h2>
      <p>
        Afrinex provides digital and online assistance, data services, software and website development, AI and automation, and creative and professional support. Service descriptions on this website are general and do not form an offer.
      </p>
      <p>
        {siteConfig.name} is an independent service provider and is not affiliated with SHA, KRA, or any government agency. Decisions on registrations, filings, and applications are made by the relevant authority, and we cannot guarantee their outcome. <Todo />
      </p>

      <h2>3. Enquiries, scope, and quotes</h2>
      <p>
        After you send an enquiry we review it and confirm whether we can help. The work, cost, and expected timeline are agreed with you before work begins. <Todo>TODO: review — specify how agreements are confirmed (e.g. written quote, message confirmation).</Todo>
      </p>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide information that is accurate, complete, and yours to share.</li>
        <li>Share sensitive details only through the method we confirm.</li>
        <li>Review work or submissions when asked and tell us promptly about any errors.</li>
      </ul>

      <h2>5. Fees and payment</h2>
      <p>
        <Todo>TODO: review — set payment methods (e.g. M-Pesa), deposits, due dates, refunds and cancellations, and government fees paid on the client&apos;s behalf.</Todo>
      </p>

      <h2>6. Deliverables and intellectual property</h2>
      <p>
        <Todo>TODO: review — state when ownership of websites, software, designs and source files transfers to the client, and any rights Afrinex retains (e.g. reusable components, portfolio use with permission).</Todo>
      </p>

      <h2>7. Third-party platforms</h2>
      <p>
        Some work depends on third-party services such as government portals, hosting providers, or messaging apps. We are not responsible for their availability, changes, or fees.
      </p>

      <h2>8. Confidentiality and personal data</h2>
      <p>
        We treat information you share as confidential and handle personal data as described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        <Todo>TODO: review — define limits of liability consistent with Kenyan law, including the Consumer Protection Act, 2012.</Todo>
      </p>

      <h2>10. Ending work</h2>
      <p>
        <Todo>TODO: review — set notice, payment for work completed, and handover terms when either party ends an engagement.</Todo>
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of Kenya. <Todo>TODO: review — confirm dispute-resolution approach (negotiation, mediation, courts).</Todo>
      </p>

      <h2>12. Changes</h2>
      <p>We may update these terms. The version shown on this page applies from the date stated above.</p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms: email <a href={contact.emailUrl}>{contact.email}</a> or message us on <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
      </p>
    </LegalPage>
  );
}
