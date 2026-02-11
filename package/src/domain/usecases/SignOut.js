import { fail, ok } from "../shared/result";

export const makeSignOut = ({ authRepository }) => {
  return async () => {
    try {
      await authRepository.signOut();
      return ok(null);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Sign out failed");
    }
  };
};
