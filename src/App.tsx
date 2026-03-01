import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { useResizablePanel } from './hooks/useResizablePanel';
import { Sidebar } from './components/Sidebar';
import { RulesEditor } from './components/RulesEditor';
import { TestPanel } from './components/TestPanel';
import { ExplanationModal } from './components/ExplanationModal';

export default function App() {
  const {
    currentLevelId,
    setCurrentLevelId,
    currentLevel,
    currentRules,
    results,
    activeTestCase,
    setActiveTestCase,
    allPassed,
    addRule,
    updateRule,
    deleteRule,
    runAll,
  } = useGameState();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const { height: testCasesHeight, handleDragStart } = useResizablePanel(250);

  const handleSelectLevel = (id: number) => {
    setCurrentLevelId(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex font-sans selection:bg-indigo-500/30 lg:overflow-hidden">
      <Sidebar
        currentLevelId={currentLevelId}
        isOpen={isSidebarOpen}
        onSelectLevel={handleSelectLevel}
        onClose={() => setIsSidebarOpen(false)}
        onOpenExplanation={() => setIsExplanationOpen(true)}
      />

      <div className="flex-1 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden w-full">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-zinc-800 bg-zinc-900/30 shrink-0">
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
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 lg:p-4 flex flex-col items-center min-w-25 lg:min-w-30 shadow-sm self-start">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">パラメータ</span>
              <span className="text-3xl lg:text-4xl font-mono text-indigo-400">m={currentLevel.m}</span>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
          <RulesEditor
            rules={currentRules}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
          />
          <TestPanel
            testCases={currentLevel.testCases}
            results={results}
            activeTestCase={activeTestCase}
            onSelectTestCase={setActiveTestCase}
            allPassed={allPassed}
            onRunAll={runAll}
            panelHeight={testCasesHeight}
            onDragStart={handleDragStart}
          />
        </div>
      </div>

      <ExplanationModal isOpen={isExplanationOpen} onClose={() => setIsExplanationOpen(false)} />
    </div>
  );
}
