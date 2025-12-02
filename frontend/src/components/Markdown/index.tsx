import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // ⚠️ обязательно
import "./index.css";

interface Props {
   markdown: string;
}

export const MdViewer: React.FC<Props> = ({ markdown }) => (
   <div className="md-viewer">
      <ReactMarkdown
         remarkPlugins={[remarkGfm, remarkMath]}
         rehypePlugins={[rehypeKatex]}
      >
         {markdown}
      </ReactMarkdown>
   </div>
);
