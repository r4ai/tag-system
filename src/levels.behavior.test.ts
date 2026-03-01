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
