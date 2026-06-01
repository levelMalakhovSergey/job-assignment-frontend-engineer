import { test, expect } from "@playwright/test";

test("editor page can create new article", async ({ page }) => {
  const newArticle = {
    slug: "test-article-playwright",
    title: "Playwright Test Article",
    description: "Article created during end-to-end test",
    body: "This is the body of the article.",
    tagList: ["playwright", "e2e"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "testuser",
      bio: "Test user bio",
      image: "",
      following: false,
    },
  };

  await page.route("**/api/articles", async (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ article: newArticle }),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/editor");
  await expect(page).toHaveURL(/.*editor/);

  await page.getByTestId("editor-title").fill(newArticle.title);
  await page.getByTestId("editor-description").fill(newArticle.description);
  await page.getByTestId("editor-body").fill(newArticle.body);
  await page.getByTestId("editor-tags").fill(newArticle.tagList.join(", "));

  await Promise.all([
    page.waitForURL(`**/${newArticle.slug}`),
    page.getByTestId("editor-submit").click(),
  ]);

  await expect(page.locator("text=Playwright Test Article")).toBeVisible();
});
