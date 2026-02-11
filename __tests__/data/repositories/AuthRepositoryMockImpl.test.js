import { AuthRepositoryMockImpl } from "../../../package/src/data/repositories/AuthRepositoryMockImpl";

describe("AuthRepositoryMockImpl", () => {
  it("signInWithPassword returns user+session and updates current user", async () => {
    const repo = new AuthRepositoryMockImpl();

    const result = await repo.signInWithPassword({
      email: "tester@example.com",
      password: "secret123",
    });

    expect(result.user).toEqual(
      expect.objectContaining({
        email: "tester@example.com",
      })
    );
    expect(result.session).toEqual(
      expect.objectContaining({
        access_token: expect.stringMatching(/^demo_access_/),
        refresh_token: expect.stringMatching(/^demo_refresh_/),
      })
    );
    await expect(repo.getCurrentUser()).resolves.toEqual(result.user);
  });

  it("signOut clears current user", async () => {
    const repo = new AuthRepositoryMockImpl();
    await repo.signInWithPassword({
      email: "tester@example.com",
      password: "secret123",
    });

    await repo.signOut();
    await expect(repo.getCurrentUser()).resolves.toBeNull();
  });

  it("recovery flow validates email+code", async () => {
    const repo = new AuthRepositoryMockImpl();

    await repo.requestPasswordReset({ email: "user@example.com" });
    await expect(
      repo.verifyRecoveryCode({ email: "user@example.com", code: "1234" })
    ).resolves.toBeUndefined();

    await expect(
      repo.verifyRecoveryCode({ email: "other@example.com", code: "1234" })
    ).rejects.toThrow("Invalid recovery code");
  });

  it("updatePassword validates required password", async () => {
    const repo = new AuthRepositoryMockImpl();

    await expect(repo.updatePassword({ password: "nextPassword" })).resolves.toBeUndefined();
    await expect(repo.updatePassword({ password: "" })).rejects.toThrow("Password is required");
  });
});
