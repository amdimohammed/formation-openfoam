import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  filename?: string;
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for OpenFOAM/C++
  const highlightCode = (text: string) => {
    return text
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/\b( FoamFile|version|format|class|object|dimensions|internalField|boundaryField|type|value|default|application|startFrom|startTime|stopAt|endTime|deltaT|writeControl|writeInterval|solver|preconditioner|tolerance|relTol)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?\b/g, '<span class="number">$0</span>')
      .replace(/\b(hex|vertices|blocks|edges|boundary|mergePatchPairs)\b/g, '<span class="function">$1</span>');
  };

  return (
    <div className="code-block my-4 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-sm text-slate-300 font-mono">{filename}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code 
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          className="text-slate-300"
        />
      </pre>
    </div>
  );
}
