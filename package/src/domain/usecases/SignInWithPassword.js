import { createEmail } from "../entities/Email";
import { fail, ok } from "../shared/result";

export const makeSignInWithPassword = ({ authRepository }) => {
  return async ({ email, password }) => {
    try {
      const normalizedEmail = createEmail(email);
      const normalizedPassword =
        typeof password === "string" ? password : "";

      if (!normalizedPassword) {
        return fail("VALIDATION_ERROR", "Password is required");
      }

      const authResult = await authRepository.signInWithPassword({
        email: normalizedEmail,
        password: normalizedPassword,
      });

      if (!authResult?.user) {
        return fail("AUTH_ERROR", "No user returned from auth provider");
      }

      if (!authResult?.session) {
        return fail("AUTH_ERROR", "No session returned from auth provider");
      }

      return ok(authResult);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Login failed");
    }
  };
};
