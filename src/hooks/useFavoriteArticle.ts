import { useMutation, useQueryClient } from "@tanstack/react-query";

import { favoriteArticle, unfavoriteArticle } from "../api/articles";
import { queryKeys } from "../api/queryKeys";
import { Article } from "../types";

export function useFavoriteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: Article) => {
      const response = article.favorited
        ? await unfavoriteArticle(article.slug)
        : await favoriteArticle(article.slug);

      return response.article;
    },
    onSuccess: (article) => {
      queryClient.setQueryData(queryKeys.articles.detail(article.slug), {
        article,
      });

      queryClient.setQueriesData(
        { queryKey: queryKeys.articles.all, exact: false },
        (data) => {
          if (!data || typeof data !== "object") {
            return data;
          }

          if (!("articles" in data)) {
            return data;
          }

          const previous = data as { articles: Article[] };
          return {
            ...previous,
            articles: previous.articles.map((item) =>
              item.slug === article.slug ? article : item
            ),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all, exact: false });
    },
  });
}
