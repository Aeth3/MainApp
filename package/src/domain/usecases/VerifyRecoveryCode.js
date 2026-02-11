import { createEmail } from "../entities/Email";
import { fail, ok } from "../shared/result";

export const makeVerifyRecoveryCode = ({ authRepository }) => {
  return async ({ email, code }) => {
    try {
      const normalizedEmail = createEmail(email);
      const normalizedCode = typeof code === "string" ? code.trim() : "";

      if (!normalizedCode) {
        return fail("VALIDATION_ERROR", "Code is required");
      }

      await authRepository.verifyRecoveryCode({
        email: normalizedEmail,
        code: normalizedCode,
      });

      return ok(null);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Could not verify recovery code");
    }
  };
};
