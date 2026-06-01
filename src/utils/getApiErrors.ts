import { AxiosError } from "axios";

import { ApiErrorBody } from "../types";

export function getApiErrors(error: unknown): string[] {
  const axiosError = error as AxiosError<ApiErrorBody>;

  if (!axiosError.response?.data?.errors) {
    return ["Something went wrong. Please try again."];
  }

  return Object.entries(axiosError.response.data.errors).flatMap(
    ([field, messages]) => messages.map((message) => `${field} ${message}`)
  );
}
