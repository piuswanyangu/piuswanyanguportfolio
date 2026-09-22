import Link from "next/link";
import { Container } from "@/components/layout/container";

const destinations = [
  {
    href: "/",
    label: "Home",
    detail: "What Afrinex Solutions does and who it helps.",
  },
  {
    href: "/services",
    label: "Services",
    detail: "Digital assistance, data, software, AI, automation, and design.",
  },
  {
    href: "/contact",
    label: "Contact",
    detail: "Reach Afrinex by email or WhatsApp.",
  },
] as const;

export default function NotFound() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
          This page could not be found.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          The page you requested does not exist, or it has moved. The links
          below cover everything on the Afrinex Solutions website.
        </p>
      </div>

      <nav
        aria-label="Suggested pages"
        className="mt-12 border-t border-border"
      >
        <ul className="divide-y divide-border">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="grid gap-1 py-5 transition-colors hover:text-accent sm:grid-cols-[11rem_1fr] sm:gap-8"
              >
                <span className="font-semibold text-foreground">
                  {destination.label}
                </span>
                <span className="leading-7 text-muted-foreground">
                  {destination.detail}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
