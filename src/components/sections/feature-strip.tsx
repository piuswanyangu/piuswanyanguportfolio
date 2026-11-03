import { Container } from "@/components/layout/container";
import { Icon, type IconName } from "@/components/ui/icons";

const features: ReadonlyArray<{ title: string; detail: string; icon: IconName }> = [
  { title: "Kenya-based support", detail: "SHA and KRA assistance for customers in Kenya.", icon: "mapPin" },
  { title: "Remote delivery", detail: "Website, software, data, and automation work delivered remotely.", icon: "laptop" },
  { title: "Scope and cost agreed before work", detail: "The work, cost, and timeline are agreed before work begins.", icon: "handshake" },
  { title: "Direct founder access", detail: "Technical guidance stays direct.", icon: "userCheck" },
];

/** "What you get" strip. Deliberately qualitative: no numbers unless they are real. */
export function FeatureStrip() {
  return (
    <section aria-labelledby="what-you-get-heading" className="on-brand bg-brand-band text-on-brand">
      <h2 id="what-you-get-heading" className="sr-only">What you get</h2>
      <Container>
        <ul className="grid divide-y divide-on-brand/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4 py-7 sm:px-2 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-on-brand/12 text-on-brand ring-1 ring-on-brand/25">
                <Icon name={feature.icon} className="size-6" />
              </span>
              <span>
                <span className="block font-bold leading-6">{feature.title}</span>
                <span className="mt-1 block text-[0.9375rem] leading-6 text-on-brand-muted">{feature.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
