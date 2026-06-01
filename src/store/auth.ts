import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { User } from "../types";

const TOKEN_STORAGE_KEY = "token";
const USER_STORAGE_KEY = "user";

export const tokenAtom = atomWithStorage<string | null>(
  TOKEN_STORAGE_KEY,
  null
);

export const userAtom = atomWithStorage<User | null>(USER_STORAGE_KEY, null);

export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);

let authToken: string | null = readTokenFromStorage();

function readTokenFromStorage(): string | null {
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (raw === null) {
      return null;
    }

    return JSON.parse(raw) as string | null;
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  return authToken;
}

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export const setSessionAtom = atom(null, (_get, set, user: User) => {
  setAuthToken(user.token);
  set(tokenAtom, user.token);
  set(userAtom, user);
});

export const clearSessionAtom = atom(null, (_get, set) => {
  setAuthToken(null);
  set(tokenAtom, null);
  set(userAtom, null);
});
