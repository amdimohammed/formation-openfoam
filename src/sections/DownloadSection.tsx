import { Download, FileText, GraduationCap, Clock, Users, Target, CheckCircle } from 'lucide-react';
import { trainingLevels } from '../data/trainingData';

export function DownloadSection() {
  return (
    <section id="downloads" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003366]/10 text-[#003366] rounded-full text-sm font-semibold mb-4">
            <FileText size={18} />
            <span>Fiches Descriptives</span>
          </div>
          <h2 className="text-4xl font-bold text-[#003366] mb-4">Programmes de Formation</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Téléchargez les fiches descriptives complètes pour chaque niveau de formation.
            Ces documents sont prêts à être intégrés dans vos supports commerciaux.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {trainingLevels.map((level) => {
            const isBeginner = level.id === 'beginner';
            return (
              <div 
                key={level.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  isBeginner ? 'border-t-4 border-[#38A169]' : 'border-t-4 border-[#FF6B35]'
                }`}
              >
                {/* Header */}
                <div className={`px-6 py-4 ${isBeginner ? 'bg-[#38A169]/10' : 'bg-[#FF6B35]/10'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isBeginner ? 'bg-[#38A169] text-white' : 'bg-[#FF6B35] text-white'
                    }`}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003366]">{level.name}</h3>
                      <p className="text-sm text-slate-600">{level.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Quick Info */}
                  <div className="flex gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={16} />
                      <span>{level.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Users size={16} />
                      <span>{level.days.reduce((acc, d) => acc + d.modules.length, 0)} modules</span>
                    </div>
                  </div>

                  {/* Objectives Preview */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={16} className="text-[#003366]" />
                      <span className="font-semibold text-slate-700">Objectifs clés</span>
                    </div>
                    <ul className="space-y-2">
                      {level.objectives.slice(0, 4).map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle size={14} className="text-[#38A169] mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Program Preview */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-[#003366]" />
                      <span className="font-semibold text-slate-700">Programme</span>
                    </div>
                    <div className="space-y-2">
                      {level.days.map((day, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-medium text-slate-700">Jour {day.dayNumber}:</span>
                          <span className="text-slate-500 ml-2">{day.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => {
                      // Generate and download the content as text file
                      const content = generateFicheContent(level);
                      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Fiche_Formation_OpenFOAM_${level.id}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      isBeginner 
                        ? 'bg-[#38A169] hover:bg-[#2F855A] text-white' 
                        : 'bg-[#FF6B35] hover:bg-[#E55A2B] text-white'
                    }`}
                  >
                    <Download size={18} />
                    Télécharger la fiche
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Les fiches sont au format texte et peuvent être facilement converties en PDF ou intégrées dans vos documents.
          </p>
        </div>
      </div>
    </section>
  );
}

function generateFicheContent(level: typeof trainingLevels[0]): string {
  return `================================================================================
                    FORMATION OPENFOAM - ${level.name.toUpperCase()}
================================================================================

${level.subtitle}

DURÉE : ${level.duration}
FORMAT : Présentiel ou distanciel

--------------------------------------------------------------------------------
OBJECTIFS PÉDAGOGIQUES
--------------------------------------------------------------------------------

À l'issue de cette formation, les participants seront capables de :

${level.objectives.map(obj => `• ${obj}`).join('\n')}

--------------------------------------------------------------------------------
PUBLIC CONCERNÉ
--------------------------------------------------------------------------------

${level.targetAudience.map(audience => `• ${audience}`).join('\n')}

--------------------------------------------------------------------------------
PRÉREQUIS
--------------------------------------------------------------------------------

${level.prerequisites.map(prereq => `• ${prereq}`).join('\n')}

--------------------------------------------------------------------------------
PROGRAMME DÉTAILLÉ
--------------------------------------------------------------------------------

${level.days.map(day => `
JOUR ${day.dayNumber} : ${day.title.toUpperCase()}
${day.modules.map(mod => `
  Module ${mod.id} : ${mod.title} (${mod.duration})
  ${mod.description}
  
  Contenu :
  ${mod.content.map(c => `  - ${c}`).join('\n')}
`).join('\n')}
`).join('\n')}

--------------------------------------------------------------------------------
MÉTHODOLOGIE
--------------------------------------------------------------------------------

Approche "Learning by doing" : 60% de travaux pratiques sur des cas industriels 
simplifiés. Alternance apports théoriques et manipulation. Support numérique fourni.

--------------------------------------------------------------------------------
ÉQUIPEMENT
--------------------------------------------------------------------------------

• PC Linux ou Windows avec WSL
• OpenFOAM v9 ou v10 préinstallé
• ParaView pour le post-traitement

--------------------------------------------------------------------------------
CONTACT
--------------------------------------------------------------------------------

Pour plus d'informations ou inscription :
Email : formation@openfoam.fr
Téléphone : +33 (0)1 23 45 67 89

================================================================================
Document généré le ${new Date().toLocaleDateString('fr-FR')}
================================================================================
`;
}
