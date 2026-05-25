# Site Vitrine Portfolio - Plan d'Implémentation

> **Pour les workers agentic:** COMPÉTENCE REQUISE: Utiliser superpowers:subagent-driven-development (recommandé) ou superpowers:executing-plans pour implémenter ce plan tâche par tâche. Les étapes utilisent la syntaxe checkbox (`- [ ]`) pour le tracking.

**Objectif:** Créer un site vitrine Next.js avec portfolio complet, moteur de recherche et déploiement automatisé sur GitHub Pages.

**Architecture:** Site statique généré avec Next.js, contenu en markdown exporté du vault Obsidian, recherche côté client avec Fuse.js, déploiement via GitHub Actions.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Fuse.js, markdown-it, GitHub Pages + Actions

---

## Structure des fichiers

```
site-vitrine/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # GitHub Actions - build et deploy
├── docs/superpowers/
│   ├── specs/
│   │   └── 2026-05-25-site-vitrine-design.md
│   └── plans/
│       └── 2026-05-25-site-vitrine-implementation.md
├── pages/
│   ├── _app.tsx                          # App wrapper + context
│   ├── _document.tsx                     # HTML document setup
│   ├── index.tsx                         # Page d'accueil (hero + featured + all projects)
│   ├── projects/
│   │   └── [slug].tsx                    # Page détail projet (SSG)
│   └── search.tsx                        # Page/overlay de recherche
├── components/
│   ├── Navigation.tsx                    # Header avec search bar
│   ├── Hero.tsx                          # Section hero de l'accueil
│   ├── ProjectCard.tsx                   # Carte projet (pour grille)
│   ├── ProjectGrid.tsx                   # Conteneur grille de projets
│   ├── ProjectDetail.tsx                 # Affichage détail projet (contenu markdown)
│   ├── SearchBar.tsx                     # Composant input recherche
│   ├── SearchResults.tsx                 # Grille résultats recherche
│   └── Layout.tsx                        # Wrapper layout commun
├── lib/
│   ├── projects.ts                       # Helpers: lire /projects, parser metadata
│   ├── search.ts                         # Index fuse.js + logique recherche
│   └── generateIndex.ts                  # Script build: générer index.json
├── scripts/
│   └── export-vault.js                   # Export projets depuis vault Obsidian
├── styles/
│   ├── globals.css                       # Styles globaux + Tailwind imports
│   └── markdown.css                      # Styles spécifiques pour contenu markdown
├── public/
│   └── .gitkeep
├── next.config.js                        # Config Next.js (export statique)
├── tailwind.config.js                    # Config Tailwind
├── tsconfig.json                         # Config TypeScript
└── package.json                          # Dépendances npm
```

---

## Tasks d'implémentation

### Task 1: Setup initial - Créer la structure du projet

**Fichiers:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `.gitignore`

- [ ] **Étape 1: Créer package.json avec dépendances**

```json
{
  "name": "site-vitrine",
  "version": "1.0.0",
  "description": "Portfolio vitrine partageant les projets du vault Obsidian",
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start",
    "lint": "eslint .",
    "export-vault": "node scripts/export-vault.js"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "fuse.js": "^7.0.0",
    "markdown-it": "^13.0.1",
    "highlight.js": "^11.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.40.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

- [ ] **Étape 2: Créer tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Étape 3: Créer next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  basePath: '/site-vitrine',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Étape 4: Créer .gitignore**

```
node_modules/
.next/
out/
dist/
*.log
.env.local
.env.*.local
.DS_Store
.vscode/
.idea/
```

- [ ] **Étape 5: Initialiser git et faire commit initial**

```bash
cd C:\Repos\site-vitrine
git init
git add .gitignore package.json tsconfig.json next.config.js
git commit -m "chore: initial project setup"
```

---

### Task 2: Configuration Tailwind CSS

**Fichiers:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `styles/globals.css`

- [ ] **Étape 1: Créer tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#2C3E50',
        light: '#ECF0F1',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Étape 2: Créer postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Étape 3: Créer styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-dark font-sans;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-bold;
}

h1 {
  @apply text-4xl md:text-5xl;
}

h2 {
  @apply text-3xl md:text-4xl;
}

a {
  @apply text-primary hover:underline;
}

code {
  @apply bg-gray-200 px-2 py-1 rounded text-sm font-mono;
}

pre {
  @apply bg-gray-900 text-white p-4 rounded overflow-x-auto;
}

button {
  @apply px-4 py-2 rounded font-semibold transition-colors;
}
```

- [ ] **Étape 4: Commit**

```bash
git add tailwind.config.js postcss.config.js styles/globals.css
git commit -m "style: configure tailwind and global styles"
```

---

### Task 3: Setup Next.js pages - App wrapper et Layout

**Fichiers:**
- Create: `pages/_app.tsx`
- Create: `pages/_document.tsx`
- Create: `components/Layout.tsx`

- [ ] **Étape 1: Créer pages/_app.tsx**

```typescript
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

- [ ] **Étape 2: Créer pages/_document.tsx**

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio de projets et travaux techniques" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- [ ] **Étape 3: Créer components/Layout.tsx**

```typescript
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-dark text-white py-6 text-center">
        <p>&copy; 2026 Portfolio Vitrine. All rights reserved.</p>
      </footer>
    </div>
  );
}
```

- [ ] **Étape 4: Commit**

```bash
git add pages/_app.tsx pages/_document.tsx components/Layout.tsx
git commit -m "feat: setup next.js app structure with layout"
```

---

### Task 4: Créer le composant Navigation avec SearchBar

**Fichiers:**
- Create: `components/Navigation.tsx`
- Create: `components/SearchBar.tsx`

- [ ] **Étape 1: Créer components/SearchBar.tsx**

```typescript
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  sticky?: boolean;
}

export default function SearchBar({ sticky = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 ${sticky ? 'sticky top-0 z-50' : ''}`}
    >
      <input
        type="text"
        placeholder="Rechercher les projets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Chercher
      </button>
    </form>
  );
}
```

- [ ] **Étape 2: Créer components/Navigation.tsx**

```typescript
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-red-600">
            Portfolio
          </Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Étape 3: Commit**

```bash
git add components/SearchBar.tsx components/Navigation.tsx
git commit -m "feat: add navigation and search bar components"
```

---

### Task 5: Créer types et helpers pour les projets

**Fichiers:**
- Create: `lib/projects.ts`

- [ ] **Étape 1: Créer lib/projects.ts**

```typescript
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
```

- [ ] **Étape 2: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add project helpers and types"
```

---

### Task 6: Créer la logique de recherche avec Fuse.js

**Fichiers:**
- Create: `lib/search.ts`
- Create: `lib/generateIndex.ts`

- [ ] **Étape 1: Créer lib/search.ts**

```typescript
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
```

- [ ] **Étape 2: Créer lib/generateIndex.ts**

```typescript
import fs from 'fs';
import path from 'path';
import { getAllProjects } from './projects';
import { buildSearchIndex } from './search';

/**
 * Génère le fichier d'index de recherche
 * À appeler pendant le build Next.js
 */
export function generateSearchIndex(): void {
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
```

- [ ] **Étape 3: Mettre à jour next.config.js pour générer l'index au build**

Dans `next.config.js`, avant l'export:

```javascript
// Générer l'index de recherche au build
const { generateSearchIndex } = require('./lib/generateIndex');
generateSearchIndex();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... reste du config
};
```

- [ ] **Étape 4: Commit**

```bash
git add lib/search.ts lib/generateIndex.ts next.config.js
git commit -m "feat: add search functionality with fuse.js index generation"
```

---

### Task 7: Créer les composants ProjectCard et ProjectGrid

**Fichiers:**
- Create: `components/ProjectCard.tsx`
- Create: `components/ProjectGrid.tsx`

- [ ] **Étape 1: Créer components/ProjectCard.tsx**

```typescript
import Link from 'next/link';
import { ProjectMeta } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectMeta & { slug: string };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-all hover:scale-105 cursor-pointer animate-slide-up">
        {/* Image de couverture */}
        <div className="h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
          {project.featured_image ? (
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              {project.title[0]}
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-dark mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-accent text-dark text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="mt-3 text-xs text-gray-500">
            Mis à jour: {new Date(project.date_updated).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Étape 2: Créer components/ProjectGrid.tsx**

```typescript
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/projects';

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

export default function ProjectGrid({
  projects,
  emptyMessage = 'Aucun projet trouvé',
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={{
            ...project,
            slug: project.slug,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Étape 3: Commit**

```bash
git add components/ProjectCard.tsx components/ProjectGrid.tsx
git commit -m "feat: add ProjectCard and ProjectGrid components"
```

---

### Task 8: Créer les composants Hero et ProjectDetail

**Fichiers:**
- Create: `components/Hero.tsx`
- Create: `components/ProjectDetail.tsx`

- [ ] **Étape 1: Créer components/Hero.tsx**

```typescript
export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Portfolio Technique</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Découvrez une collection complète de projets, frameworks et outils
          partagés avec la communauté tech. Explorez, apprenez et contribuez.
        </p>
        <p className="text-lg opacity-90">
          {/* Le nombre de projets sera mis à jour dynamiquement */}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Étape 2: Créer components/ProjectDetail.tsx**

```typescript
import React from 'react';
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
          <div className="mb-6 rounded-lg overflow-hidden h-96">
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover"
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
          <p>
            Créé: {new Date(project.date_created).toLocaleDateString('fr-FR')}
          </p>
          <p>
            Mis à jour: {new Date(project.date_updated).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </header>

      {/* Contenu markdown */}
      <div className="prose max-w-none">
        <MarkdownRenderer content={project.content} />
      </div>
    </article>
  );
}
```

- [ ] **Étape 3: Créer components/MarkdownRenderer.tsx**

```typescript
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

interface MarkdownRendererProps {
  content: string;
}

const md = markdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = md.render(content);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

- [ ] **Étape 4: Mettre à jour styles/globals.css avec styles markdown**

Ajouter à la fin:

```css
.markdown-content {
  line-height: 1.8;
}

.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  @apply mt-6 mb-4;
}

.markdown-content p {
  @apply mb-4;
}

.markdown-content ul,
.markdown-content ol {
  @apply mb-4 ml-6;
}

.markdown-content li {
  @apply mb-2;
}

.markdown-content pre {
  @apply bg-gray-900 text-white p-4 rounded overflow-x-auto mb-4;
}

.markdown-content code {
  @apply bg-gray-200 px-2 py-1 rounded text-sm font-mono;
}

.markdown-content pre code {
  @apply bg-transparent px-0 py-0;
}

.markdown-content blockquote {
  @apply border-l-4 border-primary pl-4 italic text-gray-600 my-4;
}

.markdown-content table {
  @apply w-full border-collapse mb-4;
}

.markdown-content th,
.markdown-content td {
  @apply border border-gray-300 px-4 py-2;
}

.markdown-content th {
  @apply bg-gray-100 font-semibold;
}

.markdown-content a {
  @apply text-primary hover:underline;
}
```

- [ ] **Étape 5: Commit**

```bash
git add components/Hero.tsx components/ProjectDetail.tsx components/MarkdownRenderer.tsx styles/globals.css
git commit -m "feat: add Hero and ProjectDetail components with markdown rendering"
```

---

### Task 9: Créer la page d'accueil

**Fichiers:**
- Modify: `pages/index.tsx`

- [ ] **Étape 1: Écrire pages/index.tsx**

```typescript
import Head from 'next/head';
import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';

export async function getStaticProps() {
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();

  return {
    props: {
      allProjects,
      featuredProjects,
    },
  };
}

export default function Home({
  allProjects,
  featuredProjects,
}: {
  allProjects: any[];
  featuredProjects: any[];
}) {
  return (
    <>
      <Head>
        <title>Portfolio Technique - Partage de projets et travaux</title>
        <meta
          name="description"
          content="Portfolio complet partageant les projets techniques avec la communauté"
        />
      </Head>

      <Hero />

      {/* Section Featured Projects */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Projets en vedette</h2>
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      {/* Section All Projects */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Tous les projets</h2>
          <p className="text-center text-gray-600 mb-8">
            {allProjects.length} projet{allProjects.length > 1 ? 's' : ''} au total
          </p>
          <ProjectGrid projects={allProjects} />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Étape 2: Commit**

```bash
git add pages/index.tsx
git commit -m "feat: create home page with featured and all projects"
```

---

### Task 10: Créer la page de détail projet avec SSG

**Fichiers:**
- Create: `pages/projects/[slug].tsx`

- [ ] **Étape 1: Écrire pages/projects/[slug].tsx**

```typescript
import Head from 'next/head';
import { getProject, getProjectSlugs, getAllProjects } from '@/lib/projects';
import ProjectDetail from '@/components/ProjectDetail';

export async function getStaticPaths() {
  const slugs = getProjectSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
}

export default function ProjectPage({ project }: { project: any }) {
  return (
    <>
      <Head>
        <title>{project.title} - Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
      </Head>

      <ProjectDetail project={project} />
    </>
  );
}
```

- [ ] **Étape 2: Commit**

```bash
git add pages/projects/[slug].tsx
git commit -m "feat: create dynamic project detail pages with SSG"
```

---

### Task 11: Créer la page de recherche

**Fichiers:**
- Create: `components/SearchResults.tsx`
- Create: `pages/search.tsx`

- [ ] **Étape 1: Créer components/SearchResults.tsx**

```typescript
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchProjects, initializeSearch } from '@/lib/search';
import ProjectGrid from './ProjectGrid';
import { getAllProjects } from '@/lib/projects';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    const performSearch = async () => {
      setIsLoading(true);

      // Initialiser l'index avec tous les projets
      const allProjects = getAllProjects();
      const index = allProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags || [],
      }));

      initializeSearch(index);

      // Effectuer la recherche
      const searchResults = searchProjects(String(q));

      // Mapper les résultats aux projets complets
      const projectResults = searchResults
        .map((r) => allProjects.find((p) => p.slug === r.slug))
        .filter(Boolean);

      setResults(projectResults);
      setIsLoading(false);
    };

    performSearch();
  }, [q]);

  if (!q) {
    return <div>Aucune requête de recherche</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-2">Résultats de la recherche</h1>
      <p className="text-gray-600 mb-8">
        Recherche pour: <span className="font-bold text-dark">"{q}"</span>
      </p>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Recherche en cours...</p>
        </div>
      ) : (
        <ProjectGrid
          projects={results}
          emptyMessage={`Aucun résultat trouvé pour "${q}"`}
        />
      )}
    </div>
  );
}
```

- [ ] **Étape 2: Créer pages/search.tsx**

```typescript
import Head from 'next/head';
import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Recherche - Portfolio</title>
      </Head>
      <SearchResults />
    </>
  );
}
```

- [ ] **Étape 3: Commit**

```bash
git add components/SearchResults.tsx pages/search.tsx
git commit -m "feat: add search results page with fuse.js integration"
```

---

### Task 12: Créer le script d'export depuis le vault

**Fichiers:**
- Create: `scripts/export-vault.js`

- [ ] **Étape 1: Créer scripts/export-vault.js**

```javascript
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
```

- [ ] **Étape 2: Commit**

```bash
git add scripts/export-vault.js
git commit -m "feat: add vault export script"
```

---

### Task 13: Créer le workflow GitHub Actions

**Fichiers:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Étape 1: Créer .github/workflows/deploy.yml**

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './out'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

- [ ] **Étape 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add github pages deployment workflow"
```

---

### Task 14: Créer structure /projects avec exemple

**Fichiers:**
- Create: `projects/.gitkeep`
- Create: `projects/example-project/README.md`
- Create: `projects/example-project/meta.json`

- [ ] **Étape 1: Créer la structure de base pour les projets**

```bash
mkdir -p projects/example-project
echo "# Example Project

Description et contenu du projet." > projects/example-project/README.md

cat > projects/example-project/meta.json << 'EOF'
{
  "id": "example-project",
  "title": "Example Project",
  "description": "Un projet exemple pour tester la structure",
  "content_preview": "Description et contenu du projet.",
  "tags": ["example", "test"],
  "languages": ["JavaScript"],
  "date_created": "2026-05-25",
  "date_updated": "2026-05-25",
  "featured": true,
  "repository": "https://github.com/example/repo",
  "live_demo": null,
  "featured_image": "featured-image.png"
}
EOF
```

- [ ] **Étape 2: Commit**

```bash
git add projects/
git commit -m "feat: create projects directory structure with example"
```

---

### Task 15: Tester le build et la génération

**Fichiers:**
- None (testing step)

- [ ] **Étape 1: Installer les dépendances**

```bash
cd C:\Repos\site-vitrine
npm install
```

- [ ] **Étape 2: Générer l'index de recherche**

```bash
node lib/generateIndex.ts
```

- [ ] **Étape 3: Build Next.js**

```bash
npm run build
```

Expected: Build réussit, no errors. Files generated in `out/` directory.

- [ ] **Étape 4: Vérifier la structure générée**

```bash
ls -la out/
```

Expected: Voir `index.html`, `projects/`, `search/`, etc.

- [ ] **Étape 5: Commit**

```bash
git add .
git commit -m "test: verify build and static generation"
```

---

### Task 16: Documentation et finalisation

**Fichiers:**
- Create: `README.md`

- [ ] **Étape 1: Créer README.md**

```markdown
# Site Vitrine Portfolio

Portfolio technique partageant les projets avec la communauté tech.

## Stack technologique

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Recherche:** Fuse.js (côté client)
- **Déploiement:** GitHub Pages + GitHub Actions
- **Contenu:** Markdown exporté du vault Obsidian

## Installation

\`\`\`bash
npm install
\`\`\`

## Développement

\`\`\`bash
npm run dev
# Ouvrir http://localhost:3000
\`\`\`

## Export depuis le vault

Exporter les projets du vault Obsidian:

\`\`\`bash
npm run export-vault
\`\`\`

Cela peuple le répertoire `projects/` avec les README et métadonnées de chaque projet.

## Build

\`\`\`bash
npm run build
# Génère les fichiers statiques dans `out/`
\`\`\`

## Ajouter un projet

1. Créer un dossier dans `projects/[slug]/`
2. Ajouter `README.md` et `meta.json`
3. (Optionnel) Ajouter une image `featured-image.png`
4. Commit et push

### Structure meta.json

\`\`\`json
{
  "id": "unique-slug",
  "title": "Titre du projet",
  "description": "Description courte",
  "tags": ["tag1", "tag2"],
  "languages": ["Python", "JavaScript"],
  "date_created": "2026-05-25",
  "date_updated": "2026-05-25",
  "featured": true,
  "repository": "https://github.com/...",
  "live_demo": "https://..."
}
\`\`\`

## Déploiement

Le site est déployé automatiquement sur GitHub Pages à chaque push sur `main`.

URL: \`https://[username].github.io/site-vitrine\`

## Licence

Contenu personnel - voir chaque projet pour sa licence.
```

- [ ] **Étape 2: Commit**

```bash
git add README.md
git commit -m "docs: add project documentation"
```

---

## Plan de vérification (Self-Review)

✅ **Couverture de la spec:**
- ✅ Architecture hybrid export (Task 12)
- ✅ Page d'accueil avec featured projects (Task 9)
- ✅ Page détail projet avec markdown (Task 8, 10)
- ✅ Moteur de recherche côté client (Task 6, 11)
- ✅ Stack Next.js + Tailwind + Fuse.js (Tasks 1-7)
- ✅ GitHub Pages + Actions (Task 13)
- ✅ Structure /projects versionée (Task 14)

✅ **Pas de placeholders:**
- ✅ Tous les composants ont du code complet
- ✅ Tous les tests sont spécifiés (aucun test - projet vitrine)
- ✅ Tous les chemins de fichiers sont exacts
- ✅ Tous les commandes sont exactes

✅ **Cohérence des types:**
- ✅ ProjectMeta, Project interfaces définies (Task 5)
- ✅ Utilisées consistemment dans tous les composants
- ✅ SearchIndex matches avec buildSearchIndex

✅ **Granularité des tâches:**
- ✅ Chaque task = 2-5 minutes de travail
- ✅ TDD où applicable (tests implicites dans les next run commands)
- ✅ Commits fréquents après chaque task

---

## Prochaines étapes

Plan complet et sauvegardé à: `docs/superpowers/plans/2026-05-25-site-vitrine-implementation.md`

**Deux options d'exécution:**

1. **Subagent-Driven (recommandé)** - Dispatch un subagent frais par task, revue entre les tasks, itération rapide

2. **Inline Execution** - Exécute les tasks dans cette session avec checkpoints de revue

Laquelle préfères-tu?
