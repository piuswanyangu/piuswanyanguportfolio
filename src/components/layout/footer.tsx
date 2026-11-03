import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { Icon } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import { navigationItems } from "@/data/navigation";
import { serviceGroupHref, siteConfig } from "@/lib/site-config";

const headingClass = "text-sm font-bold uppercase tracking-[0.14em] text-on-brand";
const linkClass =
  "inline-flex min-h-8 items-center rounded-sm text-on-brand-muted underline-offset-4 transition-colors hover:text-on-brand hover:underline";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const companyLinks = navigationItems.filter((item) => item.href !== "/");

  return (
    <footer className="on-brand bg-brand-band-strong text-on-brand">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.2fr] lg:gap-12">
        <div>
          <Link href="/" className="inline-block rounded-sm">
            <Logo tone="on-brand" />
          </Link>
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-7 text-on-brand-muted">
            Digital services, software, AI and automation for individuals and businesses, delivered from Kenya.
          </p>
          <SocialLinks tone="on-brand" className="mt-6" />
        </div>

        <nav aria-labelledby="footer-company-heading" className="text-[0.9375rem]">
          <h2 id="footer-company-heading" className={headingClass}>Company</h2>
          <ul className="mt-5 space-y-2">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-solutions-heading" className="text-[0.9375rem]">
          <h2 id="footer-solutions-heading" className={headingClass}>Solutions</h2>
          <ul className="mt-5 space-y-2">
            {siteConfig.serviceGroups.map((group) => (
              <li key={group.id}>
                <Link href={serviceGroupHref(group.id)} className={linkClass}>{group.category}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[0.9375rem]">
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-5 space-y-3 text-on-brand-muted">
            <li>
              <a href={contact.emailUrl} className={`${linkClass} gap-3 break-all`}>
                <Icon name="mail" className="size-5 shrink-0 text-on-brand" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-3`}>
                <Icon name="phone" className="size-5 shrink-0 text-on-brand" />
                {contact.phoneDisplay}
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </li>
            <li className="flex min-h-8 items-center gap-3">
              <Icon name="mapPin" className="size-5 shrink-0 text-on-brand" />
              {siteConfig.contact.location}
            </li>
            {siteConfig.contact.hours && (
              <li className="flex min-h-8 items-center gap-3">
                <Icon name="clock" className="size-5 shrink-0 text-on-brand" />
                {siteConfig.contact.hours}
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-on-brand/15">
        {/* Extra bottom padding on mobile keeps the floating buttons clear of the legal links. */}
        <Container className="flex flex-col gap-3 py-6 pb-24 text-sm text-on-brand-muted sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
