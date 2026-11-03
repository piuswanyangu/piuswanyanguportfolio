import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArticleDate } from "@/components/blog/article-card";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { StructuredData } from "@/components/seo/structured-data";
import { articles, getArticleBySlug, publishedArticles } from "@/data/articles";
import { absoluteUrl, createPageMetadata } from "@/lib/site-config";

type ArticlePageProps = { params: Promise<{ slug: string }> };
const isDevelopment = process.env.NODE_ENV === "development";
export const dynamicParams = false;
export function generateStaticParams() { return articles.filter((article) => article.status === "published" || isDevelopment).map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> { const { slug } = await params; const article = getArticleBySlug(slug); if (!article || (article.status !== "published" && !isDevelopment)) return {}; if (article.status === "draft") return { title: `${article.title} (Draft Preview)`, description: article.excerpt, robots: { index: false, follow: false } }; return createPageMetadata({ title: article.title, description: article.excerpt, path: `/blog/${article.slug}` }); }
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params; const article = getArticleBySlug(slug); if (!article || (article.status !== "published" && !isDevelopment)) notFound();
  const related = publishedArticles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 2);
  return (
    <>
      {article.status === "published" && <StructuredData data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, author: { "@type": "Person", name: article.author }, mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`) }} />}
      <PageBanner
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: article.title, href: `/blog/${article.slug}` }]}
      >
        <p className="mt-5 text-sm text-muted-foreground">
          By {article.author} · <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        </p>
      </PageBanner>
      <Container className="section">
        <article className="prose-doc mx-auto">
          {article.status === "draft" && <p className="mt-0! border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm font-semibold text-foreground">Development preview · Draft article</p>}
          {article.body.map((block, index) => block.type === "heading" ? <h2 key={index}>{block.text}</h2> : block.type === "list" ? <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul> : <p key={index}>{block.text}</p>)}
          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-12 border-t border-border pt-8">
              <h2 id="related-heading" className="mt-0!">Related articles</h2>
              <ul>{related.map((item) => <li key={item.slug}><Link href={`/blog/${item.slug}`}>{item.title}</Link></li>)}</ul>
            </section>
          )}
          <aside className="card mt-12 border-l-4 border-l-accent p-6">
            <h2 className="mt-0! text-xl!">Need help with this?</h2>
            <p>Tell Afrinex what you are trying to achieve and we will review the request with you.</p>
            <Link href={`/contact?service=${article.relatedServiceSlug}`} className="btn btn-primary mt-5 text-accent-foreground! no-underline!">Request a Service</Link>
          </aside>
        </article>
      </Container>
    </>
  );
}
