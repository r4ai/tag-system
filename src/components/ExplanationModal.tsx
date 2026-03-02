import React from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ExplanationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <h2 className="text-xl font-bold text-zinc-100">タグシステムとは？</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-zinc-300 space-y-4 text-sm leading-relaxed">
          <p>
            <strong>タグシステム (Tag System)</strong>{" "}
            は、1943年にエミール・ポストによって考案された決定論的な計算モデルです。これは単純な文字列書き換えシステムですが、チューリング完全（つまり、一般的なコンピュータが計算できることは何でも計算できる）になることが知られています。
          </p>
          <h3 className="text-lg font-semibold text-zinc-100 mt-4">仕組み</h3>
          <p>
            タグシステムは、パラメータ <strong>m</strong>（削除する文字数）と、いくつかの{" "}
            <strong>ルール</strong> で構成されます。
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              各ステップで、マシンは現在の文字列の <strong>最初の文字</strong> を見ます。
            </li>
            <li>
              その文字に対応するルール（例：<code>A → XYZ</code>）を探します。
            </li>
            <li>
              置換文字列（<code>XYZ</code>）を現在の文字列の <strong>末尾に追加</strong> します。
            </li>
            <li>
              文字列の先頭から <strong>m</strong> 文字を <strong>削除</strong> します。
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-zinc-100 mt-4">停止条件</h3>
          <p>以下のいずれかの条件を満たすと、マシンは停止（終了）します：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              文字列の長さが <strong>m</strong> 未満になったとき。
            </li>
            <li>
              <strong>ルールが定義されていない</strong> 文字を読み取ったとき。
            </li>
          </ul>
          <p className="mt-4 text-indigo-400 font-medium">
            このゲームの目標は、正しいルールを記述して、入力文字列をターゲット文字列に変換することです！
          </p>
        </div>
      </div>
    </div>
  );
}
