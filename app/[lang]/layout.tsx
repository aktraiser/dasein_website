import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { TermPopovers } from "@/components/TermPopovers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content/dictionaries";
import { alternatesFor, hasLocale, locales, siteUrl } from "@/lib/i18n";
import "../globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Refined Garamond for the hero headline.
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#f1f0ea",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s — Dasein` },
    description: dict.meta.description,
    alternates: alternatesFor(lang, ""),
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dasein",
    url: siteUrl,
    description: dict.meta.description,
    knowsAbout: ["Data engineering", "Artificial intelligence", "LLM", "RAG", "AI agents", "MCP", "AI infrastructure"],
  };

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* data-js: lets CSS hide reveal-on-scroll content only when JS runs */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <Header lang={lang} labels={dict.nav} menu={dict.navMenu} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
        <TermPopovers />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
