import type { ProjectVisual } from "@/data/projects";

type ProjectDiagramProps = {
  projectName: string;
  visual: ProjectVisual;
  className?: string;
};

/**
 * Diagram-style SVG for projects without real screenshots. Drawn at 16:10 so it
 * matches screenshot cards. It is labelled as a system diagram, never
 * presented as a product screenshot.
 */
export function ProjectDiagram({ projectName, visual, className = "" }: ProjectDiagramProps) {
  const label = `System diagram of ${projectName}: ${visual.items.join(", ")}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 320 200"
      className={`block h-full w-full ${className}`}
      fontFamily="var(--font-geist-sans), Arial, sans-serif"
    >
      <defs>
        <pattern id={`grid-${visual.kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="var(--border)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="var(--surface-muted)" />
      <rect width="320" height="200" fill={`url(#grid-${visual.kind})`} />
      {visual.kind === "monitoring" ? (
        <MonitoringDiagram name={projectName} items={visual.items} />
      ) : visual.kind === "case-workflow" ? (
        <WorkflowDiagram name={projectName} items={visual.items} />
      ) : (
        <HubDiagram name={projectName} items={visual.items} />
      )}
      <text x="310" y="194" textAnchor="end" fontSize="7" fontWeight="700" letterSpacing="0.8" fill="var(--muted-foreground)">
        SYSTEM DIAGRAM
      </text>
    </svg>
  );
}

function Node({ x, y, w, label, index }: { x: number; y: number; w: number; label: string; index: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="30" rx="6" fill="var(--surface)" stroke="var(--border-strong)" />
      <circle cx={x + 13} cy={y + 15} r="7" fill="var(--accent-soft)" />
      <text x={x + 13} y={y + 18} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--accent)">
        {index + 1}
      </text>
      <text x={x + 26} y={y + 19} fontSize="9.5" fontWeight="600" fill="var(--foreground)">
        {label}
      </text>
    </g>
  );
}

function Hub({ name, x, y, w }: { name: string; x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="36" rx="8" fill="var(--accent)" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent-foreground)">
        {name}
      </text>
    </g>
  );
}

/** Marketplace: central platform with four connected domains. */
function HubDiagram({ name, items }: { name: string; items: readonly string[] }) {
  const positions = [
    { x: 24, y: 30 },
    { x: 206, y: 30 },
    { x: 24, y: 140 },
    { x: 206, y: 140 },
  ];
  return (
    <g>
      {positions.slice(0, items.length).map((pos, index) => (
        <path
          key={index}
          d={`M${pos.x + 45} ${pos.y + 15} L160 100`}
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeDasharray="3 3"
          opacity="0.7"
        />
      ))}
      <Hub name={name} x={100} y={82} w={120} />
      {items.slice(0, 4).map((item, index) => (
        <Node key={item} x={positions[index].x} y={positions[index].y} w={90} label={item} index={index} />
      ))}
    </g>
  );
}

/** Monitoring: pipeline of stages feeding a small chart panel. */
function MonitoringDiagram({ name, items }: { name: string; items: readonly string[] }) {
  const bars = [38, 56, 30, 64, 48, 72, 44, 60];
  return (
    <g>
      <Hub name={name} x={20} y={18} w={280} />
      {items.slice(0, 4).map((item, index) => (
        <g key={item}>
          <Node x={20} y={68 + index * 32} w={118} label={item} index={index} />
          {index < 3 && <path d={`M40 ${98 + index * 32}v2`} stroke="var(--accent)" strokeWidth="1.4" />}
        </g>
      ))}
      <path d="M138 130h22" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3" />
      <rect x="160" y="68" width="140" height="110" rx="8" fill="var(--surface)" stroke="var(--border-strong)" />
      <text x="172" y="86" fontSize="9" fontWeight="700" fill="var(--muted-foreground)">
        STATUS
      </text>
      <circle cx="286" cy="83" r="4" fill="var(--accent)" />
      {bars.map((height, index) => (
        <rect
          key={index}
          x={172 + index * 15}
          y={170 - height}
          width="9"
          height={height}
          rx="2"
          fill="var(--accent)"
          opacity={0.35 + (index % 3) * 0.2}
        />
      ))}
    </g>
  );
}

/** Case workflow: linear stages from report to notification. */
function WorkflowDiagram({ name, items }: { name: string; items: readonly string[] }) {
  return (
    <g>
      <Hub name={name} x={60} y={22} w={200} />
      {items.slice(0, 4).map((item, index) => {
        const x = 12 + index * 76;
        return (
          <g key={item}>
            <Node x={x} y={110} w={72} label={item} index={index} />
            {index < 3 && <path d={`M${x + 72} 125h4`} stroke="var(--accent)" strokeWidth="1.6" />}
          </g>
        );
      })}
      <path d="M160 58v52" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3" />
    </g>
  );
}
