export const serviceCategories = [
  "Digital & Online Services",
  "Data Services",
  "Software & Technology",
  "Creative & Professional",
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type ServiceType =
  | "assistance"
  | "data"
  | "technology"
  | "professional";

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  category: ServiceCategory;
  featured: boolean;
  serviceType: ServiceType;
};

export const services = [
  {
    slug: "sha-registration-assistance",
    name: "SHA Registration Assistance",
    shortDescription: "Guidance and practical assistance with the SHA registration process.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "kra-registration-assistance",
    name: "KRA Registration Assistance",
    shortDescription: "Guidance and practical assistance with KRA registration tasks.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "kra-returns-assistance",
    name: "KRA Returns Assistance",
    shortDescription: "Guidance and practical assistance with the KRA returns process.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "data-entry",
    name: "Data Entry",
    shortDescription: "Structured entry and organization of business or operational data.",
    category: "Data Services",
    featured: false,
    serviceType: "data",
  },
  {
    slug: "data-cleaning",
    name: "Data Cleaning",
    shortDescription: "Review and preparation of datasets for more consistent use and analysis.",
    category: "Data Services",
    featured: true,
    serviceType: "data",
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    shortDescription: "Analysis that helps turn structured data into useful findings.",
    category: "Data Services",
    featured: false,
    serviceType: "data",
  },
  {
    slug: "software-development",
    name: "Software Development",
    shortDescription: "Websites and software designed around practical business requirements.",
    category: "Software & Technology",
    featured: true,
    serviceType: "technology",
  },
  {
    slug: "ai-powered-solutions",
    name: "AI-Powered Solutions",
    shortDescription: "Useful AI capabilities integrated into clear workflows and applications.",
    category: "Software & Technology",
    featured: true,
    serviceType: "technology",
  },
  {
    slug: "automation-services",
    name: "Automation Services",
    shortDescription: "Automation of repeatable digital and business processes.",
    category: "Software & Technology",
    featured: true,
    serviceType: "technology",
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    shortDescription: "Ongoing technical support and updates for existing websites.",
    category: "Software & Technology",
    featured: false,
    serviceType: "technology",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    shortDescription: "Visual materials for digital and professional communication.",
    category: "Creative & Professional",
    featured: false,
    serviceType: "professional",
  },
  {
    slug: "linkedin-optimization",
    name: "LinkedIn Optimization",
    shortDescription: "Profile improvements for clearer professional positioning on LinkedIn.",
    category: "Creative & Professional",
    featured: false,
    serviceType: "professional",
  },
] as const satisfies readonly Service[];
