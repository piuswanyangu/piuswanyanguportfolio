import type { ServiceCategory } from "@/data/services";

type ServiceIconProps = {
  category: ServiceCategory;
  className?: string;
};

export function ServiceIcon({ category, className = "size-6" }: ServiceIconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (category === "Digital & Online Services") {
    return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5M16 4v5" /></svg>;
  }

  if (category === "Data Services") {
    return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></svg>;
  }

  if (category === "Software & Technology") {
    return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m9 9-3 3 3 3m6-6 3 3-3 3m-4 2 2-10" /></svg>;
  }

  return <svg {...common}><path d="M4 20h16M6 17l4-4 3 3 5-7" /><path d="M14 9h4v4" /></svg>;
}
