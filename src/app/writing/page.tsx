import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { articles } from "@/data/articles";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Writing",
  description:
    "Engineering notes from Pius Wanyangu on software architecture, backend systems, delivery, automation, and AI-enabled applications.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Engineering notes"
        title="Writing"
        description="Notes on system design, backend engineering, APIs, delivery workflows, automation, and lessons from building software."
      />

      {articles.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="border-t border-border pt-6">
              <p className="font-mono text-xs text-secondary-accent">
                {article.category} · {article.date} · {article.readingTime}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                <Link
                  href={`/writing/${article.slug}`}
                  className="rounded-sm transition-colors hover:text-accent"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {article.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li key={tag} className="font-mono text-xs text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <section
          aria-labelledby="writing-status-heading"
          className="mt-12 border border-border bg-surface p-8 sm:p-10"
        >
          <h2 id="writing-status-heading" className="text-xl font-semibold">
            Notes are in preparation
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Published articles will appear here when they are ready. No placeholder
            articles have been presented as finished work.
          </p>
        </section>
      )}
    </Container>
  );
}
