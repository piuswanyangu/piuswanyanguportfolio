"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { ServiceIcon } from "@/components/services/service-icon";
import { isActiveRoute, navigationItems } from "@/data/navigation";
import { serviceGroupHref, siteConfig } from "@/lib/site-config";

const linkBase =
  "inline-flex min-h-11 items-center gap-1 rounded-sm px-3 text-[0.9375rem] font-semibold transition-colors hover:text-accent";

function ServicesMenu({ isActive }: { isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();

  // Close after navigation (including hash changes on /services).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setIsOpen(false), 150);
  }

  function focusItem(index: number) {
    const items = wrapperRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]");
    if (!items?.length) return;
    items[(index + items.length) % items.length].focus();
  }

  function onButtonKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      window.requestAnimationFrame(() => focusItem(0));
    }
  }

  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? [],
    );
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(current + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(items.length - 1);
    }
  }

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setIsOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="services-menu"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={onButtonKeyDown}
        className={`${linkBase} ${isActive ? "text-accent" : "text-foreground"}`}
      >
        Services
        <Icon name="chevronDown" className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id="services-menu"
        hidden={!isOpen}
        onKeyDown={onPanelKeyDown}
        className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
      >
        <div className="card content-enter overflow-hidden border border-border p-2">
          <ul>
            {siteConfig.serviceGroups.map((group) => (
              <li key={group.id}>
                <Link
                  href={serviceGroupHref(group.id)}
                  data-menu-item
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted"
                >
                  <span className="icon-badge size-10">
                    <ServiceIcon category={group.category} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-6 text-foreground">{group.category}</span>
                    <span className="block text-[0.8125rem] leading-5 text-muted-foreground">{group.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/services"
            data-menu-item
            onClick={() => setIsOpen(false)}
            className="mt-1 flex items-center justify-between rounded-lg bg-surface-muted px-4 py-3 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            View all services
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);

          if (item.href === "/services") {
            return <ServicesMenu key={item.href} isActive={isActive} />;
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkBase} ${isActive ? "text-accent" : "text-foreground"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
