const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(process.cwd(), 'projects');

/**
 * Lit le fichier meta.json d'un projet
 */
function readProjectMeta(projectSlug) {
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
function readProjectContent(projectSlug) {
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
function getProject(slug) {
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
function getAllProjects() {
  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    return [];
  }

  const projectDirs = fs.readdirSync(PROJECTS_DIR);

  return projectDirs
    .map((dir) => getProject(dir))
    .filter((p) => p !== null)
    .sort((a, b) => new Date(b.date_updated).getTime() - new Date(a.date_updated).getTime());
}

/**
 * Récupère les projets marqués comme "featured"
 */
function getFeaturedProjects() {
  return getAllProjects().filter((p) => p.featured);
}

/**
 * Retourne les slugs de tous les projets (pour SSG paths)
 */
function getProjectSlugs() {
  return getAllProjects().map((p) => p.slug);
}

module.exports = {
  getProject,
  getAllProjects,
  getFeaturedProjects,
  getProjectSlugs,
};
