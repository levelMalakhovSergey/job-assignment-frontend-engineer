import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FavoriteArticleButton } from "./FavoriteArticleButton";
import { Article } from "../types";

const mockPush = jest.fn();
const mockMutate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: mockPush }),
}));

jest.mock("../hooks/useFavoriteArticle", () => ({
  useFavoriteArticle: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtomValue: () => false,
}));

const article: Article = {
  slug: "test-article",
  title: "Test",
  description: "Description",
  body: "Body",
  tagList: [],
  createdAt: "2024-01-01T12:00:00.000Z",
  updatedAt: "2024-01-01T12:00:00.000Z",
  favorited: false,
  favoritesCount: 3,
  author: {
    username: "alice",
    bio: "",
    image: "",
    following: false,
  },
};

describe("FavoriteArticleButton", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockMutate.mockClear();
  });

  it("redirects unauthenticated users to login", async () => {
    render(<FavoriteArticleButton article={article} />);

    await userEvent.click(screen.getByRole("button"));

    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("shows active state for favorited articles", () => {
    render(
      <FavoriteArticleButton
        article={{ ...article, favorited: true, favoritesCount: 4 }}
      />
    );

    expect(screen.getByRole("button")).toHaveClass("btn-primary");
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
