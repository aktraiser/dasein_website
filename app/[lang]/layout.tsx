import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { TermPopovers } from "@/components/TermPopovers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fontVariables } from "@/lib/fonts";
import { jsonLdScript } from "@/lib/jsonld";
import { getDictionary } from "@/content/dictionaries";
import { alternatesFor, hasLocale, linkedinUrl, locales, siteUrl } from "@/lib/i18n";
import "../globals.css";

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
    title: { default: dict.meta.title, template: `%s | Dasein` },
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
    logo: `${siteUrl}/brand/dasein-512.png`,
    description: dict.meta.description,
    sameAs: [linkedinUrl],
    knowsAbout: ["Data engineering", "Artificial intelligence", "LLM", "RAG", "AI agents", "MCP", "AI infrastructure"],
  };

  // Tells search engines the site's name (shown above results, like "OpenAI").
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dasein",
    alternateName: dict.meta.title,
    url: `${siteUrl}/${lang}`,
    inLanguage: lang,
    publisher: { "@type": "Organization", name: "Dasein", url: siteUrl },
  };

  return (
    <html lang={lang} className={fontVariables} data-scroll-behavior="smooth">
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
          dangerouslySetInnerHTML={jsonLdScript([organization, website])}
        />
      </body>
    </html>
  );
}
