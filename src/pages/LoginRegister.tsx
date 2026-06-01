import React, { FormEvent, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";

import { Layout } from "../components/Layout";
import { useLogin } from "../hooks/useLogin";
import { isAuthenticatedAtom } from "../store/auth";
import { getApiErrors } from "../utils/getApiErrors";

export default function LoginRegister() {
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  if (location.pathname === "/register") {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    try {
      await loginMutation.mutateAsync({ email, password });
      history.replace("/");
    } catch (error) {
      setErrors(getApiErrors(error));
    }
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              {errors.length > 0 && (
                <ul className="error-messages">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={loginMutation.isLoading}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
