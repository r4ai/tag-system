import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

type Props = {
  description: string;
};

export function ProblemDescription({ description }: Props) {
  return (
    <div
      className="prose prose-invert prose-sm max-w-none text-zinc-100 leading-relaxed p-3 lg:p-4
      prose-p:my-2 prose-p:text-zinc-200
      prose-strong:text-zinc-100
      prose-code:text-indigo-300 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg
      prose-ul:my-2 prose-ul:text-zinc-300 prose-ul:list-disc prose-ul:pl-5
      prose-ol:my-2 prose-ol:text-zinc-300 prose-ol:list-decimal prose-ol:pl-5
      prose-li:my-0.5
      prose-h1:text-zinc-100 prose-h2:text-zinc-100 prose-h3:text-zinc-200
      prose-blockquote:border-indigo-500 prose-blockquote:text-zinc-400
      prose-table:border-collapse prose-table:w-full
      prose-th:border prose-th:border-zinc-700 prose-th:bg-zinc-800/60 prose-th:px-3 prose-th:py-1.5 prose-th:text-zinc-200 prose-th:font-semibold
      prose-td:border prose-td:border-zinc-800 prose-td:px-3 prose-td:py-1.5 prose-td:text-zinc-300"
    >
      <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {description}
      </ReactMarkdown>
    </div>
  );
}
