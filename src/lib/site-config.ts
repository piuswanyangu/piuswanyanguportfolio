import type { Metadata } from "next";

/** Used only by `next dev`; a production build must supply a real origin. */
const developmentOrigin = "http://localhost:3000";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

const guidance =
  "Set NEXT_PUBLIC_SITE_URL to the public HTTPS origin (for example https://your-domain.com) before building. See README.md > Environment Variables.";

/**
 * Resolves the canonical origin used by metadata, canonical URLs, the sitemap,
 * and robots output.
 *
 * `NEXT_PUBLIC_*` values are inlined at build time and every route is
 * prerendered, so an unset origin would permanently bake `http://localhost:3000`
 * into the deployed HTML. A production build therefore fails loudly instead of
 * shipping unusable SEO metadata.
 */
function resolveSiteUrl(): URL {
  const isProductionBuild = process.env.NODE_ENV === "production";

  if (!configuredSiteUrl) {
    if (isProductionBuild) {
      throw new Error(`NEXT_PUBLIC_SITE_URL is not set. ${guidance}`);
    }

    return new URL(developmentOrigin);
  }

  let parsed: URL;

  try {
    parsed = new URL(configuredSiteUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL ("${configuredSiteUrl}") is not an absolute URL. ${guidance}`,
    );
  }

  if (isProductionBuild) {
    if (parsed.protocol !== "https:") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must use https:// for a production build (received "${parsed.protocol}//"). ${guidance}`,
      );
    }

    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must not be a localhost origin for a production build. ${guidance}`,
      );
    }
  }

  return parsed;
}

export const siteConfig = {
  name: "Afrinex Solutions",
  shortName: "Afrinex",
  description:
    "Afrinex Solutions helps individuals and businesses handle digital tasks, build digital solutions, and work smarter with technology.",
  url: resolveSiteUrl(),
  /**
   * Branded Open Graph / Twitter card image, served from `public/`.
   * Requires a 1200x630 asset. While this is null, no `og:image` or
   * `twitter:image` is emitted, so no broken reference is published.
   */
  socialImage: null as string | null,
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | Afrinex Solutions`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: siteConfig.socialImage
        ? [{ url: siteConfig.socialImage, alt: siteConfig.name }]
        : undefined,
    },
    twitter: {
      card: siteConfig.socialImage ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images: siteConfig.socialImage ? [siteConfig.socialImage] : undefined,
    },
  };
}
