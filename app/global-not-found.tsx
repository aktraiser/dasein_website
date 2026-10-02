import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Wordmark";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Dasein",
  robots: { index: false },
};

// Served for any URL that matches no route. It bypasses the [lang] layout, so it
// brings its own <html> and is bilingual: the language of the visitor is unknown here.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="notfound">
          <Link href="/" className="wordmark" aria-label="Dasein — home">
            <Mark className="wordmark__mark" />
            dasein
          </Link>
          <p className="eyebrow">404</p>
          <h1 className="display display--serif">
            <span lang="fr">Cette page n’existe pas.</span>
            <span lang="en">This page does not exist.</span>
          </h1>
          <nav className="notfound__links" aria-label="404">
            <Link href="/fr" className="pill pill--ink" lang="fr">
              Retour à l’accueil <span aria-hidden="true">→</span>
            </Link>
            <Link href="/en" className="pill pill--ghost">
              Back to home <span aria-hidden="true">→</span>
            </Link>
            <Link href="/fr/articles" className="pill pill--ghost">
              Articles
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
