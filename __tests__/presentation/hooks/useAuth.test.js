import React from "react";
import renderer, { act } from "react-test-renderer";
import { useAuth } from "../../../package/src/presentation/hooks/useAuth";
import { useGlobal } from "../../../package/context/context";
import {
  clearSession,
  requestPasswordReset,
  saveSession,
  signInWithPassword,
  signOut,
  updatePassword,
  verifyRecoveryCode,
} from "../../../package/src/composition/authSession";

jest.mock("../../../package/context/context", () => ({
  useGlobal: jest.fn(),
}));

jest.mock("../../../package/src/composition/authSession", () => ({
  clearSession: jest.fn(),
  requestPasswordReset: jest.fn(),
  saveSession: jest.fn(),
  signInWithPassword: jest.fn(),
  signOut: jest.fn(),
  updatePassword: jest.fn(),
  verifyRecoveryCode: jest.fn(),
}));

const setupHook = () => {
  let hookApi;
  function HookHarness() {
    hookApi = useAuth();
    return null;
  }

  act(() => {
    renderer.create(<HookHarness />);
  });

  return hookApi;
};

describe("useAuth", () => {
  let setAuth;
  let setLoading;

  beforeEach(() => {
    jest.clearAllMocks();
    setAuth = jest.fn();
    setLoading = jest.fn();
    useGlobal.mockReturnValue({ setAuth, setLoading });
  });

  it("login returns success and stores session/user", async () => {
    signInWithPassword.mockResolvedValue({
      ok: true,
      value: {
        user: { id: "u1", email: "user@example.com" },
        session: { access_token: "token" },
      },
    });
    saveSession.mockResolvedValue(undefined);
    const auth = setupHook();

    let result;
    await act(async () => {
      result = await auth.login("user@example.com", "secret123");
    });

    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
    });
    expect(saveSession).toHaveBeenCalledWith({ access_token: "token" });
    expect(setAuth).toHaveBeenCalledWith({ id: "u1", email: "user@example.com" });
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
    expect(result).toEqual({
      success: true,
      user: { id: "u1", email: "user@example.com" },
    });
  });

  it("login returns failure when usecase is not ok", async () => {
    signInWithPassword.mockResolvedValue({
      ok: false,
      error: { message: "Invalid credentials" },
    });
    const auth = setupHook();

    let result;
    await act(async () => {
      result = await auth.login("user@example.com", "bad");
    });

    expect(result).toEqual({ success: false, error: "Invalid credentials" });
    expect(saveSession).not.toHaveBeenCalled();
    expect(setAuth).not.toHaveBeenCalled();
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
  });

  it("logout clears session and resets auth on success", async () => {
    signOut.mockResolvedValue({ ok: true });
    clearSession.mockResolvedValue(undefined);
    const auth = setupHook();

    await act(async () => {
      await auth.logout();
    });

    expect(signOut).toHaveBeenCalled();
    expect(clearSession).toHaveBeenCalled();
    expect(setAuth).toHaveBeenCalledWith(null);
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
  });

  it("forgotPassword returns success/failure based on usecase result", async () => {
    const auth = setupHook();

    requestPasswordReset.mockResolvedValueOnce({ ok: true });
    let successResult;
    await act(async () => {
      successResult = await auth.forgotPassword("user@example.com");
    });
    expect(successResult).toEqual({ success: true });

    requestPasswordReset.mockResolvedValueOnce({
      ok: false,
      error: { message: "Email not found" },
    });
    let failedResult;
    await act(async () => {
      failedResult = await auth.forgotPassword("user@example.com");
    });
    expect(failedResult).toEqual({ success: false, error: "Email not found" });
  });

  it("validateRecoveryCode returns success/failure based on usecase result", async () => {
    const auth = setupHook();

    verifyRecoveryCode.mockResolvedValueOnce({ ok: true });
    let successResult;
    await act(async () => {
      successResult = await auth.validateRecoveryCode("user@example.com", "1234");
    });
    expect(successResult).toEqual({ success: true });

    verifyRecoveryCode.mockResolvedValueOnce({
      ok: false,
      error: { message: "Invalid code" },
    });
    let failedResult;
    await act(async () => {
      failedResult = await auth.validateRecoveryCode("user@example.com", "9999");
    });
    expect(failedResult).toEqual({ success: false, error: "Invalid code" });
  });

  it("changePassword returns success/failure based on usecase result", async () => {
    const auth = setupHook();

    updatePassword.mockResolvedValueOnce({ ok: true });
    let successResult;
    await act(async () => {
      successResult = await auth.changePassword("secret123");
    });
    expect(successResult).toEqual({ success: true });

    updatePassword.mockResolvedValueOnce({
      ok: false,
      error: { message: "Weak password" },
    });
    let failedResult;
    await act(async () => {
      failedResult = await auth.changePassword("123");
    });
    expect(failedResult).toEqual({ success: false, error: "Weak password" });
  });
});
