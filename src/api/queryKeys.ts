export const queryKeys = {
  auth: {
    login: ["auth", "login"] as const,
  },
  articles: {
    all: ["articles"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.articles.all, "list", params] as const,
    detail: (slug: string) =>
      [...queryKeys.articles.all, "detail", slug] as const,
  },
  profiles: {
    all: ["profiles"] as const,
    detail: (username: string) =>
      [...queryKeys.profiles.all, username] as const,
  },
};
