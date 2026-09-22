import Link from "next/link";

type PageCtaLink = {
  href: string;
  label: string;
};

type PageCtaProps = {
  title: string;
  description: string;
  secondary?: PageCtaLink;
};

const headingId = "page-cta-heading";

/**
 * In-page closing conversion block.
 *
 * Unlike `ContactCta`, this renders inside a page that already provides its own
 * `Container`, so it intentionally omits container and section padding.
 */
export function PageCta({ title, description, secondary }: PageCtaProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="mt-16 border-t border-border pt-8 sm:mt-20"
    >
      <h2
        id={headingId}
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        {description}
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Request a Service
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border-interactive bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}
