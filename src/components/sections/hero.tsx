import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.18),transparent_42%)]" />
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <div className="motion-orb motion-orb--primary left-[10%] top-20 h-52 w-52" />
        <div className="motion-orb motion-orb--secondary right-[10%] top-24 h-56 w-56" />
      </div>

      <Container className="relative py-14 sm:py-18 lg:py-22">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">Digital services • software • AI &amp; automation</p>
            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[4.25rem]"
            >
              Digital solutions that keep work moving and businesses growing.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Afrinex Solutions helps individuals and businesses handle online
              processes, data work, software projects, automation, and practical
              digital support without unnecessary complexity.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 text-sm font-semibold sm:flex-row sm:items-center">
              <Link href="/contact" className="primary-button px-6 py-3">
                Request a Service
              </Link>
              <Link href="/services" className="secondary-button px-6 py-3">
                Explore Services
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {[
                "Kenya-based support",
                "Remote delivery",
                "Clear communication",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface/80 px-3 py-2 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="hero-panel p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Support areas
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    Digital execution
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                  Available
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Online services", value: "Government & registration support" },
                  { label: "Data work", value: "Clean, organize, and understand information" },
                  { label: "Software", value: "Practical websites and business tools" },
                  { label: "AI & automation", value: "Streamline repetitive digital work" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-surface-muted/70 p-4"
                  >
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent-soft p-4">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
                  Working approach
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Understand the need, agree on scope, and deliver a solution that
                  fits the actual work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
