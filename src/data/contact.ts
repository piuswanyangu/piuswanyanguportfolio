const email = "ndubipius96@gmail.com";
const phone = "+254792342944";

export const contact = {
  email,
  phone,
  emailUrl: `mailto:${email}`,
  whatsappUrl: `https://wa.me/${phone.replace(/\D/g, "")}`,
} as const;
