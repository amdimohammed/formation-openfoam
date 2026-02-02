import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Lightbulb, AlertTriangle, Terminal } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import type { Module } from '../data/trainingData';

interface ModuleCardProps {
  module: Module;
  isActive?: boolean;
}

export function ModuleCard({ module, isActive = false }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div 
      className={`module-card bg-white rounded-lg shadow-md overflow-hidden ${
        isExpanded ? 'ring-2 ring-[#FF6B35]' : ''
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#003366] text-white font-bold text-sm">
            M{module.id}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-[#003366]">{module.title}</h3>
            <p className="text-sm text-slate-500">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Clock size={16} />
            <span>{module.duration}</span>
          </div>
          {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
          {/* Content */}
          <div className="mt-4">
            <h4 className="font-semibold text-slate-700 mb-2">Contenu du module</h4>
            <ul className="space-y-1">
              {module.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600">
                  <span className="text-[#FF6B35] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Points */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#003366]">
            <h4 className="font-semibold text-[#003366] mb-2">Points clés à retenir</h4>
            <ul className="space-y-1">
              {module.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                  <span className="text-[#003366] mt-0.5">★</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Example */}
          {module.codeExample && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={18} className="text-[#48BB78]" />
                <h4 className="font-semibold text-slate-700">Exemple de code</h4>
              </div>
              <CodeBlock code={module.codeExample} />
            </div>
          )}

          {/* Tips */}
          {module.tips && module.tips.length > 0 && (
            <div className="mt-4 tip-box p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={18} className="text-[#38A169]" />
                <h4 className="font-semibold text-[#38A169]">Astuces</h4>
              </div>
              <ul className="space-y-1">
                {module.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#38A169]">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {module.warnings && module.warnings.length > 0 && (
            <div className="mt-4 warning-box p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-[#E53E3E]" />
                <h4 className="font-semibold text-[#E53E3E]">Attention</h4>
              </div>
              <ul className="space-y-1">
                {module.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#E53E3E]">!</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
