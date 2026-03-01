import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    section: "チュートリアル",
    title: "最初のステップ",
    description: "タグシステムへようこそ！1-タグシステム（m=1）では、マシンは最初の文字を読み取り、その置換文字列を末尾に追加し、最初の文字を削除します。読み取った文字に対するルールがない場合、マシンは停止します。\n\n'A' を 'XYZ' に変換してください。",
    m: 1,
    testCases: [{ input: "A", target: "XYZ" }]
  },
  {
    id: 2,
    section: "チュートリアル",
    title: "連鎖反応",
    description: "中間となる記号を使って、置換の連鎖を作ることができます。'A' を 'CCC' に変換してください。",
    m: 1,
    testCases: [{ input: "A", target: "CCC" }]
  },
  {
    id: 3,
    section: "チュートリアル",
    title: "ダブルステップ",
    description: "これは 2-タグシステム（m=2）です。各ステップで、最初の文字を読み取り、置換文字列を追加し、最初の「2文字」を削除します。\n\n'AABB' を 'X' に変換してください。",
    m: 2,
    testCases: [{ input: "AABB", target: "X" }]
  },
  {
    id: 4,
    section: "基本操作",
    title: "フィルター",
    description: "m=1。小文字と大文字が混ざった文字列があります。大文字を取り除き、小文字をそれぞれ 'x', 'y', 'z' に変更してください。",
    m: 1,
    testCases: [{ input: "aAbBcC", target: "xyz" }]
  },
  {
    id: 5,
    section: "基本操作",
    title: "手品",
    description: "m=1。'123' を '0321' に変換してください。ルールがない文字を読み取るとマシンが停止することを思い出してください。これを利用して実行を意図的に止めることができます！",
    m: 1,
    testCases: [{ input: "123", target: "0321" }]
  },
  {
    id: 6,
    section: "文字列操作",
    title: "ビット反転",
    description: "m=1。2進数のビットを反転（0を1に、1を0に）させてください。ただし、無限ループを防ぐために、入力の先頭には 'a' が付いています。'a' をうまく使って、1周したら止まるようにしましょう。",
    m: 1,
    testCases: [
      { input: "a10", target: "01" },
      { input: "a0011", target: "1100" }
    ]
  },
  {
    id: 7,
    section: "文字列操作",
    title: "Xの排除",
    description: "m=1。文字列から 'x' だけを全て削除してください。先頭の 'a' をストッパーとして利用します。",
    m: 1,
    testCases: [
      { input: "ax1x", target: "1" },
      { input: "a1x2x3", target: "123" }
    ]
  },
  {
    id: 8,
    section: "文字列操作",
    title: "増殖バグ",
    description: "m=1。入力された数字をそれぞれ2つに増やしてください。先頭の 'a' を使って1周で止まるようにします。",
    m: 1,
    testCases: [
      { input: "a12", target: "1122" },
      { input: "a3", target: "33" }
    ]
  },
  {
    id: 9,
    section: "高度なパターン",
    title: "デュプリケーター",
    description: "m=2。入力にある 'A' 1つにつき、出力に 'B' を2つ生成します。入力には常に偶数個の 'A' が含まれます。",
    m: 2,
    testCases: [
      { input: "AA", target: "BBBB" },
      { input: "AAAA", target: "BBBBBBBB" }
    ]
  },
  {
    id: 10,
    section: "高度なパターン",
    title: "ハーフ",
    description: "m=2。'12' の連続を、その半分の数の '3' に変換してください。",
    m: 2,
    testCases: [
      { input: "1212", target: "33" },
      { input: "12121212", target: "3333" }
    ]
  },
  {
    id: 11,
    section: "高度なパターン",
    title: "1つ飛ばし",
    description: "m=2。小文字と数字が交互に並んでいます。小文字だけを大文字にして残し、数字は消去してください。",
    m: 2,
    testCases: [
      { input: "a1b2", target: "AB" },
      { input: "a1b2c3", target: "ABC" }
    ]
  },
  {
    id: 12,
    section: "高度なパターン",
    title: "ペアの入れ替え",
    description: "m=2。2文字ずつのペアの順番を入れ替えてください。",
    m: 2,
    testCases: [
      { input: "a1", target: "1a" },
      { input: "a1b2", target: "1a2b" }
    ]
  },
  {
    id: 13,
    section: "計算理論",
    title: "コラッツ予想",
    description: "m=2。入力は 'a' の連続で表現された整数 N です（例：'aaa' は 3）。\nN が偶数なら N/2 に、奇数なら 3N+1 に変換してください。\n\nヒント：m=2 であることを利用して、偶奇の判定と演算を同時に行います。奇数の場合は、最後の1文字が余ることを利用します。",
    m: 2,
    testCases: [
      { input: "aaaa", target: "aa" }, // 4 -> 2
      { input: "aaaaaa", target: "aaa" }, // 6 -> 3
      { input: "aaa", target: "aaaaaaaaaa" }, // 3 -> 10
      { input: "aaaaa", target: "aaaaaaaaaaaaaaaa" } // 5 -> 16
    ]
  },
  {
    id: 14,
    section: "計算理論",
    title: "2進数インクリメント",
    description: "m=1。入力は 'a' から始まる2進数文字列です（例：'a101'）。\nこの2進数に 1 を足した結果を出力してください。\n\nヒント：最下位ビット（右端）から処理する必要がありますが、タグシステムは左からしか読めません。文字列を反転させるか、桁上がりを記憶しながら右にシフトさせる工夫が必要です。",
    m: 1,
    testCases: [
      { input: "a0", target: "1" },
      { input: "a1", target: "10" },
      { input: "a10", target: "11" },
      { input: "a11", target: "100" },
      { input: "a1011", target: "1100" },
      { input: "a1111", target: "10000" }
    ]
  },
  {
    id: 15,
    section: "計算理論",
    title: "パリティチェック",
    description: "m=1。入力は 'a' から始まる2進数文字列です。\n文字列に含まれる '1' の数が偶数なら 'E' (Even)、奇数なら 'O' (Odd) を出力してください。\n\nヒント：状態（偶数か奇数か）を、文字の種類（例えば '0' と 'X'、'1' と 'Y' のように）にエンコードして伝播させます。",
    m: 1,
    testCases: [
      { input: "a000", target: "E" },
      { input: "a1", target: "O" },
      { input: "a101", target: "E" },
      { input: "a111", target: "O" },
      { input: "a1010101", target: "E" }
    ]
  },
  {
    id: 16,
    section: "計算理論",
    title: "括弧の対応",
    description: "m=2。入力は '(' と ')' のみで構成される文字列です。\n括弧の対応が正しく取れている（ネストや開閉が矛盾していない）場合は 'Y'、そうでない場合は 'N' を出力してください。\n\nヒント：これは非常に困難です。タグシステムでプッシュダウン・オートマトン（スタック）の挙動をシミュレートする必要があります。内側から '()' のペアを見つけて消去していくアプローチを考えてみてください。",
    m: 2,
    testCases: [
      { input: "()", target: "Y" },
      { input: "()()", target: "Y" },
      { input: "(())", target: "Y" },
      { input: "(()())", target: "Y" },
      { input: "(", target: "N" },
      { input: ")", target: "N" },
      { input: ")(", target: "N" },
      { input: "(()", target: "N" },
      { input: "())", target: "N" }
    ]
  }
];
