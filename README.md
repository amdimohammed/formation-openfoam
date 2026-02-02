# Formation OpenFOAM Professionnelle 🎓

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)](https://formation-openfoam.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

> **Formation complète de 4 jours (28h) sur OpenFOAM** - Du débutant à l'intermédiaire, maîtrisez la CFD open-source.

🌐 **Site en ligne** : [https://formation-openfoam.vercel.app](https://formation-openfoam.vercel.app)

---

## 📚 Contenu de la Formation

### Niveau Débutant (2 jours - 10 modules)

| Jour | Modules | Durée |
|------|---------|-------|
| **Jour 1** | Introduction, Installation, Anatomie d'un cas, Maillage blockMesh, TP Cavité | 7h |
| **Jour 2** | Conditions aux limites, Schémas numériques, Turbulence, Post-traitement, Validation | 7h |

### Niveau Intermédiaire (2 jours - 10 modules)

| Jour | Modules | Durée |
|------|---------|-------|
| **Jour 3** | snappyHexMesh, Aérodynamique, Calcul parallèle MPI, Scripts, TP Cylindre | 7h |
| **Jour 4** | Multiphase VOF, Dam Break, Compressible, Turbulence avancée, Projet final | 7h |

---

## 🗂️ Structure du Projet

```
formation-openfoam/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants shadcn/ui (40+)
│   │   ├── CodeBlock.tsx   # Affichage du code avec syntax highlighting
│   │   ├── ModuleCard.tsx  # Carte de module interactive
│   │   └── Navigation.tsx  # Barre de navigation
│   ├── sections/           # Sections de la page principale
│   │   ├── Hero.tsx        # Section d'accueil
│   │   ├── LevelSection.tsx # Présentation des niveaux
│   │   ├── TutorialSection.tsx # Tutoriel Cavité Entraînée
│   │   ├── DownloadSection.tsx # Fiches téléchargeables
│   │   └── Footer.tsx      # Pied de page
│   ├── data/               # Données de la formation
│   │   ├── trainingData.ts # Contenu des 20 modules
│   │   └── tutorialData.ts # Tutoriel complet Cavité
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilitaires
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles Tailwind + custom
├── index.html              # HTML principal
├── package.json            # Dépendances npm
├── vite.config.ts          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
├── vercel.json             # Configuration Vercel
└── DEPLOY.md               # Guide de déploiement
```

---

## 🚀 Technologies Utilisées

- **Framework** : [React 19](https://react.dev) + [Vite 7](https://vitejs.dev)
- **Langage** : [TypeScript 5.9](https://www.typescriptlang.org)
- **Styling** : [Tailwind CSS 3.4](https://tailwindcss.com)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com) (40+ composants)
- **Icons** : [Lucide React](https://lucide.dev)
- **Déploiement** : [Vercel](https://vercel.com)

---

## 🎨 Design System

| Couleur | Code | Usage |
|---------|------|-------|
| **Navy** | `#003366` | Titres, en-têtes |
| **Orange** | `#FF6B35` | Accents, boutons CTA |
| **Steel Gray** | `#4A5568` | Texte corps |
| **Code Green** | `#48BB78` | Terminal, code |

---

## 📖 Tutoriels Inclus

### Cavité Entraînée (Lid Driven Cavity)
- Configuration complète Re=100
- Fichiers : `blockMeshDict`, `U`, `p`, `controlDict`, `fvSchemes`, `fvSolution`
- Commandes d'exécution
- Post-traitement et validation

---

## 🛠️ Développement Local

```bash
# 1. Cloner le repo
git clone https://github.com/amdimohammed/formation-openfoam.git
cd formation-openfoam

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir http://localhost:5173
```

---

## 📦 Build Production

```bash
npm run build
```

Le dossier `dist/` contient le site statique prêt pour le déploiement.

---

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à [Vercel](https://vercel.com)
2. Laissez la configuration par défaut :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
3. Cliquez sur **Deploy**

Voir [DEPLOY.md](./DEPLOY.md) pour plus d'options.

---

## 📄 Licence

Ce projet est sous licence MIT. OpenFOAM® est une marque déposée d'OpenCFD Limited.

---

## 👤 Auteur

**Mohammed Amdi**
- GitHub : [@amdimohammed](https://github.com/amdimohammed)
- Site : [formation-openfoam.vercel.app](https://formation-openfoam.vercel.app)

---

<p align="center">
  Made with ❤️ for the OpenFOAM community
</p>
