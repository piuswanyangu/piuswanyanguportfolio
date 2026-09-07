"use client";

import { useEffect, useState } from "react";

type ThemePreference = "dark" | "green";

const storageKey = "pius-theme";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "dark" || value === "green";
}

function readStoredPreference(): ThemePreference {
  try {
    const storedPreference = window.localStorage.getItem(storageKey);
    return isThemePreference(storedPreference) ? storedPreference : "dark";
  } catch {
    return "dark";
  }
}

function storePreference(preference: ThemePreference) {
  try {
    window.localStorage.setItem(storageKey, preference);
  } catch {
    // Theme switching still works for the current page when storage is blocked.
  }
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;

  root.dataset.theme = preference;
  root.dataset.themePreference = preference;
  root.style.colorScheme = "dark";
}

function ThemeIcon({ preference }: { preference: ThemePreference }) {
  if (preference === "green") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5C13 4.7 7.8 7 5.8 11.1c-1.3 2.7-.7 5.7 1.4 7.8 2.7-5.2 6.1-8.1 10.3-10.2-3.6 2.7-6.2 5.8-7.9 9.4 2.3.5 4.7-.2 6.4-2 2.8-2.9 3.4-7.1 3.5-11.6Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("dark");

  useEffect(() => {
    const initialPreference = readStoredPreference();

    applyTheme(initialPreference);
    const frame = window.requestAnimationFrame(() => {
      setPreference(initialPreference);
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const nextPreference = isThemePreference(event.newValue)
        ? event.newValue
        : "dark";
      setPreference(nextPreference);
      applyTheme(nextPreference);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const nextPreference: ThemePreference = preference === "dark" ? "green" : "dark";
  const label = nextPreference === "green" ? "Use green theme" : "Use dark theme";

  function cycleTheme() {
    storePreference(nextPreference);
    setPreference(nextPreference);
    applyTheme(nextPreference);
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:bg-surface hover:text-foreground"
    >
      <ThemeIcon preference={preference} />
    </button>
  );
}
