export const tutorialCavity = {
  title: "Tutoriel Complet - Cavité Entraînée (Lid Driven Cavity)",
  objective: "Premier contact avec OpenFOAM : simulation d'un écoulement incompressible laminaire dans une cavité carrée avec paroi supérieure mobile.",
  validation: "Validation par comparaison avec les données de Ghia et al. (1982)",
  configuration: {
    domain: "Carré 1m × 1m × 0.1m (simulation 2D)",
    mesh: "20×20×1 cellules (maillage grossier pour TP rapide)",
    physics: "Re = 100 (U = 1 m/s, L = 1m, ν = 0.01 m²/s)",
    regime: "Laminaire, incompressible, isotherme"
  },
  steps: [
    {
      title: "Structure du cas",
      code: `mkdir -p $FOAM_RUN/cavity_tutorial
cd $FOAM_RUN/cavity_tutorial
mkdir -p 0 constant/polyMesh system`
    },
    {
      title: "Maillage (system/blockMeshDict)",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      blockMeshDict;
}

convertToMeters 1;

vertices
(
    (0 0 0)      // 0
    (1 0 0)      // 1
    (1 1 0)      // 2
    (0 1 0)      // 3
    (0 0 0.1)    // 4
    (1 0 0.1)    // 5
    (1 1 0.1)    // 6
    (0 1 0.1)    // 7
);

blocks
(
    hex (0 1 2 3 4 5 6 7) (20 20 1) simpleGrading (1 1 1)
);

edges
(
);

boundary
(
    movingWall
    {
        type wall;
        faces
        (
            (3 7 6 2)
        );
    }
    fixedWalls
    {
        type wall;
        faces
        (
            (0 4 7 3)
            (1 5 4 0)
            (2 6 5 1)
        );
    }
    frontAndBack
    {
        type empty;
        faces
        (
            (0 3 2 1)
            (4 5 6 7)
        );
    }
);

mergePatchPairs
(
);

// end of file`
    },
    {
      title: "Conditions initiales - 0/U (Vitesse)",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       volVectorField;
    object      U;
}

dimensions      [0 1 -1 0 0 0 0];

internalField   uniform (0 0 0);

boundaryField
{
    movingWall
    {
        type            fixedValue;
        value           uniform (1 0 0);
    }
    fixedWalls
    {
        type            fixedValue;
        value           uniform (0 0 0);
    }
    frontAndBack
    {
        type            empty;
    }
}

// end of file`
    },
    {
      title: "Conditions initiales - 0/p (Pression)",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       volScalarField;
    object      p;
}

dimensions      [0 2 -2 0 0 0 0];

internalField   uniform 0;

boundaryField
{
    movingWall
    {
        type            zeroGradient;
    }
    fixedWalls
    {
        type            zeroGradient;
    }
    frontAndBack
    {
        type            empty;
    }
}

// end of file`
    },
    {
      title: "Propriétés physiques - constant/transportProperties",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      transportProperties;
}

transportModel  Newtonian;

nu              [0 2 -1 0 0 0 0] 0.01;

// end of file`
    },
    {
      title: "Contrôle du calcul - system/controlDict",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      controlDict;
}

application     icoFoam;

startFrom       startTime;

startTime       0;

stopAt          endTime;

endTime         50;

deltaT          0.01;

writeControl    runTime;

writeInterval   1;

purgeWrite      0;

writeFormat     ascii;

writePrecision  6;

writeCompression off;

timeFormat      general;

timePrecision   6;

runTimeModifiable yes;

// end of file`
    },
    {
      title: "Schémas numériques - system/fvSchemes",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      fvSchemes;
}

ddtSchemes
{
    default         backward;
}

gradSchemes
{
    default         Gauss linear;
    grad(p)         Gauss linear;
}

divSchemes
{
    default         none;
    div(phi,U)      Gauss linear;
}

laplacianSchemes
{
    default         Gauss linear orthogonal;
}

interpolationSchemes
{
    default         linear;
}

snGradSchemes
{
    default         orthogonal;
}

// end of file`
    },
    {
      title: "Solveurs - system/fvSolution",
      code: `FoamFile
{
    version     2.0;
    format      ascii;
    class       dictionary;
    object      fvSolution;
}

solvers
{
    p
    {
        solver          PCG;
        preconditioner  DIC;
        tolerance       1e-06;
        relTol          0;
    }
    U
    {
        solver          smoothSolver;
        smoother        symGaussSeidel;
        tolerance       1e-08;
        relTol          0;
    }
}

PISO
{
    nCorrectors     2;
    nNonOrthogonalCorrectors 1;
}

// end of file`
    },
    {
      title: "Exécution",
      code: `blockMesh | tee log.blockMesh
checkMesh | tee log.checkMesh
icoFoam | tee log.icoFoam
paraFoam`
    },
    {
      title: "Post-traitement et Validation",
      code: `postProcess -func sampleDict -latestTime
foamLog log.icoFoam

# gnuplot pour visualiser les résidus
set terminal png
set output 'residuals.png'
set title 'Résidus de convergence'
set xlabel 'Itération'
set ylabel 'Résidu'
set logscale y
plot 'logs/p_0' using 1:2 with lines title 'Pression'`
    }
  ],
  extensions: [
    {
      title: "Re = 1000",
      description: "Modifier ν = 0.001, observer l'apparition des tourbillons secondaires dans les coins"
    },
    {
      title: "Maillage 120×120",
      description: "Étudier l'indépendance maillage et comparer avec les données de Ghia"
    },
    {
      title: "Schémas de convection",
      description: "Remplacer Gauss linear par Gauss upwind pour div(phi,U), observer la diffusion numérique"
    }
  ]
};
