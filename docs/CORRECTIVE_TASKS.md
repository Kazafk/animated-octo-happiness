# Tâches correctives - Site Vitrine Portfolio

**Priorité globale:** 🟢 FAIBLE (site fully fonctionnel)  
**Effort total estimé:** ~3 heures  
**Date plan:** 2026-05-25

---

## 📋 Tableau de synthèse

| ID  | Tâche                              | Priorité   | Effort | Impact                    | Status  |
| --- | ---------------------------------- | ---------- | ------ | ------------------------- | ------- |
| 1   | Ajouter tsconfig.json              | 🔵 HAUTE   | 5 min  | Dev clarity               | ⬜ TODO |
| 2   | Marquer 1 projet featured          | 🔵 HAUTE   | 5 min  | UX: section visible       | ⬜ TODO |
| 3   | Fixer warning ESLint SearchResults | 🔵 HAUTE   | 5 min  | Code quality              | ⬜ TODO |
| 4   | Créer featured-image.png (5×)      | 🟡 MOYENNE | 1-2h   | UX: couvertures visuelles | ⬜ TODO |
| 5   | Remplacer `<img>` par `<Image>`    | 🟡 MOYENNE | 20 min | Performance, SEO          | ⬜ TODO |
| 6   | Ajouter prettier                   | 🟢 BASSE   | 10 min | Dev DX                    | ⬜ TODO |
| 7   | Intégrer framer-motion             | 🟢 BASSE   | 30 min | Animations polish         | ⬜ TODO |

---

## 🔵 PHASE 1 - HAUTE PRIORITÉ (15 minutes)

### Tâche 1: Ajouter tsconfig.json explicite

**Fichier:** `tsconfig.json`

**Étapes:**

1. Créer le fichier avec configuration Next.js standard:

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
    },
    "isolatedModules": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

2. Vérifier que `npm run build` fonctionne toujours

3. Commit: `chore: add explicit tsconfig.json`

**Raison:** Meilleure reproducibilité, clarté du projet, meilleur support IDE.

---

### Tâche 2: Marquer au moins 1 projet comme featured

**Fichier:** `projects/carto-cobol/meta.json`

**Étapes:**

1. Ouvrir le fichier meta.json
2. Changer ligne 12:

   ```json
   "featured": false,
   ```

   vers:

   ```json
   "featured": true,
   ```

3. Vérifier que `npm run build` passe

4. Commit: `feat: mark Carto Cobol as featured project`

**Raison:** La section "Projets en vedette" sur l'accueil s'affiche actuellement vide.

---

### Tâche 3: Fixer warning ESLint dans SearchResults

**Fichier:** `components/SearchResults.tsx`

**Étapes:**

1. Localiser la ligne 41 du useEffect

2. Ajouter `router.basePath` à la dépendance:

**Avant:**

```tsx
useEffect(() => {
  if (!q) return;
  performSearch();
}, [q]);
```

**Après:**

```tsx
useEffect(() => {
  if (!q) return;
  performSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [q]);
```

**OU** ajouter basePath à la dépendance (meilleure solution):

```tsx
useEffect(() => {
  if (!q) return;

  const performSearch = async () => {
    setIsLoading(true);

    try {
      const basePath = router.basePath || '';
      const indexUrl = `${basePath}/search-index.json`;
      // ... rest
    } catch (err) {
      console.error('Failed to perform search:', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  performSearch();
}, [q, router.basePath]);
```

3. Vérifier: `npm run build` ne doit montrer zéro warnings

4. Commit: `fix: add missing dependency in SearchResults useEffect`

---

## 🟡 PHASE 2 - HAUTE QUALITÉ (1.5 heures)

### Tâche 4: Créer images featured pour tous les projets

**Fichiers à créer:**

- `projects/agentic-testing-framework/featured-image.png`
- `projects/carto-cobol/featured-image.png`
- `projects/ia--management/featured-image.png`
- `projects/mainframe-virtualization/featured-image.png`
- `projects/pacbase-transpiler/featured-image.png`

**Étapes:**

1. Créer 5 images PNG (800×400px minimum, ou 1200×600px pour haute résolution)

2. **Options:**
   - Générer avec design tool (Figma, Canva, GIMP)
   - Trouver des images existantes du vault Obsidian
   - Utiliser placeholder images (unsplash.com, pexels.com)
   - Générer avec IA (DALL-E, Midjourney)

3. **Contenu suggéré** (par projet):
   - **Agentic Testing Framework:** Icône test, AI, automation
   - **Carto Cobol:** Carte code, COBOL, legacy systems
   - **IA & Management:** Cerveau, management, AI
   - **Mainframe Virtualization:** Serveurs, terminal 3270, MVS
   - **Pacbase-transpiler:** Code transformation, COBOL→Modern

4. Placer chaque image dans son dossier projet

5. Commit: `assets: add featured images for all projects`

**Raison:** UX visuelle, design vibrant du cahier des charges, engagement utilisateur.

**Effort:** 1-2 heures selon votre approach (téléchargement < création < génération IA).

---

### Tâche 5: Remplacer `<img>` par `<Image>` Next.js

**Fichiers concernés:**

- `components/ProjectCard.tsx`
- `components/ProjectDetail.tsx`

**Étapes:**

1. **Dans ProjectCard.tsx:**

**Avant (ligne 15-18):**

```tsx
{project.featured_image ? (
  <img
    src={project.featured_image}
    alt={project.title}
    className="w-full h-full object-cover"
  />
) : (
```

**Après:**

```tsx
{project.featured_image ? (
  <Image
    src={project.featured_image}
    alt={project.title}
    width={800}
    height={400}
    className="w-full h-full object-cover"
    priority={false}
  />
) : (
```

2. **Ajouter import en haut du fichier:**

```tsx
import Image from 'next/image';
```

3. **Même chose dans ProjectDetail.tsx (ligne 16)**

4. **Remarque importante:** `next/image` pour export statique requiert que les images soient dans `public/` ou que vous utilisiez `unoptimized: true` (déjà configuré dans next.config.js)

5. Vérifier build: `npm run build`

6. Commit: `perf: replace <img> with Next.js <Image> component`

**Raison:** Performance (LCP meilleur), optimisation d'images, conformité ESLint.

---

## 🟢 PHASE 3 - OPTIONNEL (40 minutes)

### Tâche 6: Ajouter prettier pour formatting

**Étapes:**

1. Installer prettier:

```bash
npm install --save-dev prettier
```

2. Créer `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

3. Créer `.prettierignore`:

```
node_modules/
out/
.next/
public/search-index.json
```

4. Ajouter script dans `package.json`:

```json
"format": "prettier --write \"**/*.{ts,tsx,js,jsx,css,json,md}\"",
"format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,css,json,md}\""
```

5. Ajouter prettier à ESLint dans `.eslintrc.json` (créer le fichier si absent):

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

6. Formatter le code:

```bash
npm run format
```

7. Commit: `chore: add prettier for code formatting`

**Raison:** Cohérence de formatage, moins de discussions sur style, dev experience.

---

### Tâche 7: Intégrer framer-motion pour animations

**Étapes:**

1. Installer:

```bash
npm install framer-motion
```

2. **Exemple 1 - Animer ProjectCard:**

Modifier `components/ProjectCard.tsx`:

```tsx
import { motion } from 'framer-motion';

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-all cursor-pointer"
      >
        {/* contenu existant */}
      </motion.div>
    </Link>
  );
}
```

3. **Exemple 2 - Animer Hero section:**

Modifier `components/Hero.tsx`:

```tsx
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Portfolio Technique
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Découvrez une collection complète de projets...
        </motion.p>
      </div>
    </section>
  );
}
```

4. Vérifier build: `npm run build`

5. Commit: `feat: add framer-motion animations to components`

**Raison:** Animations fluides, meilleure UX, modern feel conforme au cahier des charges ("design vibrant avec animations subtiles").

---

## ✅ Checklist d'exécution

### Phase 1 (CRITIQUE)

- [ ] Tâche 1: tsconfig.json ajouté
- [ ] Tâche 2: Carto Cobol marqué featured
- [ ] Tâche 3: Warning ESLint résolu
- [ ] Tests: `npm run build` réussit sans warning

### Phase 2 (HAUTE QUALITÉ)

- [ ] Tâche 4: 5 featured-image.png créées et placées
- [ ] Tâche 5: `<img>` remplacés par `<Image>`
- [ ] Tests: Site fonctionne, images affichées correctement

### Phase 3 (OPTIONNEL)

- [ ] Tâche 6: prettier installé et configuré
- [ ] Tâche 7: framer-motion intégré et testé

### Finalisation

- [ ] `npm run build` passe sans erreurs ni warnings
- [ ] Tous les commits effectués
- [ ] `git log` montre les commits correctives
- [ ] (Optionnel) `npm run start` et test visuel en local

---

## 📝 Commandes rapides

**Exécuter Phase 1 complète:**

```bash
# Tâche 1: créer tsconfig.json (voir contenu plus haut)
# Tâche 2: éditer projects/carto-cobol/meta.json
# Tâche 3: éditer components/SearchResults.tsx
npm run build
git add .
git commit -m "chore: add tsconfig.json and fix phase-1 items"
```

**Exécuter Phase 2 complète:**

```bash
# Tâche 4: placer 5 images PNG
# Tâche 5: éditer ProjectCard et ProjectDetail
npm run build
git add .
git commit -m "perf: add featured images and optimize Image component"
```

**Exécuter Phase 3 (optionnel):**

```bash
npm install --save-dev prettier
# Tâche 6: créer .prettierrc (voir contenu)
npm install framer-motion
# Tâche 7: intégrer animations (voir code)
npm run build
npm run format
git add .
git commit -m "chore: add prettier and framer-motion"
```

---

## 🎯 Résumé impact

| Phase | Tâches   | Temps  | Impact                                        |
| ----- | -------- | ------ | --------------------------------------------- |
| **1** | 3 tâches | 15 min | ✅ Site conforme spec, zéro warnings          |
| **2** | 2 tâches | 1.5h   | ✅ UX visuelle complète, performance optimale |
| **3** | 2 tâches | 40 min | ✨ Code plus beau, animations premium         |

**Total recommandé:** Phase 1 + 2 = **1.75 heures** pour un site vraiment polish.

---

Généré: 2026-05-25
