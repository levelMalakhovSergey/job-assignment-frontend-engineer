import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { loginUser } from "../api/auth";
import { setSessionAtom } from "../store/auth";
import { LoginUser } from "../types";

export function useLogin() {
  const setSession = useSetAtom(setSessionAtom);

  return useMutation({
    mutationFn: (credentials: LoginUser) => loginUser(credentials),
    onSuccess: ({ user }) => {
      setSession(user);
    },
  });
}
