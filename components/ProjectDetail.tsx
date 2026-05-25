import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import MarkdownRenderer from './MarkdownRenderer';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* En-tête */}
      <header className="mb-8 border-b pb-6">
        {project.featured_image && (
          <div className="mb-6 rounded-lg overflow-hidden h-96 relative">
            <Image
              src={project.featured_image}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
        )}

        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{project.description}</p>

        {/* Métadonnées */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-semibold">Langages:</span>
            <div className="flex gap-2 mt-1">
              {project.languages.map((lang) => (
                <span key={lang} className="px-3 py-1 bg-accent rounded-full text-dark">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4">
          <span className="font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Liens */}
        <div className="mt-6 flex gap-4">
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600"
            >
              → Voir le code
            </a>
          )}
          {project.live_demo && (
            <a
              href={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-teal-600"
            >
              → Voir la démo
            </a>
          )}
        </div>

        {/* Date */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Créé: {new Date(project.date_created).toLocaleDateString('fr-FR')}</p>
          <p>Mis à jour: {new Date(project.date_updated).toLocaleDateString('fr-FR')}</p>
        </div>
      </header>

      {/* Contenu markdown */}
      <div className="markdown-content mt-8">
        <MarkdownRenderer content={project.content} />
      </div>
    </article>
  );
}
