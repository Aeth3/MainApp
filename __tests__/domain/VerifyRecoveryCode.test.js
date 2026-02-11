import { makeVerifyRecoveryCode } from "../../package/src/domain/usecases/VerifyRecoveryCode";

describe("makeVerifyRecoveryCode", () => {
  it("normalizes inputs and returns ok on success", async () => {
    const authRepository = {
      verifyRecoveryCode: jest.fn().mockResolvedValue(undefined),
    };
    const verifyRecoveryCode = makeVerifyRecoveryCode({ authRepository });

    const result = await verifyRecoveryCode({
      email: "  USER@Example.com ",
      code: " 1234 ",
    });

    expect(authRepository.verifyRecoveryCode).toHaveBeenCalledWith({
      email: "user@example.com",
      code: "1234",
    });
    expect(result).toEqual({ ok: true, value: null, error: null });
  });

  it("returns validation error when code is missing", async () => {
    const authRepository = {
      verifyRecoveryCode: jest.fn(),
    };
    const verifyRecoveryCode = makeVerifyRecoveryCode({ authRepository });

    const result = await verifyRecoveryCode({
      email: "user@example.com",
      code: "",
    });

    expect(authRepository.verifyRecoveryCode).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Code is required",
    });
  });
});
