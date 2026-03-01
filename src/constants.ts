import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    section: "チュートリアル",
    title: "最初のステップ",
    description: "タグシステムへようこそ！\n\nマシンは毎ステップ、次の 3つの操作を行います。先頭の文字を読みます。そのルールに書かれた文字列を末尾に追加します。先頭の文字を削除します。ルールのない文字を読んだとき、マシンは止まります。\n\nまず 'A' を 'XYZ' に変換してみましょう。",
    m: 1,
    testCases: [{ input: "A", target: "XYZ" }]
  },
  {
    id: 2,
    section: "チュートリアル",
    title: "連鎖反応",
    description: "別の文字を踏み台にすると、変換を段階的につなげられます。例えば 'A → B'、'B → C' のようにルールを組み合わせると、間接的な変換が可能になります。\n\n'A' を 'CCC' に変換してください。",
    m: 1,
    testCases: [{ input: "A", target: "CCC" }]
  },
  {
    id: 3,
    section: "チュートリアル",
    title: "ダブルステップ",
    description: "これまでは各ステップで先頭の 1文字を削除していました。今度は先頭の 2文字を削除します。先頭の文字を読み、ルールの文字列を末尾に追加した後、先頭から 2文字を削除します。\n\n'AABB' を 'X' に変換してください。",
    m: 2,
    testCases: [{ input: "AABB", target: "X" }]
  },
  {
    id: 4,
    section: "基本操作",
    title: "フィルター",
    description: "小文字（a, b, c）と大文字（A, B, C）が混在しています。小文字はそれぞれ 'x', 'y', 'z' に変換し、大文字は取り除いてください。",
    m: 1,
    testCases: [{ input: "aAbBcC", target: "xyz" }]
  },
  {
    id: 5,
    section: "基本操作",
    title: "手品",
    description: "'123' を '0321' に変換してください。\n\nヒント：ルールのない文字を読むとマシンが止まります。処理を特定のタイミングで止めたいとき、この性質を活用できます。",
    m: 1,
    testCases: [{ input: "123", target: "0321" }]
  },
  {
    id: 6,
    section: "文字列操作",
    title: "ビット反転",
    description: "0 と 1 で書かれた文字列の各ビットを反転させてください（0 → 1、1 → 0）。\n\n入力の先頭の 'a' は番兵です。すべてのビットを処理し終えると、'a' が再び先頭に来ます。その時点でマシンを止めましょう。",
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
    description: "文字列に含まれる 'x' をすべて取り除いてください。\n\n入力の先頭の 'a' は番兵です。すべての文字を処理し終えると、'a' が再び先頭に来ます。その時点でマシンを止めましょう。",
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
    description: "各数字を 2つに複製してください。例えば '12' は '1122' になります。\n\n入力の先頭の 'a' は番兵です。すべての数字を処理し終えると、'a' が再び先頭に来ます。その時点でマシンを止めましょう。",
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
    description: "'A' を 'BB' に変換してください。つまり 'A' 1個が 'B' 2個になります。\n\n入力には必ず偶数個の 'A' が含まれます。",
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
    description: "'12' のペア 1組を '3' 1個に変換してください。例えば '1212'（2組）は '33'、'12121212'（4組）は '3333' になります。",
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
    description: "小文字と数字が交互に並んでいます（例：'a1b2c3'）。数字はすべて取り除き、小文字は大文字に変換してください（例：'ABC'）。",
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
    description: "入力は 2文字ずつのペアで構成されています。各ペア内の文字を入れ替えてください。例えば 'a1' は '1a'、'a1b2' は '1a2b' になります。",
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
    description: "'a' の個数が整数 N を表します（例：'aaa' は 3）。出力も 'a' の個数で整数を表します。\n\nN が偶数なら N÷2 を、奇数なら 3N+1 を出力してください。\n\nヒント：先頭から 2文字ずつ処理されます。偶数個の場合はきれいに割り切れますが、奇数個の場合は最後に 'a' が 1文字余ります。この差を偶奇の判定に利用しましょう。",
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
    description: "入力は 'a' に続く 2進数文字列です（例：'a101' は 5）。この 2進数に 1 を加えた値を出力してください（例：'110' = 6）。\n\nヒント：2進数の足し算は右端から行いますが、タグシステムは左から読みます。桁上がりの状態を文字の種類にエンコードして右へ伝播させる方法を考えましょう。",
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
    description: "入力は 'a' に続く 2進数文字列です（例：'a101'）。文字列に含まれる '1' の個数を数えます。偶数個なら 'E'、奇数個なら 'O' を出力してください。\n\nヒント：「今まで見た '1' の個数が偶数か奇数か」という状態を文字の種類にエンコードして伝播させる方法を考えましょう。",
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
    description: "'(' と ')' だけで構成される文字列があります。括弧が正しく対応していれば 'Y'、していなければ 'N' を出力してください。\n\n「正しい対応」とは、すべての '(' に対応する ')' があり、順序も矛盾していない状態です。'(())' は正しく、')(' は正しくありません。\n\nヒント：隣り合った '()' ペアを見つけて消去していくアプローチが有効です。最終的に何も残らなければ 'Y'、残れば 'N' です。これはタグシステムで最も難しい問題の一つです。",
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
