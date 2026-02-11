const loadApiHandlerModule = ({ isAxiosError = () => false } = {}) => {
  jest.resetModules();

  const toastShow = jest.fn();
  const axios = { isAxiosError: jest.fn(isAxiosError) };

  jest.doMock("react-native-root-toast", () => ({
    __esModule: true,
    default: {
      show: toastShow,
      durations: {
        SHORT: "SHORT",
        LONG: "LONG",
      },
      positions: {
        BOTTOM: "BOTTOM",
      },
    },
  }));

  jest.doMock("axios", () => ({
    __esModule: true,
    default: axios,
    isAxiosError: axios.isAxiosError,
  }));

  let moduleUnderTest;
  jest.isolateModules(() => {
    moduleUnderTest = require("../../../package/src/infra/http/apiHandler");
  });

  return { moduleUnderTest, toastShow, axios };
};

describe("handleApiRequest", () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("returns response data for success path", async () => {
    const { moduleUnderTest, toastShow } = loadApiHandlerModule();
    const apiCall = jest.fn(async () => ({ data: { id: 1 } }));

    const result = await moduleUnderTest.handleApiRequest(apiCall);

    expect(result).toEqual({ id: 1 });
    expect(toastShow).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("shows success toast when showSuccess=true", async () => {
    const { moduleUnderTest, toastShow } = loadApiHandlerModule();
    const apiCall = jest.fn(async () => ({ data: { ok: true } }));

    await moduleUnderTest.handleApiRequest(apiCall, {
      showSuccess: true,
      successMessage: "Done",
    });

    expect(toastShow).toHaveBeenCalledWith(
      "Done",
      expect.objectContaining({ duration: "SHORT", position: "BOTTOM" })
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("handles invalid token with auto logout hooks", async () => {
    const { moduleUnderTest, toastShow } = loadApiHandlerModule();
    const clearSessionAction = jest.fn(async () => undefined);
    const onUnauthorized = jest.fn();
    const apiCall = jest.fn(async () => ({
      success: false,
      message: "Invalid token provided",
    }));

    await expect(
      moduleUnderTest.handleApiRequest(apiCall, {
        clearSessionAction,
        onUnauthorized,
      })
    ).rejects.toThrow("Invalid token");

    expect(clearSessionAction).toHaveBeenCalled();
    expect(onUnauthorized).toHaveBeenCalled();
    expect(toastShow).toHaveBeenCalledWith(
      "Session expired. Please log in again.",
      expect.objectContaining({ duration: "LONG", position: "BOTTOM" })
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "API Handler Error:",
      expect.any(Error)
    );
  });

  it("handles axios 401 in catch by logging out and returning", async () => {
    const { moduleUnderTest, toastShow } = loadApiHandlerModule({
      isAxiosError: () => true,
    });

    const clearSessionAction = jest.fn(async () => undefined);
    const onUnauthorized = jest.fn();
    const axios401 = {
      response: { status: 401 },
      message: "Unauthorized",
    };
    const apiCall = jest.fn(async () => {
      throw axios401;
    });

    const result = await moduleUnderTest.handleApiRequest(apiCall, {
      clearSessionAction,
      onUnauthorized,
    });

    expect(result).toBeUndefined();
    expect(clearSessionAction).toHaveBeenCalled();
    expect(onUnauthorized).toHaveBeenCalled();
    expect(toastShow).toHaveBeenCalledWith(
      "Session expired. Please log in again.",
      expect.objectContaining({ duration: "LONG", position: "BOTTOM" })
    );
    expect(errorSpy).toHaveBeenCalledWith("API Handler Error:", axios401);
  });

  it("rethrows non-axios error and shows fallback error toast", async () => {
    const { moduleUnderTest, toastShow } = loadApiHandlerModule({
      isAxiosError: () => false,
    });

    const apiCall = jest.fn(async () => {
      throw new Error("Boom");
    });

    await expect(
      moduleUnderTest.handleApiRequest(apiCall, {
        errorMessage: "Request failed",
      })
    ).rejects.toThrow("Boom");

    expect(toastShow).toHaveBeenCalledWith(
      "Request failed",
      expect.objectContaining({ duration: "SHORT", position: "BOTTOM" })
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "API Handler Error:",
      expect.any(Error)
    );
  });
});
