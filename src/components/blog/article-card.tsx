import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import type { Article } from "@/data/articles";

const dateFormatter = new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "long", year: "numeric" });

export function formatArticleDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

type ArticleCardProps = { article: Article; headingLevel?: "h2" | "h3" };

export function ArticleCard({ article, headingLevel: Heading = "h2" }: ArticleCardProps) {
  return (
    <article data-reveal className="card card-lift relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] bg-accent-soft">
        {article.coverImage ? (
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-accent">
            <Icon name="book" className="size-12" strokeWidth={1.4} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          <span className="text-accent">{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        </p>
        <Heading className="title-3 mt-3">
          <Link
            href={`/blog/${article.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted-foreground">{article.excerpt}</p>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read article
          <Icon name="arrowRight" className="size-4" />
        </span>
      </div>
    </article>
  );
}

export function ArticleGrid({ articles, headingLevel = "h2" }: { articles: readonly Article[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
