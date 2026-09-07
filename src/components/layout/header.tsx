import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-sm text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
        >
          Pius Wanyangu
        </Link>
        <div className="flex items-center gap-1">
          <Navigation />
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
