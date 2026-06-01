import { LoginUser, UserResponse } from "../types";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

export async function loginUser(credentials: LoginUser): Promise<UserResponse> {
  const { data } = await apiClient.post<UserResponse>("/users/login", {
    user: credentials,
  });

  return data;
}

export const loginMutationKey = queryKeys.auth.login;
