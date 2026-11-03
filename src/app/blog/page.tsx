import Link from "next/link";
import { ArticleGrid } from "@/components/blog/article-card";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Icon } from "@/components/ui/icons";
import { publishedArticles } from "@/data/articles";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Blog",
  description: "Practical articles about websites, business software, data, and digital work from Afrinex Solutions.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageBanner
        eyebrow="Afrinex articles"
        title="Practical digital guidance"
        description="Clear articles for businesses and individuals making decisions about websites, software, and data."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <section aria-label="Articles" className="section">
        <Container>
          {publishedArticles.length === 0 ? (
            <div className="card mx-auto max-w-xl border border-border px-6 py-12 text-center sm:px-12">
              <span className="icon-badge mx-auto size-20 rounded-full">
                <Icon name="book" className="size-10" strokeWidth={1.5} />
              </span>
              <h2 className="title-3 mt-6 text-2xl">Articles are being prepared</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Practical guides are currently under review. Published articles will appear here when they are ready.
              </p>
              <Link href="/services" className="btn btn-primary mt-8">
                Explore Services
              </Link>
            </div>
          ) : (
            <ArticleGrid articles={publishedArticles} />
          )}
        </Container>
      </section>
    </>
  );
}
