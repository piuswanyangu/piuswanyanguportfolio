# Legal Document Review and Decision Record

**Purpose:** a single document for reviewing and answering every decision
needed before the Terms of Service and Privacy Policy are finalised.

**Status, 5 November 2026:** review complete, decisions outstanding. The live
`/terms` and `/privacy-policy` pages are unchanged. They remain drafts with
their draft banner and `noindex` directive.

**Proposed content:**

- `docs/legal/TERMS_OF_SERVICE_DRAFT.md`
- `docs/legal/PRIVACY_POLICY_DRAFT.md`

Placeholders in those drafts, such as `[D4]`, refer to the decisions in
section 6.

> This document is a technical and business review prepared by a software
> engineer. It is not legal advice. Items marked **[ADVOCATE]** need
> confirmation by a qualified Kenyan advocate.

---

## 1. How to use this document

1. Read section 5, on government-related services, and section 7, on what
   each clause commits Afrinex to.
2. Answer each decision in section 6 by filling in its **Your answer** line.
   Where you agree with the recommendation, write "Agree".
3. Take section 8, the advocate checklist, to a Kenyan advocate together with
   both drafts.
4. After you return your answers, the final text will be written into the
   website pages. The draft banner and `noindex` will stay until you
   separately confirm the documents are final.

---

## 2. Problems in the current legal pages

| # | Problem | Where | Effect |
| --- | --- | --- | --- |
| 1 | Visible "TODO: review" markers in public text | Both pages | Looks unfinished and undermines trust. |
| 2 | Seven of 13 Terms sections are placeholders only: payment, IP, liability, termination and others | `src/app/terms/page.tsx` | The terms make no usable commitments in the areas that matter most in a dispute. |
| 3 | Terms bind anyone who "sends an enquiry" | Terms, section 1 | Too broad. Acceptance should follow a confirmed engagement. |
| 4 | No definitions, and no defined point at which an agreement exists | Terms | It is unclear what was agreed and when. |
| 5 | No section on government-related assistance | Terms | Responsibility for accuracy, deadlines, penalties and credentials is undefined. |
| 6 | Privacy Policy says the site only stores a theme preference | Privacy, section 2 | **Now inaccurate.** Since the VPS deployment, nginx logs IP addresses, and Cloudflare processes all traffic. |
| 7 | No disclosure that WhatsApp enquiries reach Meta when the link opens | Privacy | Incomplete account of where enquiry data goes. |
| 8 | No retention periods, security measures or transfer safeguards | Privacy | Required for a credible notice under the Data Protection Act, 2019. |
| 9 | Numbering is flat (1, 2, 3) with no sub-clauses | Both | Hard to reference a specific obligation, for example "clause 6.4". |
| 10 | "Last updated: Draft, not yet published" | Both | No effective date or version history. |

---

## 3. Confirmed business information

Everything below is taken from the project's own files. Nothing else is
treated as confirmed.

| Fact | Value | Source |
| --- | --- | --- |
| Trading name | Afrinex Solutions | `src/lib/site-config.ts` |
| Founder | Pius Wanyangu, Founder & Software Engineer | `src/lib/site-config.ts` |
| Email | ndubipius96@gmail.com, a Gmail address | `src/lib/site-config.ts` |
| Phone and WhatsApp | +254 792 342 944 | `src/lib/site-config.ts` |
| Location | "Kenya", remote delivery | `src/lib/site-config.ts`, contact page |
| Website | afrinexsolutions.co.ke | Deployment configuration |
| Services | 13 services in 4 groups: Digital & Online, Data, Software & Technology, Creative & Professional | `src/data/services.ts` |
| Engagement process | Enquiry, then review, then scope, cost and timeline agreed, then work begins | `src/data/service-details.ts`, home page FAQ |
| Independence statement | "independent service provider and is not affiliated with SHA or KRA" | Services pages |
| Geographic scope of government services | "SHA and KRA assistance is offered to customers in Kenya" | `src/data/service-details.ts` |
| Credential guidance | Afrinex confirms what information is needed and how to share sensitive details. Do not send passwords or PINs in a first message. | Credential notice, privacy draft |
| No online payments or accounts | The site has no checkout, login or user accounts | Code review |

**Not found anywhere in the project, so not assumed:** legal entity type,
registration number, address, payment methods, prices, refund practice, tax
agent status, ODPC registration, retention periods, server location,
subcontractors, operating hours and response times.

---

## 4. Verified technical data flows

Checked against the code and the live site on 5 November 2026.

| Data flow | What actually happens | How it was verified |
| --- | --- | --- |
| Cloudflare | All requests pass through Cloudflare (`server: cloudflare`, Nairobi edge). Cloudflare sees IP address, URL, headers and user agent. | Live response headers |
| Cloudflare network error reports | Pages send `NEL` and `Report-To` headers. Browsers may report failed connections to `a.nel.cloudflare.com`. | Live response headers |
| Cloudflare email obfuscation | Email links are rewritten to `/cdn-cgi/l/email-protection`, and `email-decode.min.js` is injected. | Live HTML |
| Cookies | None set on `/`, `/contact` or a service page | Live response headers |
| Web server access logs | nginx records IP address (the real visitor IP, restored from Cloudflare's `CF-Connecting-IP`), time, request, status, size, referrer, user agent and `X-Forwarded-For`. This is the nginx image's default log format. | `nginx/conf.d/cloudflare-real-ip.conf` and the default image configuration. Confirm on the VPS with `docker compose exec nginx cat /etc/nginx/nginx.conf`. |
| Log retention | Docker rotates logs at 10 MB, keeping 3 files per container. The oldest entries are deleted automatically. The time span depends on traffic. Logs are deleted when the container is removed. | `docker-compose.yml`, `x-logging` |
| Next.js server | No request logging, no database, no stored visitor data | Code review |
| Browser storage | `localStorage` key `afrinex-theme` only | `src/app/layout.tsx`, `theme-toggle.tsx` |
| Fonts | Self-hosted at build time. No Google Fonts requests. | `next/font` usage, live HTML |
| Analytics and trackers | None in the code or the live HTML | Code search, live HTML |
| Enquiry form, WhatsApp | The browser navigates to `wa.me/<number>?text=<name, service, preference, message>`. Meta receives the content when the link opens. | `src/components/contact/enquiry-form.tsx`, `src/data/contact.ts` |
| Enquiry form, email | A `mailto:` link opens the visitor's email app. Nothing is sent until the visitor sends it. Email arrives at a Gmail account. | Same files, `site-config.ts` |
| HTTPS | Let's Encrypt certificate at the server, Cloudflare certificate at the edge, plus HSTS, `nosniff`, `X-Frame-Options` and `Referrer-Policy` | Live headers, `nginx/conf.d/afrinexsolutions.conf` |
| App privileges | The Next.js container runs as a non-root user | `Dockerfile` |
| Firewall | **Not verified.** `scripts/server-setup.sh` enables `ufw`, but it is unknown whether it was run. | Run `sudo ufw status` on the VPS. |

**Not verifiable from the code:** how client documents and messages are
stored on your devices, Gmail and WhatsApp account security, and who else has
access. These are covered by decisions D20 and D26.

---

## 5. Government-related services: KRA, SHA and eTIMS

This is the highest-risk area of the business, legally and reputationally.

### 5.1 Administrative assistance versus regulated services

| Administrative assistance | Regulated or advisory activity |
| --- | --- |
| Explaining the steps of an online process | Advising what income to declare, which reliefs to claim, or how to minimise tax |
| Helping a client navigate iTax, eTIMS or SHA screens, ideally while the client is logged in | Preparing and filing tax returns for others **for a fee** **[ADVOCATE: may require registration as a tax agent]** |
| Typing in information the client provides and approves | Representing a client in disputes, objections or audits before KRA |
| Organising documents the client needs to submit | Holding yourself out as authorised by, or connected to, KRA or SHA |

### 5.2 The tax agent question **[ADVOCATE, priority 1]**

The Tax Procedures Act, 2015 regulates tax agents: persons who, for a fee,
prepare returns or otherwise act for taxpayers in their tax affairs. The
Website currently says the KRA Returns service helps clients **"preparing and
filing your KRA returns"** (`src/data/services.ts`). That wording describes
the regulated activity directly.

**Ask the advocate:**

1. Does Afrinex's actual KRA work require registration as a tax agent?
2. If it does, what are the requirements and consequences of operating
   without registration?
3. If it does not, which activities must Afrinex avoid to stay outside the
   definition?

**Recommendation until advice is received:**

- Deliver KRA work as client-led assistance. The client logs in, reviews and
  submits, while Afrinex guides.
- Give no tax advice.
- Change the service wording from "preparing and filing your KRA returns" to
  something like "guidance and practical help while you complete your KRA
  return". This website change would be made only with your approval.
- The Terms draft states clearly that Afrinex is not a tax agent and gives no
  tax advice (clauses 6.1 and 6.2). Keep that unless the advocate advises
  otherwise.

### 5.3 Credentials

Using someone else's iTax, eTIMS or SHA login raises three risks:

- liability if anything goes wrong in the account;
- possible conflict with the platforms' own terms of use **[ADVOCATE]**; and
- questions under the Computer Misuse and Cybercrimes Act, 2018 about
  authorised access **[ADVOCATE]**.

Decision D8 asks what you actually do.

### 5.4 Claims Afrinex must not make

The drafts make none of these claims, and website copy should not either:
any affiliation with, endorsement by, or accreditation from KRA, SHA or any
government agency; any guarantee of approval, refunds or processing times;
and any registration or authorisation not yet held.

---

## 6. Outstanding decisions

Each item explains why it matters and recommends a policy. A recommendation is
a suggestion, not a statement of what Afrinex currently does.

### D1. Legal identity: who is the contracting party?

**Why it matters:** a contract needs an identifiable party. "Afrinex
Solutions" is a trading name. If it is not registered as a business name or
company, the legal party is you personally, and you carry the obligations
and liabilities personally.

**Recommendation:** state the truth. If unregistered, use "Pius Wanyangu,
trading as Afrinex Solutions". Ask the advocate whether trading under a name
other than your own requires registration under the Registration of Business
Names Act. Consider registering, or forming a limited company if liability
exposure grows. **[ADVOCATE]**

**Your answer:**

### D2. Address for formal notices

**Why it matters:** contracts usually name where formal notices go. Publishing
a home address carries personal risk.

**Recommendation:** use email as the notice channel. Add a P.O. Box only if
you have one. Do not publish a residential address.

**Your answer:**

### D3. How an engagement is confirmed

**Why it matters:** this is the moment a contract is formed. Without a clear
record, disputes about what was agreed are hard to resolve.

**Recommendation:** for small assistance services, a WhatsApp or email message
from Afrinex stating scope, fee and timeline, answered with the client's
"I agree". For software and website projects, a written quotation or
proposal document.

**Your answer:**

### D4. Fees and payment

**Why it matters:** payment terms decide your cash-flow risk. Unpaid work is the
most common small-business dispute.

**Questions:** which payment methods do you accept, for example an M-Pesa
personal number, Till, Paybill or bank? Are prices quoted inclusive of any tax? When is payment due?

**Recommendation:** small assistance services payable on completion, or
upfront for first-time clients. Projects with a deposit, for example 50%,
before work starts and the balance before handover. Pause work and withhold
handover on non-payment, rather than charging interest.

**Your answer:**

### D5. Government fees and penalties

**Why it matters:** if Afrinex pays a government fee for a client, Afrinex
carries the risk of non-reimbursement and may handle client money.

**Recommendation:** clients pay all government fees directly. Afrinex never
pays them on a client's behalf. Penalties caused by late or inaccurate client
information stay with the client.

**Your answer:**

### D6. Cancellations and refunds

**Why it matters:** see section 7.3. A blanket "no refunds" clause may be
unenforceable against consumers and damages trust.

**Recommendation:**

- Cancellation before work starts: full refund of any prepayment.
- Cancellation after work starts: the client pays for work performed, and the
  rest is refunded.
- If Afrinex cannot complete the work: refund for the uncompleted part.
- No refund for submissions already made on the client's instruction.

**Your answer:**

### D7. Intellectual property

**Why it matters:** see section 7.1. This decides who can reuse, resell or
modify what you build.

**Recommendation:** the client owns deliverables made specifically for them,
on full payment. Afrinex keeps its pre-existing and reusable code and grants
the client a permanent licence to use it within the deliverable. Portfolio
use only with written permission.

**Your answer:**

### D8. Account credentials for government platforms

**Why it matters:** see section 5.3.

**Questions:** do you ever receive passwords for iTax, eTIMS or SHA accounts?
How are they shared? Where are they kept? When are they deleted?

**Recommendation:** prefer sessions where the client logs in. If credentials
are unavoidable, require written authorisation, take them through one agreed
channel, delete the messages after the job, and advise the client to change
the password afterwards.

**Your answer:**

### D9. Scope of KRA, SHA and eTIMS assistance

**Why it matters:** see section 5. This determines whether regulatory
registration may be needed.

**Questions:** what exactly do you do in each service? Who presses "submit"?
Do you ever advise on what to declare?

**Recommendation:** client-led assistance only, with no tax advice, until the
advocate answers the tax agent question.

**Your answer:**

### D10. ODPC registration and sensitive data

**Why it matters:** the Data Protection Act, 2019 and its registration
regulations require some data controllers to register with the Office of the
Data Protection Commissioner. Thresholds and sector rules apply. SHA work may
involve health-related data, which the Act treats as sensitive.

**Recommendation:** ask the advocate whether registration applies to Afrinex.
Publish a registration number only once you hold one. **[ADVOCATE]**

**Your answer:**

### D11. Retention periods

**Why it matters:** the Act requires keeping personal data no longer than
necessary. A stated period is a commitment you must actually follow.

**Recommendation, to confirm with the advocate:**

| Data | Suggested period |
| --- | --- |
| Enquiries that do not proceed | 12 months |
| Engagement correspondence and Deliverables | Length of the engagement plus `[advocate to confirm]` years, for disputes |
| Copies of ID documents and credentials | Deleted within 30 days of completing the engagement |
| Afrinex's own payment and income records | As required by tax law **[ADVOCATE: confirm period]** |
| Server logs | Automatic size-based rotation, as already configured |

**Your answer:**

### D12. Server location

**Why it matters:** if the VPS is outside Kenya, every server log is a
cross-border transfer that must be disclosed.

**Action:** check the data-centre location in the Spaceship VPS panel. It was
not assumed.

**Your answer:**

### D13. Clients outside Kenya

**Why it matters:** this affects governing law, currency and data transfers.

**Recommendation:** government services for Kenya only, as the site already
says. Technical and creative services may be delivered remotely to
international clients, still under Kenyan law.

**Your answer:**

### D14. Dispute resolution

**Why it matters:** this sets the cost and speed of resolving any
disagreement.

**Recommendation:** good-faith discussion for 14 days, then optional mediation,
then the courts of Kenya. **[ADVOCATE]**

**Your answer:**

### D15. Liability cap and indemnity

**Why it matters:** see section 7.2.

**Recommendation:** cap liability at the fees paid for the engagement,
subject to what Kenyan law does not allow you to exclude. Apply the client
indemnity only to the client providing false or unauthorised information.
**[ADVOCATE]**

**Your answer:**

### D16. Defect correction for websites and software

**Why it matters:** clients expect fixes. Without a limit, support becomes
unpaid and indefinite.

**Recommendation:** free correction of errors in the agreed functionality
reported within 30 days of delivery. After that, maintenance is a separate
paid service.

**Your answer:**

### D17. Termination notice

**Recommendation:** either party may end an engagement by written notice with
immediate effect. The client pays for work done.

**Your answer:**

### D18. Duration of confidentiality

**Recommendation:** 3 years after the engagement for business information.
Indefinitely for personal data and credentials.

**Your answer:**

### D19. Minors and dependants

**Recommendation:** services are for adults and businesses. Dependants' SHA
details are provided by the principal member, who is responsible for doing so
lawfully.

**Your answer:**

### D20. Security measures for client data

**Why it matters:** the Privacy Policy may only describe measures that
actually exist.

**Questions:** is two-factor authentication on for Gmail and WhatsApp? Are
your devices password-protected and encrypted? Does anyone else have access
to client files or messages?

**Recommendation:** enable two-factor authentication on Gmail and WhatsApp,
encrypt and lock devices, and keep client files in one protected location.

**Your answer:**

### D22. Effective date, version and response time

**Recommendation:** start at version 1.0 with the publication date. Respond to
data-rights requests within the period the Act sets. **[ADVOCATE: confirm
the period]**

**Your answer:**

### D24. Subcontractors

**Question:** does anyone other than you ever work on client engagements?

**Your answer:**

### D25. AI tools and client data

**Why it matters:** putting client data into AI tools such as chatbots sends
it to a third party, usually outside Kenya.

**Question:** is client data ever entered into AI tools?

**Recommendation:** never enter personal data into AI tools without the
client's explicit consent, and remove identifying details first.

**Your answer:**

### D26. Communication tools

**Question:** do you use WhatsApp or WhatsApp Business? Are client
communications or files kept anywhere else, such as Google Drive?

**Your answer:**

> D21 and D23 were merged into D20 and D7 during drafting and are not used.

---

## 7. What Afrinex commits to: business implications

### 7.1 Intellectual property, Terms clause 9

**Commitment:** once paid, the client owns what you built for them.

**Implication:** you cannot resell or reuse that specific deliverable. You
keep your reusable building blocks, because clause 9.3 reserves them, so your
productivity on future projects is protected. Without clause 9.3, a client
could argue they own code you reuse everywhere.

**Risk if left out:** ownership disputes, and the client refusing payment
while claiming ownership.

### 7.2 Liability, clauses 14 and 15

**Commitment:** you are responsible for losses caused by your failure to use
reasonable skill and care, up to the cap.

**Implication:** a cap equal to the fee means the worst case for a KES 2,000
job is about KES 2,000, not the client's whole tax penalty. Kenyan consumer
law limits caps against individuals. A cap that is too aggressive can be
struck out entirely, leaving you with no cap at all. That is why it must be
reviewed. **[ADVOCATE]**

**Risk:** working as a sole trader means liabilities attach to your personal
assets. See D1.

### 7.3 Refunds, clause 8

**Commitment:** fair refunds for work not done.

**Implication:** you are paid for work performed, and clients get money back
for work not performed. This is defensible, matches consumer expectations,
and reduces chargeback-style disputes on M-Pesa.

**Risk:** "no refunds" clauses invite complaints and may be unenforceable.

### 7.4 Confidentiality, clause 10

**Commitment:** keep client information private and use it only for their
work, during and after the engagement.

**Implication:** no sharing client examples, screenshots or data without
permission. Portfolio items need consent under D7.

**Risk:** a breach damages trust and may also breach the Data Protection Act.

### 7.5 Data protection, the Privacy Policy

**Commitment:** every statement in the policy is a promise, for example
"deleted within 30 days".

**Implication:** you must actually follow the retention and security practices
you publish. The Data Protection Commissioner can act on a false or unmet
notice. That is why the drafts state only verified facts, and placeholders
for the rest.

**Risk:** the policy also binds future changes. Adding analytics, a server
form or a new tool requires updating the policy first.

### 7.6 Termination, clause 16

**Commitment:** either side can stop. The client pays for work done and gets
paid-for deliverables.

**Implication:** you can stop working for abusive or non-paying clients, or if
asked to do anything unlawful, without breaching the contract.

**Risk:** without this clause, ending a bad engagement could itself be a
breach.

---

## 8. Legal review checklist for the advocate

| # | Question | Priority |
| --- | --- | --- |
| 1 | Does Afrinex's KRA returns assistance require registration as a tax agent under the Tax Procedures Act, 2015? Which activities are safe? | Critical |
| 2 | Is it lawful and advisable to access clients' iTax, eTIMS or SHA accounts with their passwords and consent? What safeguards apply? | Critical |
| 3 | Must Afrinex register with the ODPC? Does SHA work involve sensitive personal data, and what conditions apply? | High |
| 4 | Does trading as "Afrinex Solutions" require business-name registration? What legal identity should appear in the documents? | High |
| 5 | Are the liability cap (clause 14) and the client indemnity (clause 15) enforceable against individual consumers under the Consumer Protection Act, 2012? | High |
| 6 | Are the cancellation and refund terms (clause 8) consistent with consumer law? | Medium |
| 7 | Is an engagement confirmed by WhatsApp or email a binding contract? What record should be kept? | Medium |
| 8 | What lawful basis applies to each processing purpose in Privacy Policy section 6? | Medium |
| 9 | What safeguards justify transfers to Cloudflare, Google, Meta and the VPS host if it is outside Kenya? | Medium |
| 10 | What are the breach-notification and data-subject response timeframes under the Act and regulations? | Medium |
| 11 | What retention periods apply to client and business records? | Medium |
| 12 | What is the correct current contact information for the ODPC? | Low |
| 13 | Is the dispute-resolution clause appropriate, and which court should have jurisdiction? | Low |

---

## 9. Sections added, removed and rewritten

| Current Terms | Proposed Terms | Change |
| --- | --- | --- |
| 1 About these terms | 1 Introduction and acceptance | Rewritten. Acceptance moves from "any enquiry" to a confirmed engagement. |
| none | 2 Definitions and interpretation | Added |
| 2 Our services | 3 Our services | Rewritten. Independence and no-guarantee clauses strengthened. |
| 3 Enquiries, scope and quotes | 4 How engagements are formed | Rewritten. Defines when a contract exists. |
| 4 Your responsibilities | 5 Client responsibilities | Expanded |
| none | 6 Government-related assistance | Added |
| 5 Fees and payment | 7 Fees and payment | Structure added. Content pending D4. |
| none | 8 Cancellations and refunds | Added. Content pending D6. |
| 6 Deliverables and IP | 9 Intellectual property | Structure added. Content pending D7. |
| 8 Confidentiality | 10 Confidentiality and data protection | Expanded with exceptions and duration |
| 7 Third-party platforms | 11 Third-party platforms and services | Expanded |
| none | 12 Use of this Website | Added |
| none | 13 Standard of service and disclaimers | Added |
| 9 Limitation of liability | 14 Limitation of liability | Structure added. Content pending D15 and advocate review. |
| none | 15 Client indemnity | Added, narrow, pending advocate review |
| 10 Ending work | 16 Suspension and termination | Rewritten |
| 11 Governing law | 17 Disputes, governing law and jurisdiction | Expanded |
| 12 Changes | 18 Changes to these Terms | Adds protection for existing engagements |
| 13 Contact | 19 Contact | Kept |

**Not included, deliberately:** account registration, because the site has no
accounts. Service availability and maintenance commitments belong in
individual maintenance agreements, so they are not included either.

**Privacy Policy:** rebuilt around verified data flows. New sections cover the
summary, technical request data, Cloudflare processing, enquiry-form behaviour
(including the WhatsApp detail), service data, sharing, international
transfers, a retention table, real security measures, and children.

---

## 10. Presentation plan for implementation

When the final text is approved, the existing `LegalPage` component and
design system will be kept, with these additions:

- Numbered headings (1, 2, 3) and numbered clauses (1.1, 1.2), styled with
  the existing typography scale.
- A table of contents with anchor links, so any clause can be linked
  directly, for example `/terms#fees-and-payment`.
- Effective date and version in place of "Last updated: Draft".
- Placeholder markers that are never visible to the public. Unanswered items
  block publication instead.
- Responsive tables for the retention and processing tables. These scroll
  horizontally on small screens rather than overflowing.
- Accessibility checks: a correct heading hierarchy (`h2` for sections, `h3`
  for sub-sections), keyboard-reachable table-of-contents links, and contrast
  checked in all three themes.
- Footer links unchanged. They already appear on every page through
  `siteConfig.legal`.

---

## 11. Maintaining the legal pages

- **Update the Privacy Policy before** adding analytics, cookies, a
  server-side form, a newsletter, a payment integration or any new tool that
  handles client data.
- **Update the Terms** when prices, payment methods, services or the legal
  entity change.
- Each change gets a new version number and effective date.
- Keep a dated copy of each published version, for example through git
  history, because past clients agreed to past versions.
- Review both documents at least once a year, and after any change in Kenyan
  data-protection or consumer law.
