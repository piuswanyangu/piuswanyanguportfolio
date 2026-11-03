import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Icon } from "@/components/ui/icons";

type LegalPageProps = {
  title: string;
  path: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

/** Shared layout for legal documents: banner, draft notice, readable prose. */
export function LegalPage({ title, path, description, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title={title}
        description={description}
        breadcrumbs={[{ label: title, href: path }]}
      />
      <Container className="section">
        <div className="mx-auto max-w-[72ch]">
          <p role="note" className="flex gap-3 rounded-[var(--radius-card)] border border-border bg-surface-muted p-4 text-sm leading-6 text-foreground">
            <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-accent" />
            <span>
              <strong>Draft under review.</strong> This document is a working draft and has not yet been reviewed by a legal professional. It is not legal advice.
            </span>
          </p>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <div className="prose-doc mt-2">{children}</div>
        </div>
      </Container>
    </>
  );
}

/** Inline marker for text that still needs review before publishing. */
export function Todo({ children = "TODO: review" }: { children?: ReactNode }) {
  return <span className="todo-marker">{children}</span>;
}
