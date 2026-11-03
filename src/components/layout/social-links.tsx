import { Icon, type IconName } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import { siteConfig } from "@/lib/site-config";

type SocialLink = { label: string; href: string; icon: IconName };

/** Configured social links only; anything left null in siteConfig is omitted. */
export function getSocialLinks(): SocialLink[] {
  const links: Array<SocialLink | null> = [
    siteConfig.social.linkedin ? { label: "LinkedIn", href: siteConfig.social.linkedin, icon: "linkedin" } : null,
    siteConfig.social.github ? { label: "GitHub", href: siteConfig.social.github, icon: "github" } : null,
    { label: "WhatsApp", href: contact.whatsappUrl, icon: "whatsapp" },
  ];
  return links.filter((link): link is SocialLink => link !== null);
}

export function SocialLinks({ className = "", tone = "default" }: { className?: string; tone?: "default" | "on-brand" }) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
            className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${
              tone === "on-brand"
                ? "border-on-brand/30 text-on-brand hover:bg-on-brand hover:text-brand-band-strong"
                : "border-border text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon name={link.icon} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
