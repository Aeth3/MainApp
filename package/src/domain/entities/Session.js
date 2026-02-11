import { createUser } from "./User";

const normalizeAccessToken = (value) => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (value && typeof value === "object" && typeof value.token === "string") {
    return value.token.trim();
  }

  return "";
};

export const createSession = (input) => {
  const access_token = normalizeAccessToken(input?.access_token);

  if (!access_token) {
    throw new Error("Session access token is required");
  }

  const refresh_token =
    typeof input?.refresh_token === "string" ? input.refresh_token : undefined;

  const user = input?.user ? createUser(input.user) : undefined;

  return Object.freeze({
    access_token,
    refresh_token,
    user,
  });
};
