import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/comments";
import { queryKeys } from "../api/queryKeys";

export function useDeleteComment(slug: string) {
  const qc = useQueryClient();
  return useMutation((id: number) => deleteComment(slug, id), {
    onSuccess(_, id) {
      const key = queryKeys.articles.detail(`${slug}-comments`);
      qc.setQueryData<any>(key, (old: any) => {
        if (!old) return old;
        return { comments: old.comments.filter((c: any) => c.id !== id) };
      });
    },
  });
}
