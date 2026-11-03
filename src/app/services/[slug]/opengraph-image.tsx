import { services } from "@/data/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Afrinex Solutions service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return renderOgImage({
    eyebrow: service?.category ?? "Services",
    title: service?.name ?? "Afrinex Solutions",
    description: service?.shortDescription,
  });
}
