import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";
import { AppProviders } from "./providers/AppProviders";

jest.mock("./hooks/useArticles", () => ({
  useArticles: () => ({
    data: { articles: [], articlesCount: 0 },
    isLoading: false,
    isError: false,
  }),
  useArticle: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
  }),
}));

test("renders conduit link", () => {
  render(
    <AppProviders>
      <App />
    </AppProviders>
  );
  const linkElement = screen.getAllByText(/conduit/i)[0];
  expect(linkElement).toBeInTheDocument();
});
