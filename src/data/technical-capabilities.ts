export type CapabilityGroup = {
  title: string;
  description: string;
  skills: readonly string[];
};

export const capabilityGroups = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive interface development, maintainable component architecture, and thoughtful integration with backend services.",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend Engineering",
    description:
      "API development and application logic with clear authentication, validation, and maintainable backend structure.",
    skills: ["Python", "Django", "Django REST Framework", "Node.js", "Express"],
  },
  {
    title: "Databases & Data",
    description:
      "Practical data modeling and persistence across relational and non-relational stores, with caching where it supports the application.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    title: "Automation & AI",
    description:
      "Useful AI features, automated workflows, and background processing designed around real product and operational needs.",
    skills: [
      "AI-powered application integration",
      "Workflow automation",
      "Background task processing",
      "Celery",
      "RabbitMQ",
    ],
  },
  {
    title: "DevOps & Engineering Tools",
    description:
      "Source control, containerized development, CI/CD, deployment, and dependable day-to-day engineering workflows.",
    skills: ["Git", "GitHub", "Docker", "GitHub Actions", "Render", "Vercel"],
  },
] as const satisfies readonly CapabilityGroup[];
