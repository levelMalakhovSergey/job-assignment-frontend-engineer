/// <reference types="react-scripts" />

declare module "*.webp";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
  }
}
