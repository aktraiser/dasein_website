import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Same chevrons as the site mark (components/Wordmark.tsx).
const TOP =
  "M17.1087 2.62611L17.1087 2.62614L17.1086 2.6261L13.8565 5.87829L13.8565 5.87832L6.18411 13.5507L9.4363 16.8029L9.43644 16.8027L15.1623 22.5286L18.4145 19.2764L12.6886 13.5506L17.1087 9.1305L31.9267 23.9485L35.1789 20.6963L20.3609 5.87832L20.3609 5.87829L17.1087 2.62611Z";
const BOTTOM =
  "M15.07 29.9948L15.0701 29.9947L18.3223 26.7425L25.9946 19.0702L22.7424 15.818L22.7423 15.8181L17.0165 10.0922L13.7643 13.3444L19.4902 19.0703L15.0701 23.4903L0.252062 8.6723L-3.00012 11.9245L11.8179 26.7425L11.8179 26.7426L15.07 29.9948Z";

/** Share image for an article: mark, topic, title and reading time on the ink background. */
export function articleOgImage({ title, topic, meta }: { title: string; topic: string; meta: string }) {
  const size = title.length > 90 ? 52 : title.length > 60 ? 60 : 68;
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
          background: "#0e0f11",
          color: "#f1f0ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontFamily: "monospace" }}>
            <svg width="40" height="40" viewBox="0 0 32 32">
              <defs>
                <clipPath id="c">
                  <rect width="32" height="32" />
                </clipPath>
              </defs>
              <g clipPath="url(#c)">
                <rect width="32" height="32" fill="#f1f0ea" />
                <path fill="#0e0f11" fillRule="evenodd" d={TOP} />
                <path fill="#0e0f11" fillRule="evenodd" d={BOTTOM} />
              </g>
            </svg>
            dasein
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              fontSize: 22,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#0e0f11",
              background: "#c6f25e",
              borderRadius: 999,
            }}
          >
            {topic}
          </div>
        </div>
        {/* One box per word, so lines only break between words (never inside "L-Acoustics"). */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: size * 0.26,
            fontSize: size,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            maxWidth: 1040,
          }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 24, fontFamily: "monospace", color: "rgba(241,240,234,0.65)" }}>
          {meta}
        </div>
      </div>
    ),
    ogSize,
  );
}
