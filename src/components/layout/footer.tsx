import Link from "next/link";
import { Container } from "@/components/layout/container";
import { contact } from "@/data/contact";
import { navigationItems } from "@/data/navigation";
import { serviceCategories } from "@/data/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted py-10">
      <Container className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <Link href="/" className="rounded-sm font-semibold text-foreground transition-colors hover:text-accent">
            Afrinex Solutions
          </Link>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Digital services, software development, AI-powered support, and practical business assistance for people and organizations that need modern solutions without unnecessary complexity.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">&copy; {currentYear} Afrinex Solutions</p>
        </div>

        <nav aria-label="Company navigation" className="text-sm">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">Company</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {navigationItems
              .filter((item) => ["/about", "/services", "/work", "/blog", "/contact"].includes(item.href))
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">Solutions</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {serviceCategories.map((category) => (
              <li key={category}>
                <Link href="/services" className="transition-colors hover:text-accent">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">Contact</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>
              <a href={contact.emailUrl} className="transition-colors hover:text-accent">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {contact.phone}
              </a>
            </li>
            <li>Kenya</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
