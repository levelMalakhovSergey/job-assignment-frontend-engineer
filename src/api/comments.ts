import { MultipleCommentsResponse, SingleCommentResponse } from "../types/api";
import { apiClient } from "./client";

export async function fetchComments(slug: string): Promise<MultipleCommentsResponse> {
  const { data } = await apiClient.get<MultipleCommentsResponse>(`/articles/${slug}/comments`);
  return data;
}

export async function createComment(slug: string, body: string): Promise<SingleCommentResponse> {
  const { data } = await apiClient.post<SingleCommentResponse>(`/articles/${slug}/comments`, { comment: { body } });
  return data;
}

export async function deleteComment(slug: string, id: number): Promise<void> {
  await apiClient.delete(`/articles/${slug}/comments/${id}`);
}
