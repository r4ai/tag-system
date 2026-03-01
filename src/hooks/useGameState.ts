import { useState, useEffect } from 'react';
import { LEVELS } from '../constants';
import { Rule, TestCaseResult } from '../types';
import { simulateTagSystem } from '../utils/tagSystem';

const EMPTY_RULES: Rule[] = [];

export function useGameState(levelId: number) {
  const [rulesByLevel, setRulesByLevel] = useState<Record<number, Rule[]>>({});
  const [results, setResults] = useState<Record<number, TestCaseResult>>({});
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [stepIndex, setStepIndex] = useState<number>(-1); // -1 = show all, 0+ = step mode

  useEffect(() => {
    const savedRules = localStorage.getItem('tagSystemRules');
    if (savedRules) {
      try {
        setRulesByLevel(JSON.parse(savedRules));
      } catch (e) {
        console.error('Failed to parse saved rules', e);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(rulesByLevel).length > 0) {
      localStorage.setItem('tagSystemRules', JSON.stringify(rulesByLevel));
    }
  }, [rulesByLevel]);

  const currentLevel = LEVELS.find(l => l.id === levelId) ?? LEVELS[0];
  const currentRules = rulesByLevel[levelId] ?? EMPTY_RULES;

  useEffect(() => {
    setResults({});
    setActiveTestCase(0);
    setStepIndex(-1);
  }, [rulesByLevel[levelId], levelId]);

  const updateRules = (newRules: Rule[]) => {
    setRulesByLevel(prev => ({ ...prev, [levelId]: newRules }));
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

  const buildRulesMap = () => {
    const rulesMap: Record<string, string> = {};
    for (const r of currentRules) {
      if (r.from.length === 1 && !(r.from in rulesMap)) {
        rulesMap[r.from] = r.to;
      }
    }
    return rulesMap;
  };

  const runAll = () => {
    const rulesMap = buildRulesMap();

    const newResults: Record<number, TestCaseResult> = {};
    currentLevel.testCases.forEach((tc, index) => {
      const sim = simulateTagSystem(tc.input, rulesMap, currentLevel.m);
      newResults[index] = {
        status: sim.finalStr === tc.target ? 'pass' : 'fail',
        history: sim.history,
        finalStr: sim.finalStr,
        reason: sim.reason,
      };
    });

    setResults(newResults);
    setActiveTestCase(0);
    setStepIndex(-1);
  };

  const startStepping = (testCaseIndex: number) => {
    const tc = currentLevel.testCases[testCaseIndex];
    const rulesMap = buildRulesMap();
    const sim = simulateTagSystem(tc.input, rulesMap, currentLevel.m);
    setResults(prev => ({
      ...prev,
      [testCaseIndex]: {
        status: 'idle',
        history: sim.history,
        finalStr: sim.finalStr,
        reason: sim.reason,
      },
    }));
    setActiveTestCase(testCaseIndex);
    setStepIndex(0);
  };

  const stepForward = () => {
    const activeResult = results[activeTestCase];
    if (!activeResult?.history) return;
    const maxStep = activeResult.history.length;
    if (stepIndex < maxStep) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      // When all steps have been played through, finalize the status
      if (nextIndex >= maxStep) {
        const tc = currentLevel.testCases[activeTestCase];
        setResults(prev => ({
          ...prev,
          [activeTestCase]: {
            ...prev[activeTestCase],
            status: activeResult.finalStr === tc.target ? 'pass' : 'fail',
          },
        }));
      }
    }
  };

  const resetActiveTestCase = () => {
    setResults(prev => {
      const next = { ...prev };
      delete next[activeTestCase];
      return next;
    });
    setStepIndex(-1);
  };

  const allPassed =
    currentLevel.testCases.length > 0 &&
    currentLevel.testCases.every((_, i) => results[i]?.status === 'pass');

  return {
    currentLevel,
    currentRules,
    results,
    activeTestCase,
    setActiveTestCase,
    allPassed,
    stepIndex,
    addRule,
    updateRule,
    deleteRule,
    runAll,
    startStepping,
    stepForward,
    resetActiveTestCase,
  };
}
