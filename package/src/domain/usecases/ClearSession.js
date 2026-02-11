import { fail, ok } from "../shared/result";

export const makeClearSession = ({ sessionRepository }) => {
  return async () => {
    try {
      await sessionRepository.clearSession();
      return ok(null);
    } catch (error) {
      return fail("SESSION_ERROR", error?.message || "Could not clear session");
    }
  };
};
