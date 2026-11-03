import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageInput = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Branded 1200x630 social card shared by the root, service, and project routes. */
export function renderOgImage({ eyebrow, title, description }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b5d57 0%, #084843 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 40 40">
              <path d="M11 29 19.2 11.5a1 1 0 0 1 1.8 0L29 29" fill="none" stroke="#0f766e" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 22.5h9" stroke="#0f766e" strokeWidth="3.6" strokeLinecap="round" />
              <circle cx="29" cy="11" r="3" fill="#0f766e" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>Afrinex</div>
            <div style={{ fontSize: 16, letterSpacing: 8, color: "#d3ece7" }}>SOLUTIONS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 72, height: 6, borderRadius: 3, background: "#5eead4", marginBottom: 28 }} />
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#99f6e4", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ marginTop: 16, fontSize: title.length > 48 ? 58 : 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          {description && (
            <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: "#d3ece7", maxWidth: 980 }}>{description}</div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#d3ece7" }}>
          <span>Kenya-based digital support</span>
          <span>Digital services · Software · AI &amp; automation</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
