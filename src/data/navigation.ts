export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Writing", href: "/writing" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];
