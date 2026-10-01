import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";

export const alt = "Dasein — Data & AI Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#c6f25e",
          color: "#0e0f11",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
          <div style={{ display: "flex", width: 28, height: 28, border: "2px solid #0e0f11", position: "relative" }}>
            <div style={{ position: "absolute", left: 13, top: 13, width: 8, height: 8, background: "#0e0f11" }} />
          </div>
          dasein
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000, fontFamily: "sans-serif" }}>
          {dict.hero.title}
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 26, color: "#36383c" }}>
          {dict.hero.chain.map((step, i) => (
            <span key={step} style={{ color: i === dict.hero.chain.length - 1 ? "#0e0f11" : "#36383c", fontWeight: i === dict.hero.chain.length - 1 ? 700 : 400 }}>
              {i > 0 ? "→  " : ""}
              {step}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
