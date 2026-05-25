# Site Vitrine Portfolio - Spécification de Design

**Date:** 2026-05-25  
**Auteur:** Claude Code / Florent Caste  
**Statut:** En attente de révision utilisateur

---

## 1. Vue d'ensemble

### Objectif

Créer un site vitrine qui présente une collection complète de projets et travaux techniques à la communauté tech open-source. Le site doit combiner les caractéristiques d'un **portfolio personnel** avec de la **documentation technique substantielle**.

### Public cible

La communauté tech générale - développeurs, chercheurs, et contributeurs potentiels intéressés par le partage de connaissance open-source.

### Approche

**Hybrid avec export et versioning** - Les projets sont exportés du vault Obsidian en markdown, stockés dans le repo git, et générés en pages statiques Next.js.

---

## 2. Caractéristiques principales

### 2.1 Contenu

- **Portfolio complet:** Tous les projets du vault Obsidian sont inclus
- **Types de projets:** Frameworks, parseurs, outils, expériences, recherche
- **Contenu:** README.md, métadonnées, images/screenshots

### 2.2 Fonctionnalités utilisateur

- **Moteur de recherche:** Recherche côté client sur titres, descriptions, tags, contenu
- **Page d'accueil:** Vue d'ensemble avec featured projects + grille complète
- **Détail projet:** Page dédiée par projet avec contenu markdown complet
- **Design vibrant:** Coloré avec images, badges, animations subtiles

### 2.3 Architecture technique

- **Framework:** Next.js (React)
- **Déploiement:** GitHub Pages avec GitHub Actions
- **Stockage contenu:** Markdown + JSON dans `/projects`
- **Recherche:** Fuse.js (index généré au build)
- **Synchronisation:** Export semi-automatisé depuis vault Obsidian

---

## 3. Architecture et structure

### 3.1 Structure du repository

```
site-vitrine/
├── docs/
│   └── superpowers/specs/          # Spécifications de design
├── pages/                           # Routes Next.js
│   ├── index.tsx                   # Accueil
│   ├── projects/[slug].tsx         # Détail projet
│   └── search.tsx                  # Résultats recherche
├── projects/                        # Contenu des projets (VERSIONNÉ)
│   ├── agentic-testing-framework/
│   │   ├── README.md               # Contenu principal
│   │   ├── meta.json               # Métadonnées
│   │   └── images/                 # Screenshots
│   └── [autres projets]/
├── components/                      # Composants React réutilisables
│   ├── ProjectCard.tsx             # Carte projet (grille)
│   ├── ProjectDetail.tsx           # Vue détaillée
│   ├── SearchBar.tsx               # Barre de recherche
│   ├── ProjectGrid.tsx             # Grille de projets
│   └── Navigation.tsx              # Menu/header
├── lib/                            # Logique métier
│   ├── projects.ts                 # Helpers: lire projets, parser metadata
│   ├── search.ts                   # Index et recherche fuse.js
│   └── generateIndex.ts            # Générer index au build
├── scripts/
│   └── export-vault.js             # Exporter projets du vault
├── public/                         # Assets statiques
├── styles/                         # CSS/Tailwind
├── next.config.js                  # Config Next.js (export statique)
└── package.json
```

### 3.2 Format des données projet

**Structure de chaque projet:**

```
projects/[project-slug]/
├── README.md                       # Contenu markdown principal
├── meta.json                       # Métadonnées structurées
├── featured-image.png              # Image d'en-tête
└── images/                         # Autres images/screenshots
    ├── screenshot-1.png
    └── ...
```

**meta.json:**

```json
{
  "id": "carto-cobol",
  "title": "Carto Cobol",
  "description": "Cartographie et analyse de code COBOL pour modernisation d'entreprise",
  "content_preview": "Premier paragraphe du README...",
  "tags": ["cobol", "parser", "modernization", "enterprise"],
  "languages": ["Python", "COBOL"],
  "date_created": "2026-01-15",
  "date_updated": "2026-05-25",
  "featured": true,
  "repository": "https://github.com/anthropics/cobol-cartography",
  "live_demo": null,
  "featured_image": "featured-image.png"
}
```

### 3.3 Flux de données

```
Vault Obsidian
     ↓
[export-vault.js script]
     ↓
/projects/ [markdown + meta.json]
     ↓
[git commit]
     ↓
GitHub Pages (push trigger)
     ↓
[GitHub Actions workflow]
     ↓
[next build → next export]
     ↓
[gh-pages branch]
     ↓
Static Site Live (https://[user].github.io/site-vitrine)
```

---

## 4. Pages et composants

### 4.1 Page d'accueil (`pages/index.tsx`)

**Sections:**

1. **Hero:** Titre, description courte, call-to-action (vers projects)
2. **Featured Projects:** Grille des projets avec `featured: true` en évidence
   - Affichage: Image, titre, description courte, tags
   - Interactions: Hover → zoom, clic → détail
3. **Tous les projets:** Grille complète scrollable
4. **Barre de recherche:** Sticky en haut, visible partout

**Design:** Coloré, vibrant, moderne. Utiliser gradients subtils, animations au scroll.

### 4.2 Page détail projet (`pages/projects/[slug].tsx`)

**Contenu:**

1. Image d'en-tête (featured-image)
2. Titre, description, métadonnées (tags, langages, date)
3. Contenu markdown complet (README)
4. Liens (GitHub, démo, documentation)
5. Widgets connexes (projects similaires)

**Rendu:** Markdown → HTML avec syntaxe highlighting pour code blocks

### 4.3 Page/overlay de recherche (`pages/search.tsx`)

**Fonctionnalité:**

- Recherche instantanée lors de la saisie (côté client)
- Affichage des résultats en grille
- Highlight des termes recherchés

**Index:** Généré au build, embarqué dans le bundle

### 4.4 Composants réutilisables

| Composant       | Responsabilité                                              |
| --------------- | ----------------------------------------------------------- |
| `ProjectCard`   | Affichage compact (grille): image, titre, description, tags |
| `ProjectDetail` | Affichage complet: contenu markdown renderisé               |
| `SearchBar`     | Input + déclenchement recherche                             |
| `ProjectGrid`   | Conteneur avec layout grille + pagination                   |
| `Navigation`    | Header/menu principal                                       |
| `TagBadge`      | Badge pour afficher un tag (coloré)                         |

---

## 5. Synchronisation vault → site (Export process)

### 5.1 Script `export-vault.js`

**Fonction:** Exporter les projets du vault Obsidian en structure `/projects`

**Processus:**

1. Se connecte à l'API Local REST du vault (https://127.0.0.1:27124)
2. Énumère les dossiers dans le vault
3. Pour chaque dossier projet:
   - Exporte le README principal
   - Crée un `meta.json` avec métadonnées (extraites du README ou d'un frontmatter)
   - Exporte les images/assets associés
4. Commit les changements dans git

**Exécution:**

```bash
node scripts/export-vault.js
```

**Métadonnées extraites de:**

- Frontmatter YAML du README (si present)
- Noms de dossiers (slug)
- Dates de modification

### 5.2 Fréquence de mise à jour

- Manuelle (utilisateur exécute le script au besoin)
- Ou via GitHub Actions scheduled (optionnel: hebdomadaire)

---

## 6. Moteur de recherche

### 6.1 Implémentation

**Librairie:** `fuse.js` (léger, ~16KB, performant côté client)

**Index:**

- Généré au build time via `lib/generateIndex.ts`
- Contient: titre, description, tags, contenu (preview)
- Exporté en JSON, embarqué dans le bundle Next.js

**Recherche côté client:**

- Instantanée (0-100ms)
- Fuzzy matching (tolère les typos)
- Pondération: titre > tags > description > contenu

**Champs indexés:**

- `title` (poids fort)
- `description`
- `tags` (poids fort)
- `content` (preview du README, poids faible)

### 6.2 Affichage des résultats

- Grille similaire à la page d'accueil
- Nombre de résultats
- Option "Aucun résultat" → suggestion de recherche alternative

---

## 7. Déploiement et CI/CD

### 7.1 GitHub Actions Workflow

**Trigger:** Push sur branche `main`

**Étapes:**

1. Checkout du code
2. Setup Node.js
3. `npm install`
4. `npm run build` (Next.js build + generateIndex)
5. `npm run export` (next export → static HTML)
6. Deploy vers branche `gh-pages`

**Config GitHub Pages:** Repository settings → Pages → Source: `gh-pages` branch

### 7.2 URL du site

```
https://[username].github.io/site-vitrine
```

### 7.3 Build & Export

**next.config.js:**

```javascript
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export', // Export statique pour GitHub Pages
  basePath: '/site-vitrine', // Si pas de custom domain
};
```

**Build command:** `next build && next export`

---

## 8. Stack technologique et dépendances

### 8.1 Core

- **next** (^14.0): Framework React avec SSG/SSR
- **react** (^18.0): UI library
- **react-dom** (^18.0): React pour le DOM

### 8.2 Contenu & données

- **markdown-it** ou **next-mdx-remote**: Parser markdown → HTML
- **highlight.js** ou **prism.js**: Syntax highlighting pour code blocks

### 8.3 Recherche

- **fuse.js** (~16KB): Client-side fuzzy search

### 8.4 Styling

- **tailwindcss**: Utility-first CSS (optionnel mais recommandé)
- **framer-motion**: Animations (optionnel, pour le vibrant)

### 8.5 Images

- **next-image-export-optimizer**: Optimisation images pour export statique

### 8.6 Développement

- **typescript**: Type safety
- **eslint**: Linting
- **prettier**: Code formatting

---

## 9. Considérations techniques

### 9.1 Performance

- **Taille du site:** Statique (fast) - aucun serveur nécessaire
- **Recherche:** Côté client (pas de requête réseau)
- **Images:** Optimisées avec `next-image-export-optimizer`
- **Bundle:** ~200-300KB compressé (fuse.js inclus)

### 9.2 Maintenance

- Chaque push met à jour le site automatiquement
- Versionning du contenu avec git
- Historique complet des changements

### 9.3 Scalabilité

- Pas de limite du nombre de projets (statique)
- Performance dégradation acceptable jusqu'à ~500 projets

### 9.4 Accessibilité

- Sémantique HTML correcte
- ARIA labels pour recherche/navigation
- Contraste couleurs (vibrant mais accessible)

---

## 10. Prérequis et dépendances externes

### 10.1 Obligatoires

- **Node.js** ≥18.0
- **Git** (versioning et déploiement)
- **GitHub account** (pour le repo et Pages)
- **Obsidian Local REST API** (pour export, optionnel si export manuel)

### 10.2 Optionnels

- **Custom domain** (sinon: `[user].github.io/site-vitrine`)
- **Scheduled exports** (sinon: export manuel au besoin)

---

## 11. Plan d'implémentation (aperçu)

Ce design sera transformé en un plan d'implémentation détaillé incluant:

1. **Setup initial:** Création repo, structure, dépendances
2. **Core pages:** Home, project detail, search
3. **Export script:** Intégration vault → /projects
4. **Search engine:** Index building + composant search
5. **Styling:** Tailwind + design vibrant
6. **CI/CD:** GitHub Actions workflow
7. **Testing & optimisation:** Performance, accessibility
8. **Deployment:** GitHub Pages live

---

## Approuvé par l'utilisateur?

Oui ✅ (2026-05-25)

---

**Prochaine étape:** Invocation du skill `writing-plans` pour créer le plan d'implémentation détaillé.
