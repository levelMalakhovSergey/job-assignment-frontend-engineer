import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { setAuthToken, tokenAtom } from "../store/auth";
import { queryClient } from "../lib/queryClient";
import { queryKeys } from "../api/queryKeys";

export function useAuthTokenSync(): void {
  const token = useAtomValue(tokenAtom);

  useEffect(() => {
    setAuthToken(token);
    // Invalidate article and profile caches so UI refetches per-user data
    queryClient.invalidateQueries({ queryKey: queryKeys.articles.all, exact: false });
    queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, exact: false });
  }, [token]);
}
