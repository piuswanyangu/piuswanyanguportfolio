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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    function register() {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-pending)")
        .forEach((element) => {
          // Already on screen: leave visible to avoid a flash.
          if (element.getBoundingClientRect().top < window.innerHeight) return;
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
