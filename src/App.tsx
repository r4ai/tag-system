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
  const { height: problemHeight, handleDragStart: handleProblemDragStart } = useResizablePanel(200);

  const handleSelectLevel = (id: number) => {
    setCurrentLevelId(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-300 flex font-sans selection:bg-indigo-500/30 lg:h-dvh lg:overflow-hidden">
      <Sidebar
        currentLevelId={currentLevelId}
        isOpen={isSidebarOpen}
        onSelectLevel={handleSelectLevel}
        onClose={() => setIsSidebarOpen(false)}
        onOpenExplanation={() => setIsExplanationOpen(true)}
      />

      <div className="flex-1 flex flex-col min-h-0 lg:h-dvh lg:overflow-hidden w-full">
        {/* Header */}
        <div className="px-3 py-2.5 lg:px-4 lg:py-3 border-b border-zinc-800 bg-zinc-900/30 shrink-0">
          <div className="flex items-center gap-3 mb-2 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-400 hover:text-zinc-100">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <h2 className="text-xl font-bold text-zinc-100 truncate">{currentLevel.title}</h2>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 shrink-0">
                <span className="text-base font-mono font-semibold text-indigo-300">m = {currentLevel.m}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 lg:gap-4">
            <h2 className="text-2xl font-bold text-zinc-100 truncate">{currentLevel.title}</h2>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-0.5 shrink-0">
              <span className="text-base font-mono font-semibold text-indigo-300">m = {currentLevel.m}</span>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row lg:overflow-hidden">
          <RulesEditor
            problemDescription={currentLevel.description}
            rules={currentRules}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
            problemHeight={problemHeight}
            onProblemDragStart={handleProblemDragStart}
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
