const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

function createSiteUrl(value: string): URL {
  try {
    return new URL(value);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an absolute URL, for example https://your-domain.com",
    );
  }
}

export const siteConfig = {
  name: "Pius Wanyangu Portfolio",
  shortName: "PIUS.",
  description:
    "Portfolio of Pius Wanyangu, a full-stack software engineer building modern software and AI-powered applications.",
  url: createSiteUrl(configuredSiteUrl),
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
  const socialTitle = `${title} | Pius Wanyangu`;

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
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
import type { Metadata } from "next";
