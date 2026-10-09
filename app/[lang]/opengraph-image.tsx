import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";

export const alt = "Dasein: Data & AI Engineering";
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
          <svg width="40" height="40" viewBox="0 0 32 32">
            <defs>
              <clipPath id="c">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
            <g clipPath="url(#c)">
              <rect width="32" height="32" fill="#0e0f11" />
              <path fill="#f1f0ea" fillRule="evenodd" d="M17.1087 2.62611L17.1087 2.62614L17.1086 2.6261L13.8565 5.87829L13.8565 5.87832L6.18411 13.5507L9.4363 16.8029L9.43644 16.8027L15.1623 22.5286L18.4145 19.2764L12.6886 13.5506L17.1087 9.1305L31.9267 23.9485L35.1789 20.6963L20.3609 5.87832L20.3609 5.87829L17.1087 2.62611Z" />
              <path fill="#f1f0ea" fillRule="evenodd" d="M15.07 29.9948L15.0701 29.9947L18.3223 26.7425L25.9946 19.0702L22.7424 15.818L22.7423 15.8181L17.0165 10.0922L13.7643 13.3444L19.4902 19.0703L15.0701 23.4903L0.252062 8.6723L-3.00012 11.9245L11.8179 26.7425L11.8179 26.7426L15.07 29.9948Z" />
            </g>
          </svg>
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
