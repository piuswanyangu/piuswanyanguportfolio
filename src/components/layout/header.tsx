import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-sm text-base font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          PIUS.
        </Link>
        <Navigation />
        <MobileNavigation />
      </Container>
    </header>
  );
}
