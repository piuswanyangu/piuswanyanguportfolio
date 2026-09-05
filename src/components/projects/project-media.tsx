import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";

type ProjectMediaProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectMedia({ project, priority = false }: ProjectMediaProps) {
  if (!project.image) {
    return <ProjectVisual projectName={project.name} visual={project.visual} />;
  }

  return (
    <figure className="relative aspect-[4/3] overflow-hidden border border-border bg-surface-muted transition-[border-color] group-hover:border-accent/25">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform group-hover:scale-[1.015]"
      />
    </figure>
  );
}
