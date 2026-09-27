import type { Service, ServiceCategory } from "@/data/services";

type CategoryGuidance = {
  whoItHelps: string;
  included: readonly string[];
  prepare: readonly string[];
};

const guidance: Record<ServiceCategory, CategoryGuidance> = {
  "Digital & Online Services": {
    whoItHelps: "People who want practical guidance while completing a supported online registration, filing, or setup task.",
    included: ["A review of the task you need to complete", "Guidance through the relevant online process", "A clear explanation of the next steps"],
    prepare: ["A brief description of the task", "Your preferred contact method", "Only the information requested after Afrinex reviews your enquiry"],
  },
  "Data Services": {
    whoItHelps: "Businesses and individuals with records or spreadsheets that are difficult to organize, check, or understand.",
    included: ["A review of your current records and desired outcome", "The agreed organization, cleanup, or analysis work", "A clear handover of the completed files or findings"],
    prepare: ["A description of the records involved", "The result you want from the work", "A sample file only after the scope and safe sharing method are agreed"],
  },
  "Software & Technology": {
    whoItHelps: "Businesses and individuals who need a website, software tool, automation, AI feature, or technical support.",
    included: ["Requirement clarification and scope agreement", "Implementation of the agreed digital solution", "A handover and explanation of the next steps"],
    prepare: ["The business problem you want to solve", "Examples of any current workflow or website", "Your priorities and any known constraints"],
  },
  "Creative & Professional": {
    whoItHelps: "People and businesses that want clearer visual communication or stronger professional positioning.",
    included: ["A review of the communication need", "Creation or improvement of the agreed material", "Delivery of the completed work in the agreed format"],
    prepare: ["The audience you want to reach", "Your existing text or brand material, if available", "Examples that help explain your preferred direction"],
  },
};

export function getServiceDetails(service: Service) {
  const category = guidance[service.category];

  return {
    ...category,
    process: ["Send a short enquiry", "Afrinex reviews and clarifies the request", "Scope, cost, and expected timeline are agreed", "The agreed work begins"],
    faqs: [
      { question: "How do I request this service?", answer: "Use the enquiry form to share the service you need and a short description. You can continue through WhatsApp or email." },
      { question: "When are cost and timing confirmed?", answer: "Afrinex reviews the request first. Scope, cost, and the expected timeline are agreed before work begins." },
      { question: "Can this be handled remotely?", answer: service.category === "Digital & Online Services" ? "SHA and KRA assistance is offered to customers in Kenya. The first conversation can take place by email or WhatsApp." : "Yes. This service can be discussed and delivered remotely where the work allows it." },
    ],
  };
}
