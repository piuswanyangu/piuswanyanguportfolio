import Link from "next/link";
import { Container } from "@/components/layout/container";
import { publishedArticles } from "@/data/articles";

export function LatestArticles() {
  if (publishedArticles.length === 0) return null;
  return <section aria-labelledby="latest-articles-heading" className="border-t border-border py-14 sm:py-18"><Container><div className="mx-auto max-w-2xl text-center"><h2 id="latest-articles-heading" className="text-3xl font-semibold tracking-tight text-foreground">Latest Articles</h2></div><div className="mt-9 grid gap-5 md:grid-cols-3">{publishedArticles.slice(0, 3).map((article) => <article key={article.slug} className="rounded-lg border border-border bg-surface p-6"><p className="font-mono text-xs uppercase text-accent">{article.category}</p><h3 className="mt-3 text-xl font-semibold"><Link href={`/blog/${article.slug}`} className="hover:text-accent">{article.title}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p></article>)}</div></Container></section>;
}
