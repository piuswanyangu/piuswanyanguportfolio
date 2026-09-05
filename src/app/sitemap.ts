import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site-config";

const publicRoutes = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/cv",
  "/writing",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries];
}
