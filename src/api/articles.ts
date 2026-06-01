import {
  ArticlesQueryParams,
  MultipleArticlesResponse,
  SingleArticleResponse,
} from "../types";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

export async function fetchArticles(
  params?: ArticlesQueryParams
): Promise<MultipleArticlesResponse> {
  const { data } = await apiClient.get<MultipleArticlesResponse>("/articles", {
    params,
  });

  return data;
}

export async function fetchArticle(slug: string): Promise<SingleArticleResponse> {
  const { data } = await apiClient.get<SingleArticleResponse>(
    `/articles/${slug}`
  );

  return data;
}

export async function favoriteArticle(
  slug: string
): Promise<SingleArticleResponse> {
  const { data } = await apiClient.post<SingleArticleResponse>(
    `/articles/${slug}/favorite`
  );

  return data;
}

export async function unfavoriteArticle(
  slug: string
): Promise<SingleArticleResponse> {
  const { data } = await apiClient.delete<SingleArticleResponse>(
    `/articles/${slug}/favorite`
  );

  return data;
}

export async function createArticle(article: {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}): Promise<SingleArticleResponse> {
  const { data } = await apiClient.post<SingleArticleResponse>(
    `/articles`,
    { article }
  );

  return data;
}

export const articlesQueryOptions = (params?: ArticlesQueryParams) => ({
  queryKey: queryKeys.articles.list(params),
  queryFn: () => fetchArticles(params),
});

export const articleQueryOptions = (slug: string) => ({
  queryKey: queryKeys.articles.detail(slug),
  queryFn: () => fetchArticle(slug),
  enabled: Boolean(slug),
});
