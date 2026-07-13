"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { company } from "@/data/company";

type Field = "name" | "email" | "phone" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Tolerant of Angolan numbers: +244 9XX XXX XXX, with optional spaces.
const PHONE_RE = /^\+?244[\s-]?9\d{2}[\s-]?\d{3}[\s-]?\d{3}$/;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const subject = (data.get("subject") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name) next.name = t("errors.nameRequired");
    if (!email) next.email = t("errors.emailRequired");
    else if (!EMAIL_RE.test(email)) next.email = t("errors.emailInvalid");
    if (phone && !PHONE_RE.test(phone)) next.phone = t("errors.phoneInvalid");
    if (!subject) next.subject = t("errors.subjectRequired");
    if (!message) next.message = t("errors.messageRequired");
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstField = (
        ["name", "email", "phone", "subject", "message"] as Field[]
      ).find((f) => found[f]);
      if (firstField) {
        form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      }
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="surface-card flex flex-col items-center p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
        <h2 className="mt-4 text-xl">{t("successTitle")}</h2>
        <p className="mt-2 text-ink-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="surface-card space-y-5 p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label={t("name")} placeholder={t("namePlaceholder")} required requiredLabel={t("required")} error={errors.name} />
        <TextField name="company" label={t("company")} placeholder={t("companyPlaceholder")} optionalLabel={t("optional")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="email"
          type="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          required
          requiredLabel={t("required")}
          help={t("helpEmail")}
          error={errors.email}
        />
        <TextField
          name="phone"
          type="tel"
          label={t("phone")}
          placeholder={t("phonePlaceholder")}
          optionalLabel={t("optional")}
          help={t("helpPhone")}
          error={errors.phone}
        />
      </div>
      <TextField name="subject" label={t("subject")} placeholder={t("subjectPlaceholder")} required requiredLabel={t("required")} error={errors.subject} />
      <TextAreaField
        name="message"
        label={t("message")}
        placeholder={t("messagePlaceholder")}
        required
        requiredLabel={t("required")}
        error={errors.message}
      />

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-error/30 bg-error/5 p-4 text-sm"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-error" aria-hidden="true" />
          <p className="text-ink">
            {t("errorBody")}{" "}
            <a href={`mailto:${company.email}`} className="link-underline">
              {company.email}
            </a>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
        {status !== "sending" && <Send className="size-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

function fieldIds(name: string) {
  return { error: `${name}-error`, help: `${name}-help` };
}

function TextField({
  name,
  label,
  placeholder,
  type = "text",
  required,
  requiredLabel,
  optionalLabel,
  help,
  error,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
  help?: string;
  error?: string;
}) {
  const ids = fieldIds(name);
  const describedBy =
    [error ? ids.error : null, help ? ids.help : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} requiredLabel={requiredLabel} optionalLabel={optionalLabel} />
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="field-input"
      />
      <FieldHelp help={help} error={error} ids={ids} />
    </div>
  );
}

function TextAreaField(props: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
}) {
  const { name, label, placeholder, required, requiredLabel, error } = props;
  const ids = fieldIds(name);
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} requiredLabel={requiredLabel} />
      <textarea
        id={name}
        name={name}
        rows={5}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? ids.error : undefined}
        className="field-input resize-y"
      />
      <FieldHelp error={error} ids={ids} />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  requiredLabel,
  optionalLabel,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {label}
      {required && requiredLabel && (
        <span className="ml-1 text-error">
          *<span className="sr-only"> ({requiredLabel})</span>
        </span>
      )}
      {!required && optionalLabel && (
        <span className="ml-1 text-xs font-normal text-ink-muted">
          ({optionalLabel})
        </span>
      )}
    </label>
  );
}

function FieldHelp({
  help,
  error,
  ids,
}: {
  help?: string;
  error?: string;
  ids: { error: string; help: string };
}) {
  return (
    <>
      {help && !error && (
        <p id={ids.help} className="mt-1.5 text-xs text-ink-muted">
          {help}
        </p>
      )}
      {error && (
        <p
          id={ids.error}
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-error"
        >
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </>
  );
}
