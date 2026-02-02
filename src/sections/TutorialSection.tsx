import { useState } from 'react';
import { ChevronDown, ChevronUp, Play, CheckCircle, ArrowRight, Beaker, FileCode, Terminal } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { tutorialCavity } from '../data/tutorialData';

export function TutorialSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [expandedExtension, setExpandedExtension] = useState<number | null>(null);

  return (
    <section id="tutorial" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-sm font-semibold mb-4">
            <Beaker size={18} />
            <span>Tutoriel Complet</span>
          </div>
          <h2 className="text-4xl font-bold text-[#003366] mb-4">{tutorialCavity.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{tutorialCavity.objective}</p>
          <p className="text-sm text-slate-500 mt-2">{tutorialCavity.validation}</p>
        </div>

        {/* Configuration */}
        <div className="bg-slate-50 rounded-xl p-6 mb-12">
          <h3 className="font-semibold text-[#003366] mb-4 flex items-center gap-2">
            <FileCode size={20} />
            Configuration de la simulation
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Domaine</div>
              <div className="font-medium text-slate-700">{tutorialCavity.configuration.domain}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Maillage</div>
              <div className="font-medium text-slate-700">{tutorialCavity.configuration.mesh}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Physique</div>
              <div className="font-medium text-slate-700">{tutorialCavity.configuration.physics}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Régime</div>
              <div className="font-medium text-slate-700">{tutorialCavity.configuration.regime}</div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          <h3 className="font-semibold text-[#003366] mb-4 flex items-center gap-2">
            <Terminal size={20} />
            Étapes de réalisation
          </h3>
          {tutorialCavity.steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedStep === idx ? 'border-[#FF6B35] ring-1 ring-[#FF6B35]' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    expandedStep === idx ? 'bg-[#FF6B35] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="font-medium text-slate-700">{step.title}</span>
                </div>
                {expandedStep === idx ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {expandedStep === idx && (
                <div className="p-6 bg-white">
                  <CodeBlock code={step.code} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Execution Summary */}
        <div className="bg-[#003366] rounded-xl p-6 mb-12 text-white">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Play size={20} className="text-[#FF6B35]" />
            Résumé des commandes
          </h3>
          <div className="terminal p-4 rounded-lg font-mono text-sm">
            <div className="terminal-prompt text-[#48BB78]">blockMesh | tee log.blockMesh</div>
            <div className="terminal-prompt text-[#48BB78]">checkMesh | tee log.checkMesh</div>
            <div className="terminal-prompt text-[#48BB78]">icoFoam | tee log.icoFoam</div>
            <div className="terminal-prompt text-[#48BB78]">paraFoam</div>
          </div>
        </div>

        {/* Extensions */}
        <div className="bg-gradient-to-r from-[#38A169]/10 to-[#38A169]/5 rounded-xl p-6">
          <h3 className="font-semibold text-[#38A169] mb-4 flex items-center gap-2">
            <ArrowRight size={20} />
            Extensions possibles
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {tutorialCavity.extensions.map((ext, idx) => (
              <div 
                key={idx}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpandedExtension(expandedExtension === idx ? null : idx)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={18} className="text-[#38A169]" />
                  <span className="font-medium text-slate-700">{ext.title}</span>
                </div>
                <p className="text-sm text-slate-500">{ext.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
