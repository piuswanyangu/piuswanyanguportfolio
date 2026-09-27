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
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        A short description of what you need is enough to get started. After
        reviewing your request, Afrinex will confirm what information is
        actually required and how to share anything sensitive.
      </p>
    </section>
  );
}
