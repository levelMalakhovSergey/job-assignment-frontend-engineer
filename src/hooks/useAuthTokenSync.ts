import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { setAuthToken, tokenAtom } from "../store/auth";

export function useAuthTokenSync(): void {
  const token = useAtomValue(tokenAtom);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);
}
