const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VAULT_API = process.env.OBSIDIAN_API_URL || 'https://127.0.0.1:27124';
const AUTH_TOKEN = process.env.OBSIDIAN_AUTH_TOKEN;
const OUTPUT_DIR = path.join(__dirname, '..', 'projects');
const GIT_AUTO_COMMIT = process.env.GIT_AUTO_COMMIT === 'true';

// Projects list: can be simple names or paths like "Mainframe Virtualization/mvs-tk5"
const PROJECTS_TO_EXPORT = (process.env.PROJECTS_LIST ||
  'Agentic Testing Framework,Carto Cobol,IA & Management,Pacbase-transpiler,Mainframe Virtualization'
).split(',').map(p => p.trim());

if (!AUTH_TOKEN) {
  console.error('Error: OBSIDIAN_AUTH_TOKEN environment variable is not set');
  console.error('Set it before running this script or configure it in GitHub Actions secrets');
  process.exit(1);
}

function httpsRequest(method, pathname, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: new URL(VAULT_API).hostname,
      port: new URL(VAULT_API).port,
      path: pathname,
      method,
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'text/markdown',
      },
      rejectUnauthorized: false,
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

async function exportProject(projectPath) {
  // projectPath can be "Project Name" or "Category/Project Name"
  const parts = projectPath.split('/').map(p => p.trim());
  const projectName = parts[parts.length - 1];
  const slug = projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const projectDir = path.join(OUTPUT_DIR, slug);

  console.log(`Exporting ${projectPath}...`);

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Fetch README from vault path (try README.md first, then Index.md)
  const vaultPath = parts.map(encodeURIComponent).join('/');
  let readmeContent = null;

  try {
    // Try README.md first
    let response = await httpsRequest('GET', `/vault/${vaultPath}/README.md`);

    // If README.md not found, try Index.md
    if (response.status === 404) {
      response = await httpsRequest('GET', `/vault/${vaultPath}/Index.md`);
    }

    if (response.status === 200) {
      fs.writeFileSync(path.join(projectDir, 'README.md'), response.data);
      console.log(`  ✓ README.md exported`);
    } else {
      console.warn(`  ⚠ README not found (status ${response.status})`);
    }
  } catch (err) {
    console.warn(`  ✗ Failed to export README: ${err.message}`);
  }

  // Create or update meta.json
  const metaPath = path.join(projectDir, 'meta.json');
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

  if (!fs.existsSync(metaPath)) {
    fs.writeFileSync(metaPath, JSON.stringify(defaultMeta, null, 2));
    console.log(`  ✓ meta.json created`);
  } else {
    try {
      const existing = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      existing.date_updated = new Date().toISOString();
      fs.writeFileSync(metaPath, JSON.stringify(existing, null, 2));
      console.log(`  ✓ meta.json updated`);
    } catch (err) {
      console.warn(`  ⚠ Could not update meta.json: ${err.message}`);
    }
  }
}

async function main() {
  console.log('Starting automated vault export...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let exported = 0;
  let failed = 0;

  for (const projectPath of PROJECTS_TO_EXPORT) {
    try {
      await exportProject(projectPath);
      exported++;
    } catch (err) {
      console.error(`  ✗ Error exporting ${projectPath}:`, err.message);
      failed++;
    }
  }

  console.log(`\n✓ Export complete! (${exported} successful, ${failed} failed)`);

  // Git operations if enabled
  if (GIT_AUTO_COMMIT) {
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();

      if (gitStatus) {
        console.log('\nChanges detected, committing...');
        execSync('git config user.email "actions@github.com"', { stdio: 'inherit' });
        execSync('git config user.name "GitHub Actions"', { stdio: 'inherit' });
        execSync('git add projects/', { stdio: 'inherit' });
        execSync(`git commit -m "chore: auto-export projects from Obsidian vault"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log('✓ Changes pushed to GitHub');
      } else {
        console.log('\nNo changes detected, skipping commit');
      }
    } catch (err) {
      console.error('Error during git operations:', err.message);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
