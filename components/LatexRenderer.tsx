'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  content: string;
}

export default function LatexRenderer({ content }: LatexRendererProps) {
  // Normalize string to handle escaped characters from DB/JSON
  const normalizedContent = content
    .replace(/\\n/g, '\n')
    // Handle double-escaped backslashes for LaTeX
    .replace(/\\\\/g, '\\');

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-base prose-headings:font-normal prose-headings:text-foreground/80 prose-p:leading-relaxed prose-p:text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}
