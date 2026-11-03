"use client";

import { useEffect, useId, useState } from "react";
import { Icon, type IconName } from "@/components/ui/icons";

type ThemePreference = "light" | "dark" | "green";

const storageKey = "afrinex-theme";
/** Keeps multiple toggles on one page (header + mobile drawer) in sync. */
const changeEvent = "afrinex-theme-change";

const themes: ReadonlyArray<{ value: ThemePreference; label: string; icon: IconName }> = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "green", label: "Green", icon: "leaf" },
];

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

/**
 * Segmented radio group: a visible icon per theme, with a visually hidden
 * legend ("Color theme") and per-option labels for assistive technology.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>("light");
  const name = useId();

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

    const handleLocalChange = (event: Event) => {
      const next = (event as CustomEvent<ThemePreference>).detail;
      if (isThemePreference(next)) setPreference(next);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(changeEvent, handleLocalChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(changeEvent, handleLocalChange);
    };
  }, []);

  function selectTheme(nextPreference: ThemePreference) {
    storePreference(nextPreference);
    setPreference(nextPreference);
    applyTheme(nextPreference);
    window.dispatchEvent(new CustomEvent(changeEvent, { detail: nextPreference }));
  }

  return (
    <fieldset className={`m-0 shrink-0 border-0 p-0 ${className}`}>
      <legend className="sr-only">Color theme</legend>
      <div className="flex items-center gap-0.5 rounded-full border border-border bg-surface-muted p-0.5">
        {themes.map((theme) => {
          const checked = preference === theme.value;
          return (
            <label
              key={theme.value}
              title={`${theme.label} theme`}
              className={`relative inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)] ${
                checked ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-accent"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={theme.value}
                checked={checked}
                onChange={() => selectTheme(theme.value)}
                className="sr-only"
              />
              <Icon name={theme.icon} className="size-4" />
              <span className="sr-only">{theme.label} theme</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
