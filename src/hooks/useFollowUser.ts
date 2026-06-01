import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  followUser,
  profileQueryOptions,
  unfollowUser,
} from "../api/profiles";
import { queryKeys } from "../api/queryKeys";
import { Profile } from "../types";

export function useProfile(username: string) {
  return useQuery(profileQueryOptions(username));
}

export function useFollowUser(username: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: Profile) => {
      const response = profile.following
        ? await unfollowUser(username)
        : await followUser(username);

      return response.profile;
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKeys.profiles.detail(username), {
        profile,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
}
