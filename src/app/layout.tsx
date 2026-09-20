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
      var preference = localStorage.getItem("afrinex-theme");
      if (preference !== "light" && preference !== "dark" && preference !== "green") {
        preference = "light";
      }
      var root = document.documentElement;
      root.dataset.theme = preference;
      root.dataset.themePreference = preference;
      root.style.colorScheme = preference === "light" ? "light" : "dark";
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
    default: "Afrinex Solutions | Digital Services, Software, AI & Automation",
    template: "%s | Afrinex Solutions",
  },
  description:
    siteConfig.description,
  applicationName: "Afrinex Solutions",
  authors: [{ name: "Afrinex Solutions" }],
  creator: "Afrinex Solutions",
  keywords: [
    "Digital Services",
    "Software Development",
    "AI-Powered Solutions",
    "Business Automation",
    "Data Services",
    "Online Service Assistance",
  ],
  openGraph: {
    title: "Afrinex Solutions | Digital Services, Software, AI & Automation",
    description:
      "Afrinex Solutions helps individuals and businesses handle digital tasks, build digital solutions, and work smarter with technology.",
    siteName: "Afrinex Solutions",
    type: "website",
    url: "/",
    images: siteConfig.socialImage
      ? [{ url: siteConfig.socialImage, alt: "Afrinex Solutions" }]
      : undefined,
  },
  twitter: {
    card: "summary",
    title: "Afrinex Solutions | Digital Services, Software, AI & Automation",
    description:
      "Digital services, software development, AI-powered solutions, and automation for individuals and businesses.",
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
      publisher: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "Afrinex Solutions",
      url: absoluteUrl("/"),
      email: contact.email,
      description:
        "Digital services, software, AI-powered solutions, and automation for individuals and businesses.",
      founder: {
        "@type": "Person",
        name: "Pius Wanyangu",
        jobTitle: "Founder & Software Engineer",
      },
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
