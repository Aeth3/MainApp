import { fail, ok } from "../shared/result";

export const makeGetSession = ({ sessionRepository }) => {
  return async () => {
    try {
      const session = await sessionRepository.getSession();
      return ok(session || null);
    } catch (error) {
      return fail("SESSION_ERROR", error?.message || "Could not load session");
    }
  };
};
