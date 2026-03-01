import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "最初のステップ",
    description: "タグシステムへようこそ！1-タグシステム（m=1）では、マシンは最初の文字を読み取り、その置換文字列を末尾に追加し、最初の文字を削除します。読み取った文字に対するルールがない場合、マシンは停止します。\n\n'A' を 'XYZ' に変換してください。",
    m: 1,
    testCases: [{ input: "A", target: "XYZ" }]
  },
  {
    id: 2,
    title: "連鎖反応",
    description: "中間となる記号を使って、置換の連鎖を作ることができます。'A' を 'CCC' に変換してください。",
    m: 1,
    testCases: [{ input: "A", target: "CCC" }]
  },
  {
    id: 3,
    title: "ダブルステップ",
    description: "これは 2-タグシステム（m=2）です。各ステップで、最初の文字を読み取り、置換文字列を追加し、最初の「2文字」を削除します。\n\n'AABB' を 'X' に変換してください。",
    m: 2,
    testCases: [{ input: "AABB", target: "X" }]
  },
  {
    id: 4,
    title: "フィルター",
    description: "m=1。小文字と大文字が混ざった文字列があります。大文字を取り除き、小文字をそれぞれ 'x', 'y', 'z' に変更してください。",
    m: 1,
    testCases: [{ input: "aAbBcC", target: "xyz" }]
  },
  {
    id: 5,
    title: "手品",
    description: "m=1。'123' を '0321' に変換してください。ルールがない文字を読み取るとマシンが停止することを思い出してください。これを利用して実行を意図的に止めることができます！",
    m: 1,
    testCases: [{ input: "123", target: "0321" }]
  },
  {
    id: 6,
    title: "デュプリケーター（複製機）",
    description: "m=2。入力にある 'A' 1つにつき、出力に 'B' を2つ生成します。入力には常に偶数個の 'A' が含まれます。",
    m: 2,
    testCases: [
      { input: "AA", target: "BBBB" },
      { input: "AAAA", target: "BBBBBBBB" }
    ]
  },
  {
    id: 7,
    title: "ハーフ（半分）",
    description: "m=2。'12' の連続を、その半分の数の '3' に変換してください。",
    m: 2,
    testCases: [
      { input: "1212", target: "33" },
      { input: "12121212", target: "3333" }
    ]
  }
];
