import { fail, ok } from "../shared/result";

export const makeUpdatePassword = ({ authRepository }) => {
  return async ({ password }) => {
    try {
      const normalizedPassword = typeof password === "string" ? password : "";

      if (!normalizedPassword) {
        return fail("VALIDATION_ERROR", "Password is required");
      }

      await authRepository.updatePassword({ password: normalizedPassword });
      return ok(null);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Could not update password");
    }
  };
};
