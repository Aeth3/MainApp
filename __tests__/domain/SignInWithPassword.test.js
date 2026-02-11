import { makeSignInWithPassword } from "../../package/src/domain/usecases/SignInWithPassword";

describe("makeSignInWithPassword", () => {
  it("returns ok and calls repository with normalized email", async () => {
    const authRepository = {
      signInWithPassword: jest.fn().mockResolvedValue({
        user: { id: "u1" },
        session: { access_token: "token" },
      }),
    };
    const signInWithPassword = makeSignInWithPassword({ authRepository });

    const result = await signInWithPassword({
      email: "  USER@Example.com ",
      password: "secret123",
    });

    expect(authRepository.signInWithPassword).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
    });
    expect(result).toEqual({
      ok: true,
      value: { user: { id: "u1" }, session: { access_token: "token" } },
      error: null,
    });
  });

  it("returns validation error when password is missing", async () => {
    const authRepository = {
      signInWithPassword: jest.fn(),
    };
    const signInWithPassword = makeSignInWithPassword({ authRepository });

    const result = await signInWithPassword({
      email: "user@example.com",
      password: "",
    });

    expect(authRepository.signInWithPassword).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Password is required",
    });
  });

  it("returns auth error when repository has no user", async () => {
    const authRepository = {
      signInWithPassword: jest.fn().mockResolvedValue({
        user: null,
        session: { access_token: "token" },
      }),
    };
    const signInWithPassword = makeSignInWithPassword({ authRepository });

    const result = await signInWithPassword({
      email: "user@example.com",
      password: "secret123",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "AUTH_ERROR",
      message: "No user returned from auth provider",
    });
  });

  it("returns auth error when repository throws", async () => {
    const authRepository = {
      signInWithPassword: jest.fn().mockRejectedValue(new Error("Network down")),
    };
    const signInWithPassword = makeSignInWithPassword({ authRepository });

    const result = await signInWithPassword({
      email: "user@example.com",
      password: "secret123",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "AUTH_ERROR",
      message: "Network down",
    });
  });
});
