"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/track";

type Status = "idle" | "sending" | "error" | "invalid";
type Field = "name" | "company" | "email" | "project";
type Errors = Partial<Record<Field, string>>;

const FIELDS: Field[] = ["name", "company", "email", "project"];

/**
 * The contact form, laid on the page like the rest of the site: lines rather
 * than boxes, the subject as a choice between the offers. Errors are written
 * under the field concerned (the browser's own bubbles are not used) and the
 * first one receives the focus.
 */
export function ContactForm({ labels, lang, topic }: { labels: Dictionary["contact"]; lang: Locale; topic: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const check = (input: HTMLInputElement | HTMLTextAreaElement) =>
    !input.value.trim() ? labels.errors.required : input.validity.valid ? undefined : labels.errors.email;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = (name: Field) => form.elements.namedItem(name) as HTMLInputElement;

    const found: Errors = {};
    for (const name of FIELDS) {
      const message = check(input(name));
      if (message) found[name] = message;
    }
    setErrors(found);
    const first = FIELDS.find((name) => found[name]);
    if (first) {
      setStatus("idle");
      input(first).focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (response.status === 400) return setStatus("invalid");
      if (!response.ok) throw new Error(String(response.status));
      track("contact_sent", { topic: String(new FormData(form).get("topic") ?? "") });
      form.reset();
      // Back to the home page, which thanks the visitor in a dialog.
      router.push(`/${lang}?sent=1`);
    } catch {
      setStatus("error");
    }
  }

  // Once a field has been flagged, its message follows what is typed.
  const onInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name as Field;
    if (errors[name]) setErrors((current) => ({ ...current, [name]: check(target) }));
  };

  const described = (name: Field) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: Field) =>
    errors[name] && (
      <p id={`${name}-error`} className="contact-field__error">
        {errors[name]}
      </p>
    );

  const message = status === "error" ? labels.error : status === "invalid" ? labels.invalid : "";

  return (
    <form className="contact-form" onSubmit={onSubmit} onInput={onInput} noValidate>
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="name">{labels.name}</label>
          <input id="name" name="name" autoComplete="name" required maxLength={200} {...described("name")} />
          {error("name")}
        </div>
        <div className="contact-field">
          <label htmlFor="company">{labels.company}</label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            maxLength={200}
            {...described("company")}
          />
          {error("company")}
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="email">{labels.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          {...described("email")}
        />
        {error("email")}
      </div>

      <fieldset className="contact-topics">
        <legend>
          {labels.topic} <span className="contact-field__optional">({labels.optional})</span>
        </legend>
        <div className="contact-topics__list">
          {Object.entries(labels.topics).map(([value, label]) => (
            <label key={value}>
              <input type="radio" name="topic" value={value} defaultChecked={value === topic} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="contact-field">
        <label htmlFor="project">{labels.project}</label>
        <textarea
          id="project"
          name="project"
          required
          maxLength={5000}
          placeholder={labels.projectPlaceholder}
          {...described("project")}
        />
        {error("project")}
      </div>

      {/* Honeypot: hidden from people, filled in by bots. Its name must not look like a
          real field (website, phone, address…), or browser autofill fills it for real visitors. */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="hp-check">Leave this field empty</label>
        <input id="hp-check" name="hp_check" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-submit">
        <button type="submit" className="contact-button" disabled={status === "sending"}>
          {status === "sending" ? labels.sending : labels.submit}
          <span aria-hidden="true">→</span>
        </button>
        <p className="contact-privacy">
          {labels.privacy} <Link href={`/${lang}${labels.privacyHref}`}>{labels.privacyLink}</Link>
        </p>
      </div>
      <p className="contact-status" role="status">
        {message}
      </p>
    </form>
  );
}
