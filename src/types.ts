export type TestCase = {
  input: string;
  target: string;
};

export type Level = {
  id: number;
  section: string;
  title: string;
  description: string;
  m: number;
  testCases: TestCase[];
};

export type Rule = {
  id: string;
  from: string;
  to: string;
};

export type Step = {
  str: string;
  read: string;
  appended: string;
  deleted: string;
  remaining: string;
};

export type TestCaseResult = {
  status: 'idle' | 'running' | 'pass' | 'fail';
  history?: Step[];
  finalStr?: string;
  reason?: string;
};
