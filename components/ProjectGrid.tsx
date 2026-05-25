import ProjectCard from './ProjectCard';
import { Project } from '@/lib/projects';

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

export default function ProjectGrid({
  projects,
  emptyMessage = 'Aucun projet trouvé',
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={{
            ...project,
            slug: project.slug,
          }}
        />
      ))}
    </div>
  );
}
