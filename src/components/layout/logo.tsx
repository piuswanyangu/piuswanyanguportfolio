type LogoMarkProps = { className?: string };

/**
 * Afrinex mark: a rounded tile holding an abstract "A" formed by two rising
 * strokes and a crossbar node. Drawn with currentColor-free fills so it reads
 * on any theme. TODO(Pius): approve or replace with a designed logo.
 */
export function LogoMark({ className = "size-10" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <rect width="40" height="40" rx="10" fill="var(--accent)" />
      <path
        d="M11 29 19.2 11.5a1 1 0 0 1 1.8 0L29 29"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 22.5h9" stroke="var(--accent-foreground)" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="29" cy="11" r="3" fill="var(--accent-foreground)" />
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "default" | "on-brand" };

/** SVG mark + text wordmark. The text is real text so it scales and is read once. */
export function Logo({ className = "", tone = "default" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.2rem] font-bold tracking-[-0.03em] ${tone === "on-brand" ? "text-on-brand" : "text-foreground"}`}>
          Afrinex
        </span>{" "}
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em] ${tone === "on-brand" ? "text-on-brand-muted" : "text-accent"}`}>
          Solutions
        </span>
      </span>
    </span>
  );
}
