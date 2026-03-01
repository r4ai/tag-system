import { Step } from '../types';

export function simulateTagSystem(input: string, rules: Record<string, string>, m: number, maxSteps = 200) {
  let current = input;
  const history: Step[] = [];
  let halted = false;
  let reason = "";

  for (let i = 0; i < maxSteps; i++) {
    if (current.length < m) {
      halted = true;
      reason = `Halted: String length (${current.length}) is less than m (${m}).`;
      break;
    }

    const head = current[0];
    if (!(head in rules)) {
      halted = true;
      reason = `Halted: No rule for symbol '${head}'.`;
      break;
    }

    const appended = rules[head];
    const deleted = current.slice(0, m);
    const remaining = current.slice(m);
    
    history.push({
      str: current,
      read: head,
      appended,
      deleted,
      remaining
    });

    current = remaining + appended;
    
    if (current === "") {
        halted = true;
        reason = "Halted: String is empty.";
        break;
    }
  }

  if (!halted) {
    reason = `Error: Reached maximum steps (${maxSteps}). Infinite loop?`;
  }

  return { finalStr: current, history, halted, reason };
}
