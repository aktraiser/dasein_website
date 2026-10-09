"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

// Kept here rather than passed as props, so the text only exists in the page once it is shown.
const COPY: Record<Locale, { title: string; text: string; close: string }> = {
  fr: {
    title: "Merci, votre message est bien parti.",
    text: "Nous l’avons bien reçu et nous revenons vers vous très vite.",
    close: "Fermer",
  },
  en: {
    title: "Thank you, your message is on its way.",
    text: "We have received it and will get back to you very soon.",
    close: "Close",
  },
};

/**
 * Shown on the home page right after the contact form was sent: the form
 * redirects to "/<lang>?sent=1", and this dialog opens once, then cleans the URL.
 * Nothing is rendered otherwise, so the thank-you text is not part of the page.
 */
export function SentDialog({ lang }: { lang: Locale }) {
  const { title, text, close } = COPY[lang];
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("sent")) return;
    url.searchParams.delete("sent");
    window.history.replaceState(null, "", url);
    // Not cancelled on cleanup: the URL is already clean, so a second run would find nothing.
    window.setTimeout(() => setShown(true), 0);
  }, []);

  useEffect(() => {
    if (shown) ref.current?.showModal();
  }, [shown]);

  if (!shown) return null;

  return (
    <dialog
      ref={ref}
      className="sent"
      aria-labelledby="sent-title"
      onClose={() => setShown(false)}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(event) => event.target === ref.current && ref.current?.close()}
    >
      <p className="eyebrow">Dasein</p>
      <h2 id="sent-title" className="sent__title">
        {title}
      </h2>
      <p className="sent__text">{text}</p>
      <form method="dialog">
        <button type="submit" className="pill pill--ink" autoFocus>
          {close}
        </button>
      </form>
    </dialog>
  );
}
