export const env = {
  apiUrl: process.env.REACT_APP_API_URL ?? "http://localhost:3000/api",
} as const;
