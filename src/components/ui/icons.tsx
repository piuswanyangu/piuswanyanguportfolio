import type { SVGProps } from "react";

/**
 * Inline stroke icons (24px grid). Always decorative: pair them with visible
 * text or an accessible label on the parent control.
 */
const paths = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  whatsapp: <><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z" /><path d="M9 9.2c0 3 2.8 5.8 5.8 5.8l1-1.6-2-1-1 .9a4 4 0 0 1-2.1-2.1l.9-1-1-2Z" /></>,
  mapPin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></>,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUp: <path d="M12 19V5m-6 6 6-6 6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  github: <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>,
  handshake: <><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.5 1.5a2 2 0 0 1-3-3L13 7h3l4 4" /><path d="M3 11 7 7h3M3 11l6 6a1.4 1.4 0 0 0 2-2" /></>,
  message: <><path d="M4 5h16v11H9l-5 4Z" /><path d="M8 9h8M8 12h5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  userCheck: <><circle cx="10" cy="8" r="4" /><path d="M3 21a7 7 0 0 1 11.5-5.4M15 19l2 2 4-4" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  sparkles: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M10 10h4v4h-4ZM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  workflow: <><rect x="3" y="3" width="7" height="6" rx="1" /><rect x="14" y="15" width="7" height="6" rx="1" /><path d="M6.5 9v4a2 2 0 0 0 2 2H14" /></>,
  code: <path d="m9 8-4 4 4 4m6-8 4 4-4 4m-2-11-2 14" />,
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8M14.5 6.5 13 5a4 4 0 0 0-5.5 5.5L3 15l3 3 4.5-4.5" />,
  penTool: <><path d="m12 19 7-7 3 3-7 7Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18Z" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
  keyboard: <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8Z" />,
  barChart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  idCard: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 13h3" /></>,
  fileCheck: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></>,
  receipt: <><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2Z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  heartPulse: <><path d="M20.5 8.5c0 5-8.5 11-8.5 11s-8.5-6-8.5-11A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5Z" /><path d="M3.5 12h4l2-3 3 6 2-3h6" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.2-1-1.6-1-2.6 0-.9.7-1.3 1.6-1.3H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>,
  book: <><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4ZM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 13 11" /></>,
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { name: IconName };

export function Icon({ name, className = "size-5", strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
