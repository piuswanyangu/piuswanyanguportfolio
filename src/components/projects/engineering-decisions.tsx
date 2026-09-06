import type { EngineeringDecision } from "@/data/projects";

type EngineeringDecisionsProps = {
  decisions: readonly EngineeringDecision[];
};

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  return (
    <div className="space-y-6">
      {decisions.map((decision) => (
        <article key={decision.decision} className="border border-border bg-surface p-5 sm:p-6">
          <h3 className="font-semibold text-foreground">{decision.decision}</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Why
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                {decision.reason}
              </dd>
            </div>
            {decision.alternative && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Alternative
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                  {decision.alternative}
                </dd>
              </div>
            )}
            {decision.tradeoff && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Trade-off
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                  {decision.tradeoff}
                </dd>
              </div>
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}
