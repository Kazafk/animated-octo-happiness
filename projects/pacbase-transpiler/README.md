> Voir aussi : [[Pacbase-transpiler/01_Specifications_Fonctionnelles]] | [[Pacbase-transpiler/02_Specifications_Detaillees]] | [[Pacbase-transpiler/03_DAT_Architecture_Technique]] | [[Pacbase-transpiler/04_Plan_Projet]] | [[Pacbase-transpiler/05_Bilan_Critique_et_Plan_Completion]] | [[Pacbase-transpiler/06_Plan_de_Test]] | [[Pacbase-transpiler/07_Strategie_Migration]] | [[Pacbase-transpiler/08_Run_Book_Operations]] | [[Pacbase-transpiler/10_Inventaire_Corpus_Template]] | [[Pacbase-transpiler/11_Catalogue_Patterns_Annexe]] | [[Pacbase-transpiler/12_Annexe_Mots_Reserves_COBOL64]] | [[Pacbase-transpiler/13_Regles_de_Transformation]] | [[Pacbase-transpiler/14_Glossaire]] | [[Pacbase-transpiler/15_Corpus_Disponibles_En_Ligne]] | [[Pacbase-transpiler/09_ADR/README]]

# PacBase Transpiler — Dossier Projet

> Moteur de transpilation déterministe transformant du **COBOL généré par PacBase** en **COBOL natif, structuré, lisible et maintenable**, conforme **IBM Enterprise COBOL 6.4**, avec **équivalence fonctionnelle stricte**.

| Métadonnée | Valeur |
|---|---|
| **Statut du dossier** | Pré-développement (avant kick-off) |
| **Dernière mise à jour** | 08/05/2026 |
| **Phase actuelle** | Cadrage / complétion documentaire |

---

## Carte de navigation du dossier

### Documents de cadrage (lus en premier)

| # | Document | Public | Rôle |
|---|---|---|---|
| 01 | [Spécifications Fonctionnelles](./01_Specifications_Fonctionnelles.md) | Tous | **Quoi** — périmètre, règles, critères d'acceptation |
| 02 | [Spécifications Détaillées](./02_Specifications_Detaillees.md) | Dev | **Comment** — modules, structures, algorithmes |
| 03 | [DAT — Architecture Technique](./03_DAT_Architecture_Technique.md) | Architecte, Dev | Architecture, dépendances, déploiement |
| 04 | [Plan Projet](./04_Plan_Projet.md) | PMO, Dev | Itérations, planning, jalons, risques |

### Bilans et ajouts pré-développement

| # | Document | Statut |
|---|---|---|
| 05 | [Bilan critique du dossier initial](./05_Bilan_Critique_et_Plan_Completion.md) | Référence |
| 06 | [Plan de Test](./06_Plan_de_Test.md) | Nouveau — issu du bilan |
| 07 | [Stratégie de Migration](./07_Strategie_Migration.md) | Nouveau |
| 08 | [Run Book Opérationnel](./08_Run_Book_Operations.md) | Nouveau |
| 09 | [Architectural Decision Records (ADR-001 à ADR-008)](./09_ADR/) | Nouveau |
| 10 | [Template d'Inventaire Corpus](./10_Inventaire_Corpus_Template.md) | À remplir en Phase 0 |

### Annexes techniques

| # | Document | Usage |
|---|---|---|
| 11 | [Catalogue détaillé des Patterns PacBase](./11_Catalogue_Patterns_Annexe.md) | Référence pour module `detector` |
| 12 | [Annexe Mots Réservés COBOL 6.4](./12_Annexe_Mots_Reserves_COBOL64.md) | Référence pour module `cobol64_compliance` |
| 13 | [Exemples Avant/Après](./13_Exemples_Avant_Apres/) | Pédagogique, onboarding |
| 14 | [Glossaire](./14_Glossaire.md) | Référence transversale |
| 15 | [Corpus PacBase disponibles en ligne](./15_Corpus_Disponibles_En_Ligne.md) | Stratégie d'acquisition de fixtures |
| 16 | [Règles de Transformation (existant)](./16_Regles_de_Transformation.md) | Référence règles |

### Schémas et fixtures

- `schemas/transpiler-config.schema.json` — Validation de la config YAML.
- `tests/fixtures/rpp_sample.xml` — Exemple d'export RPP minimal.
- `tests/fixtures/cobol/` — Fixtures COBOL synthétiques (à produire en Itération 0).

---

## Parcours de lecture recommandés

### Pour un nouvel arrivant développeur

```
1. README.md (5 min)
2. 01_Specifications_Fonctionnelles.md       (30 min)
3. 13_Exemples_Avant_Apres/                  (15 min) ← très pédagogique
4. 03_DAT_Architecture_Technique.md          (30 min)
5. 02_Specifications_Detaillees.md           (45 min)
6. 09_ADR/                                   (30 min)
```

### Pour un sponsor / décideur

```
1. README.md
2. 01_Specifications_Fonctionnelles.md §1-3 (contexte/objectifs)
3. 04_Plan_Projet.md §1-3 (itérations, planning)
4. 07_Strategie_Migration.md (bascule)
5. 05_Bilan_Critique_et_Plan_Completion.md (état du dossier)
```

### Pour un ingénieur transpilation / opérateur

```
1. 08_Run_Book_Operations.md
2. 06_Plan_de_Test.md
3. 11_Catalogue_Patterns_Annexe.md
4. 12_Annexe_Mots_Reserves_COBOL64.md
```

### Pour un architecte / reviewer

```
1. 03_DAT_Architecture_Technique.md
2. 09_ADR/                                  (toutes les décisions)
3. 05_Bilan_Critique_et_Plan_Completion.md
4. 02_Specifications_Detaillees.md
```

---

## État de complétude du dossier

| Catégorie | Statut |
|---|---|
| Cadrage fonctionnel et technique | ✅ Complet |
| Plan projet | ✅ Complet |
| Bilan critique pré-développement | ✅ Complet |
| Plan de test | ✅ Complet |
| Stratégie de migration | ✅ Complet |
| Run book opérationnel | ✅ Complet |
| ADR architecturaux | ✅ 8 ADR rédigés |
| Annexes techniques (patterns, mots réservés) | ✅ Complet |
| Exemples avant/après | ✅ 5 exemples |
| Glossaire | ✅ Complet |
| Corpus de test public | ✅ Étude réalisée — résultat : aucun corpus public, plan B documenté |
| **Inventaire corpus client réel** | ⚠️ **À remplir en Phase 0 (bloquant)** |
| **Export RPP XML réel** | ⚠️ **À acquérir auprès du sponsor (bloquant)** |
| Schéma JSON config + fixture RPP | ✅ Squelettes fournis (à étoffer en Itération 0) |

---

## Actions bloquantes avant kick-off

Cinq points à régler **avant** de démarrer l'Itération 0 (cf. `05_Bilan_Critique` §10) :

1. Cadrer le **corpus réel** (volumétrie, dialecte PacBase/RPP, plateforme).
2. Obtenir au moins **un export RPP XML réel** + 3-5 programmes COBOL PacBase représentatifs anonymisés.
3. **Trancher le périmètre validable** (CICS/DB2 in/out, e2e ou pas).
4. **Statuer sur z/OS USS** comme cible de déploiement.
5. **Lever les 8 incohérences** identifiées entre les documents initiaux (cf. `05_Bilan_Critique` §3).

---

## Conventions du dossier

- **Langue** : français pour les documents projet ; anglais autorisé dans le code, les noms de modules et les ADR.
- **Format** : Markdown CommonMark, tableaux GitHub-flavored.
- **Versionnement** : Git, branche `main` protégée, PR avec revue obligatoire pour les documents 01-04.
- **Numérotation** : préfixe `NN_` pour ordonner ; les ADR ont leur propre numérotation `ADR-NNN`.
- **Statuts** : `Draft` / `Review` / `Approved` / `Deprecated` indiqués en en-tête.

---

## Contact projet

| Rôle | À compléter au démarrage |
|---|---|
| Sponsor | — |
| Pilote technique | — |
| Architecte | — |
| PMO | — |
| Référent métier | — |
