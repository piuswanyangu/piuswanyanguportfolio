"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Icon } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import { isActiveRoute, navigationItems } from "@/data/navigation";
import { serviceGroupHref, siteConfig } from "@/lib/site-config";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Tab stops in order. A radio group is one stop: only its checked radio counts.
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
        (element) => {
          if (element instanceof HTMLInputElement && element.type === "radio") return element.checked;
          return element.offsetParent !== null;
        },
      );
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Icon name="menu" className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div aria-hidden="true" className="absolute inset-0 bg-black/50" onClick={close} />
          <div
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="content-enter absolute inset-y-0 right-0 flex h-dvh w-full max-w-sm flex-col overflow-y-auto bg-background shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Link href="/" onClick={close} className="rounded-sm">
                <Logo />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground hover:border-accent hover:text-accent"
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 px-3 py-4">
              <ul>
                {navigationItems.map((item) => {
                  const isActive = isActiveRoute(pathname, item.href);
                  const linkClass = `flex min-h-12 items-center rounded-md px-3 text-base font-semibold transition-colors hover:bg-surface-muted hover:text-accent ${
                    isActive ? "text-accent" : "text-foreground"
                  }`;

                  if (item.href === "/services") {
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services-group"
                          onClick={() => setServicesOpen((open) => !open)}
                          className={`${linkClass} w-full justify-between`}
                        >
                          Services
                          <Icon name="chevronDown" className={`size-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        <ul id="mobile-services-group" hidden={!servicesOpen} className="mb-2 ml-3 border-l-2 border-accent-soft pl-3">
                          <li>
                            <Link href="/services" onClick={close} className="flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold text-accent">
                              All services
                            </Link>
                          </li>
                          {siteConfig.serviceGroups.map((group) => (
                            <li key={group.id}>
                              <Link
                                href={serviceGroupHref(group.id)}
                                onClick={close}
                                className="flex min-h-11 items-center px-3 text-[0.9375rem] text-muted-foreground hover:text-accent"
                              >
                                {group.category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={isActive ? "page" : undefined} onClick={close} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-border px-5 py-5">
              <Link href="/contact" onClick={close} className="btn btn-primary w-full">
                Request a Service
              </Link>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full">
                <Icon name="whatsapp" className="size-4" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-medium text-muted-foreground" aria-hidden="true">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
