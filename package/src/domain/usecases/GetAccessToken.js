import { ok, fail } from "../shared/result";

export const makeGetAccessToken = ({ sessionRepository }) => {
  return async () => {
    try {
      const accessToken = await sessionRepository.getAccessToken()
      return ok(accessToken || null)
    } catch (error) {
      return fail("GET_ACCESS_TOKEN_ERROR", error?.message || "Could not get the access token")
    }
  }
};
