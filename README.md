# Site Vitrine Portfolio

Portfolio technique partageant les projets avec la communauté tech.

## Stack technologique

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Recherche:** Fuse.js (côté client)
- **Déploiement:** GitHub Pages + GitHub Actions
- **Contenu:** Markdown exporté du vault Obsidian

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
# Ouvrir http://localhost:3000
```

## Export depuis le vault

Exporter les projets du vault Obsidian:

```bash
npm run export-vault
```

Cela peuple le répertoire `projects/` avec les README et métadonnées de chaque projet.

## Build

```bash
npm run build
# Génère les fichiers statiques dans `out/`
```

## Ajouter un projet

1. Créer un dossier dans `projects/[slug]/`
2. Ajouter `README.md` et `meta.json`
3. (Optionnel) Ajouter une image `featured-image.png`
4. Commit et push

### Structure meta.json

```json
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
```

## Déploiement

Le site est déployé automatiquement sur GitHub Pages à chaque push sur `main`.

URL: `https://[username].github.io/site-vitrine`

## Licence

Contenu personnel - voir chaque projet pour sa licence.
