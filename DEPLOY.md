# Guide de Déploiement - Formation OpenFOAM

## 🚀 Déploiement sur Vercel (Recommandé - Gratuit)

### Option 1 : Déploiement via l'interface web Vercel (Le plus simple)

#### Étape 1 : Créer un compte Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up" (S'inscrire)
3. Choisissez "Continue with GitHub" (recommandé) ou utilisez votre email

#### Étape 2 : Télécharger votre projet
1. Sur votre ordinateur, créez un dossier `formation-openfoam`
2. Copiez-y tous les fichiers du projet (src/, dist/, package.json, etc.)

#### Étape 3 : Créer un dépôt GitHub
1. Allez sur https://github.com
2. Créez un nouveau repository nommé `formation-openfoam`
3. Uploadez votre projet :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/formation-openfoam.git
   git push -u origin main
   ```

#### Étape 4 : Connecter à Vercel
1. Sur Vercel, cliquez sur "Add New Project"
2. Sélectionnez "Import Git Repository"
3. Choisissez votre repo `formation-openfoam`
4. Vercel détectera automatiquement la configuration
5. Cliquez sur "Deploy"

#### Étape 5 : Configuration (si nécessaire)
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`

---

### Option 2 : Déploiement via CLI Vercel

#### Étape 1 : Installer Vercel CLI
```bash
npm i -g vercel
```

#### Étape 2 : Se connecter
```bash
vercel login
```

#### Étape 3 : Déployer
Dans le dossier du projet :
```bash
cd formation-openfoam
vercel
```

Suivez les instructions :
- Set up and deploy? : `Y`
- Which scope? : Sélectionnez votre compte
- Link to existing project? : `N`
- What's your project name? : `formation-openfoam`
- In which directory is your code located? : `./`

---

## 🌐 Autres options gratuites

### Netlify (Alternative)
1. Allez sur https://netlify.com
2. Glissez-déposez le dossier `dist/` directement
3. Votre site est en ligne instantanément

### GitHub Pages (Gratuit)
1. Allez dans Settings > Pages de votre repo
2. Source : Deploy from a branch
3. Branch : main / root
4. Votre site sera sur `https://votre-username.github.io/formation-openfoam`

---

## ✅ Vérification post-déploiement

Testez ces éléments sur votre site déployé :
- [ ] Navigation entre les sections
- [ ] Expansion des modules de formation
- [ ] Affichage du code avec syntax highlighting
- [ ] Téléchargement des fiches descriptives
- [ ] Responsive sur mobile

---

## 📞 Support

En cas de problème :
- Documentation Vercel : https://vercel.com/docs
- Forum Vercel : https://github.com/vercel/vercel/discussions
