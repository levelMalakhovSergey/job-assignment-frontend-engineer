import React from "react";
import { Link } from "react-router-dom";

import { Article } from "../types";
import { formatDate } from "../utils/formatDate";
import { AuthorImage } from "./AuthorImage";
import { FavoriteArticleButton } from "./FavoriteArticleButton";

type ArticleMetaProps = {
  article: Article;
  favoriteClassName?: string;
  showFavoriteLabel?: boolean;
};

export function ArticleMeta({
  article,
  favoriteClassName,
  showFavoriteLabel = false,
}: ArticleMetaProps) {
  return (
    <div className="article-meta">
      <AuthorImage
        username={article.author.username}
        image={article.author.image}   
      />
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
      <FavoriteArticleButton
        article={article}
        className={favoriteClassName}
        showLabel={showFavoriteLabel}
      />
    </div>
  );
}
