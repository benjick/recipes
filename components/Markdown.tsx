import React from "react";
import { marked } from "marked";

export const Markdown: React.FC<{ children: string }> = ({ children }) => {
  const html = marked(children);

  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
};
