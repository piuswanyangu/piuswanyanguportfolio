import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
        >
          <span aria-hidden="true" className="size-2.5 bg-accent" />
          <span>Afrinex Solutions</span>
        </Link>
        <div className="flex items-center gap-1">
          <Navigation />
          <Link
            href="/contact"
            className="ml-2 hidden min-h-10 items-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover lg:inline-flex"
          >
            Request a Service
          </Link>
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
