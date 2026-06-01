import { useQuery } from "@tanstack/react-query";

import { articleQueryOptions, articlesQueryOptions } from "../api/articles";
import { ArticlesQueryParams } from "../types";

export function useArticles(params?: ArticlesQueryParams) {
  return useQuery(articlesQueryOptions(params));
}

export function useArticle(slug: string) {
  return useQuery(articleQueryOptions(slug));
}
