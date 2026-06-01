import React from "react";
import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

export function Footer() {
  return (
    <AntdFooter style={{ textAlign: "center", padding: "24px 0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <a href="/#" className="logo-font">
          conduit
        </a>
        <span className="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </AntdFooter>
  );
}
