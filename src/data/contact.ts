const email = "ndubipius96@gmail.com";
const phone = "+254792342944";

const whatsappNumber = phone.replace(/\D/g, "");

/**
 * Prefilled openers. These deliberately contain no personal or sensitive
 * information: they only give the customer a starting sentence to edit.
 */
const whatsappGreeting = "Hi Afrinex, I'd like help with [service].";
const emailSubject = "Afrinex Service Request";

export const contact = {
  email,
  phone,
  emailUrl: `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappGreeting)}`,
} as const;
