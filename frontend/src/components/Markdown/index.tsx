import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css"; // свои стили если нужно


interface Props {
   markdown: string;
}

export const MdViewer: React.FC<Props> = ({ markdown }) => (
   <div className="md-viewer">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
   </div>
);
