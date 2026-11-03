"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { contact } from "@/data/contact";

/**
 * Bottom-right WhatsApp shortcut plus a back-to-top button that appears after
 * scrolling. The footer reserves bottom padding on mobile so neither covers
 * the last line of content.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        hidden={!showTop}
        className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[var(--shadow-card)] transition-colors hover:border-accent hover:text-accent"
      >
        <Icon name="arrowUp" className="size-5" />
      </button>
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Afrinex on WhatsApp (opens in a new tab)"
        className="pointer-events-auto inline-flex size-12 items-center sm:size-14 justify-center rounded-full bg-[#157347] text-white shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
      >
        <Icon name="whatsapp" className="size-6 sm:size-7" strokeWidth={1.7} />
      </a>
    </div>
  );
}
