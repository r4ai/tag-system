import React from 'react';
import { Play, CheckCircle2, XCircle, ChevronRight, RotateCcw, StepForward } from 'lucide-react';
import { TestCase, TestCaseResult } from '../types';

type Props = {
  testCases: TestCase[];
  results: Record<number, TestCaseResult>;
  activeTestCase: number;
  onSelectTestCase: (index: number) => void;
  allPassed: boolean;
  onRunAll: () => void;
  onStartStepping: (testCaseIndex: number) => void;
  onStepForward: () => void;
  onResetActiveTestCase: () => void;
  stepIndex: number;
  panelHeight: number;
  onDragStart: (startY: number) => void;
};

export function TestPanel({
  testCases,
  results,
  activeTestCase,
  onSelectTestCase,
  allPassed,
  onRunAll,
  onStartStepping,
  onStepForward,
  onResetActiveTestCase,
  stepIndex,
  panelHeight,
  onDragStart,
}: Props) {
  const activeResult = results[activeTestCase];
  const isStepMode = stepIndex >= 0;
  const history = activeResult?.history ?? [];
  const totalSteps = history.length;
  const isStepDone = isStepMode && stepIndex >= totalSteps;

  // Derive the current string to display for the active step
  const currentStepStr = (() => {
    if (!activeResult || !isStepMode) return null;
    if (stepIndex === 0) return history[0]?.str ?? testCases[activeTestCase]?.input ?? '';
    if (stepIndex < totalSteps) return history[stepIndex]?.str ?? activeResult.finalStr ?? '';
    return activeResult.finalStr ?? '';
  })();

  // Visible history rows in step mode
  const visibleHistory = isStepMode ? history.slice(0, stepIndex) : history;

  return (
    <div className="w-full lg:w-1/2 flex flex-col bg-zinc-950 lg:h-full">
      <div className="px-3 py-3 lg:px-4 lg:py-3.5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 shrink-0">
        <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
          <Play className="w-4 h-4 text-zinc-400" /> テストケース
        </h3>
        <div className="flex items-center gap-3">
          {allPassed && (
            <span className="text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> クリア
            </span>
          )}
          <button
            onClick={onRunAll}
            className="flex items-center gap-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md transition-colors shadow-lg shadow-indigo-900/20"
          >
            <Play className="w-4 h-4 fill-current" /> 実行
          </button>
        </div>
      </div>

      {/* Test Cases List */}
      <div
        className="border-b border-zinc-800 flex flex-col bg-zinc-950 overflow-y-auto shrink-0"
        style={{ height: `${panelHeight}px` }}
      >
        <div className="p-3 lg:p-4 flex flex-col gap-2">
          {testCases.map((tc, index) => {
            const res = results[index];
            const isActive = activeTestCase === index;
            return (
              <button
                key={index}
                onClick={() => onSelectTestCase(index)}
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
        onMouseDown={(e) => { e.preventDefault(); onDragStart(e.clientY); }}
        onTouchStart={(e) => { onDragStart(e.touches[0].clientY); }}
      >
        <div className="w-12 h-1 bg-zinc-800 rounded-full group-hover:bg-indigo-500 transition-colors" />
      </div>

      {/* Execution Trace Visualizer */}
      <div className="flex-1 min-h-0 flex flex-col bg-[#0a0a0a]">
        <div className="px-3 py-3 lg:px-4 lg:py-3.5 border-b border-zinc-800 flex justify-between items-center shrink-0">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
            実行トレース
            {isStepMode && (
              <span className="normal-case font-normal text-zinc-600">
                ({stepIndex} / {totalSteps} ステップ)
              </span>
            )}
          </h4>
          <div className="flex items-center gap-2">
            {activeResult && (
              <button
                onClick={onResetActiveTestCase}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 bg-zinc-800/60 hover:bg-zinc-700 px-2.5 py-1 rounded-md transition-colors border border-zinc-700/50"
                title="リセット"
              >
                <RotateCcw className="w-3 h-3" /> リセット
              </button>
            )}
            {!activeResult && (
              <button
                onClick={() => onStartStepping(activeTestCase)}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-md transition-colors border border-amber-500/20"
                title="1ステップずつ実行"
              >
                <StepForward className="w-3 h-3" /> ステップ実行
              </button>
            )}
            {isStepMode && !isStepDone && (
              <button
                onClick={onStepForward}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-md transition-colors border border-amber-500/20"
              >
                <StepForward className="w-3 h-3" /> 次のステップ
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-3 lg:p-4">
          {activeResult ? (
            <div className="font-mono text-xs lg:text-sm flex flex-col gap-1.5">
              {/* Initial state indicator in step mode */}
              {isStepMode && stepIndex === 0 && (
                <div className="flex items-start gap-2 lg:gap-3">
                  <span className="text-zinc-600 w-5 lg:w-6 text-right select-none">0.</span>
                  <div className="break-all text-zinc-300">{testCases[activeTestCase]?.input}</div>
                </div>
              )}

              {visibleHistory.map((step, i) => (
                <div key={i} className={`flex items-start gap-2 lg:gap-3 ${isStepMode && i === stepIndex - 1 ? 'bg-zinc-900/50 rounded px-1 -mx-1' : ''}`}>
                  <span className="text-zinc-600 w-5 lg:w-6 text-right select-none">{i + 1}.</span>
                  <div className="break-all">
                    <span className="text-red-500/80 line-through decoration-red-500/50">{step.deleted}</span>
                    <span className="text-zinc-300">{step.remaining}</span>
                    <span className="text-emerald-400">{step.appended}</span>
                  </div>
                </div>
              ))}

              {/* Current state indicator in step mode */}
              {isStepMode && stepIndex > 0 && !isStepDone && currentStepStr !== null && (
                <div className="flex items-start gap-2 lg:gap-3 border-l-2 border-amber-500/40 pl-2">
                  <span className="text-zinc-600 w-5 lg:w-6 text-right select-none">→</span>
                  <div className="break-all text-amber-300/80">{currentStepStr || 'ε (空)'}</div>
                </div>
              )}

              {/* Result row — always in all-steps mode, or at end of step mode */}
              {(!isStepMode || isStepDone) && (
                <div className="flex items-start gap-2 lg:gap-3 mt-2 pt-2 border-t border-zinc-800/50">
                  <span className="text-zinc-600 w-5 lg:w-6 text-right select-none"></span>
                  <div className="break-all flex flex-col gap-1">
                    <span className={`font-bold ${activeResult.status === 'pass' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                      {activeResult.finalStr || 'ε (空)'}
                    </span>
                    <span className="text-[10px] lg:text-xs text-zinc-500">{activeResult.reason}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-zinc-600 text-xs lg:text-sm italic flex flex-col items-center justify-center h-full gap-2">
              <Play className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-800" />
              「実行」または「ステップ実行」をクリックするとトレースが表示されます。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
