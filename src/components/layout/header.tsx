import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { contact } from "@/data/contact";

export function Header() {
  return (
    <>
      <div className="border-b border-border/70 bg-surface-muted/80">
        <Container className="flex min-h-10 flex-col items-center justify-between gap-2 py-2 text-[0.7rem] font-medium text-muted-foreground sm:flex-row sm:text-xs">
          <p className="tracking-[0.12em] uppercase text-muted-foreground/90">
            Kenya-based digital support
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href={contact.emailUrl} className="transition-colors hover:text-accent">
              {contact.email}
            </a>
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              WhatsApp
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
          >
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent shadow-sm ring-1 ring-inset ring-border/80">
              <span className="size-2.5 rounded-full bg-accent" />
            </span>
            <span className="tracking-[-0.02em]">Afrinex Solutions</span>
          </Link>

          <div className="flex items-center gap-2">
            <Navigation />
            <Link
              href="/contact"
              className="ml-2 hidden min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[0_12px_24px_rgba(15,118,110,0.2)] transition-colors hover:bg-accent-hover lg:inline-flex"
            >
              Request a Service
            </Link>
            <ThemeToggle />
            <MobileNavigation />
          </div>
        </Container>
      </header>
    </>
  );
}
