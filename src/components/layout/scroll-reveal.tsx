"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they enter the viewport (300ms).
 * Only elements registered here are hidden (`reveal-pending`), so content is
 * visible without JS, under prefers-reduced-motion, and if it streams in late.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      // The huge top margin treats everything above the viewport as already
      // seen. A fast fling (or the End key) can carry an element from below the
      // viewport to above it between two observer checks. Without this margin
      // it would never "intersect" and would stay invisible until scrolled back.
      { rootMargin: "100000px 0px -8% 0px", threshold: 0.05 },
    );

    function register() {
      const candidates = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-pending)");
      const viewportHeight = window.innerHeight;

      // Read every position first, then change classes. Interleaving a read
      // (getBoundingClientRect) with a write (classList.add) forces the browser
      // to recalculate styles and layout once per element ("layout thrashing").
      const belowFold = Array.from(candidates).filter(
        // Already on screen: leave visible to avoid a flash.
        (element) => element.getBoundingClientRect().top >= viewportHeight,
      );

      belowFold.forEach((element) => {
        element.classList.add("reveal-pending");
        observer.observe(element);
      });
    }

    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.getElementById("main-content") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
