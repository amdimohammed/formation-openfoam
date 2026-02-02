export interface Module {
  id: number;
  title: string;
  duration: string;
  description: string;
  content: string[];
  keyPoints: string[];
  codeExample?: string;
  tips?: string[];
  warnings?: string[];
}

export interface Day {
  dayNumber: number;
  title: string;
  modules: Module[];
}

export interface Level {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  targetAudience: string[];
  prerequisites: string[];
  objectives: string[];
  days: Day[];
}

export const trainingLevels: Level[] = [
  {
    id: "beginner",
    name: "Niveau Débutant",
    subtitle: "De l'installation à la première simulation validée",
    duration: "2 jours (14 heures)",
    targetAudience: [
      "Ingénieurs calcul",
      "Doctorants et chercheurs",
      "Techniciens R&D",
      "Étudiants en fin de cursus scientifique"
    ],
    prerequisites: [
      "Notions fondamentales en mécanique des fluides",
      "Connaissances générales en informatique",
      "Maîtrise basique de Linux souhaitée"
    ],
    objectives: [
      "Comprendre l'architecture et la philosophie d'OpenFOAM",
      "Installer et configurer l'environnement Linux/OpenFOAM",
      "Construire un maillage structuré simple avec blockMesh",
      "Configurer un cas de calcul incompressible laminaire",
      "Définir les conditions aux limites pertinentes",
      "Analyser la convergence et valider les résultats"
    ],
    days: [
      {
        dayNumber: 1,
        title: "Fondamentaux et Premier Cas",
        modules: [
          {
            id: 1,
            title: "Introduction et Philosophie OpenFOAM",
            duration: "2h",
            description: "Découverte de l'écosystème OpenFOAM, sa licence open-source et son approche unique de la CFD.",
            content: [
              "OpenFOAM : Open Source Field Operation and Manipulation",
              "Licence GPL et accès au code source C++",
              "Différences avec les codes commerciaux (approche ligne de commande)",
              "Architecture FVM (Finite Volume Method)",
              "Maillages polyédriques non structurés",
              "Domaines d'application : aéronautique, automobile, énergie, nucléaire"
            ],
            keyPoints: [
              "OpenFOAM est un code CFD open-source basé sur la méthode des volumes finis",
              "Pas d'interface graphique native - tout se fait en ligne de commande",
              "Écrit en C++ avec une architecture orientée objet",
              "Supporte les maillages polyédriques complexes"
            ],
            tips: [
              "Prenez le temps de comprendre la philosophie 'fichier de configuration' avant de commencer",
              "La communauté OpenFOAM est très active sur CFD Online"
            ]
          },
          {
            id: 2,
            title: "Installation et Environnement Linux",
            duration: "1h30",
            description: "Mise en place de l'environnement de travail et découverte de la structure des répertoires.",
            content: [
              "Installation sous Linux / WSL Windows",
              "Variables d'environnement essentielles",
              "Structure des répertoires OpenFOAM",
              "Commandes de navigation rapide",
              "Compilation avec wmake"
            ],
            keyPoints: [
              "$WM_PROJECT_DIR : répertoire d'installation OpenFOAM",
              "$WM_PROJECT_USER_DIR : répertoire utilisateur pour les cas personnels",
              "foam : raccourci vers $WM_PROJECT_DIR",
              "tut : raccourci vers les tutoriels"
            ],
            codeExample: `Variables d'environnement essentielles:
echo $WM_PROJECT_DIR        # /opt/openfoam9
echo $WM_PROJECT_USER_DIR   # $HOME/OpenFOAM/$USER-9

Commandes de navigation:
foam                          # Va dans $WM_PROJECT_DIR
tut                           # Va dans $FOAM_TUTORIALS
app                           # Va dans $FOAM_APP
src                           # Va dans $FOAM_SRC

Compilation:
wmake                         # Compile l'application courante
wclean                        # Nettoie la compilation`,
            tips: [
              "Ajoutez les alias foam, tut, app dans votre .bashrc pour gagner du temps"
            ],
            warnings: [
              "Toujours sourcer le fichier bashrc d'OpenFOAM avant de commencer"
            ]
          },
          {
            id: 3,
            title: "Anatomie d'un Cas OpenFOAM",
            duration: "2h",
            description: "Comprendre la structure obligatoire d'un cas et le rôle de chaque fichier.",
            content: [
              "Structure obligatoire : 0/, constant/, system/",
              "Dictionnaire controlDict (contrôle du calcul)",
              "Dictionnaire fvSchemes (schémas de discrétisation)",
              "Dictionnaire fvSolution (solveurs linéaires)",
              "Fichiers physiques : transportProperties, g",
              "Initialisation dans le répertoire 0/"
            ],
            keyPoints: [
              "0/ : Conditions initiales et aux limites",
              "constant/ : Propriétés physiques et maillage",
              "system/ : Paramètres de contrôle et schémas numériques"
            ],
            codeExample: `Structure d'un cas OpenFOAM:
cavity/
├── 0/                    # Conditions initiales
│   ├── U                 # Champ de vitesse
│   └── p                 # Champ de pression
├── constant/
│   ├── transportProperties   # Propriétés physiques
│   └── polyMesh/
│       ├── blockMeshDict     # Définition du maillage
│       ├── boundary          # Définition des frontières
│       ├── faces             # Connectivité des faces
│       ├── neighbour         # Voisinage des cellules
│       ├── owner             # Propriétaire des faces
│       └── points            # Coordonnées des points
└── system/
    ├── controlDict         # Contrôle du calcul
    ├── fvSchemes          # Schémas numériques
    └── fvSolution         # Solveurs linéaires`,
            tips: [
              "Utilisez foamListTimes pour voir les temps de calcul disponibles"
            ]
          },
          {
            id: 4,
            title: "Maillage avec blockMesh",
            duration: "1h30",
            description: "Création de maillages structurés multibloc avec l'outil blockMesh.",
            content: [
              "Principe du maillage structuré multibloc",
              "Définition des sommets (vertices)",
              "Définition des blocs (blocks)",
              "Définition des frontières (boundary)",
              "Syntaxe macro et calculs inline",
              "Types de patchs : wall, patch, symmetry, empty"
            ],
            keyPoints: [
              "blockMesh crée des maillages hexaédriques structurés",
              "empty est indispensable pour les simulations 2D",
              "Le grading permet de raffiner localement le maillage"
            ],
            codeExample: `Exemple de blockMeshDict - Cavité 2D:

vertices
(
    (0 0 0)      # 0
    (1 0 0)      # 1
    (1 1 0)      # 2
    (0 1 0)      # 3
    (0 0 0.1)    # 4
    (1 0 0.1)    # 5
    (1 1 0.1)    # 6
    (0 1 0.1)    # 7
);

blocks
(
    hex (0 1 2 3 4 5 6 7) (20 20 1) simpleGrading (1 1 1)
);

boundary
(
    movingWall
    {
        type wall;
        faces ((3 7 6 2));
    }
    fixedWalls
    {
        type wall;
        faces ((0 4 7 3) (1 5 4 0) (2 6 5 1));
    }
    frontAndBack
    {
        type empty;
        faces ((0 3 2 1) (4 5 6 7));
    }
);`,
            tips: [
              "Utilisez #calc pour faire des calculs inline dans blockMeshDict"
            ],
            warnings: [
              "L'ordre des sommets dans un bloc doit respecter la règle de la main droite"
            ]
          },
          {
            id: 5,
            title: "TP - Cavité Entraînée (Lid Driven Cavity)",
            duration: "3h",
            description: "Première simulation complète : écoulement incompressible laminaire dans une cavité carrée.",
            content: [
              "Cas test classique : écoulement incompressible laminaire (Re = 100)",
              "Géométrie : 1m × 1m, maillage 20×20×1",
              "Solveur : icoFoam (incompressible, laminaire, instationnaire)",
              "Conditions aux limites : movingWall, fixedWalls, empty",
              "Lancement et monitoring du calcul",
              "Post-traitement avec paraFoam"
            ],
            keyPoints: [
              "Re = 100 : régime laminaire avec un tourbillon principal",
              "icoFoam : solveur incompressible instationnaire",
              "Validation contre les données de Ghia et al. (1982)"
            ],
            codeExample: `Lancement du TP Cavité:

blockMesh | tee log.blockMesh
checkMesh | tee log.checkMesh
icoFoam | tee log.icoFoam

# Post-traitement
paraFoam

# Extraction des profils de vitesse
postProcess -func sampleDict -latestTime

# Analyse des résidus
foamLog log.icoFoam
gnuplot
> plot 'logs/p_0' using 1:2 with lines title 'Résidus pression'`,
            tips: [
              "Utilisez | tee log pour sauvegarder la sortie console"
            ],
            warnings: [
              "Vérifiez toujours le maillage avec checkMesh avant de lancer le calcul"
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Physique, Numérique et Validation",
        modules: [
          {
            id: 6,
            title: "Conditions aux Limites et Initialisation",
            duration: "2h",
            description: "Maîtrise des différents types de conditions aux limites et techniques d'initialisation.",
            content: [
              "Types mathématiques : Dirichlet, Neumann, Robin",
              "Conditions contraintes : empty, symmetry, cyclic, wedge",
              "Conditions complexes : inletOutlet, totalPressure, flowRateInletVelocity",
              "Initialisation non uniforme : setFields, funkySetFields",
              "Démarrage robuste avec potentialFoam"
            ],
            keyPoints: [
              "fixedValue = condition de Dirichlet (valeur imposée)",
              "zeroGradient = condition de Neumann (dérivée nulle)",
              "inletOutlet : sortie qui peut devenir entrée"
            ],
            codeExample: `Types de conditions aux limites:

# Dirichlet - valeur imposée
type fixedValue;
value uniform (1 0 0);

# Neumann - dérivée nulle
type zeroGradient;

# Condition mixte inletOutlet
type inletOutlet;
inletValue uniform (0 0 0);
value uniform (0 0 0);

# Pression totale
type totalPressure;
p0 uniform 0;
U U;
phi phi;
rho none;
psi none;
gamma 1;
value uniform 0;`,
            tips: [
              "potentialFoam calcule un champ initial potentiel pour démarrer plus vite"
            ]
          },
          {
            id: 7,
            title: "Schémas Numériques et Stabilité",
            duration: "2h30",
            description: "Comprendre et choisir les schémas numériques adaptés à chaque situation.",
            content: [
              "Discrétisation temporelle : Euler, backward, CrankNicolson",
              "Discrétisation spatiale : gradient, convection, laplacien",
              "Nombre de Courant (CFL) et stabilité",
              "Erreurs de continuité et contrôle",
              "Tolérances dans fvSolution"
            ],
            keyPoints: [
              "Co < 1 recommandé pour la stabilité",
              "backward : 2nd ordre en temps, implicite",
              "upwind : 1er ordre, diffusif mais stable",
              "linear : 2nd ordre, précis mais oscillant"
            ],
            codeExample: `Schémas numériques dans fvSchemes:

ddtSchemes
{
    default         backward;  # 2nd ordre implicite
}

gradSchemes
{
    default         Gauss linear;
    grad(p)         Gauss linear;
    grad(U)         cellLimited Gauss linear 1;  # Limité pour stabilité
}

divSchemes
{
    default         none;
    div(phi,U)      Gauss linearUpwind grad(U);  # Upwind avec gradient
    div(phi,k)      Gauss upwind;
    div(phi,omega)  Gauss upwind;
}

laplacianSchemes
{
    default         Gauss linear orthogonal;
}`,
            warnings: [
              "Un nombre de Courant élevé peut causer des divergences"
            ]
          },
          {
            id: 8,
            title: "Introduction à la Turbulence",
            duration: "1h30",
            description: "Premiers pas avec les modèles de turbulence RANS.",
            content: [
              "Modèles RANS : k-epsilon, k-omega SST, Spalart-Allmaras",
              "Configuration dans momentumTransport",
              "Conditions aux limites turbulentes",
              "Estimation des valeurs d'entrée",
              "Intensité turbulente et ratio de viscosité"
            ],
            keyPoints: [
              "k-omega SST : meilleur pour les couches limites",
              "k-epsilon : bon pour les écoulements libres",
              "Wall functions pour réduire le coût de calcul"
            ],
            codeExample: `momentumTransport (anciennement turbulenceProperties):

simulationType RAS;

RAS
{
    model           kOmegaSST;
    turbulence      on;
    printCoeffs     on;
}

# Conditions aux limites turbulentes
inlet
{
    type            turbulentIntensityKineticEnergyInlet;
    intensity       0.05;      # 5% d'intensité turbulente
    value           uniform 0.1;
}

wall
{
    type            kqRWallFunction;
    value           uniform 0.1;
}`,
            tips: [
              "Intensité turbulente typique : 1-5% pour écoulements internes"
            ]
          },
          {
            id: 9,
            title: "Post-traitement Avancé",
            duration: "2h",
            description: "Techniques avancées d'analyse et de visualisation des résultats.",
            content: [
              "ParaView/paraFoam : filtres essentiels",
              "Sampling avec sampleDict",
              "Quantités dérivées : vorticité, contraintes pariétales",
              "Coefficients aérodynamiques",
              "Gnuplot pour l'analyse des résidus"
            ],
            keyPoints: [
              "Slice : coupes 2D dans un domaine 3D",
              "Glyph : visualisation des vecteurs",
              "Stream Tracer : lignes de courant",
              "forceCoeffs : calcul de traînée et portance"
            ],
            codeExample: `Post-traitement OpenFOAM:

# Vorticité
postProcess -func vorticity

# Contraintes pariétales
postProcess -func wallShearStress

# Coefficients aérodynamiques
postProcess -func forceCoeffs

# y+ pour les simulations turbulentes
postProcess -func yPlus

# Sampling le long d'une ligne
cat > system/sampleDict << EOF
FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      sampleDict;
}

setFormat raw;
surfaces ();
sets
(
    lineX
    {
        type        uniform;
        axis        x;
        start       (0 0.5 0.05);
        end         (1 0.5 0.05);
        nPoints     100;
    }
);
fields (U p);
EOF

postProcess -func sampleDict`,
            tips: [
              "Utilisez foamLog pour extraire automatiquement les résidus des logs"
            ]
          },
          {
            id: 10,
            title: "Validation et Bonnes Pratiques",
            duration: "1h",
            description: "Méthodes de validation et bonnes pratiques pour des simulations fiables.",
            content: [
              "Vérification de la solution : indépendance maillage",
              "Sensibilité aux schémas numériques",
              "Analyse critique des résultats",
              "Comparaison avec données expérimentales",
              "Gestion des erreurs et débogage",
              "Sauvegarde et nettoyage"
            ],
            keyPoints: [
              "Toujours vérifier l'indépendance maillage",
              "Comparer avec des données de référence",
              "Analyser les résidus pour confirmer la convergence"
            ],
            codeExample: `Nettoyage et gestion des cas:

foamCleanTutorials    # Nettoie le cas (garde le setup)
foamListTimes -rm     # Supprime tous les résultats
foamListTimes -rm 5:  # Supprime les temps >= 5

# Vérification de la convergence
tail -f log.icoFoam   # Surveiller en temps réel
foamLog log.icoFoam   # Extrait les données

# Comparaison avec Ghia et al.
gnuplot
> plot 'postProcessing/sampleDict/50/lineX_U.xy' using 1:2 with lines title 'OpenFOAM', \\
       'ghia_data.txt' using 1:2 with points title 'Ghia et al.'`,
            warnings: [
              "Ne faites jamais confiance aveuglément à un résultat - validez toujours !"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "intermediate",
    name: "Niveau Intermédiaire",
    subtitle: "Maillage complexe, parallélisme et multiphysique",
    duration: "2 jours (14 heures)",
    targetAudience: [
      "Ingénieurs CFD avec expérience OpenFOAM",
      "Chercheurs nécessitant des simulations complexes",
      "Utilisateurs voulant passer à l'échelle industrielle"
    ],
    prerequisites: [
      "Avoir suivi la formation débutant ou équivalent",
      "Maîtrise de la structure d'un cas et de blockMesh",
      "Notions de turbulence et de couches limites"
    ],
    objectives: [
      "Mailler des géométries complexes avec snappyHexMesh",
      "Mettre en œuvre des calculs parallèles (MPI)",
      "Simuler des écoulements multiphasiques (Volume of Fluid)",
      "Configurer des simulations turbulentes avancées",
      "Automatiser les chaînes de calcul"
    ],
    days: [
      {
        dayNumber: 3,
        title: "Maillage Avancé et Calcul Parallèle",
        modules: [
          {
            id: 11,
            title: "Maillage Complexe avec snappyHexMesh",
            duration: "3h",
            description: "Maillage automatique de géométries complexes avec raffinement local et couches limites.",
            content: [
              "Principe du maillage automatique hexaédrique",
              "Workflow complet snappyHexMesh",
              "Import de géométries STL",
              "Raffinement local et régions de raffinement",
              "Snap et projection sur les surfaces",
              "Ajout de couches limites (addLayers)",
              "Vérification de qualité"
            ],
            keyPoints: [
              "snappyHexMesh part d'un maillage de fond (blockMesh)",
              "Trois étapes : castellatedMesh → snap → addLayers",
              "Qualité minimale : orthogonalité > 10, skewness < 4"
            ],
            codeExample: `Workflow snappyHexMesh:

# 1. Créer le maillage de fond
blockMesh

# 2. Extraire les features (arêtes vives)
surfaceFeatures

# 3. Lancer snappyHexMesh
snappyHexMesh -overwrite

# Extrait de snappyHexMeshDict:
castellatedMesh true;
snap            true;
addLayers       true;

geometry
{
    monObjet.stl
    {
        type triSurfaceMesh;
        name monObjet;
    }
};

refinementSurfaces
{
    monObjet
    {
        level (2 3);        # niveau de raffinement min/max
        patchInfo { type wall; }
    }
}

refinementRegions
{
    monObjet
    {
        mode distance;
        levels ((0.1 3) (0.2 2));  # raffinement par distance
    }
}

addLayersControls
{
    relativeSizes true;
    expansionRatio 1.2;
    finalLayerThickness 0.5;
    minThickness 0.1;
}`,
            tips: [
              "Commencez avec un maillage grossier pour valider le workflow"
            ],
            warnings: [
              "snappyHexMesh peut échouer silencieusement - vérifiez toujours avec checkMesh"
            ]
          },
          {
            id: 12,
            title: "Aérodynamique Externe",
            duration: "2h",
            description: "Simulation d'écoulements autour d'obstacles et calcul des coefficients aérodynamiques.",
            content: [
              "Écoulement autour d'obstacles : cylindre, profil, véhicule",
              "Calcul des coefficients : traînée (Cd), portance (Cl), moment (Cm)",
              "Maillage adapté : raffinement proche des parois",
              "Région de sillage",
              "Conditions entrée/sortie adaptées"
            ],
            keyPoints: [
              "Cd = Fx / (0.5 * rho * U² * A)",
              "Cl = Fy / (0.5 * rho * U² * A)",
              "Maillage fin dans la couche limite et le sillage"
            ],
            codeExample: `Configuration forceCoeffs:

# Dans system/controlDict
functions
{
    forceCoeffs
    {
        type            forceCoeffs;
        libs            ("libforces.so");
        writeControl    timeStep;
        writeInterval   1;
        log             true;
        
        patches         (cylinder);
        rho             rhoInf;
        rhoInf          1.225;
        CofR            (0 0 0);
        liftDir         (0 1 0);
        dragDir         (1 0 0);
        pitchAxis       (0 0 1);
        magUInf         1.0;
        lRef            1.0;
        Aref            1.0;
    }
}

# Conditions limites pour aérodynamique externe
inlet
{
    type            freestream;
    freestreamValue uniform (1 0 0);
}

outlet
{
    type            freestream;
    freestreamValue uniform (1 0 0);
}`,
            tips: [
              "Placez la frontière outlet suffisamment loin pour capturer le sillage"
            ]
          },
          {
            id: 13,
            title: "Calcul Parallèle (MPI)",
            duration: "2h",
            description: "Accélération des calculs par décomposition de domaine et parallélisation MPI.",
            content: [
              "Décomposition de domaine avec decomposePar",
              "Méthodes : scotch, simple, hierarchical",
              "Configuration de decomposeParDict",
              "Lancement parallèle avec mpirun",
              "Reconstruction avec reconstructPar",
              "Post-traitement parallèle"
            ],
            keyPoints: [
              "scotch : équilibrage automatique de charge",
              "simple : décomposition par direction",
              "hierarchical : décomposition hiérarchique"
            ],
            codeExample: `Décomposition et calcul parallèle:

# 1. Configurer decomposeParDict
cat > system/decomposeParDict << EOF
FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      decomposeParDict;
}

numberOfSubdomains 4;
method          scotch;
coeffs
{
    # Pour simple/hierarchical
    n           (2 2 1);
}
EOF

# 2. Décomposer le domaine
decomposePar

# 3. Lancer le calcul parallèle
mpirun -np 4 icoFoam -parallel | tee log.icoFoam

# 4. Reconstruire les résultats
reconstructPar

# 5. Nettoyer les dossiers processor*
cleanCase`,
            tips: [
              "Utilisez autant de cœurs que de sous-domaines pour optimiser les performances"
            ],
            warnings: [
              "Assurez-vous que le nombre de cellules est divisible par le nombre de processeurs"
            ]
          },
          {
            id: 14,
            title: "Automatisation et Scripts",
            duration: "2h",
            description: "Création de scripts pour automatiser les chaînes de calcul.",
            content: [
              "Création de scripts Allrun et Allclean",
              "Enchaînement maillage → solveur → post-traitement",
              "Paramétrisation avec variables d'environnement",
              "Boucles de calcul pour études paramétriques",
              "Gestion des cas multiples"
            ],
            keyPoints: [
              "Allrun : script principal de lancement",
              "Allclean : script de nettoyage",
              "Variables d'environnement pour la paramétrisation"
            ],
            codeExample: `#!/bin/bash
# Allrun - Script de lancement automatique

cd "\${0%/*}" || exit  # Run from this directory

# Nettoyage
./Allclean

# Maillage
blockMesh | tee log.blockMesh
checkMesh | tee log.checkMesh

# Conditions initiales
setFields | tee log.setFields  # si nécessaire

# Lancement du solveur
icoFoam | tee log.icoFoam

# Post-traitement
postProcess -func sampleDict
postProcess -func vorticity

# Extraction des résultats
foamLog log.icoFoam

echo "Calcul terminé !"

#!/bin/bash
# Allclean - Script de nettoyage

cd "\${0%/*}" || exit

# Nettoyage OpenFOAM
foamCleanTutorials

# Suppression des logs
rm -f log.*

# Suppression des dossiers processor
rm -rf processor*

# Suppression des résultats post-traitement
rm -rf postProcessing
rm -rf logs

echo "Nettoyage terminé !"`,
            tips: [
              "Utilisez des boucles pour faire des études paramétriques sur Re ou le maillage"
            ]
          },
          {
            id: 15,
            title: "TP - Écoulement autour d'un Cylindre",
            duration: "1h",
            description: "Simulation instationnaire et analyse de la rue de von Kármán.",
            content: [
              "Reynolds 200 : écoulement instationnaire",
              "Rue de von Kármán",
              "Analyse fréquentielle : nombre de Strouhal",
              "Comparaison avec données bibliographiques"
            ],
            keyPoints: [
              "St = f * D / U ≈ 0.2 pour un cylindre",
              "Nécessite un maillage fin et un pas de temps adapté"
            ],
            codeExample: `Analyse du nombre de Strouhal:

# Extraction de la portance en fonction du temps
# Dans controlDict, ajouter:
functions
{
    forces
    {
        type            forces;
        libs            ("libforces.so");
        writeControl    timeStep;
        writeInterval   1;
        patches         (cylinder);
        rho             rhoInf;
        rhoInf          1;
        CofR            (0 0 0);
    }
}

# Post-traitement avec Python
python3 << 'PYTHON'
import numpy as np
import matplotlib.pyplot as plt

# Chargement des données
data = np.loadtxt('postProcessing/forces/0/forces.dat')
t = data[:, 0]
lift = data[:, 3]  # Force de portance (y)

# FFT
fft = np.fft.fft(lift)
freqs = np.fft.fftfreq(len(t), t[1] - t[0])

# Fréquence principale
idx = np.argmax(np.abs(fft[1:len(fft)//2])) + 1
f = freqs[idx]
D = 1.0  # Diamètre
U = 1.0  # Vitesse
St = f * D / U

print(f"Fréquence: {f:.4f} Hz")
print(f"Nombre de Strouhal: {St:.4f}")
PYTHON`,
            tips: [
              "Le nombre de Strouhal théorique pour Re=200 est d'environ 0.19-0.20"
            ]
          }
        ]
      },
      {
        dayNumber: 4,
        title: "Multiphysique et Projet",
        modules: [
          {
            id: 16,
            title: "Écoulements Multiphasiques (VOF)",
            duration: "3h",
            description: "Simulation d'écoulements à interface libre avec la méthode Volume of Fluid.",
            content: [
              "Méthode Volume of Fluid : capture d'interface",
              "Solveur interFoam : 2 fluides incompressibles immiscibles",
              "Équation de transport de alpha.water",
              "Propriétés physiques : nu, rho, sigma",
              "Initialisation avec setFields",
              "Compression d'interface et stabilité"
            ],
            keyPoints: [
              "alpha = 0 : fluide 1 (air)",
              "alpha = 1 : fluide 2 (eau)",
              "alpha = 0.5 : interface",
              "cAlpha contrôle la compression d'interface"
            ],
            codeExample: `Configuration interFoam:

# constant/transportProperties
phases
(
    water
    {
        transportModel  Newtonian;
        nu              1e-06;
        rho             1000;
    }
    air
    {
        transportModel  Newtonian;
        nu              1.48e-05;
        rho             1;
    }
);

sigma           0.072;  # Tension superficielle

# system/controlDict
application     interFoam;

# system/fvSolution
solvers
{
    "alpha.water.*"
    {
        nAlphaCorr      2;
        nAlphaSubCycles 1;
        cAlpha          1;  # Compression d'interface (1-2)
    }
}

# Initialisation avec setFields
# system/setFieldsDict
defaultFieldValues
(
    volScalarFieldValue alpha.water 0
);

regions
(
    boxToCell
    {
        box (0 0 0) (0.5 1 0.1);
        fieldValues
        (
            volScalarFieldValue alpha.water 1
        );
    }
);`,
            tips: [
              "cAlpha = 1 : interface diffuse mais stable",
              "cAlpha = 2 : interface plus nette mais moins stable"
            ],
            warnings: [
              "Le pas de temps doit être très petit pour les écoulements multiphasiques (CFL << 1)"
            ]
          },
          {
            id: 17,
            title: "Cas Test - Dam Break 3D",
            duration: "2h",
            description: "Simulation complète d'une rupture de barrage avec obstacle.",
            content: [
              "Configuration : rupture de barrage avec obstacle",
              "Maillage : blockMesh + snappyHexMesh pour l'obstacle",
              "Post-traitement : visualisation de l'interface",
              "Intégrale du volume d'eau",
              "Validation avec données SPHERIC"
            ],
            keyPoints: [
              "Cas test classique pour la validation VOF",
              "Comparaison avec données expérimentales",
              "Analyse de la hauteur d'eau au cours du temps"
            ],
            codeExample: `Dam Break 3D avec obstacle:

# 1. Maillage
blockMesh
surfaceFeatures
snappyHexMesh -overwrite

# 2. Initialisation
cp -r 0.orig 0
setFields

# 3. Calcul
interFoam | tee log.interFoam

# 4. Post-traitement
# Visualisation de l'interface
paraFoam

# Extraction de la hauteur d'eau
postProcess -func sampleDict

# Calcul du volume d'eau
postProcess -func 'integrate(alpha.water)'`,
            tips: [
              "Comparez les résultats avec les données de validation SPHERIC"
            ]
          },
          {
            id: 18,
            title: "Écoulements Compressibles",
            duration: "2h",
            description: "Simulation d'écoulements compressibles avec prise en compte des effets thermiques.",
            content: [
              "Solveurs : rhoPimpleFoam, rhoSimpleFoam",
              "Modèles thermodynamiques : hePsiThermo, perfectGas",
              "Pression absolue vs relative",
              "Conditions limites thermiques",
              "Nombre de Mach et régimes d'écoulement"
            ],
            keyPoints: [
              "rhoPimpleFoam : compressible instationnaire",
              "rhoSimpleFoam : compressible stationnaire",
              "Thermo modèle défini dans thermophysicalProperties"
            ],
            codeExample: `Configuration écoulement compressible:

# constant/thermophysicalProperties
thermoType
{
    type            hePsiThermo;
    mixture         pureMixture;
    transport       sutherland;
    thermo          hConst;
    equationOfState perfectGas;
    specie          specie;
    energy          sensibleEnthalpy;
}

mixture
{
    specie
    {
        molWeight       28.96;
    }
    thermodynamics
    {
        Cp              1005;
        Hf              0;
    }
    transport
    {
        As              1.4792e-06;
        Ts              116;
    }
}

# system/controlDict
application     rhoPimpleFoam;

# Conditions limites
inlet
{
    type            totalPressure;
    p0              uniform 101325;
    U               U;
    phi             phi;
    rho             rho;
    psi             thermo:psi;
    gamma           1.4;
    value           uniform 101325;
}

wall
{
    type            zeroGradient;
}`,
            warnings: [
              "Attention aux unités : la pression doit être en Pa (absolu)"
            ]
          },
          {
            id: 19,
            title: "Turbulence Avancée et Wall Functions",
            duration: "2h",
            description: "Maîtrise avancée des modèles de turbulence et des conditions pariétales.",
            content: [
              "Résolution de la couche limite : y+ < 1 vs y+ > 30",
              "Calcul et interprétation de yPlus",
              "Stratégies de wall functions",
              "Transition laminaire-turbulent",
              "Modèles kOmegaSST avec correction de transition"
            ],
            keyPoints: [
              "Low-Re : y+ < 1, résolution complète de la BL",
              "Wall function : y+ > 30, modélisation de la BL",
              "Zone intermédiaire (1 < y+ < 30) à éviter"
            ],
            codeExample: `Analyse y+ et wall functions:

# Calcul du y+
postProcess -func yPlus

# Résultats dans postProcessing/yPlus/

# Configuration wall function
# 0/nut
wall
{
    type            nutkWallFunction;
    value           uniform 0;
}

# 0/k
wall
{
    type            kqRWallFunction;
    value           uniform 0.1;
}

# 0/omega
wall
{
    type            omegaWallFunction;
    value           uniform 100;
}

# Estimation de la première maille:
# delta_y = y+ * nu / (u_tau)
# u_tau = sqrt(tau_w / rho)
# Pour y+ = 30 et U = 10 m/s : delta_y ≈ 0.001-0.01 m

# Script Python de calcul:
import math
U = 10          # Vitesse [m/s]
L = 1           # Longueur de référence [m]
nu = 1.5e-5     # Viscosité cinématique [m²/s]
yplus_target = 30

Re = U * L / nu
Cf = 0.0592 * Re**(-0.2)
tau_w = 0.5 * Cf * U**2
u_tau = math.sqrt(tau_w)
delta_y = yplus_target * nu / u_tau

print(f"Première maille pour y+={yplus_target}: {delta_y:.6f} m")`,
            tips: [
              "Utilisez une calculatrice y+ en ligne pour estimer la première maille"
            ]
          },
          {
            id: 20,
            title: "Projet Final et Restitution",
            duration: "1h",
            description: "Mise en situation complète et synthèse des compétences acquises.",
            content: [
              "Cas industriel simplifié",
              "Démarche complète : maillage à validation",
              "Présentation des résultats",
              "Analyse critique",
              "Ressources communautaires"
            ],
            keyPoints: [
              "Intégration de toutes les compétences acquises",
              "Approche méthodologique structurée",
              "Autonomie et recherche de solutions"
            ],
            tips: [
              "CFD Online : forum très actif pour les questions OpenFOAM",
              "OpenFOAM Wiki : documentation communautaire",
              "GitHub : nombreux tutoriels et utilitaires"
            ]
          }
        ]
      }
    ]
  }
];
