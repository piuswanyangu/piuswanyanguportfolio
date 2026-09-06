import { Container } from "@/components/layout/container";

const workflow = [
  [
    "Understand the workflow",
    "Identify users, permissions, data, failure points, and the operational process before choosing implementation details.",
  ],
  [
    "Model the system",
    "Define data models, API boundaries, state transitions, and background work before expanding the interface.",
  ],
  [
    "Build and validate",
    "Implement the core path first, then check edge cases, permissions, API behavior, tests, and responsive UI.",
  ],
  [
    "Deploy and iterate",
    "Run linting, type checks, production builds, and project-specific tests before deployment, then refine actual behavior.",
  ],
] as const;

export function HowIBuild() {
  return (
    <section
      aria-labelledby="how-i-build-heading"
      className="border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="how-i-build-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            How I Work
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Four principles I use to move from an operational workflow to a
            tested implementation.
          </p>
        </div>

        <ol className="mt-10 border-t border-border sm:mt-12">
          {workflow.map(([title, description], index) => (
            <li key={title} className="grid gap-3 border-b border-border py-6 md:grid-cols-[4rem_14rem_1fr] md:gap-6">
              <p className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
