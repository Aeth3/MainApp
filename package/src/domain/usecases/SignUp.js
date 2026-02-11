import { createEmail } from "../entities/Email";
import { fail, ok } from "../shared/result";

export const makeSignUp = ({ authRepository }) => {
  return async ({ email, password, first_name, last_name }) => {
    try {
      const normalizedEmail = createEmail(email);
      const normalizedPassword = typeof password === "string" ? password : "";
      const normalizedFirstName =
        typeof first_name === "string" ? first_name.trim() : "";
      const normalizedLastName =
        typeof last_name === "string" ? last_name.trim() : "";

      if (!normalizedPassword) {
        return fail("VALIDATION_ERROR", "Password is required");
      }

      const authResult = await authRepository.signUp({
        email: normalizedEmail,
        password: normalizedPassword,
        first_name: normalizedFirstName || undefined,
        last_name: normalizedLastName || undefined,
      });

      if (!authResult?.user) {
        return fail("AUTH_ERROR", "No user returned from auth provider");
      }

      return ok(authResult);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Sign up failed");
    }
  };
};
