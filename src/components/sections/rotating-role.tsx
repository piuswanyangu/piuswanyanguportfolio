"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Engineer",
  "Backend Engineer",
  "AI-Powered Applications",
] as const;

const typingDelay = 75;
const deletingDelay = 45;
const fullRolePause = 1500;
const betweenRolePause = 300;

type AnimationPhase = "typing" | "holding" | "deleting" | "between";

export function RotatingRole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(1);
  const [phase, setPhase] = useState<AnimationPhase>("typing");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(reducedMotion.matches);

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);

    return () => {
      reducedMotion.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRole = roles[activeIndex];
    let delay = typingDelay;

    if (phase === "holding") delay = fullRolePause;
    if (phase === "deleting") delay = deletingDelay;
    if (phase === "between") delay = betweenRolePause;

    const timeout = window.setTimeout(() => {
      if (phase === "typing") {
        if (visibleCharacters < currentRole.length) {
          setVisibleCharacters((current) => current + 1);
        } else {
          setPhase("holding");
        }
        return;
      }

      if (phase === "holding") {
        setPhase("deleting");
        return;
      }

      if (phase === "deleting") {
        if (visibleCharacters > 0) {
          setVisibleCharacters((current) => current - 1);
        } else {
          setPhase("between");
        }
        return;
      }

      setActiveIndex((current) => (current + 1) % roles.length);
      setVisibleCharacters(1);
      setPhase("typing");
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, phase, prefersReducedMotion, visibleCharacters]);

  const visibleRole = prefersReducedMotion
    ? roles[0]
    : roles[activeIndex].slice(0, visibleCharacters);

  return (
    <p
      className="mt-5 min-h-7 whitespace-nowrap text-lg font-bold tracking-[-0.015em] sm:min-h-8 sm:text-xl lg:min-h-9 lg:text-2xl"
      aria-label="Professional focus: Full-Stack Engineer, Backend Engineer, and AI-Powered Applications"
    >
      <span aria-hidden="true" className="role-text text-accent">
        {visibleRole}
        <span className="role-cursor" aria-hidden="true">|</span>
      </span>
    </p>
  );
}
