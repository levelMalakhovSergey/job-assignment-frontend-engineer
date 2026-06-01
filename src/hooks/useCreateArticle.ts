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
      queryClient.setQueryData(queryKeys.articles.detail(article.slug), {
        article,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all, exact: false });
    },
  });
}
