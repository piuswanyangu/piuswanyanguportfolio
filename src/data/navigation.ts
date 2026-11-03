import { publishedArticles } from "@/data/articles";
import { siteConfig } from "@/lib/site-config";

export type NavigationItem = {
  label: string;
  href: string;
};

/** Blog is listed only once at least one article is published. */
export const hasPublishedPosts = publishedArticles.length > 0;

export const navigationItems: readonly NavigationItem[] = siteConfig.navigation.filter(
  (item) => item.href !== "/blog" || hasPublishedPosts,
);

export function isActiveRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}
