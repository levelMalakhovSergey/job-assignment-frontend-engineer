import { getApiErrors } from "./getApiErrors";
import { getAuthorImageUrl } from "./getAuthorImageUrl";
import { PLACEHOLDER_USER_IMAGE } from "./constants";

describe("getApiErrors", () => {
  it("returns formatted error messages when axios response errors exist", () => {
    const error = {
      response: {
        data: {
          errors: {
            email: ["is invalid", "cannot be blank"],
            password: ["is too short"],
          },
        },
      },
    } as unknown;

    expect(getApiErrors(error)).toEqual([
      "email is invalid",
      "email cannot be blank",
      "password is too short",
    ]);
  });

  it("returns fallback message when response data errors are missing", () => {
    const error = {} as unknown;

    expect(getApiErrors(error)).toEqual([
      "Something went wrong. Please try again.",
    ]);
  });
});

describe("getAuthorImageUrl", () => {
  it("returns the provided image URL when it is non-empty", () => {
    expect(getAuthorImageUrl("https://example.com/avatar.png")).toBe(
      "https://example.com/avatar.png"
    );
  });

  it("returns the placeholder image when the provided image is empty or invalid", () => {
    expect(getAuthorImageUrl("")).toBe(PLACEHOLDER_USER_IMAGE);
    expect(getAuthorImageUrl("   ")).toBe(PLACEHOLDER_USER_IMAGE);
    expect(getAuthorImageUrl(null)).toBe(PLACEHOLDER_USER_IMAGE);
    expect(getAuthorImageUrl(undefined)).toBe(PLACEHOLDER_USER_IMAGE);
  });
});
