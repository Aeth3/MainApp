import { makeSignUp } from "../../package/src/domain/usecases/SignUp";

describe("makeSignUp", () => {
  it("returns ok and sends normalized payload to repository", async () => {
    const authRepository = {
      signUp: jest.fn().mockResolvedValue({
        user: { id: "u1" },
        session: { access_token: "token" },
      }),
    };
    const signUp = makeSignUp({ authRepository });

    const result = await signUp({
      email: "  USER@Example.com ",
      password: "secret123",
      first_name: "  Jane ",
      last_name: " Doe  ",
    });

    expect(authRepository.signUp).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
      first_name: "Jane",
      last_name: "Doe",
    });
    expect(result.ok).toBe(true);
    expect(result.value).toEqual({
      user: { id: "u1" },
      session: { access_token: "token" },
    });
  });

  it("returns validation error when password is missing", async () => {
    const authRepository = {
      signUp: jest.fn(),
    };
    const signUp = makeSignUp({ authRepository });

    const result = await signUp({
      email: "user@example.com",
      password: "",
      first_name: "Jane",
      last_name: "Doe",
    });

    expect(authRepository.signUp).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Password is required",
    });
  });

  it("returns auth error when repository has no user", async () => {
    const authRepository = {
      signUp: jest.fn().mockResolvedValue({
        user: null,
        session: null,
      }),
    };
    const signUp = makeSignUp({ authRepository });

    const result = await signUp({
      email: "user@example.com",
      password: "secret123",
      first_name: "Jane",
      last_name: "Doe",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toEqual({
      code: "AUTH_ERROR",
      message: "No user returned from auth provider",
    });
  });
});
