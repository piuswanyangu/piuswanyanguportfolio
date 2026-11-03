"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { createEmailUrl, createWhatsAppUrl } from "@/data/contact";
import { serviceCategories, services } from "@/data/services";

type Method = "whatsapp" | "email";
type FieldName = "name" | "service" | "message";
type Errors = Partial<Record<FieldName, string>>;

/** Maps a `?service=` value (slug, service name, or category) to a select value. */
export function resolveServiceParam(requested: string) {
  if (!requested) return "";
  const match = services.find((service) => service.slug === requested || service.name === requested);
  if (match) return match.slug;
  return serviceCategories.includes(requested as (typeof serviceCategories)[number])
    ? `category:${requested}`
    : "";
}

function validate(field: FieldName, value: string): string | undefined {
  if (field === "name" && !value.trim()) return "Enter your name.";
  if (field === "service" && !value) return "Choose the service you need.";
  if (field === "message") {
    if (!value.trim()) return "Briefly describe what you need.";
    if (value.trim().length < 10) return "Add a little more detail (at least 10 characters).";
  }
  return undefined;
}

type EnquiryFormProps = { initialService?: string };

/**
 * Enquiry form. Renders fully on the server (as the Suspense fallback) so the
 * page is never blank; the `?service=` prefill is applied once hydrated.
 * Submitting opens WhatsApp or email with the message prepared.
 */
export function EnquiryForm({ initialService = "" }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<Method>("whatsapp");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const values: Record<FieldName, string> = { name, service, message };

  function onBlur(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: validate(field, values[field]) }));
  }

  function onChange(field: FieldName, value: string, setter: (value: string) => void) {
    setter(value);
    // Clear an existing error as soon as the input becomes valid.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(field, value) }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    (Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validate(field, values[field]);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);

    const firstInvalid = (["name", "service", "message"] as const).find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const selected = services.find((item) => item.slug === service)?.name ?? service.replace(/^category:/, "");
    const body = `Hi Afrinex, I would like help with ${selected}.\n\nName: ${name.trim()}\nPreferred contact: ${method === "whatsapp" ? "WhatsApp" : "Email"}\nRequest: ${message.trim()}`;
    setIsSubmitting(true);
    window.location.href =
      method === "whatsapp" ? createWhatsAppUrl(body) : createEmailUrl(`Afrinex enquiry: ${selected}`, body);
    window.setTimeout(() => setIsSubmitting(false), 800);
  }

  const labelClass = "block text-sm font-semibold text-foreground";
  const errorClass = "mt-2 flex items-center gap-1.5 text-sm font-medium text-danger";

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-describedby="enquiry-note" className="grid gap-6">
      <div>
        <label htmlFor="enquiry-name" className={labelClass}>
          Name <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <input
          id="enquiry-name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => onChange("name", event.target.value, setName)}
          onBlur={() => onBlur("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "enquiry-name-error" : undefined}
          className="field"
        />
        {errors.name && <p id="enquiry-name-error" className={errorClass}>{errors.name}</p>}
      </div>

      <fieldset>
        <legend className={labelClass}>Preferred contact</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {([
            ["whatsapp", "WhatsApp", "whatsapp"],
            ["email", "Email", "mail"],
          ] as const).map(([value, label, icon]) => (
            <label
              key={value}
              className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)] ${
                method === value
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-interactive text-foreground hover:border-accent"
              }`}
            >
              <input
                type="radio"
                name="method"
                value={value}
                checked={method === value}
                onChange={() => setMethod(value)}
                className="sr-only"
              />
              <Icon name={icon} className="size-4" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="enquiry-service" className={labelClass}>
          Service needed <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <select
          id="enquiry-service"
          name="service"
          required
          value={service}
          onChange={(event) => onChange("service", event.target.value, setService)}
          onBlur={() => onBlur("service")}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "enquiry-service-error" : undefined}
          className="field"
        >
          <option value="">Choose a service</option>
          {serviceCategories.map((category) => (
            <optgroup key={category} label={category}>
              <option value={`category:${category}`}>General {category} enquiry</option>
              {services
                .filter((item) => item.category === category)
                .map((item) => (
                  <option key={item.slug} value={item.slug}>{item.name}</option>
                ))}
            </optgroup>
          ))}
        </select>
        {errors.service && <p id="enquiry-service-error" className={errorClass}>{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          Message <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(event) => onChange("message", event.target.value, setMessage)}
          onBlur={() => onBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`enquiry-message-hint${errors.message ? " enquiry-message-error" : ""}`}
          className="field resize-y"
        />
        <p id="enquiry-message-hint" className="mt-2 text-sm text-muted-foreground">
          Describe the goal and any deadline. Don&apos;t include passwords, PINs or ID numbers.
        </p>
        {errors.message && <p id="enquiry-message-error" className={errorClass}>{errors.message}</p>}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
          <Icon name={method === "whatsapp" ? "whatsapp" : "mail"} className="size-4" />
          {isSubmitting ? "Opening…" : method === "whatsapp" ? "Continue in WhatsApp" : "Continue in Email"}
        </button>
        <p id="enquiry-note" className="mt-4 text-sm leading-6 text-muted-foreground">
          This opens your chosen app with the message prepared. You review and send it yourself.
          Read how enquiry details are handled in our{" "}
          <Link href="/privacy-policy" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

/** Reads `?service=` and remounts the form with that value preselected. */
export function EnquiryFormWithParams() {
  const searchParams = useSearchParams();
  const initialService = resolveServiceParam(searchParams.get("service") ?? "");
  return <EnquiryForm key={initialService} initialService={initialService} />;
}
