import React from 'react';
import { Terminal, HelpCircle, ChevronRight } from 'lucide-react';
import { LEVELS } from '../constants';

type Props = {
  currentLevelId: number;
  isOpen: boolean;
  onSelectLevel: (id: number) => void;
  onClose: () => void;
  onOpenExplanation: () => void;
};

export function Sidebar({ currentLevelId, isOpen, onSelectLevel, onClose, onOpenExplanation }: Props) {
  const sections = Array.from(new Set(LEVELS.map(l => l.section)));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 h-screen border-r border-zinc-800 flex flex-col bg-zinc-950/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            タグシステム
          </h1>
          <button
            onClick={onOpenExplanation}
            className="text-zinc-400 hover:text-indigo-400 transition-colors"
            title="タグシステムとは？"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {sections.map(section => (
            <div key={section} className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">{section}</h3>
              {LEVELS.filter(l => l.section === section).map(level => (
                <button
                  key={level.id}
                  onClick={() => onSelectLevel(level.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group ${
                    currentLevelId === level.id
                      ? 'bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20'
                      : 'hover:bg-zinc-900 text-zinc-400 border border-transparent'
                  }`}
                >
                  <span className="truncate pr-2">{level.id}. {level.title}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${currentLevelId === level.id ? 'translate-x-1 text-indigo-400' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
