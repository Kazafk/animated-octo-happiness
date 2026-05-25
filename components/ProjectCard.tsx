'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectMeta } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectMeta & { slug: string };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
        className="bg-light border-12 border-dark group cursor-pointer"
      >
        {/* Image de couverture */}
        <div className="h-56 bg-primary border-b-12 border-dark relative overflow-hidden">
          {project.featured_image ? (
            <Image
              src={`/projects/${project.slug}/${project.featured_image}`}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-light">
              <span className="text-6xl font-black">{project.title[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>

        {/* Contenu */}
        <div className="p-6 border-t-8 border-primary">
          <h3 className="text-3xl font-black text-dark mb-4 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-lg font-bold text-dark mb-6 line-clamp-2">{project.description}</p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-accent text-dark text-sm font-black border-2 border-dark"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}

          {/* Date */}
          <div className="pt-4 border-t-2 border-dark">
            <p className="text-sm font-black text-dark uppercase">
              Mis à jour: {new Date(project.date_updated).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
