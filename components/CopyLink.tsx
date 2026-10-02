"use client";

import { useState } from "react";

/** Copies the article URL and confirms it for a moment. */
export function CopyLink({ url, label, done }: { url: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="pill pill--ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard unavailable (insecure context, permission denied): leave the label as is.
        }
      }}
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
