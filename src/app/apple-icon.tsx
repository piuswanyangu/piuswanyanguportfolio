import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f766e" }}>
        <svg width="128" height="128" viewBox="0 0 40 40">
          <path d="M11 29 19.2 11.5a1 1 0 0 1 1.8 0L29 29" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 22.5h9" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="29" cy="11" r="3" fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
