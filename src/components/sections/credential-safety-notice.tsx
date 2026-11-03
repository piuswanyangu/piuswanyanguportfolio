import { Icon } from "@/components/ui/icons";

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
      className="flex gap-4 rounded-[var(--radius-card)] border border-border border-l-4 border-l-accent bg-surface-muted px-5 py-5 sm:px-6"
    >
      <Icon name="shield" className="mt-1 size-6 shrink-0 text-accent" />
      <div>
        <h2 id={headingId} className="font-bold text-foreground">
          Before you share personal details
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
          A short description of what you need is enough to get started. After
          reviewing your request, Afrinex will confirm what information is
          actually required and how to share anything sensitive.
        </p>
      </div>
    </section>
  );
}
