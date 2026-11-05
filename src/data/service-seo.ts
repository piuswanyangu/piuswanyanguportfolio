/**
 * Search-result titles and descriptions for each service page.
 *
 * Kept separate from `services.ts` so the short card text on the site can stay
 * brief while search results get a fuller, specific description.
 *
 * Guidelines for editing:
 * - Title: under about 40 characters. The layout appends " | Afrinex Solutions".
 * - Description: about 120-160 characters, written for a person, not a robot.
 * - Describe only what the service actually includes. For KRA services, avoid
 *   wording that implies tax advice or acting as a tax agent until the legal
 *   review (LEGAL_DOCUMENT_REVIEW.md, section 5) is resolved.
 */
export const serviceSeo: Record<string, { title: string; description: string }> = {
  "sha-registration-assistance": {
    title: "SHA Registration Help in Kenya",
    description:
      "Practical help registering with the Social Health Authority (SHA) in Kenya. Afrinex explains each step and guides you through the online process.",
  },
  "kra-registration-assistance": {
    title: "KRA PIN Registration Help in Kenya",
    description:
      "Need a KRA PIN? Afrinex Solutions guides you through KRA PIN registration on iTax and explains which details you need before you start.",
  },
  "kra-returns-assistance": {
    title: "KRA Returns Assistance in Kenya",
    description:
      "Step-by-step guidance while you complete your KRA return on iTax, from gathering the right details to understanding each part of the process.",
  },
  "etims-assistance": {
    title: "eTIMS Registration and Setup Help",
    description:
      "Help with KRA eTIMS registration, setup and day-to-day use, so your business in Kenya can start issuing electronic tax invoices with confidence.",
  },
  "data-entry": {
    title: "Data Entry Services in Kenya",
    description:
      "Turn paper records and scattered information into organised, accurate digital records. Remote data entry services from Afrinex Solutions in Kenya.",
  },
  "data-cleaning": {
    title: "Data Cleaning and Spreadsheet Cleanup",
    description:
      "Fix duplicates, missing details and inconsistent entries in your spreadsheets, so your business records are accurate, consistent and ready to use.",
  },
  "data-analysis": {
    title: "Business Reports and Data Analysis",
    description:
      "Clear reports on your sales, expenses and business performance, built from your existing records so you can make decisions with confidence.",
  },
  "software-development": {
    title: "Website and Software Development",
    description:
      "Websites and business software built around your real requirements, from scope agreement to handover. Software development by Afrinex Solutions, Kenya.",
  },
  "ai-powered-solutions": {
    title: "AI-Powered Solutions for Business",
    description:
      "Useful AI capabilities built into your workflows and applications, scoped around a real business need and explained in plain language.",
  },
  "automation-services": {
    title: "Business Process Automation",
    description:
      "Automate repeatable digital and business tasks to save time and reduce manual errors, with every workflow scoped, built and explained clearly.",
  },
  "website-maintenance": {
    title: "Website Maintenance and Support",
    description:
      "Ongoing technical support, updates and fixes for your existing website, so it keeps working well and stays up to date. Remote support from Kenya.",
  },
  "graphic-design": {
    title: "Graphic Design Services",
    description:
      "Visual materials for digital and professional communication, designed around your audience and delivered in the formats you need.",
  },
  "linkedin-optimization": {
    title: "LinkedIn Profile Optimization",
    description:
      "Improve your LinkedIn profile with clearer professional positioning and wording that presents your experience and strengths to the right audience.",
  },
};
