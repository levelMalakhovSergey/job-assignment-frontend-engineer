import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createArticle } from "../api/articles";
import { queryKeys } from "../api/queryKeys";
import { Article } from "../types";

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleData: {
      title: string;
      description: string;
      body: string;
      tagList?: string[];
    }) => {
      const response = await createArticle(articleData);
      return response.article as Article;
    },
    onSuccess: (article) => {
      // Set article detail cache
      queryClient.setQueryData(queryKeys.articles.detail(article.slug), {
        article,
      });
      // Invalidate all article list queries (with any params) to force refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
        exact: false,
      });
    },
  });
}
