import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Layout } from "./components/Layout";
import { clearSessionAtom } from "./store/auth";

export default function Logout() {
  const history = useHistory();
  const clearSession = useSetAtom(clearSessionAtom);

  useEffect(() => {
    clearSession();
    history.replace("/");
  }, [clearSession, history]);

  return (
    <Layout>
      <div className="container page">Logging out...</div>
    </Layout>
  );
}
