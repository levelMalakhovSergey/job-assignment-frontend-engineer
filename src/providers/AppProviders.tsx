import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import React from "react";

import { useAuthTokenSync } from "../hooks/useAuthTokenSync";
import { queryClient } from "../lib/queryClient";

type AppProvidersProps = {
  children: React.ReactNode;
};

function AuthTokenSync() {
  useAuthTokenSync();
  return null;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorBgLayout: "#f5f7fa",
          colorBgContainer: "#ffffff",
          colorText: "#111827",
          borderRadius: 12,
          fontSize: 16,
        },
      }}
    >
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <AuthTokenSync />
          {children}
        </QueryClientProvider>
      </JotaiProvider>
    </ConfigProvider>
  );
}
