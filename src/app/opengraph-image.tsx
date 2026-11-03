import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Afrinex Solutions: digital services, software, AI and automation";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Digital services • software • AI & automation",
    title: "Digital solutions that keep work moving and businesses growing.",
  });
}
