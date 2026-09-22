const headingId = "credential-safety-heading";

/**
 * Shared credential-safety guidance.
 *
 * Rendered on every page that invites customers to start a conversation about
 * government-related assistance, so the wording cannot drift between pages.
 */
export function CredentialSafetyNotice() {
  return (
    <section
      aria-labelledby={headingId}
      className="border-l-2 border-accent bg-surface-elevated px-5 py-5 sm:px-6"
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
        Before you send anything
      </p>
      <h2
        id={headingId}
        className="mt-3 text-lg font-semibold tracking-tight text-foreground"
      >
        Keep your credentials out of your first message
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Do not include passwords, iTax passwords, account PINs, one-time
        passcodes (OTPs), or any other authentication codes when you first
        contact Afrinex. Please also avoid attaching identity or tax documents
        before they have been asked for.
      </p>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        A short description of what you need is enough to get started. After
        reviewing your request, Afrinex will confirm what information is
        actually required and how to share anything sensitive.
      </p>
    </section>
  );
}
