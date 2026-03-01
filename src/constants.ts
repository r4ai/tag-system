import dedent from 'dedent';
import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    section: "チュートリアル",
    title: "最初のステップ",
    description: dedent`
      タグシステムへようこそ！

      マシンは毎ステップ、次の 3 つの操作を行います。

      1. 先頭の文字を**読む**
      2. そのルールに書かれた文字列を**末尾に追加**する
      3. 先頭の文字を**削除**する

      ルールのない文字を読んだとき、マシンは止まります。

      **例：** ルール \`A → BC\` があり、文字列が \`"A"\` のとき

      | ステップ | 操作 | 結果 |
      |------|------|------|
      | 1 | \`A\` を読む → \`BC\` を末尾に追加 → 先頭の \`A\` を削除 | \`"BC"\` |
      | 2 | \`B\` を読む → ルールなし → **停止** | \`"BC"\` |

      **問題：** \`A\` を \`XYZ\` に変換するルールを作ってください。

      **制約：** 入力は \`A\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "A", target: "XYZ" },
      { input: "AA", target: "XYZXYZ" },
      { input: "AAA", target: "XYZXYZXYZ" }
    ]
  },
  {
    id: 2,
    section: "チュートリアル",
    title: "連鎖反応",
    description: dedent`
      別の文字を踏み台にすると、変換を段階的につなげられます。

      **例：** ルール \`A → B\`、\`B → C\` があり、文字列が \`"A"\` のとき

      | ステップ | 操作 | 結果 |
      |------|------|------|
      | 1 | \`A\` を読む → \`B\` を末尾に追加 → \`A\` を削除 | \`"B"\` |
      | 2 | \`B\` を読む → \`C\` を末尾に追加 → \`B\` を削除 | \`"C"\` |
      | 3 | \`C\` を読む → ルールなし → **停止** | \`"C"\` |

      **問題：** \`A\` を \`CCC\` に変換するルールを作ってください。

      **制約：** 入力は \`A\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "A", target: "CCC" },
      { input: "AA", target: "CCCCCC" },
      { input: "AAA", target: "CCCCCCCCC" }
    ]
  },
  {
    id: 3,
    section: "チュートリアル",
    title: "ダブルステップ",
    description: dedent`
      パラメータ $m$ は「1ステップで先頭から削除する文字数」を示します。

      - $m = 1$：先頭 1 文字を削除
      - $m = 2$：先頭 2 文字を削除（読み取るのは常に先頭の 1 文字だけ）

      **例：** $m = 2$、ルール \`A → X\`、文字列 \`"AB"\` のとき

      | ステップ | 操作 | 結果 |
      |------|------|------|
      | 1 | \`A\` を読む → \`X\` を末尾に追加 → 先頭 2 文字 \`AB\` を削除 | \`"X"\` |
      | 2 | \`X\` を読む → ルールなし → **停止** | \`"X"\` |

      **問題：** \`AABB\` を \`X\` に変換するルールを作ってください。

      **制約：** 入力は \`A\` と \`B\` のみで構成されます。
    `,
    m: 2,
    testCases: [
      { input: "AA", target: "X" },
      { input: "AABB", target: "X" },
      { input: "AABBAABB", target: "XX" }
    ]
  },
  {
    id: 4,
    section: "基本操作",
    title: "フィルター",
    description: dedent`
      小文字と大文字が混在した文字列を変換してください。

      - 小文字 \`a\`, \`b\`, \`c\` はそれぞれ \`x\`, \`y\`, \`z\` に変換する
      - 大文字 \`A\`, \`B\`, \`C\` は取り除く

      **制約：** 入力は \`a\`, \`b\`, \`c\`, \`A\`, \`B\`, \`C\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "aAbBcC", target: "xyz" },
      { input: "abc", target: "xyz" },
      { input: "ABC", target: "" },
      { input: "cBaA", target: "zx" }
    ]
  },
  {
    id: 5,
    section: "基本操作",
    title: "手品",
    description: dedent`
      \`123\` を \`0321\` に変換してください。

      > **ヒント：** ルールのない文字を読むとマシンが止まります。
      > 処理を特定のタイミングで止めたいとき、この性質を活用できます。

      **制約：** 入力は \`1\`, \`2\`, \`3\` のみで構成されます。
    `,
    m: 1,
    testCases: [{ input: "123", target: "0321" }]
  },
  {
    id: 6,
    section: "文字列操作",
    title: "ビット反転",
    description: dedent`
      \`0\` と \`1\` で書かれた文字列の各ビットを反転させてください（$0 \to 1$、$1 \to 0$）。

      入力の先頭の \`a\` は処理開始マーカーです。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。

      出力は先頭に \`H\` を含む形（例：入力 \`a10\` → 出力 \`H01\`）です。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a10", target: "H01" },
      { input: "a0011", target: "H1100" },
      { input: "a01", target: "H10" },
      { input: "a111000", target: "H000111" }
    ]
  },
  {
    id: 7,
    section: "文字列操作",
    title: "Xの排除",
    description: dedent`
      文字列に含まれる \`x\` をすべて取り除いてください。

      入力の先頭の \`a\` は処理開始マーカーです。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。

      出力は先頭に \`H\` を含む形です。

      **制約：** 入力は \`a\` に続く数字（\`0\`〜\`9\`）と \`x\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "ax1x", target: "H1" },
      { input: "a1x2x3", target: "H123" },
      { input: "axxx", target: "H" },
      { input: "a123", target: "H123" }
    ]
  },
  {
    id: 8,
    section: "文字列操作",
    title: "増殖バグ",
    description: dedent`
      各数字を 2 つに複製してください。例えば \`12\` は \`1122\` になります。

      入力の先頭の \`a\` は処理開始マーカーです。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。

      出力は先頭に \`H\` を含む形です。

      **制約：** 入力は \`a\` に続く数字（\`0\`〜\`9\`）のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a12", target: "H1122" },
      { input: "a3", target: "H33" },
      { input: "a909", target: "H990099" },
      { input: "a4560", target: "H44556600" }
    ]
  },
  {
    id: 9,
    section: "高度なパターン",
    title: "デュプリケーター",
    description: dedent`
      \`A\` を \`BB\` に変換してください。つまり \`A\` 1 個が \`B\` 2 個になります。

      | 入力 | 出力 |
      |------|------|
      | \`AA\` | \`BBBB\` |
      | \`AAAA\` | \`BBBBBBBB\` |

      **制約：** 入力は \`A\` のみで構成され、個数は偶数です。
    `,
    m: 2,
    testCases: [
      { input: "AA", target: "BBBB" },
      { input: "AAAA", target: "BBBBBBBB" },
      { input: "AAAAAA", target: "BBBBBBBBBBBB" }
    ]
  },
  {
    id: 10,
    section: "高度なパターン",
    title: "ハーフ",
    description: dedent`
      \`12\` のペア 1 組を \`3\` 1 個に変換してください。

      例えば \`1212\`（2 組）は \`33\`、\`12121212\`（4 組）は \`3333\` になります。

      **制約：** 入力は \`12\` の繰り返しで構成されます。
    `,
    m: 2,
    testCases: [
      { input: "12", target: "3" },
      { input: "1212", target: "33" },
      { input: "121212", target: "333" },
      { input: "12121212", target: "3333" }
    ]
  },
  {
    id: 11,
    section: "高度なパターン",
    title: "1つ飛ばし",
    description: dedent`
      英小文字と数字が交互に並んでいます（例：\`a1b2c3\`）。

      数字はすべて取り除き、英小文字は大文字に変換してください（例：\`ABC\`）。

      **制約：** 入力は英小文字と数字（\`0\`〜\`9\`）が交互に並んだ文字列です。
    `,
    m: 2,
    testCases: [
      { input: "z9", target: "Z" },
      { input: "a1b2", target: "AB" },
      { input: "a1b2c3", target: "ABC" },
      { input: "m4n5", target: "MN" }
    ]
  },
  {
    id: 12,
    section: "高度なパターン",
    title: "ペアの入れ替え",
    description: dedent`
      入力は 2 文字ずつのペアで構成されています。各ペア内の文字を入れ替えてください。

      例えば \`a1\` は \`1a\`、\`a1b2\` は \`1a2b\` になります。

      **制約：** 入力の長さは偶数で、任意の文字が 2 文字ずつペアを組んでいます。
    `,
    m: 2,
    testCases: [
      { input: "a1", target: "1a" },
      { input: "a1b2", target: "1a2b" },
      { input: "x9y8", target: "9x8y" },
      { input: "A0B1", target: "0A1B" }
    ]
  },
  {
    id: 13,
    section: "計算理論",
    title: "コラッツ予想",
    description: dedent`
      \`a\` の個数が整数 $N$ を表します（例：\`aaa\` は $N = 3$）。
      出力も \`a\` の個数で整数を表します。

      $$
      f(N) = \begin{cases} N / 2 & \text{if } N \text{ is even} \\ 3N + 1 & \text{if } N \text{ is odd} \end{cases}
      $$

      $f(N)$ を出力してください。

      > **ヒント：** 先頭から 2 文字ずつ処理されます。偶数個の場合はきれいに割り切れますが、奇数個の場合は最後に \`a\` が 1 文字余ります。この差を偶奇の判定に利用しましょう。

      **制約：** 入力は \`a\` のみで構成され、$N \geq 2$ です。
    `,
    m: 2,
    testCases: [
      { input: "aa", target: "a" },
      { input: "aaaa", target: "aa" },
      { input: "aaaaaa", target: "aaa" },
      { input: "aaaaaaaa", target: "aaaa" },
      { input: "aaa", target: "aaaaaaaaaa" },
      { input: "aaaaa", target: "aaaaaaaaaaaaaaaa" },
      { input: "aaaaaaa", target: "aaaaaaaaaaaaaaaaaaaaaa" }
    ]
  },
  {
    id: 14,
    section: "計算理論",
    title: "2進数インクリメント",
    description: dedent`
      入力は \`a\` に続く 2 進数文字列です（例：\`a101\` は $5_{(2)}$）。
      この 2 進数に $1$ を加えた値を出力してください（例：\`a101\` → \`110\` $= 6$）。

      > **ヒント：** 2 進数の足し算は右端から行いますが、タグシステムは左から読みます。
      > 桁上がりの状態を文字の種類にエンコードして右へ伝播させる方法を考えましょう。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a0", target: "1" },
      { input: "a1", target: "10" },
      { input: "a10", target: "11" },
      { input: "a11", target: "100" },
      { input: "a1000", target: "1001" },
      { input: "a1010", target: "1011" },
      { input: "a1011", target: "1100" },
      { input: "a1111", target: "10000" },
      { input: "a111111", target: "1000000" }
    ]
  },
  {
    id: 15,
    section: "計算理論",
    title: "パリティチェック",
    description: dedent`
      入力は \`a\` に続く 2 進数文字列です（例：\`a101\`）。
      文字列に含まれる \`1\` の個数を数えます。

      - 偶数個なら \`E\`（Even）を出力
      - 奇数個なら \`O\`（Odd）を出力

      > **ヒント：** 「今まで見た \`1\` の個数が偶数か奇数か」という状態を文字の種類にエンコードして伝播させる方法を考えましょう。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a000", target: "E" },
      { input: "a1", target: "O" },
      { input: "a01", target: "O" },
      { input: "a101", target: "E" },
      { input: "a111", target: "O" },
      { input: "a1100", target: "E" },
      { input: "a1111", target: "E" },
      { input: "a1010101", target: "E" }
    ]
  },
  {
    id: 16,
    section: "計算理論",
    title: "括弧の対応",
    description: dedent`
      \`(\` と \`)\` だけで構成される文字列があります。
      括弧が正しく対応していれば \`Y\`、していなければ \`N\` を出力してください。

      「正しい対応」とは、すべての \`(\` に対応する \`)\` があり、順序も矛盾していない状態です。
      \`(())\` は正しく、\`)(\` は正しくありません。

      > **ヒント：** 隣り合った \`()\` ペアを見つけて消去していくアプローチが有効です。
      > 最終的に何も残らなければ \`Y\`、残れば \`N\` です。
      > これはタグシステムで最も難しい問題の一つです。

      **制約：** 入力は \`(\` と \`)\` のみで構成されます。
    `,
    m: 2,
    testCases: [
      { input: "()", target: "Y" },
      { input: "()()", target: "Y" },
      { input: "(())", target: "Y" },
      { input: "(()())", target: "Y" },
      { input: "((()))", target: "Y" },
      { input: "(()(()))", target: "Y" },
      { input: ")(", target: "N" },
      { input: "(()", target: "N" },
      { input: "())", target: "N" },
      { input: "())(", target: "N" },
      { input: "((())", target: "N" }
    ]
  }
];
