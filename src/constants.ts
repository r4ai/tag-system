import dedent from "dedent";
import { Level } from "./types";

export const LEVELS: Level[] = [
  {
    id: 1,
    section: "チュートリアル",
    title: "最初のステップ",
    description: dedent`
      タグシステムへようこそ！

      マシンは毎ステップ、次の 3 つの操作を行います。

      1. 先頭の文字を**読む**
      2. 読んだ文字に**マッチ**するルールがあれば、その文字列を**末尾に追加**する。なければ**停止**する
      3. 先頭の文字を**削除**する

      **例：** ルール \`A → BC\` があり、文字列が \`"A"\` のとき

      | ステップ | 操作 | 結果 |
      |------|------|------|
      | 1 | \`A\` を読む → \`BC\` を末尾に追加 → 先頭の \`A\` を削除 | \`"BC"\` |
      | 2 | \`B\` を読む → ルールなし → **停止** | \`"BC"\` |

      **問題：** \`A\` を \`XYZ\` に変換してください。

      **制約：** 入力は \`A\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "A", target: "XYZ" },
      { input: "AA", target: "XYZXYZ" },
      { input: "AAA", target: "XYZXYZXYZ" },
    ],
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

      **問題：** \`A\` を、1個なら \`H\`、2個なら \`HCH\`、3個なら \`HCHCH\` に変換してください。

      **制約：** 入力は \`A\`, \`AA\`, \`AAA\` のいずれかです。
    `,
    m: 1,
    testCases: [
      { input: "A", target: "H" },
      { input: "AA", target: "HCH" },
      { input: "AAA", target: "HCHCH" },
    ],
  },
  {
    id: 3,
    section: "チュートリアル",
    title: "ダブルステップ",
    description: dedent`
      パラメータ $m$ は「1ステップで先頭から削除する文字数」を示します。

      - $m = 1$：先頭 1 文字を削除
      - $m = 2$：先頭 2 文字を削除（読み取るのは常に先頭の 1 文字だけ）

      パラメータ $m$ は、画面最上部の問題タイトル部分に表示されています（例：\`m = 2\`）。

      **例：** $m = 2$、ルール \`A → X\`、文字列 \`"AB"\` のとき

      | ステップ | 操作 | 結果 |
      |------|------|------|
      | 1 | \`A\` を読む → \`X\` を末尾に追加 → 先頭 2 文字 \`AB\` を削除 | \`"X"\` |
      | 2 | \`X\` を読む → ルールなし → **停止** | \`"X"\` |

      **問題：** \`AABB\` を \`X\` に変換してください。

      **制約：** 入力は \`A\` と \`B\` のみで構成されます。
    `,
    m: 2,
    testCases: [
      { input: "AA", target: "X" },
      { input: "AABB", target: "X" },
      { input: "AABBAABB", target: "XX" },
    ],
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
      { input: "cBaA", target: "zx" },
    ],
  },
  {
    id: 5,
    section: "基本操作",
    title: "手品",
    description: dedent`
      \`123\` を \`0321\` に変換してください。

      **制約：** 入力は \`1\`, \`2\`, \`3\` のみで構成されます。

      > **Tips：** ルールのない文字を読むとマシンが止まります。
      > 処理を特定のタイミングで止めたいとき、この性質を活用できます。
    `,
    m: 1,
    testCases: [{ input: "123", target: "0321" }],
  },
  {
    id: 6,
    section: "文字列操作",
    title: "ビット反転",
    description: dedent`
      \`0\` と \`1\` で書かれた文字列の各ビットを反転させてください（$0 \to 1$、$1 \to 0$）。

      入力の先頭の \`a\` は処理開始マーカーです。

      出力は先頭に \`H\` を含む形（例：入力 \`a10\` → 出力 \`H01\`）です。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。
    `,
    m: 1,
    testCases: [
      { input: "a10", target: "H01" },
      { input: "a0011", target: "H1100" },
      { input: "a01", target: "H10" },
      { input: "a111000", target: "H000111" },
    ],
  },
  {
    id: 7,
    section: "文字列操作",
    title: "Xの排除",
    description: dedent`
      文字列に含まれる \`x\` をすべて取り除いてください。

      入力の先頭の \`a\` は処理開始マーカーです。

      出力は先頭に \`H\` を含む形です。

      **制約：** 入力は \`a\` に続く数字（\`0\`〜\`9\`）と \`x\` のみで構成されます。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。
    `,
    m: 1,
    testCases: [
      { input: "ax1x", target: "H1" },
      { input: "a1x2x3", target: "H123" },
      { input: "axxx", target: "H" },
      { input: "a123", target: "H123" },
    ],
  },
  {
    id: 8,
    section: "文字列操作",
    title: "増殖バグ",
    description: dedent`
      各数字を 2 つに複製してください。例えば \`12\` は \`1122\` になります。

      入力の先頭の \`a\` は処理開始マーカーです。

      出力は先頭に \`H\` を含む形です。

      **制約：** 入力は \`a\` に続く数字（\`0\`〜\`9\`）のみで構成されます。

      > **ヒント：** 最初に停止マーカー \`H\` を末尾へ送り、走査完了後に \`H\` が先頭に来たところで停止させましょう。
    `,
    m: 1,
    testCases: [
      { input: "a12", target: "H1122" },
      { input: "a3", target: "H33" },
      { input: "a909", target: "H990099" },
      { input: "a4560", target: "H44556600" },
    ],
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
      { input: "AAAAAA", target: "BBBBBBBBBBBB" },
    ],
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
      { input: "12121212", target: "3333" },
    ],
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
      { input: "m4n5", target: "MN" },
    ],
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
      { input: "A0B1", target: "0A1B" },
    ],
  },
  {
    id: 13,
    section: "発展チャレンジ",
    title: "逆側ストッパー",
    description: dedent`
      入力は \`a\` に続く 2 進数文字列です。

      - \`0\` は \`L\` に変換
      - \`1\` は \`R\` に変換
      - 停止マーカー \`H\` を文字列の**末尾**に 1 つ置く

      例えば \`a10\` は \`RLH\` になります。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a0", target: "LH" },
      { input: "a1", target: "RH" },
      { input: "a10", target: "RLH" },
      { input: "a0011", target: "LLRRH" },
      { input: "a1010", target: "RLRLH" },
      { input: "a111000", target: "RRRLLLH" },
    ],
  },
  {
    id: 14,
    section: "発展チャレンジ",
    title: "偶奇トリガー",
    description: dedent`
      入力は \`0x\` または \`1x\` のブロックが 0 回以上続き、最後に \`zx\` が付きます。

      \`1x\` の個数を数えてください。

      - 偶数個なら \`E\`
      - 奇数個なら \`O\`

      を出力してください。

      **例：** \`1x0x1xzx\` には \`1x\` が 2 個あるので、出力は \`E\` です。

      **制約：** 入力は、 \`0x\` または \`1x\` の 0 回以上の繰り返しに \`zx\` が続く形です。
    `,
    m: 2,
    testCases: [
      { input: "zx", target: "E" },
      { input: "1xzx", target: "O" },
      { input: "0xzx", target: "E" },
      { input: "1x0x1xzx", target: "E" },
      { input: "1x1x0xzx", target: "E" },
      { input: "0x1x0xzx", target: "O" },
      { input: "1x1x1x0x1xzx", target: "E" },
      { input: "1x1x1xzx", target: "O" },
    ],
  },
  {
    id: 15,
    section: "発展チャレンジ",
    title: "3要素ソート（6通り）",
    description: dedent`
      入力は \`1\`, \`2\`, \`3\` を 1 回ずつ使った 3 文字列です。
      つまり、入力は次の 6 通りのどれかです。

      - \`123\`, \`132\`, \`213\`, \`231\`, \`312\`, \`321\`

      この 3 要素を昇順に並べた結果を出力してください。

      出力は先頭に停止マーカー \`H\` を含む形（\`H123\`）です。

      **制約：** 入力は上記 6 通りのいずれかです。
    `,
    m: 3,
    testCases: [
      { input: "123", target: "H123" },
      { input: "132", target: "H123" },
      { input: "213", target: "H123" },
      { input: "231", target: "H123" },
      { input: "312", target: "H123" },
      { input: "321", target: "H123" },
    ],
  },
  {
    id: 16,
    section: "計算理論",
    title: "任意長の一般ソート",
    description: dedent`
      > **注意：この問題は極めて困難であり、解が存在しない可能性があります。**

      入力は \`a\` に続く数字列です（使用文字は \`0\`〜\`3\`）。

      この数字列を昇順に並べ替えてください。
      同じ数字は個数を保ったまま出力します。

      出力は先頭に停止マーカー \`H\` を含む形です。

      **例：**

      - \`a321\` → \`H123\`
      - \`a330221\` → \`H012233\`

      **制約：** 入力は \`a\` に続く \`0\`〜\`3\` の任意長文字列です（空文字列も可）。
    `,
    m: 1,
    testCases: [
      { input: "a", target: "H" },
      { input: "a0", target: "H0" },
      { input: "a321", target: "H123" },
      { input: "a330221", target: "H012233" },
      { input: "a111000", target: "H000111" },
      { input: "a203010", target: "H000123" },
    ],
  },
  {
    id: 17,
    section: "計算理論",
    title: "コラッツ予想",
    description: dedent`
      > **注意：この問題は極めて困難であり、解が存在しない可能性があります。**

      \`a\` の個数で整数 $N$ を表します（例：\`aaa\` は $N = 3$）。
      出力も \`a\` の個数で整数を表します。
      出力は先頭に停止マーカー \`H\` を含む形です。

      ここで、関数 $f(N)$ を次のように定義します。

      $$
      f(N) = \begin{cases} N / 2 & \text{if } N \text{ is even} \\ 3N + 1 & \text{if } N \text{ is odd} \end{cases}
      $$

      **問題：** $f(N)$ を \`H\` 付きで出力してください。

      **制約：** 入力は \`a\` のみで構成され、$N \geq 2$ です。

      **例：** 入力 \`aa\` について考えます。

        \`a\` の個数は 2 なので $N = 2$。
        $N$ は偶数だから $f(2) = 2 / 2 = 1$。

        よって、出力は \`a\` 1 個。停止マーカー付きで \`Ha\` になります。
    `,
    m: 2,
    testCases: [
      { input: "aa", target: "Ha" },
      { input: "aaaa", target: "Haa" },
      { input: "aaaaaa", target: "Haaa" },
      { input: "aaaaaaaa", target: "Haaaa" },
      { input: "aaa", target: "Haaaaaaaaaa" },
      { input: "aaaaa", target: "Haaaaaaaaaaaaaaaa" },
      { input: "aaaaaaa", target: "Haaaaaaaaaaaaaaaaaaaaaa" },
    ],
  },
  {
    id: 18,
    section: "計算理論",
    title: "2進数インクリメント",
    description: dedent`
      > **注意：この問題は極めて困難であり、解が存在しない可能性があります。**

      入力は \`a\` に続く 2 進数文字列です（例：\`a101\` は $5_{(2)}$）。
      この 2 進数に $1$ を加えた値を出力してください。
      出力は先頭に停止マーカー \`H\` を含む形です（例：\`a101\` → \`H110\`）。

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a0", target: "H1" },
      { input: "a1", target: "H10" },
      { input: "a10", target: "H11" },
      { input: "a11", target: "H100" },
      { input: "a1000", target: "H1001" },
      { input: "a1010", target: "H1011" },
      { input: "a1011", target: "H1100" },
      { input: "a1111", target: "H10000" },
      { input: "a111111", target: "H1000000" },
    ],
  },
  {
    id: 19,
    section: "計算理論",
    title: "パリティチェック",
    description: dedent`
      > **注意：この問題は極めて困難であり、解が存在しない可能性があります。**

      入力は \`a\` に続く 2 進数文字列です（例：\`a101\`）。
      文字列に含まれる \`1\` の個数を数えます。

      - 偶数個なら \`HE\`（Even）
      - 奇数個なら \`HO\`（Odd）

      **制約：** 入力は \`a\` に続く \`0\` と \`1\` のみで構成されます。
    `,
    m: 1,
    testCases: [
      { input: "a000", target: "HE" },
      { input: "a1", target: "HO" },
      { input: "a01", target: "HO" },
      { input: "a101", target: "HE" },
      { input: "a111", target: "HO" },
      { input: "a1100", target: "HE" },
      { input: "a1111", target: "HE" },
      { input: "a1010101", target: "HE" },
    ],
  },
  {
    id: 20,
    section: "計算理論",
    title: "括弧の対応",
    description: dedent`
      > **注意：この問題は極めて困難であり、解が存在しない可能性があります。**

      \`(\` と \`)\` だけで構成される文字列があります。
      括弧が正しく対応していれば \`HY\`、していなければ \`HN\` を出力してください。

      「正しい対応」とは、すべての \`(\` に対応する \`)\` があり、順序も矛盾していない状態です。
      \`(())\` は正しく、\`)(\` は正しくありません。

      **制約：** 入力は \`(\` と \`)\` のみで構成されます。
    `,
    m: 2,
    testCases: [
      { input: "()", target: "HY" },
      { input: "()()", target: "HY" },
      { input: "(())", target: "HY" },
      { input: "(()())", target: "HY" },
      { input: "((()))", target: "HY" },
      { input: "(()(()))", target: "HY" },
      { input: ")(", target: "HN" },
      { input: "(()", target: "HN" },
      { input: "())", target: "HN" },
      { input: "())(", target: "HN" },
      { input: "((())", target: "HN" },
    ],
  },
];
