"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Sticky header shell that gains a shadow once the page has scrolled. */
export function StickyHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const update = () => {
      header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="site-header sticky top-0 z-50 border-b border-border bg-background"
    >
      {children}
    </header>
  );
}
