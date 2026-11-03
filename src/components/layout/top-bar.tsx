import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import { siteConfig } from "@/lib/site-config";

/** Slim brand-colored strip above the header. Collapses to icons below 640px. */
export function TopBar() {
  const { hours } = siteConfig.contact;

  return (
    <div className="on-brand bg-brand-band text-on-brand">
      <Container className="flex min-h-10 items-center justify-between gap-4 text-[0.8125rem] font-medium">
        <p className="hidden items-center gap-2 sm:flex">
          <Icon name="mapPin" className="size-4 text-on-brand-muted" />
          {siteConfig.tagline}
        </p>
        <ul className="flex w-full items-center justify-end gap-1 sm:w-auto sm:gap-5">
          {hours && (
            <li className="hidden items-center gap-2 md:flex">
              <Icon name="clock" className="size-4 text-on-brand-muted" />
              {hours}
            </li>
          )}
          <li>
            <a
              href={contact.emailUrl}
              className="inline-flex min-h-10 items-center gap-2 rounded-sm px-2 transition-opacity hover:opacity-85 sm:px-0"
            >
              <Icon name="mail" className="size-4" />
              <span className="sr-only sm:not-sr-only">{contact.email}</span>
            </a>
          </li>
          <li>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-sm px-2 transition-opacity hover:opacity-85 sm:px-0"
            >
              <Icon name="whatsapp" className="size-4" />
              <span className="sr-only sm:not-sr-only">WhatsApp</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
