import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Icon, type IconName } from "@/components/ui/icons";

const trustChips = ["Kenya-based support", "Remote delivery", "Clear communication"] as const;

const supportAreas: ReadonlyArray<{ label: string; value: string; icon: IconName }> = [
  { label: "Online services", value: "Government & registration support", icon: "globe" },
  { label: "Data work", value: "Clean, organize, and understand information", icon: "database" },
  { label: "Software", value: "Practical websites and business tools", icon: "code" },
  { label: "AI & automation", value: "Streamline repetitive digital work", icon: "workflow" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border bg-surface-muted">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-accent-soft opacity-70 blur-3xl"
      />
      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Digital services • software • AI &amp; automation</p>
          <h1 id="hero-heading" className="display-1 mt-4 lg:text-[3.5rem]">
            Digital solutions that keep work moving and businesses growing.
          </h1>
          <p className="lead mt-6 max-w-xl">
            Afrinex Solutions helps individuals and businesses handle online
            processes, data work, software projects, automation, and practical
            digital support without unnecessary complexity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              Request a Service
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3" aria-label="Why work with Afrinex">
            {trustChips.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.9375rem] font-medium text-foreground">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/**
 * Founder photo with the "Support areas" card layered over it. Uses the real
 * founder image only; no stock imagery.
 */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative ml-auto aspect-square w-[70%] max-w-[22rem] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
        <Image
          src="/images/pius-wanyangu-profile.jpeg"
          alt="Pius Wanyangu, founder of Afrinex Solutions"
          fill
          preload
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 70vw"
          className="object-cover"
        />
      </div>

      <div className="card relative -mt-16 w-[90%] max-w-[23rem] border border-border p-5 sm:-mt-32 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Support areas</p>
            <p className="mt-1 text-lg font-bold text-foreground">Digital execution</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Available
          </span>
        </div>
        <ul className="mt-4 space-y-3">
          {supportAreas.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="icon-badge size-9 rounded-md">
                <Icon name={item.icon} className="size-[1.125rem]" />
              </span>
              <span>
                <span className="block text-sm font-semibold leading-5 text-foreground">{item.label}</span>
                <span className="block text-[0.8125rem] leading-5 text-muted-foreground">{item.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
