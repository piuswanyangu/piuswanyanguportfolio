import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { publishedArticles } from "@/data/articles";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/work",
  "/blog",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : ["/services", "/work"].includes(route) ? 0.9 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...articleEntries];
}
