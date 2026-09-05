import type { ReactNode } from "react";

type CaseStudySectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export function CaseStudySection({
  number,
  title,
  children,
}: CaseStudySectionProps) {
  const headingId = `case-study-${number}`;

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-5 border-t border-border py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10"
    >
      <div>
        <p className="font-mono text-xs text-secondary-accent">{number}</p>
        <h2 id={headingId} className="mt-2 text-xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="max-w-3xl leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}
