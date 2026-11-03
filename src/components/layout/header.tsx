import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";
import { StickyHeader } from "@/components/layout/sticky-header";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TopBar } from "@/components/layout/top-bar";

export function Header() {
  return (
    <>
      <TopBar />
      <StickyHeader>
        <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link href="/" className="shrink-0 rounded-sm">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 xl:gap-4">
            <Navigation />
            <ThemeToggle className="hidden sm:block" />
            <Link href="/contact" className="btn btn-primary ml-1 hidden lg:inline-flex">
              Request a Service
            </Link>
            <MobileNavigation />
          </div>
        </Container>
      </StickyHeader>
    </>
  );
}
