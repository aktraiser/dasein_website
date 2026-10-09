"use client";

import { useEffect, useRef } from "react";

/**
 * Shown on the home page right after the contact form was sent: the form
 * redirects to "/<lang>?sent=1", and this dialog opens once, then cleans the URL.
 */
export function SentDialog({ title, text, close }: { title: string; text: string; close: string }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("sent")) return;
    url.searchParams.delete("sent");
    window.history.replaceState(null, "", url);
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="sent"
      aria-labelledby="sent-title"
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
