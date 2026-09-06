import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted py-8">
      <Container className="grid gap-8 text-sm text-muted-foreground md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="rounded-sm font-semibold text-foreground transition-colors hover:text-accent">
            Pius Wanyangu
          </Link>
          <p className="mt-2">Full-Stack Software Engineer</p>
          <p className="mt-4">&copy; {currentYear} Pius Wanyangu</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {navigationItems
              .filter((item) =>
                ["/projects", "/about", "/writing", "/contact"].includes(item.href),
              )
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
