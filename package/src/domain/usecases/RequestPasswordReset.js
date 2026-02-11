import { createEmail } from "../entities/Email";
import { fail, ok } from "../shared/result";

export const makeRequestPasswordReset = ({ authRepository }) => {
  return async ({ email }) => {
    try {
      const normalizedEmail = createEmail(email);
      await authRepository.requestPasswordReset({ email: normalizedEmail });
      return ok(null);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Could not request password reset");
    }
  };
};
