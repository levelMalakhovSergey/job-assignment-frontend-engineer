import React from "react";
import { useHistory } from "react-router-dom";
import { useAtomValue } from "jotai";

import { useFavoriteArticle } from "../hooks/useFavoriteArticle";
import { isAuthenticatedAtom } from "../store/auth";
import { Article } from "../types";

type FavoriteArticleButtonProps = {
  article: Article;
  className?: string;
  showLabel?: boolean;
};

export function FavoriteArticleButton({
  article,
  className = "btn btn-outline-primary btn-sm pull-xs-right",
  showLabel = false,
}: FavoriteArticleButtonProps) {
  const history = useHistory();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const favoriteMutation = useFavoriteArticle();

  const buttonClassName = article.favorited
    ? className.replace("btn-outline-primary", "btn-primary")
    : className;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      history.push("/login");
      return;
    }

    favoriteMutation.mutate(article);
  };

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      disabled={favoriteMutation.isLoading}
      type="button"
    >
      <i className="ion-heart" />
      {showLabel ? (
        <>
          &nbsp; Favorite Post{" "}
          <span className="counter">({article.favoritesCount})</span>
        </>
      ) : (
        <> {article.favoritesCount}</>
      )}
    </button>
  );
}
