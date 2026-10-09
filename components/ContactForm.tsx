"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

export function ContactForm({ labels, lang }: { labels: Dictionary["contact"]; lang: Locale }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("invalid");
      form.reportValidity();
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
      form.reset();
      setStatus("success");
      // Back to the home page, which thanks the visitor in a dialog.
      router.push(`/${lang}?sent=1`);
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "success"
      ? labels.success
      : status === "error"
        ? labels.error
        : status === "invalid"
          ? labels.invalid
          : "";

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">{labels.name}</label>
          <input id="name" name="name" autoComplete="name" required maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="company">{labels.company}</label>
          <input id="company" name="company" autoComplete="organization" required maxLength={200} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">{labels.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={320} />
      </div>
      <div className="field">
        <label htmlFor="project">{labels.project}</label>
        <textarea
          id="project"
          name="project"
          required
          maxLength={5000}
          placeholder={labels.projectPlaceholder}
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots. Its name must not look like a
          real field (website, phone, address…), or browser autofill fills it for real visitors. */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="hp-check">Leave this field empty</label>
        <input id="hp-check" name="hp_check" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? labels.sending : labels.submit}
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p
        className="form__status"
        role="status"
        data-kind={status === "success" ? "success" : message ? "error" : undefined}
      >
        {message}
      </p>
    </form>
  );
}
