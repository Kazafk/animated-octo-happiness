const https = require('https');
const fs = require('fs');
const path = require('path');

const VAULT_API = 'https://127.0.0.1:27124';
const AUTH_TOKEN = 'f21ef364ed898185fb06d8be5dbae8a4415218cdf3ee5e542c9f73df902e2be4';
const OUTPUT_DIR = path.join(__dirname, '..', 'projects');

const PROJECTS_TO_EXPORT = [
  'Agentic Testing Framework',
  'Carto Cobol',
  'Excalidraw',
  'IA & Management',
  'Pacbase-transpiler',
  'claims-management',
  'modern-interactive-site',
  'mvs-tk5',
  'suite3270-4.5',
];

function httpsRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 27124,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'text/markdown',
      },
      rejectUnauthorized: false, // Accept self-signed cert
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function exportProject(projectName) {
  const slug = projectName.toLowerCase().replace(/\s+/g, '-');
  const projectDir = path.join(OUTPUT_DIR, slug);

  console.log(`Exporting ${projectName}...`);

  // Créer le répertoire
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Lire le README
  try {
    const response = await httpsRequest('GET', `/vault/${projectName}/README.md`);
    if (response.status === 200) {
      fs.writeFileSync(path.join(projectDir, 'README.md'), response.data);
      console.log(`  ✓ README.md exported`);
    }
  } catch (err) {
    console.warn(`  ✗ Failed to export README: ${err.message}`);
  }

  // Créer meta.json (stub - à remplir manuellement)
  const metaPath = path.join(projectDir, 'meta.json');
  if (!fs.existsSync(metaPath)) {
    const defaultMeta = {
      id: slug,
      title: projectName,
      description: 'Description du projet (à remplir)',
      content_preview: 'Preview (auto-généré du README)',
      tags: [],
      languages: [],
      date_created: new Date().toISOString(),
      date_updated: new Date().toISOString(),
      featured: false,
      repository: null,
      live_demo: null,
      featured_image: 'featured-image.png',
    };
    fs.writeFileSync(metaPath, JSON.stringify(defaultMeta, null, 2));
    console.log(`  ✓ meta.json created (stub)`);
  }
}

async function main() {
  console.log('Starting vault export...\n');

  // Créer le répertoire projects
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const projectName of PROJECTS_TO_EXPORT) {
    try {
      await exportProject(projectName);
    } catch (err) {
      console.error(`  ✗ Error exporting ${projectName}:`, err.message);
    }
  }

  console.log('\n✓ Export complete!');
}

main();
