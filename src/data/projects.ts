export type ArchitectureStep = {
  label: string;
  detail?: string;
  role:
    | "client"
    | "frontend"
    | "backend"
    | "database"
    | "cache"
    | "worker"
    | "infrastructure"
    | "external"
    | "ai";
};

export type EngineeringDecision = {
  decision: string;
  reason: string;
  alternative?: string;
  tradeoff?: string;
};

export type ProjectVisual = {
  kind: "marketplace" | "monitoring" | "case-workflow";
  items: readonly string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  valueProposition: string;
  problem: string;
  solution: string;
  plannedWork?: string;
  technologies: readonly string[];
  featured: boolean;
  status: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  features?: readonly string[];
  architecture?: readonly ArchitectureStep[];
  testing?: string;
  seo?: string;
  limitations?: string;
  learning?: string;
  screenshots?: readonly ProjectImage[];
  engineeringDecisions?: readonly EngineeringDecision[];
  image: ProjectImage | null;
  socialImage: string | null;
  visual: ProjectVisual;
};

export const projects = [
  {
    slug: "worklink-africa",
    name: "WorkLink Africa",
    category: "Marketplace platform",
    summary:
      "An enterprise-style marketplace designed to connect users, businesses, jobs, and professional services in one broad platform.",
    valueProposition:
      "One connected product for jobs, services, businesses, communication, and transactions.",
    problem:
      "Job opportunities, service providers, business discovery, communication, and transactions often live across disconnected systems.",
    solution:
      "Engineered the Next.js product experience across onboarding, profiles, multiple marketplaces, messaging, an AI assistant, wallet, escrow, checkout, and notifications, alongside SEO and PWA production audit work.",
    plannedWork:
      "The broader application architecture includes a planned Django and PostgreSQL backend.",
    technologies: ["Next.js", "TypeScript", "Django", "PostgreSQL"],
    featured: true,
    status: "In development",
    githubUrl: null,
    liveUrl: null,
    features: [
      "Authentication and onboarding",
      "User and business profiles",
      "Jobs, services, and businesses marketplaces",
      "Messaging and notifications",
      "AI assistant",
      "Wallet, escrow, and checkout flows",
      "SEO and PWA production audit work",
    ],
    architecture: [
      { label: "Next.js frontend", detail: "Implemented product experience", role: "frontend" },
      { label: "Django backend", detail: "Planned application layer", role: "backend" },
      { label: "PostgreSQL", detail: "Planned data layer", role: "database" },
    ],
    image: null,
    socialImage: null,
    visual: {
      kind: "marketplace",
      items: ["Users", "Jobs", "Services", "Businesses"],
    },
  },
  {
    slug: "sentinelai",
    name: "SentinelAI",
    category: "API monitoring platform",
    summary:
      "A multi-tenant platform for monitoring APIs and presenting operational information through focused dashboards.",
    valueProposition:
      "Operational visibility for multi-tenant API monitoring and asynchronous processing.",
    problem:
      "API monitoring requires dependable tenant separation, clear operational visibility, and background processing that does not block core application workflows.",
    solution:
      "Designed a Django and Next.js architecture with multi-tenant boundaries, tested application behavior, and asynchronous enrichment handled through Celery and Redis.",
    technologies: ["Next.js", "Django", "Celery", "Redis"],
    featured: true,
    status: null,
    githubUrl: null,
    liveUrl: null,
    features: [
      "Multi-tenant application structure",
      "API monitoring dashboards",
      "Asynchronous enrichment",
      "Background task processing",
      "Application tests",
    ],
    architecture: [
      { label: "Next.js dashboards", detail: "Operational interface", role: "frontend" },
      { label: "Django application", detail: "Multi-tenant backend", role: "backend" },
      { label: "Celery workers", detail: "Asynchronous enrichment", role: "worker" },
      { label: "Redis", detail: "Task infrastructure", role: "cache" },
    ],
    testing:
      "The project includes tests alongside its dashboard, tenant, and asynchronous processing work.",
    image: null,
    socialImage: null,
    visual: {
      kind: "monitoring",
      items: ["API checks", "Tenant data", "Enrichment", "Dashboards"],
    },
  },
  {
    slug: "staynia",
    name: "StayNia",
    category: "Accommodation marketplace",
    summary:
      "A responsive accommodation marketplace prototype for discovering fixture-based stays across Kenya.",
    valueProposition: "Find trusted stays across Kenya.",
    problem:
      "Accommodation marketplace interfaces need property discovery, filtering, pricing information, and detail pages while remaining usable across different devices.",
    solution:
      "Built a Next.js marketplace prototype with destination search, URL-backed filters, sorting, reusable property data, statically generated detail pages, internal API routes, responsive property cards, SEO metadata, and browser testing.",
    technologies: ["Next.js", "React", "TypeScript", "Playwright"],
    featured: true,
    status: "Prototype",
    githubUrl: "https://github.com/piuswanyangu/listing-app-deployed",
    liveUrl: "https://stayniaairbnb.vercel.app/",
    features: [
      "Destination search, filtering, sorting, result counts, and clear filters",
      "URL-backed discovery state",
      "Reusable property cards backed by canonical fixture data",
      "Statically generated property-detail pages and image galleries",
      "Guest capacity, amenities, sample ratings, KES pricing, and related stays",
      "Internal property collection and detail API routes",
      "Responsive layouts, custom 404 handling, and demo disclosures",
    ],
    architecture: [
      { label: "Marketplace UI", detail: "Responsive discovery and property views", role: "frontend" },
      { label: "Internal API routes", detail: "Property collection and detail endpoints", role: "backend" },
      { label: "Canonical fixtures", detail: "Shared property data for UI and API responses", role: "database" },
      { label: "Static property pages", detail: "Generated detail routes", role: "infrastructure" },
    ],
    testing:
      "Playwright browser tests cover desktop and mobile user paths, with unit validation included where supported by the project.",
    seo:
      "The prototype includes page metadata, dynamic robots output, a restricted sitemap, statically generated property routes, and a custom not-found experience.",
    limitations:
      "StayNia currently uses fixture/demo data. Authentication, a production database, reservations, real availability, payment processing, live inventory, host onboarding, and submitted contact forms are intentionally not implemented.",
    learning:
      "This project strengthened my understanding of keeping UI and API responses aligned through shared data, representing discovery state in URLs, testing responsive user journeys, and clearly separating a working prototype from future transactional features.",
    image: {
      src: "/images/projects/staynia/staynia-home.png",
      alt: "StayNia homepage and property discovery introduction",
      width: 1354,
      height: 586,
    },
    screenshots: [
      {
        src: "/images/projects/staynia/staynia-home.png",
        alt: "StayNia homepage and property discovery introduction",
        width: 1354,
        height: 586,
      },
      {
        src: "/images/projects/staynia/staynia-discovery.png",
        alt: "StayNia property discovery results interface",
        width: 1357,
        height: 607,
      },
    ],
    socialImage: "/images/projects/staynia/staynia-home.png",
    visual: {
      kind: "marketplace",
      items: ["Search", "Filters", "Properties", "Details"],
    },
  },
  {
    slug: "upright-support",
    name: "Upright Support",
    category: "Case reporting system",
    summary:
      "A Django-based support system for structured case reporting, evidence handling, and case follow-up.",
    valueProposition:
      "Controlled case reporting with validated evidence and traceable updates.",
    problem:
      "Sensitive support cases need controlled access, validated evidence, traceable updates, and consistent notifications throughout the reporting workflow.",
    solution:
      "Implemented a custom user model, case access using a case ID and access code, evidence validation, automatic timeline logging, notifications, and tested administration workflows.",
    technologies: ["Django", "Python"],
    featured: false,
    status: null,
    githubUrl: null,
    liveUrl: null,
    features: [
      "Custom user model",
      "Case ID and access-code access",
      "Evidence validation",
      "Automatic timeline logging",
      "Notifications",
      "Tested administration workflows",
    ],
    architecture: [
      { label: "Case reporting interface", detail: "Submission and follow-up", role: "client" },
      { label: "Django application", detail: "Validation and business logic", role: "backend" },
      { label: "Structured case data", detail: "Cases, evidence, and timelines", role: "database" },
    ],
    testing:
      "Administration functionality was tested as part of the structured case-management workflow.",
    image: null,
    socialImage: null,
    visual: {
      kind: "case-workflow",
      items: ["Report", "Validate", "Timeline", "Notify"],
    },
  },
] as const satisfies readonly Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
