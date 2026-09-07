import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StructuredData } from "@/components/seo/structured-data";
import type { JsonLdValue } from "@/components/seo/structured-data";
import { contact } from "@/data/contact";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const themeInitializer = `
  (function () {
    try {
      var preference = localStorage.getItem("pius-theme");
      if (preference !== "dark" && preference !== "green") {
        preference = "dark";
      }
      var root = document.documentElement;
      root.dataset.theme = preference;
      root.dataset.themePreference = preference;
      root.style.colorScheme = "dark";
    } catch (_) {}
  })();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: {
    default: "Pius Wanyangu | Full-Stack Software Engineer",
    template: "%s | Pius Wanyangu",
  },
  description:
    siteConfig.description,
  applicationName: "Pius Wanyangu Portfolio",
  authors: [{ name: "Pius Wanyangu" }],
  creator: "Pius Wanyangu",
  keywords: [
    "Full-Stack Software Engineer",
    "Next.js",
    "Django",
    "Backend Engineering",
    "Workflow Automation",
    "AI-Powered Applications",
  ],
  openGraph: {
    title: "Pius Wanyangu | Full-Stack Software Engineer",
    description:
      "Full-stack engineering, backend systems, automation, and practical AI-powered applications.",
    siteName: "Pius Wanyangu Portfolio",
    type: "website",
    url: "/",
    images: siteConfig.socialImage
      ? [{ url: siteConfig.socialImage, alt: "Pius Wanyangu portfolio" }]
      : undefined,
  },
  twitter: {
    card: "summary",
    title: "Pius Wanyangu | Full-Stack Software Engineer",
    description:
      "Full-stack engineering, backend systems, automation, and practical AI-powered applications.",
    images: siteConfig.socialImage ? [siteConfig.socialImage] : undefined,
  },
};

const structuredData: JsonLdValue = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: "Pius Wanyangu",
      url: absoluteUrl("/about"),
      email: contact.email,
      jobTitle: "Full-Stack Software Engineer",
      description:
        "Full-stack software engineer building practical web systems, automation, and AI-powered applications.",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className="theme-transition flex min-h-screen flex-col">
        <StructuredData data={structuredData} />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
