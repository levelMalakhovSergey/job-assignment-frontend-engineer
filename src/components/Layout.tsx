import React from "react";
import { Layout as AntdLayout } from "antd";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const { Content } = AntdLayout;

export function Layout({ children }: LayoutProps) {
  return (
    <AntdLayout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Navbar />
      <Content style={{ padding: "24px 0", flex: "1 0 auto" }}>{children}</Content>
      <Footer />
    </AntdLayout>
  );
}
