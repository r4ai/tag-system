import { describe, expect, it } from 'vitest';
import { LEVELS } from './constants';
import { simulateTagSystem } from './utils/tagSystem';

type Rules = Record<string, string>;

const EXPECTED_SOLUTIONS: Record<number, Rules> = {
  1: { A: 'XYZ' },
  2: { A: 'B', B: 'CCC' },
  3: { A: 'X', B: '' },
  4: { a: 'x', b: 'y', c: 'z', A: '', B: '', C: '' },
  5: { '1': '0321', '2': '', '3': '' },
  6: { a: 'H', '1': '0', '0': '1' },
  7: { a: 'H', x: '', '1': '1', '2': '2', '3': '3' },
  8: {
    a: 'H',
    '0': '00',
    '1': '11',
    '2': '22',
    '3': '33',
    '4': '44',
    '5': '55',
    '6': '66',
    '7': '77',
    '8': '88',
    '9': '99',
  },
  9: { A: 'BBBB' },
  10: { '1': '3' },
  11: { z: 'Z', a: 'A', b: 'B', c: 'C', m: 'M', n: 'N' },
  12: { a: '1a', b: '2b', x: '9x', y: '8y', A: '0A', B: '1B' },
};

describe('Level behavior with expected solutions', () => {
  for (const level of LEVELS) {
    const solution = EXPECTED_SOLUTIONS[level.id];
    if (!solution) {
      it.skip(`Level ${level.id}: ${level.title} (expected solution pending)`, () => {});
      continue;
    }

    it(`Level ${level.id}: ${level.title}`, () => {
      for (const testCase of level.testCases) {
        const result = simulateTagSystem(testCase.input, solution, level.m);
        expect(result.finalStr).toBe(testCase.target);
      }
    });
  }
});

describe('Step-by-step execution behavior', () => {
  it('produces an empty history for input with no matching rule', () => {
    const result = simulateTagSystem('B', { A: 'XYZ' }, 1);
    expect(result.history).toHaveLength(0);
    expect(result.finalStr).toBe('B');
    expect(result.halted).toBe(true);
  });

  it('records each step individually in history', () => {
    // A -> XYZ, input: "AA", m=1
    // Step 1: read 'A', append 'XYZ', delete 'A' => "AXYZ"
    // Step 2: read 'A', append 'XYZ', delete 'A' => "XYZXYZ"
    // Step 3: read 'X', no rule => halt
    const result = simulateTagSystem('AA', { A: 'XYZ' }, 1);
    expect(result.history).toHaveLength(2);
    expect(result.history[0].str).toBe('AA');
    expect(result.history[0].deleted).toBe('A');
    expect(result.history[0].remaining).toBe('A');
    expect(result.history[0].appended).toBe('XYZ');
    expect(result.history[1].str).toBe('AXYZ');
    expect(result.finalStr).toBe('XYZXYZ');
  });

  it('each history entry str equals the string before that step', () => {
    const result = simulateTagSystem('A', { A: 'BC', B: 'D' }, 1);
    // Reconstruct step-by-step
    let current = 'A';
    for (const step of result.history) {
      expect(step.str).toBe(current);
      current = step.remaining + step.appended;
    }
    expect(current).toBe(result.finalStr);
  });

  it('replaying history from any step yields the same final string', () => {
    const rules = { A: 'XYZ' };
    const full = simulateTagSystem('AAA', rules, 1);
    // Starting from step 1 (after first step)
    const midState = full.history[0].remaining + full.history[0].appended;
    const partial = simulateTagSystem(midState, rules, 1);
    expect(partial.finalStr).toBe(full.finalStr);
  });

  it('halts when string length is less than m', () => {
    // m=2 with single char input should halt immediately
    const result = simulateTagSystem('A', { A: 'XYZ' }, 2);
    expect(result.history).toHaveLength(0);
    expect(result.halted).toBe(true);
    expect(result.finalStr).toBe('A');
  });

  it('halts when string becomes empty mid-execution', () => {
    // A -> '' with m=1: delete 'A', append '', string becomes empty
    const result = simulateTagSystem('A', { A: '' }, 1);
    expect(result.history).toHaveLength(1);
    expect(result.finalStr).toBe('');
    expect(result.halted).toBe(true);
  });
});
