const fs = require('fs');
const path = require('path');
const { getAllProjects } = require('./projects.js');
const { buildSearchIndex } = require('./search');

/**
 * Génère le fichier d'index de recherche
 * À appeler pendant le build Next.js
 */
function generateSearchIndex() {
  const projects = getAllProjects();
  const index = buildSearchIndex(projects);

  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

  // Créer le répertoire public s'il n'existe pas
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log(`✓ Search index generated: ${outputPath}`);
}

// Exécuter si appelé directement
if (require.main === module) {
  generateSearchIndex();
}

module.exports = { generateSearchIndex };
