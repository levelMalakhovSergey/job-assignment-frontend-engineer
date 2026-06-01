import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { updateCurrentUser } from "../api/auth";
import { setSessionAtom } from "../store/auth";

export function useUpdateUser() {
  const setSession = useSetAtom(setSessionAtom);

  return useMutation({
    mutationFn: (userUpdate: Record<string, any>) => updateCurrentUser(userUpdate),
    onSuccess: ({ user }) => {
      setSession(user);
    },
  });
}

export default useUpdateUser;
