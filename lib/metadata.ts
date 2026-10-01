import type { Metadata } from "next";
import { alternatesFor, type Locale, type Route } from "./i18n";

export function pageMetadata(lang: Locale, route: Route, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(lang, route),
    openGraph: { title: `${title} — Dasein`, description, url: alternatesFor(lang, route).canonical },
  };
}
