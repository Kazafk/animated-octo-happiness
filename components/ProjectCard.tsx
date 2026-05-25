import Link from 'next/link';
import Image from 'next/image';
import { ProjectMeta } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectMeta & { slug: string };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-all hover:scale-105 cursor-pointer animate-slide-up">
        {/* Image de couverture */}
        <div className="h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden relative">
          {project.featured_image ? (
            <Image
              src={project.featured_image}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-full object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              {project.title[0]}
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-dark mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-accent text-dark text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="mt-3 text-xs text-gray-500">
            Mis à jour: {new Date(project.date_updated).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>
    </Link>
  );
}
