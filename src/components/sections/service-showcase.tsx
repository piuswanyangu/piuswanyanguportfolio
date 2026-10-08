"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { ServiceIcon } from "@/components/services/service-icon";
import { serviceCategories, services } from "@/data/services";

const categoryIds = {
  "Digital & Online Services": "digital-online-services",
  "Data Services": "data-services",
  "Software & Technology": "software-technology",
  "Creative & Professional": "creative-professional",
} as const;

const descriptions = {
  "Digital & Online Services": "Get guided help with supported online registrations, filings, and setup tasks.",
  "Data Services": "Turn scattered records and spreadsheets into information that is easier to use.",
  "Software & Technology": "Build or improve websites, software, AI features, and repeatable workflows.",
  "Creative & Professional": "Communicate more clearly through practical design and professional profile support.",
} as const;

export function ServiceShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const category = serviceCategories[selectedIndex];
  const benefits = services.filter((service) => service.category === category).slice(0, 3);

  function selectWithKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % serviceCategories.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + serviceCategories.length) % serviceCategories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = serviceCategories.length - 1;
    else return;
    event.preventDefault();
    setSelectedIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section aria-labelledby="service-showcase-heading" className="section-enter border-t border-border py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Services</p>
          <h2 id="service-showcase-heading" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Practical support for the work in front of you.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Choose an area to see how Afrinex can help.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-5xl">
          <div role="tablist" aria-label="Service categories" className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-border bg-surface-muted/70 p-2 pb-2 sm:justify-center">
            {serviceCategories.map((item, index) => (
              <button key={item} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`service-tab-${index}`} aria-selected={selectedIndex === index} aria-controls="service-panel" tabIndex={selectedIndex === index ? 0 : -1} onClick={() => setSelectedIndex(index)} onKeyDown={(event) => selectWithKeyboard(event, index)} className={`min-h-11 shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${selectedIndex === index ? "border-accent bg-accent text-accent-foreground shadow-[0_12px_24px_rgba(15,118,110,0.18)]" : "border-transparent bg-transparent text-foreground hover:border-border hover:bg-surface hover:text-accent"}`}>
                {item === "Creative & Professional" ? "Creative & Professional Services" : item}
              </button>
            ))}
          </div>
        </div>

        <div key={category} id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${selectedIndex}`} className="content-enter mt-7 grid min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-56 items-center justify-center bg-surface-muted p-8 text-accent sm:p-12">
            <div className="text-center">
              <span className="mx-auto inline-flex size-20 items-center justify-center rounded-2xl bg-accent-soft ring-1 ring-inset ring-border/70"><ServiceIcon category={category} className="size-10" /></span>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{category}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{category}</h3>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{descriptions[category]}</p>
            <ul className="mt-6 space-y-3">
              {benefits.map((service) => <li key={service.slug} className="flex gap-3 text-sm leading-6 text-foreground"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{service.shortDescription}</li>)}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/contact?service=${encodeURIComponent(category)}`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover">Request this service</Link>
              <Link href={`/services#${categoryIds[category]}`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border-interactive px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent">View services</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
