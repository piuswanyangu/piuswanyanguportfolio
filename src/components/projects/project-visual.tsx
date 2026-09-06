import type { ProjectVisual as ProjectVisualData } from "@/data/projects";

type ProjectVisualProps = {
  projectName: string;
  visual: ProjectVisualData;
};

export function ProjectVisual({ projectName, visual }: ProjectVisualProps) {
  return (
    <figure className="flex min-h-56 flex-col overflow-hidden border border-border bg-surface-muted p-5 transition-[border-color,background-color] group-hover:border-accent/25 group-hover:bg-surface-elevated sm:min-h-64 sm:p-7">
      <figcaption className="flex items-center justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
        <span>Conceptual system visual</span>
        <span aria-hidden="true">Not a screenshot</span>
      </figcaption>

      <div className="flex flex-1 items-center justify-center py-6">
        {visual.kind === "monitoring" ? (
          <div className="w-full max-w-sm border border-border bg-background p-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-semibold text-foreground">{projectName}</span>
              <span className="text-xs text-muted-foreground">System view</span>
            </div>
            <ul className="mt-2">
              {visual.items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-border/70 py-2.5 last:border-0"
                >
                  <span className="text-xs text-muted-foreground">{item}</span>
                  <span aria-hidden="true" className="flex gap-1">
                    {[0, 1, 2].map((bar) => (
                      <span
                        key={bar}
                        className={`w-1.5 bg-muted-foreground/50 ${
                          bar <= index % 3 ? "h-3" : "h-1.5"
                        }`}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="mx-auto w-fit border border-border bg-background px-5 py-3 text-center text-sm font-semibold text-foreground">
              {projectName}
            </div>
            <div aria-hidden="true" className="mx-auto h-7 w-px bg-border" />
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {visual.items.map((item, index) => (
                <li
                  key={item}
                  className="border border-border bg-surface px-3 py-3 text-center text-xs font-medium text-muted-foreground"
                >
                  <span className="font-mono text-[0.625rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </figure>
  );
}
