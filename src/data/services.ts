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
    name: "KRA PIN Registration Assistance",
    shortDescription: "Get help registering for your KRA PIN.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "kra-returns-assistance",
    name: "KRA Returns Assistance",
    shortDescription: "Get assistance preparing and filing your KRA returns.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "etims-assistance",
    name: "eTIMS Assistance",
    shortDescription: "Get help with eTIMS registration, setup, and use.",
    category: "Digital & Online Services",
    featured: true,
    serviceType: "assistance",
  },
  {
    slug: "data-entry",
    name: "Data Entry",
    shortDescription: "Turn paper records or scattered information into organized digital records.",
    category: "Data Services",
    featured: false,
    serviceType: "data",
  },
  {
    slug: "data-cleaning",
    name: "Data Cleaning",
    shortDescription: "Fix duplicates, missing details, and inconsistent information in your spreadsheets.",
    category: "Data Services",
    featured: true,
    serviceType: "data",
  },
  {
    slug: "data-analysis",
    name: "Reports and Data Analysis",
    shortDescription: "Understand your sales, expenses, and business performance through clear reports.",
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
