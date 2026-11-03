import { getProjectBySlug, projects } from "@/data/projects";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Afrinex Solutions case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.name ?? "Afrinex Solutions",
    description: project?.valueProposition,
  });
}
