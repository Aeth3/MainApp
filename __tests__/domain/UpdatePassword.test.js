import { makeUpdatePassword } from "../../package/src/domain/usecases/UpdatePassword";

describe("makeUpdatePassword", () => {
  it("returns ok on success", async () => {
    const authRepository = {
      updatePassword: jest.fn().mockResolvedValue(undefined),
    };
    const updatePassword = makeUpdatePassword({ authRepository });

    const result = await updatePassword({ password: "secret123" });

    expect(authRepository.updatePassword).toHaveBeenCalledWith({
      password: "secret123",
    });
    expect(result).toEqual({ ok: true, value: null, error: null });
  });

  it("returns validation error when password is missing", async () => {
    const authRepository = {
      updatePassword: jest.fn(),
    };
    const updatePassword = makeUpdatePassword({ authRepository });

    const result = await updatePassword({ password: "" });

    expect(authRepository.updatePassword).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Password is required",
    });
  });
});
