"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { createEmailUrl, createWhatsAppUrl } from "@/data/contact";
import { serviceCategories, services } from "@/data/services";

type Errors = Partial<Record<"name" | "contactDetail" | "service" | "description", string>>;

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") ?? "";
  const initialService = useMemo(() => {
    const match = services.find((service) => service.slug === requestedService || service.name === requestedService);
    if (match) return match.slug;
    return serviceCategories.includes(requestedService as (typeof serviceCategories)[number]) ? `category:${requestedService}` : "";
  }, [requestedService]);
  const [name, setName] = useState("");
  const [method, setMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [contactDetail, setContactDetail] = useState("");
  const [service, setService] = useState(initialService);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!contactDetail.trim()) nextErrors.contactDetail = `Enter your ${method === "email" ? "email address" : "WhatsApp number"}.`;
    else if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetail.trim())) nextErrors.contactDetail = "Enter a valid email address.";
    else if (method === "whatsapp" && contactDetail.replace(/\D/g, "").length < 7) nextErrors.contactDetail = "Enter a valid WhatsApp number.";
    if (!service) nextErrors.service = "Choose the service you need.";
    if (!description.trim()) nextErrors.description = "Briefly describe what you need.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const selected = services.find((item) => item.slug === service)?.name ?? service.replace(/^category:/, "");
    const message = `Hi Afrinex, I would like help with ${selected}.\n\nName: ${name.trim()}\nPreferred contact: ${method} — ${contactDetail.trim()}\nRequest: ${description.trim()}`;
    setIsSubmitting(true);
    const destination = method === "whatsapp" ? createWhatsAppUrl(message) : createEmailUrl(`Afrinex enquiry: ${selected}`, message);
    window.location.href = destination;
    window.setTimeout(() => setIsSubmitting(false), 800);
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-md border border-border-interactive bg-surface px-3 py-2 text-foreground focus-visible:border-accent";
  return <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
    <label className="text-sm font-semibold text-foreground">Name<input value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={fieldClass} />{errors.name && <span id="name-error" className="mt-1 block text-sm text-red-700 dark:text-red-300">{errors.name}</span>}</label>
    <label className="text-sm font-semibold text-foreground">Preferred contact method<select value={method} onChange={(event) => setMethod(event.target.value as "whatsapp" | "email")} className={fieldClass}><option value="whatsapp">WhatsApp</option><option value="email">Email</option></select></label>
    <label className="text-sm font-semibold text-foreground">{method === "email" ? "Email address" : "WhatsApp number"}<input type={method === "email" ? "email" : "tel"} value={contactDetail} onChange={(event) => setContactDetail(event.target.value)} aria-invalid={Boolean(errors.contactDetail)} aria-describedby={errors.contactDetail ? "contact-error" : undefined} className={fieldClass} />{errors.contactDetail && <span id="contact-error" className="mt-1 block text-sm text-red-700 dark:text-red-300">{errors.contactDetail}</span>}</label>
    <label className="text-sm font-semibold text-foreground">Service needed<select value={service} onChange={(event) => setService(event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} className={fieldClass}><option value="">Choose a service</option>{serviceCategories.map((category) => <optgroup key={category} label={category}><option value={`category:${category}`}>General {category} enquiry</option>{services.filter((item) => item.category === category).map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</optgroup>)}</select>{errors.service && <span id="service-error" className="mt-1 block text-sm text-red-700 dark:text-red-300">{errors.service}</span>}</label>
    <label className="text-sm font-semibold text-foreground sm:col-span-2">Brief description<textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} className={fieldClass} />{errors.description && <span id="description-error" className="mt-1 block text-sm text-red-700 dark:text-red-300">{errors.description}</span>}</label>
    <div className="sm:col-span-2"><button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover sm:w-auto">{isSubmitting ? "Opening…" : method === "whatsapp" ? "Continue in WhatsApp" : "Continue in Email"}</button><p className="mt-3 text-xs leading-5 text-muted-foreground">This opens your chosen app with the message prepared. You review and send it yourself.</p></div>
  </form>;
}
