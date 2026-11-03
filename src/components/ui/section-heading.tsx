import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Heading level; sections under the page h1 use h2. */
  as?: "h2" | "h3";
  className?: string;
};

/** Accent bar + eyebrow + heading + optional intro, used by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <span aria-hidden="true" className={`heading-bar ${centered ? "mx-auto" : ""}`} />
      {eyebrow && <p className="eyebrow mt-5">{eyebrow}</p>}
      <Heading id={id} className={`display-2 ${eyebrow ? "mt-2" : "mt-5"}`}>
        {title}
      </Heading>
      {description && <p className="lead mt-4">{description}</p>}
    </div>
  );
}
