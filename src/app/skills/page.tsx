import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/layout/page-heading";
import { capabilityGroups } from "@/data/technical-capabilities";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Skills",
  description:
    "Explore Pius Wanyangu's frontend, backend, data, automation, AI, and deployment capabilities.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <Container className="py-14 sm:py-18 lg:py-22">
      <PageHeading
        eyebrow="Capabilities"
        title="Technical Skills"
        description="My stack spans frontend engineering, backend systems, databases, automation, and deployment tooling, with technology choices guided by each problem."
      />

      <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
        {capabilityGroups.map((group) => (
          <section key={group.title} className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {group.title}
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
              {group.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-sm border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
