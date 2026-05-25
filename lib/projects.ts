import fs from 'fs';
import path from 'path';

export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  content_preview: string;
  tags: string[];
  languages: string[];
  date_created: string;
  date_updated: string;
  featured: boolean;
  repository?: string;
  live_demo?: string;
  featured_image: string;
}

export interface Project extends ProjectMeta {
  slug: string;
  content: string;
}

const PROJECTS_DIR = path.join(process.cwd(), 'projects');

/**
 * Lit le fichier meta.json d'un projet
 */
function readProjectMeta(projectSlug: string): ProjectMeta | null {
  try {
    const metaPath = path.join(PROJECTS_DIR, projectSlug, 'meta.json');
    const content = fs.readFileSync(metaPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Lit le contenu README.md d'un projet
 */
function readProjectContent(projectSlug: string): string {
  try {
    const readmePath = path.join(PROJECTS_DIR, projectSlug, 'README.md');
    return fs.readFileSync(readmePath, 'utf-8');
  } catch {
    return '';
  }
}

/**
 * Récupère un projet complet (meta + contenu)
 */
export function getProject(slug: string): Project | null {
  const meta = readProjectMeta(slug);
  if (!meta) return null;

  const content = readProjectContent(slug);

  return {
    ...meta,
    slug,
    content,
  };
}

/**
 * Liste tous les projets (par ordre de date modifiée, desc)
 */
export function getAllProjects(): Project[] {
  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    return [];
  }

  const projectDirs = fs.readdirSync(PROJECTS_DIR);

  return projectDirs
    .map((dir) => getProject(dir))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => new Date(b.date_updated).getTime() - new Date(a.date_updated).getTime());
}

/**
 * Récupère les projets marqués comme "featured"
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

/**
 * Retourne les slugs de tous les projets (pour SSG paths)
 */
export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
