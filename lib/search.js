/**
 * Crée l'index de recherche (appelé au build)
 */
function buildSearchIndex(projects) {
  return projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags || [],
  }));
}

module.exports = {
  buildSearchIndex,
};
