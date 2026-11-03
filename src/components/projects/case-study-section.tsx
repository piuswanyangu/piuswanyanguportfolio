import type { ReactNode } from "react";

type CaseStudySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function CaseStudySection({
  id,
  title,
  children,
}: CaseStudySectionProps) {
  const headingId = `case-study-${id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-5 border-t border-border py-10 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10 lg:py-12"
    >
      <div>
        <span aria-hidden="true" className="heading-bar w-10" />
        <h2 id={headingId} className="title-3 mt-4">
          {title}
        </h2>
      </div>
      <div className="max-w-3xl leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}
