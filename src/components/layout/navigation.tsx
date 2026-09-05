"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/navigation";

function isActiveRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex border-b-2 px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground"
                }`}
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
