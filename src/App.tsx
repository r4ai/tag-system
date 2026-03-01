import React, { useState, useEffect } from 'react';
import { Play, Plus, Trash2, CheckCircle2, XCircle, ChevronRight, BookOpen, Terminal, Info, Menu, HelpCircle } from 'lucide-react';
import { LEVELS } from './constants';
import { Rule, TestCaseResult } from './types';
import { simulateTagSystem } from './utils/tagSystem';
import { ExplanationModal } from './components/ExplanationModal';

export default function App() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [rulesByLevel, setRulesByLevel] = useState<Record<number, Rule[]>>({});
  const [results, setResults] = useState<Record<number, TestCaseResult>>({});
  const [activeTestCase, setActiveTestCase] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [testCasesHeight, setTestCasesHeight] = useState(250);

  const handleDragStart = (startY: number) => {
    const startHeight = testCasesHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      setTestCasesHeight(Math.max(100, startHeight + deltaY));
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaY = moveEvent.touches[0].clientY - startY;
      setTestCasesHeight(Math.max(100, startHeight + deltaY));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  };
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedRules = localStorage.getItem('tagSystemRules');
    if (savedRules) {
      try {
        setRulesByLevel(JSON.parse(savedRules));
      } catch (e) {
        console.error("Failed to parse saved rules", e);
      }
    }
  }, []);

  // Save to localStorage when rules change
  useEffect(() => {
    if (Object.keys(rulesByLevel).length > 0) {
      localStorage.setItem('tagSystemRules', JSON.stringify(rulesByLevel));
    }
  }, [rulesByLevel]);

  const currentLevel = LEVELS.find(l => l.id === currentLevelId)!;
  const currentRules = rulesByLevel[currentLevelId] || [];

  useEffect(() => {
    setResults({});
    setActiveTestCase(0);
  }, [currentRules, currentLevelId]);

  const updateRules = (newRules: Rule[]) => {
    setRulesByLevel(prev => ({ ...prev, [currentLevelId]: newRules }));
  };

  const addRule = () => {
    updateRules([...currentRules, { id: Math.random().toString(), from: '', to: '' }]);
  };

  const updateRule = (id: string, field: 'from' | 'to', value: string) => {
    updateRules(currentRules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const deleteRule = (id: string) => {
    updateRules(currentRules.filter(r => r.id !== id));
  };

  const runAll = () => {
    const newResults: Record<number, TestCaseResult> = {};
    const rulesMap: Record<string, string> = {};
    
    for (const r of currentRules) {
      if (r.from.length === 1 && !(r.from in rulesMap)) {
        rulesMap[r.from] = r.to;
      }
    }

    currentLevel.testCases.forEach((tc, index) => {
      const sim = simulateTagSystem(tc.input, rulesMap, currentLevel.m);
      newResults[index] = {
        status: sim.finalStr === tc.target ? 'pass' : 'fail',
        history: sim.history,
        finalStr: sim.finalStr,
        reason: sim.reason
      };
    });

    setResults(newResults);
    setActiveTestCase(0);
  };

  const allPassed = currentLevel.testCases.length > 0 && currentLevel.testCases.every((_, i) => results[i]?.status === 'pass');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex font-sans selection:bg-indigo-500/30 lg:overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 h-screen border-r border-zinc-800 flex flex-col bg-zinc-950/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            タグシステム
          </h1>
          <button onClick={() => setIsExplanationOpen(true)} className="text-zinc-400 hover:text-indigo-400 transition-colors" title="タグシステムとは？">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {Array.from(new Set(LEVELS.map(l => l.section))).map(section => (
            <div key={section} className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">{section}</h3>
              {LEVELS.filter(l => l.section === section).map(level => (
                <button
                  key={level.id}
                  onClick={() => {
                    setCurrentLevelId(level.id);
                    setIsSidebarOpen(false);
                  }}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden w-full">
        {/* Header Info */}
        <div className="p-4 lg:p-6 border-b border-zinc-800 bg-zinc-900/30 flex-shrink-0">
          <div className="flex items-center gap-4 mb-3 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-400 hover:text-zinc-100">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-zinc-100 truncate">{currentLevel.title}</h2>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2 hidden lg:block">{currentLevel.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{currentLevel.description}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 lg:p-4 flex flex-col items-center min-w-[100px] lg:min-w-[120px] shadow-sm self-start">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">パラメータ</span>
              <span className="text-3xl lg:text-4xl font-mono text-indigo-400">m={currentLevel.m}</span>
            </div>
          </div>
        </div>

        {/* Workspace - Stack on mobile, side-by-side on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
          {/* Rules Editor */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col bg-zinc-950 lg:h-full">
            <div className="p-3 lg:p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-zinc-400" /> ルール
              </h3>
              <button 
                onClick={addRule}
                className="flex items-center gap-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-md transition-colors border border-zinc-700 hover:border-zinc-600"
              >
                <Plus className="w-3 h-3" /> ルール追加
              </button>
            </div>
            <div className="flex-1 lg:overflow-y-auto p-3 lg:p-4 space-y-3">
              {currentRules.length === 0 ? (
                <div className="text-center text-zinc-600 text-sm mt-10 flex flex-col items-center gap-2">
                  <Info className="w-8 h-8 text-zinc-700" />
                  ルールがありません。「ルール追加」をクリックして開始してください。
                </div>
              ) : (
                currentRules.map((rule, index) => (
                  <div key={rule.id} className="flex items-center gap-2 lg:gap-3 group bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                    <div className="text-zinc-600 font-mono text-xs w-4 text-right hidden sm:block">{index + 1}</div>
                    <input
                      type="text"
                      maxLength={1}
                      value={rule.from}
                      onChange={e => updateRule(rule.id, 'from', e.target.value)}
                      className="w-10 lg:w-12 h-10 bg-zinc-950 border border-zinc-800 rounded text-center font-mono text-base lg:text-lg text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-800"
                      placeholder="A"
                    />
                    <div className="text-zinc-500 font-mono">→</div>
                    <input
                      type="text"
                      value={rule.to}
                      onChange={e => updateRule(rule.id, 'to', e.target.value)}
                      className="flex-1 h-10 bg-zinc-950 border border-zinc-800 rounded px-2 lg:px-3 font-mono text-base lg:text-lg text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-800 min-w-0"
                      placeholder="XYZ"
                    />
                    <button 
                      onClick={() => deleteRule(rule.id)}
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

          {/* Execution & Tests */}
          <div className="w-full lg:w-1/2 flex flex-col bg-zinc-950 lg:h-full">
            <div className="p-3 lg:p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 shrink-0">
              <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                <Play className="w-4 h-4 text-zinc-400" /> テストケース
              </h3>
              <div className="flex items-center gap-3">
                {allPassed && (
                  <span className="text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded animate-pulse">
                    <CheckCircle2 className="w-4 h-4" /> クリア
                  </span>
                )}
                <button 
                  onClick={runAll}
                  className="flex items-center gap-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md transition-colors shadow-lg shadow-indigo-900/20"
                >
                  <Play className="w-4 h-4 fill-current" /> 実行
                </button>
              </div>
            </div>
            
            {/* Test Cases List */}
            <div 
              className="border-b border-zinc-800 flex flex-col bg-zinc-950 overflow-y-auto shrink-0"
              style={{ height: `${testCasesHeight}px` }}
            >
              <div className="p-3 lg:p-4 flex flex-col gap-2">
                {currentLevel.testCases.map((tc, index) => {
                  const res = results[index];
                  const isActive = activeTestCase === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveTestCase(index)}
                      className={`flex items-center justify-between p-2 lg:p-3 rounded-lg border text-left transition-all w-full shrink-0 ${
                        isActive 
                          ? 'bg-zinc-900 border-zinc-700 shadow-md' 
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 overflow-hidden">
                        <div className="font-mono text-xs lg:text-sm truncate flex-1">
                          <span className="text-zinc-500">入力:</span> <span className="text-zinc-200">{tc.input}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0 hidden sm:block" />
                        <div className="font-mono text-xs lg:text-sm truncate flex-1">
                          <span className="text-zinc-500">目標:</span> <span className="text-indigo-400">{tc.target}</span>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2 lg:ml-4">
                        {!res || res.status === 'idle' ? (
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-zinc-700" />
                        ) : res.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resizer */}
            <div 
              className="h-3 bg-zinc-950 border-b border-zinc-800 cursor-row-resize flex items-center justify-center group shrink-0 touch-none"
              onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientY); }}
              onTouchStart={(e) => { handleDragStart(e.touches[0].clientY); }}
            >
              <div className="w-12 h-1 bg-zinc-800 rounded-full group-hover:bg-indigo-500 transition-colors" />
            </div>

            {/* Visualizer */}
            <div className="flex-1 lg:overflow-y-auto p-3 lg:p-4 bg-[#0a0a0a] min-h-[300px] lg:min-h-0">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 lg:mb-4 flex items-center gap-2">
                実行トレース
              </h4>
              {results[activeTestCase] ? (
                <div className="font-mono text-xs lg:text-sm flex flex-col gap-1.5">
                  {results[activeTestCase].history?.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 lg:gap-3">
                      <span className="text-zinc-600 w-5 lg:w-6 text-right select-none">{i + 1}.</span>
                      <div className="break-all">
                        <span className="text-red-500/80 line-through decoration-red-500/50">{step.deleted}</span>
                        <span className="text-zinc-300">{step.remaining}</span>
                        <span className="text-emerald-400">{step.appended}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 lg:gap-3 mt-2 pt-2 border-t border-zinc-800/50">
                    <span className="text-zinc-600 w-5 lg:w-6 text-right select-none"></span>
                    <div className="break-all flex flex-col gap-1">
                      <span className={`font-bold ${results[activeTestCase].status === 'pass' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                        {results[activeTestCase].finalStr || 'ε (空)'}
                      </span>
                      <span className="text-[10px] lg:text-xs text-zinc-500">{results[activeTestCase].reason}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-zinc-600 text-xs lg:text-sm italic flex flex-col items-center justify-center h-full gap-2 mt-6 lg:mt-10">
                  <Play className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-800" />
                  「実行」をクリックするとトレースが表示されます。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ExplanationModal isOpen={isExplanationOpen} onClose={() => setIsExplanationOpen(false)} />
    </div>
  );
}
