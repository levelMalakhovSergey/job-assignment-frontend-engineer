export type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  followersCount?: number;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type ArticlesQueryParams = {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
};

export type MultipleArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export type SingleArticleResponse = {
  article: Article;
};

export type ProfileResponse = {
  profile: Profile;
};

export type UserResponse = {
  user: User;
};

export type LoginUserRequest = {
  user: LoginUser;
};

export type ApiErrorBody = {
  errors: Record<string, string[]>;
};
