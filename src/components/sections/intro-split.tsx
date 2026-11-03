import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ServiceIcon } from "@/components/services/service-icon";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

/** "One partner" split: illustrated composition on one side, copy on the other. */
export function IntroSplit() {
  return (
    <section aria-labelledby="intro-heading" className="section">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <IntroIllustration />
        <div data-reveal>
          <span aria-hidden="true" className="heading-bar" />
          <p className="eyebrow mt-5">About Afrinex</p>
          <h2 id="intro-heading" className="display-2 mt-2">
            One partner for the digital tasks that keep work moving.
          </h2>
          <p className="lead mt-5">
            Afrinex Solutions helps people and businesses with the practical digital work that needs to get done, from online assistance and data handling to software, automation, and creative support.
          </p>
          <p className="mt-4 text-muted-foreground">
            Different digital needs often sit across multiple providers and processes. Afrinex brings these needs together so people can explain the problem once and work with a partner who helps them decide on the right next step.
          </p>
          <Link href="/services" className="btn btn-primary mt-8">
            Our Services
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Four service-group tiles orbiting a central "one partner" node. Decorative. */
function IntroIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg" data-reveal>
      <div className="absolute inset-6 rounded-[2rem] bg-accent-soft" />
      <div className="relative grid grid-cols-2 gap-4 p-4 sm:gap-5 sm:p-8">
        {siteConfig.serviceGroups.map((group, index) => (
          <div
            key={group.id}
            className={`card p-5 sm:p-6 ${index % 2 === 1 ? "translate-y-6" : ""}`}
          >
            <span className="icon-badge">
              <ServiceIcon category={group.category} className="size-6" />
            </span>
            <p className="mt-4 text-sm font-bold leading-5 text-foreground sm:text-base">{group.shortLabel}</p>
            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-surface-elevated" />
              <span className="block h-1.5 w-2/3 rounded-full bg-surface-elevated" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-card)] ring-8 ring-background sm:size-24">
        <Icon name="handshake" className="size-9 sm:size-10" />
      </div>
    </div>
  );
}
