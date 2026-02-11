import { makeRequestPasswordReset } from "../../package/src/domain/usecases/RequestPasswordReset";

describe("makeRequestPasswordReset", () => {
  it("normalizes email and returns ok on success", async () => {
    const authRepository = {
      requestPasswordReset: jest.fn().mockResolvedValue(undefined),
    };
    const requestPasswordReset = makeRequestPasswordReset({ authRepository });

    const result = await requestPasswordReset({ email: "  USER@Example.com " });

    expect(authRepository.requestPasswordReset).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(result).toEqual({ ok: true, value: null, error: null });
  });

  it("returns auth error for invalid email", async () => {
    const authRepository = {
      requestPasswordReset: jest.fn(),
    };
    const requestPasswordReset = makeRequestPasswordReset({ authRepository });

    const result = await requestPasswordReset({ email: "bad-email" });

    expect(authRepository.requestPasswordReset).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "AUTH_ERROR",
      message: "Invalid email format",
    });
  });
});
