import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/comments";
import { queryKeys } from "../api/queryKeys";

export function useCreateComment(slug: string) {
  const qc = useQueryClient();
  return useMutation((body: string) => createComment(slug, body), {
    onSuccess(data) {
      // append to comments cache
      const key = queryKeys.articles.detail(`${slug}-comments`);
      qc.setQueryData<any>(key, (old: any) => {
        if (!old) return data;
        return { comments: [...old.comments, data.comment] };
      });
    },
  });
}
