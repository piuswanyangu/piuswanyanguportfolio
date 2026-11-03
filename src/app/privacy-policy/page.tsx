/**
 * DRAFT — NOT REVIEWED. This privacy policy is a structural draft prepared to
 * reflect the Kenya Data Protection Act, 2019. It must be reviewed (ideally
 * by a qualified advocate) and every "TODO: review" marker resolved before it
 * is relied on or indexed. It is not legal advice.
 */
import Link from "next/link";
import { LegalPage, Todo } from "@/components/legal/legal-page";
import { contact } from "@/data/contact";
import { createPageMetadata, siteConfig } from "@/lib/site-config";

export const metadata = {
  ...createPageMetadata({
    title: "Privacy Policy",
    description: "How Afrinex Solutions collects, uses, and protects personal data shared through enquiries and service requests.",
    path: "/privacy-policy",
  }),
  // TODO(Pius): remove once the policy has been reviewed and finalised.
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      description="How Afrinex Solutions handles personal data shared through enquiries and service requests."
      lastUpdated="Draft, not yet published"
    >
      <h2>1. Who we are</h2>
      <p>
        {siteConfig.name} (&ldquo;Afrinex&rdquo;, &ldquo;we&rdquo;) is a Kenya-based provider of digital services, data services, software, AI, and automation. For personal data described in this policy, Afrinex acts as the data controller. <Todo />
      </p>
      <p>
        <Todo>TODO: review — add registered business name, physical/postal address, and Office of the Data Protection Commissioner (ODPC) registration number if registration applies.</Todo>
      </p>

      <h2>2. Personal data we collect</h2>
      <h3>When you send an enquiry</h3>
      <ul>
        <li>Your name and the contact channel you choose (email address or WhatsApp number).</li>
        <li>The service you are interested in and the message you write.</li>
      </ul>
      <h3>When we provide a service</h3>
      <p>
        Some services, such as SHA, KRA, or eTIMS assistance, may require identification or tax details (for example an ID number or KRA PIN). We ask for this only after reviewing your request, only where it is needed for the agreed work, and we confirm a safe way to share it. Please do not send passwords or PINs in a first message. <Todo />
      </p>
      <h3>When you visit this website</h3>
      <p>
        The site stores your colour-theme choice in your browser&apos;s local storage. It does not use advertising cookies. <Todo>TODO: review — update if analytics or hosting logs are added or retained.</Todo>
      </p>

      <h2>3. How and why we use personal data</h2>
      <ul>
        <li>To reply to your enquiry and discuss the scope, cost, and timeline of work.</li>
        <li>To perform the service you have agreed to, including submitting information to a government platform on your instruction.</li>
        <li>To keep basic records of work done and communications.</li>
        <li>To meet legal obligations.</li>
      </ul>

      <h2>4. Lawful basis for processing</h2>
      <p>
        Under the Data Protection Act, 2019, we rely on your consent, the need to take steps at your request before entering into an agreement or to perform an agreement with you, and compliance with legal obligations. <Todo />
      </p>
      <p>
        <Todo>TODO: review — confirm treatment of sensitive personal data and any additional conditions required.</Todo>
      </p>

      <h2>5. Sharing personal data</h2>
      <p>We do not sell personal data. We share it only where needed to deliver the service, for example:</p>
      <ul>
        <li>Communication providers you choose to contact us through (WhatsApp, email).</li>
        <li>Government platforms (such as SHA, KRA, or eTIMS) when you instruct us to complete a process on your behalf.</li>
        <li>Authorities where required by law.</li>
      </ul>
      <p>
        {siteConfig.name} is an independent service provider and is not affiliated with SHA or KRA.
      </p>

      <h2>6. Transfers outside Kenya</h2>
      <p>
        Email and messaging providers may store data on servers outside Kenya. <Todo>TODO: review — describe safeguards relied on for cross-border transfers under the Act and its regulations.</Todo>
      </p>

      <h2>7. How long we keep data</h2>
      <p>
        We keep personal data only as long as needed for the purpose it was collected, then delete or anonymise it. <Todo>TODO: review — set specific retention periods (e.g. enquiries, completed-service records, identification documents).</Todo>
      </p>

      <h2>8. How we protect data</h2>
      <p>
        We take reasonable steps to protect personal data against loss, misuse, and unauthorised access. <Todo>TODO: review — describe the measures actually in place (who has access, how documents are stored, when sensitive files are deleted).</Todo>
      </p>

      <h2>9. Your rights</h2>
      <p>Under the Data Protection Act, 2019 you have the right to:</p>
      <ul>
        <li>be informed of how your personal data is used;</li>
        <li>access personal data we hold about you;</li>
        <li>object to processing of all or part of your personal data;</li>
        <li>have inaccurate or misleading data corrected;</li>
        <li>have false or misleading data deleted; and</li>
        <li>request data portability where applicable.</li>
      </ul>
      <p>
        To exercise a right, contact us using the details below. You may also lodge a complaint with the Office of the Data Protection Commissioner (ODPC). <Todo>TODO: review — add response timeframe and ODPC contact details.</Todo>
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are intended for adults and businesses. <Todo>TODO: review — confirm handling where a parent or guardian requests a service for a child.</Todo>
      </p>

      <h2>11. Changes to this policy</h2>
      <p>We will update this page when our practices change and show the date of the latest version above.</p>

      <h2>12. Contact</h2>
      <p>
        Email <a href={contact.emailUrl}>{contact.email}</a> or message us on <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>. See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
