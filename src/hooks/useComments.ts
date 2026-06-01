import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";
import { queryKeys } from "../api/queryKeys";

export function useComments(slug: string) {
  return useQuery(queryKeys.articles.detail(`${slug}-comments`), () => fetchComments(slug), { enabled: Boolean(slug) });
}
