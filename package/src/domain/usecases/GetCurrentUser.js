import { fail, ok } from "../shared/result";

export const makeGetCurrentUser = ({ authRepository }) => {
  return async () => {
    try {
      const user = await authRepository.getCurrentUser();
      return ok(user || null);
    } catch (error) {
      return fail("AUTH_ERROR", error?.message || "Could not load user");
    }
  };
};
