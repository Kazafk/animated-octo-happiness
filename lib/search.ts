import Fuse from 'fuse.js';

export interface SearchIndex {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

let searchInstance: Fuse<SearchIndex> | null = null;

/**
 * Initialise l'instance Fuse.js avec l'index
 */
export function initializeSearch(index: SearchIndex[]): void {
  searchInstance = new Fuse(index, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.3 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}

/**
 * Recherche des projets avec une requête
 */
export function searchProjects(query: string): SearchIndex[] {
  if (!searchInstance) {
    console.warn('Search index not initialized');
    return [];
  }

  const results = searchInstance.search(query);
  return results.map((r) => r.item);
}

/**
 * Crée l'index de recherche (appelé au build)
 */
export function buildSearchIndex(projects: any[]): SearchIndex[] {
  return projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags || [],
  }));
}
