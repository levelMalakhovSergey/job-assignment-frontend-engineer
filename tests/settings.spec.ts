import { test, expect } from "@playwright/test";

test("settings page updates user profile", async ({ page }) => {
  const updatedUser = {
    username: "testuser",
    email: "testuser@example.com",
    bio: "Updated bio",
    image: "https://example.com/avatar.png",
    token: "fake-jwt-token",
  };

  await page.addInitScript((user) => {
    localStorage.setItem("token", JSON.stringify(user.token));
    localStorage.setItem("user", JSON.stringify(user));
  }, updatedUser);

  await page.route("**/api/user", async (route) => {
    const request = route.request();
    if (request.method() === "PUT") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ user: updatedUser }),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/settings");
  await expect(page.getByTestId("settings-username")).toHaveValue(updatedUser.username);

  await page.getByTestId("settings-bio").fill("Updated bio from playwright");
  await page.getByTestId("settings-email").fill(updatedUser.email);
  await page.getByTestId("settings-password").fill("newpassword123");

  await Promise.all([
    page.waitForResponse((response) =>
      response.url().endsWith("/api/user") && response.status() === 200
    ),
    page.getByTestId("settings-submit").click(),
  ]);

  await expect(page.locator("text=Settings updated")).toBeVisible();
});
