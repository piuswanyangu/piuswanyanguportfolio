import { ArticleGrid } from "@/components/blog/article-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { publishedArticles } from "@/data/articles";

export function LatestArticles() {
  if (publishedArticles.length === 0) return null;
  return (
    <section aria-labelledby="latest-articles-heading" className="section section-tint">
      <Container>
        <SectionHeading id="latest-articles-heading" eyebrow="Afrinex articles" title="Latest Articles" />
        <div className="mt-12">
          <ArticleGrid articles={publishedArticles.slice(0, 3)} headingLevel="h3" />
        </div>
      </Container>
    </section>
  );
}
