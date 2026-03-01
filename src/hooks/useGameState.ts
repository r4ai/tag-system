import { useState, useEffect } from 'react';
import { LEVELS } from '../constants';
import { Rule, TestCaseResult } from '../types';
import { simulateTagSystem } from '../utils/tagSystem';

export function useGameState() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [rulesByLevel, setRulesByLevel] = useState<Record<number, Rule[]>>({});
  const [results, setResults] = useState<Record<number, TestCaseResult>>({});
  const [activeTestCase, setActiveTestCase] = useState(0);

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

  const currentLevel = LEVELS.find(l => l.id === currentLevelId)!;
  const currentRules = rulesByLevel[currentLevelId] ?? [];

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
    const rulesMap: Record<string, string> = {};
    for (const r of currentRules) {
      if (r.from.length === 1 && !(r.from in rulesMap)) {
        rulesMap[r.from] = r.to;
      }
    }

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
  };

  const allPassed =
    currentLevel.testCases.length > 0 &&
    currentLevel.testCases.every((_, i) => results[i]?.status === 'pass');

  return {
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
  };
}
