import React from 'react';
import { Plus, Trash2, BookOpen, Info, FileText } from 'lucide-react';
import { Rule } from '../types';

type Props = {
  problemDescription: string;
  rules: Rule[];
  onAddRule: () => void;
  onUpdateRule: (id: string, field: 'from' | 'to', value: string) => void;
  onDeleteRule: (id: string) => void;
  problemHeight: number;
  onProblemDragStart: (startY: number) => void;
};

export function RulesEditor({
  problemDescription,
  rules,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
  problemHeight,
  onProblemDragStart,
}: Props) {
  return (
    <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col bg-zinc-950 lg:h-full min-h-0">
      <div className="px-3 py-3 lg:px-4 lg:py-3.5 border-b border-zinc-800 flex items-center bg-zinc-900/50 shrink-0">
        <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" /> 問題文
        </h3>
      </div>
      <div
        className="border-b border-zinc-800 overflow-y-auto shrink-0 bg-zinc-950"
        style={{ height: `${problemHeight}px` }}
      >
        <p className="text-zinc-100 text-sm leading-relaxed whitespace-pre-wrap p-3 lg:p-4">
          {problemDescription}
        </p>
      </div>

      <div
        className="h-3 bg-zinc-950 border-b border-zinc-800 cursor-row-resize flex items-center justify-center group shrink-0 touch-none"
        onMouseDown={(e) => { e.preventDefault(); onProblemDragStart(e.clientY); }}
        onTouchStart={(e) => { onProblemDragStart(e.touches[0].clientY); }}
      >
        <div className="w-12 h-1 bg-zinc-800 rounded-full group-hover:bg-indigo-500 transition-colors" />
      </div>

      <div className="px-3 py-3 lg:px-4 lg:py-3.5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 shrink-0">
        <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-zinc-400" /> ルール
        </h3>
        <button
          onClick={onAddRule}
          className="flex items-center gap-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-md transition-colors border border-zinc-700 hover:border-zinc-600"
        >
          <Plus className="w-3 h-3" /> ルール追加
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3 lg:p-4 space-y-3">
        {rules.length === 0 ? (
          <div className="text-center text-zinc-600 text-sm mt-10 flex flex-col items-center gap-2">
            <Info className="w-8 h-8 text-zinc-700" />
            ルールがありません。「ルール追加」をクリックして開始してください。
          </div>
        ) : (
          rules.map((rule, index) => (
            <div key={rule.id} className="flex items-center gap-2 lg:gap-3 group bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
              <div className="text-zinc-600 font-mono text-xs w-4 text-right hidden sm:block">{index + 1}</div>
              <input
                type="text"
                maxLength={1}
                value={rule.from}
                onChange={e => onUpdateRule(rule.id, 'from', e.target.value)}
                className="w-10 lg:w-12 h-10 bg-zinc-950 border border-zinc-800 rounded text-center font-mono text-base lg:text-lg text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-800"
                placeholder="A"
              />
              <div className="text-zinc-500 font-mono">→</div>
              <input
                type="text"
                value={rule.to}
                onChange={e => onUpdateRule(rule.id, 'to', e.target.value)}
                className="flex-1 h-10 bg-zinc-950 border border-zinc-800 rounded px-2 lg:px-3 font-mono text-base lg:text-lg text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-800 min-w-0"
                placeholder="XYZ"
              />
              <button
                onClick={() => onDeleteRule(rule.id)}
                className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-all shrink-0"
                title="ルールを削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
