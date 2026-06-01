import React from "react";
import { Link } from "react-router-dom";

import { Article } from "../types";
import { ArticleMeta } from "./ArticleMeta";

type ArticlePreviewProps = {
  article: Article;
};

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <ArticleMeta article={article} />
      <Link to={`/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
