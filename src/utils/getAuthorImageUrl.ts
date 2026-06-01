import { PLACEHOLDER_USER_IMAGE } from "./constants";

export function getAuthorImageUrl(image?: string | null): string {
  return image?.trim() ? image : PLACEHOLDER_USER_IMAGE;
}
