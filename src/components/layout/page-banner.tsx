import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { StructuredData } from "@/components/seo/structured-data";
import { absoluteUrl } from "@/lib/site-config";

export type Crumb = { label: string; href: string };

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Trail after "Home". The last crumb is the current page. */
  breadcrumbs: readonly Crumb[];
  children?: ReactNode;
};

/**
 * Shared inner-page banner: tinted band with eyebrow, the page's single h1,
 * an intro line, visible breadcrumbs and matching BreadcrumbList JSON-LD.
 */
export function PageBanner({ eyebrow, title, description, breadcrumbs, children }: PageBannerProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-muted">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href),
          })),
        }}
      />
      <BannerPattern />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span aria-current="page" className="font-semibold text-foreground">{crumb.label}</span>
                  ) : (
                    <>
                      <Link href={crumb.href} className="rounded-sm underline-offset-4 hover:text-accent hover:underline">
                        {crumb.label}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`display-1 ${eyebrow ? "mt-3" : ""}`}>{title}</h1>
          {description && <p className="lead mt-5 max-w-2xl">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Soft geometric texture on the right edge of the banner. Decorative only. */
function BannerPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute -right-24 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 text-accent opacity-[0.12] md:block"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="100" cy="100" r="96" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="72" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="48" strokeWidth="1.5" />
      <path d="M4 100h192M100 4v192" strokeWidth="1" />
    </svg>
  );
}
