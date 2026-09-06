import type { ArchitectureStep } from "@/data/projects";

const roleLabels: Record<ArchitectureStep["role"], string> = {
  client: "Client",
  frontend: "Frontend",
  backend: "Backend / API",
  database: "Database",
  cache: "Cache",
  worker: "Background worker",
  infrastructure: "Infrastructure",
  external: "External service",
  ai: "AI service",
};

type ArchitectureDiagramProps = {
  projectName: string;
  steps: readonly ArchitectureStep[];
};

export function ArchitectureDiagram({
  projectName,
  steps,
}: ArchitectureDiagramProps) {
  return (
    <figure>
      <figcaption className="sr-only">
        {projectName} architecture, shown in sequence
      </figcaption>
      <ol className="grid gap-3 xl:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {steps.map((step, index) => (
          <li
            key={`${step.label}-${index}`}
            className="relative min-w-0 border border-border bg-surface p-5 transition-colors hover:border-accent/35"
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {roleLabels[step.role]}
            </p>
            <p className="mt-3 break-words font-semibold text-foreground">
              {step.label}
            </p>
            {step.detail && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.detail}
              </p>
            )}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-4 block font-mono text-sm text-muted-foreground xl:absolute xl:-right-3 xl:top-1/2 xl:z-10 xl:mt-0 xl:-translate-y-1/2 xl:bg-background xl:px-1"
              >
                <span className="xl:hidden">↓</span>
                <span className="hidden xl:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
