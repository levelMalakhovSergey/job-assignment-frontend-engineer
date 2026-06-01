import { ProfileResponse } from "../types";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

export async function fetchProfile(username: string): Promise<ProfileResponse> {
  const { data } = await apiClient.get<ProfileResponse>(
    `/profiles/${username}`
  );

  return data;
}

export async function followUser(username: string): Promise<ProfileResponse> {
  const { data } = await apiClient.post<ProfileResponse>(
    `/profiles/${username}/follow`
  );

  return data;
}

export async function unfollowUser(username: string): Promise<ProfileResponse> {
  const { data } = await apiClient.delete<ProfileResponse>(
    `/profiles/${username}/follow`
  );

  return data;
}

export const profileQueryOptions = (username: string) => ({
  queryKey: queryKeys.profiles.detail(username),
  queryFn: () => fetchProfile(username),
  enabled: Boolean(username),
});
