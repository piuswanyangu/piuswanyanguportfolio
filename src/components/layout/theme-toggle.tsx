"use client";

import { useEffect, useState } from "react";

type ThemePreference = "light" | "dark" | "green";

const storageKey = "afrinex-theme";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "green";
}

function readStoredPreference(): ThemePreference {
  try {
    const storedPreference = window.localStorage.getItem(storageKey);
    return isThemePreference(storedPreference) ? storedPreference : "light";
  } catch {
    return "light";
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
  root.style.colorScheme = preference === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("light");

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
        : "light";
      setPreference(nextPreference);
      applyTheme(nextPreference);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function selectTheme(nextPreference: ThemePreference) {
    storePreference(nextPreference);
    setPreference(nextPreference);
    applyTheme(nextPreference);
  }

  return (
    <label className="relative shrink-0">
      <span className="sr-only">Color theme</span>
      <select
        value={preference}
        onChange={(event) => selectTheme(event.target.value as ThemePreference)}
        aria-label="Color theme"
        className="h-11 rounded-md border border-border-interactive bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-accent focus-visible:border-accent"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="green">Green</option>
      </select>
    </label>
  );
}
