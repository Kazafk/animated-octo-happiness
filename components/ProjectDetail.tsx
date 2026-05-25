import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import MarkdownRenderer from './MarkdownRenderer';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="max-w-5xl mx-auto py-12 px-8">
      {/* En-tête */}
      <header className="mb-16 border-12 border-dark bg-light p-8">
        {project.featured_image && (
          <div className="mb-8 border-12 border-primary h-96 relative overflow-hidden">
            <Image
              src={`/projects/${project.slug}/${project.featured_image}`}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
        )}

        <h1 className="text-7xl font-black mb-6 text-dark leading-tight">{project.title}</h1>
        <p className="text-2xl font-bold text-dark mb-8 leading-relaxed">{project.description}</p>

        <div className="brutal-divider mb-8"></div>

        {/* Métadonnées */}
        <div className="mb-8">
          {project.languages.length > 0 && (
            <div className="mb-6">
              <p className="text-xl font-black text-dark mb-4">LANGAGES</p>
              <div className="flex flex-wrap gap-4">
                {project.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-6 py-3 bg-secondary text-light text-lg font-black border-4 border-dark"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mb-8">
            <p className="text-xl font-black text-dark mb-4">TAGS</p>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-accent text-dark font-black border-2 border-dark"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Liens */}
        <div className="mt-8 flex flex-wrap gap-6 pt-8 border-t-8 border-dark">
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              → VOIR LE CODE
            </a>
          )}
          {project.live_demo && (
            <a
              href={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-block"
            >
              → VOIR LA DÉMO
            </a>
          )}
        </div>

        {/* Date */}
        <div className="mt-8 pt-8 border-t-4 border-dark">
          <p className="text-sm font-black text-dark mb-2">
            CRÉÉ: {new Date(project.date_created).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-sm font-black text-dark">
            MISE À JOUR: {new Date(project.date_updated).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </header>

      {/* Contenu markdown */}
      <div className="markdown-content bg-light border-12 border-dark p-12">
        <MarkdownRenderer content={project.content} />
      </div>
    </article>
  );
}
