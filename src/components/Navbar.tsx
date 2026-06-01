import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { Layout, Menu, Avatar } from "antd";

import { userAtom } from "../store/auth";
import { getAuthorImageUrl } from "../utils/getAuthorImageUrl";

const { Header } = Layout;

export function Navbar() {
  const location = useLocation();
  const user = useAtomValue(userAtom);

  return (
    <Header style={{ background: "#fff", padding: 0, borderBottom: "1px solid #f0f0f0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <Menu mode="horizontal" selectable={false} style={{ borderBottom: "none" }}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          {user ? (
            <>
              <Menu.Item key="editor">
                <Link to="/editor">New Article</Link>
              </Menu.Item>
              <Menu.Item key="settings">
                <Link to="/settings">Settings</Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link to={`/profile/${user.username}`}>
                  <Avatar src={getAuthorImageUrl(user.image)} size="small" style={{ marginRight: 8 }} />
                  {user.username}
                </Link>
              </Menu.Item>
              <Menu.Item key="logout">
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="login">
                <Link to="/login">Sign in</Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to="/register">Sign up</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
}
