import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectDiagram } from "@/components/projects/project-diagram";

type ProjectMediaProps = {
  project: Project;
  priority?: boolean;
  /** Crop to a fixed 16:10 frame so cards in a row line up. */
  fixedAspect?: boolean;
  sizes?: string;
};

export function ProjectMedia({
  project,
  priority = false,
  fixedAspect = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ProjectMediaProps) {
  const frame = `relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-muted ${fixedAspect ? "aspect-[16/10]" : ""}`;

  if (!project.image) {
    return (
      <figure className={`${frame} ${fixedAspect ? "" : "aspect-[16/10]"}`}>
        <ProjectDiagram projectName={project.name} visual={project.visual} />
      </figure>
    );
  }

  return (
    <figure className={frame}>
      {fixedAspect ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          preload={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          preload={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      )}
    </figure>
  );
}
