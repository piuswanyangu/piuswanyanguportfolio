import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { getSocialLinks } from "@/components/layout/social-links";
import { StructuredData } from "@/components/seo/structured-data";
import type { JsonLdValue } from "@/components/seo/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const themeInitializer = `
  (function () {
    var root = document.documentElement;
    var preference = "light";
    try {
      var stored = localStorage.getItem("afrinex-theme");
      if (stored === "light" || stored === "dark" || stored === "green") preference = stored;
    } catch (_) {}
    root.dataset.theme = preference;
    root.dataset.themePreference = preference;
    root.style.colorScheme = preference === "light" ? "light" : "dark";
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
    card: "summary_large_image",
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
      "@type": ["Organization", "ProfessionalService"],
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/opengraph-image"),
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
      },
      areaServed: [{ "@type": "Country", name: siteConfig.contact.location }],
      sameAs: getSocialLinks()
        .filter((link) => link.icon !== "whatsapp")
        .map((link) => link.href),
      founder: {
        "@type": "Person",
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.role,
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <ScrollReveal />
      </body>
    </html>
  );
}
