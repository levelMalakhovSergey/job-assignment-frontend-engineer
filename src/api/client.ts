import axios, { AxiosInstance } from "axios";

import { env } from "../config/env";
import { getAuthToken } from "../store/auth";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});
