import { useState } from 'react';
import { ChevronRight, Target, Users, CheckCircle, Clock, BookOpen, GraduationCap } from 'lucide-react';
import { ModuleCard } from '../components/ModuleCard';
import type { Level } from '../data/trainingData';

interface LevelSectionProps {
  level: Level;
  isReversed?: boolean;
}

export function LevelSection({ level, isReversed = false }: LevelSectionProps) {
  const [showModules, setShowModules] = useState(false);
  const isBeginner = level.id === 'beginner';

  return (
    <section id={level.id} className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row gap-12 items-start ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Info Card */}
          <div className="lg:w-1/3">
            <div className={`sticky top-8 bg-white rounded-xl shadow-lg overflow-hidden ${isBeginner ? 'border-t-4 border-[#38A169]' : 'border-t-4 border-[#FF6B35]'}`}>
              {/* Badge */}
              <div className={`px-6 py-3 ${isBeginner ? 'bg-[#38A169]' : 'bg-[#FF6B35]'} text-white`}>
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  <span className="font-semibold">{isBeginner ? 'Niveau 1' : 'Niveau 2'}</span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#003366] mb-2">{level.name}</h2>
                <p className="text-slate-600 mb-4">{level.subtitle}</p>
                
                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <Clock size={18} />
                  <span>{level.duration}</span>
                </div>

                {/* Objectives */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={18} className="text-[#003366]" />
                    <h3 className="font-semibold text-slate-700">Objectifs</h3>
                  </div>
                  <ul className="space-y-2">
                    {level.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-[#38A169] mt-0.5 flex-shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-[#003366]" />
                    <h3 className="font-semibold text-slate-700">Public concerné</h3>
                  </div>
                  <ul className="space-y-1">
                    {level.targetAudience.map((audience, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {audience}</li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={18} className="text-[#003366]" />
                    <h3 className="font-semibold text-slate-700">Prérequis</h3>
                  </div>
                  <ul className="space-y-1">
                    {level.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-sm text-slate-600">• {prereq}</li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowModules(!showModules)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isBeginner 
                      ? 'bg-[#38A169] hover:bg-[#2F855A] text-white' 
                      : 'bg-[#FF6B35] hover:bg-[#E55A2B] text-white'
                  }`}
                >
                  {showModules ? 'Masquer les modules' : 'Voir les modules'}
                  <ChevronRight size={18} className={`transform transition-transform ${showModules ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="lg:w-2/3">
            {showModules ? (
              <div className="space-y-6">
                {level.days.map((day) => (
                  <div key={day.dayNumber} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">
                        J{day.dayNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#003366]">Jour {day.dayNumber}</h3>
                        <p className="text-sm text-slate-500">{day.title}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {day.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <BookOpen size={40} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  Programme détaillé
                </h3>
                <p className="text-slate-500 mb-6">
                  Cliquez sur "Voir les modules" pour découvrir le contenu complet de cette formation,
                  incluant les exercices pratiques et exemples de code.
                </p>
                <div className="flex justify-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {level.days.length} jours
                  </span>
                  <span>•</span>
                  <span>{level.days.reduce((acc, day) => acc + day.modules.length, 0)} modules</span>
                  <span>•</span>
                  <span>Exercices pratiques</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
