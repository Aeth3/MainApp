import {
  clearSession,
  requestPasswordReset,
  saveSession,
  signInWithPassword,
  signOut,
  updatePassword,
  verifyRecoveryCode,
} from "../../composition/authSession";
import { useGlobal } from "../../../context/context";

export const useAuth = () => {
  const { setAuth, setLoading } = useGlobal();

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithPassword({ email, password });
      if (!result?.ok) {
        return {
          success: false,
          error: result?.error?.message || "Login failed",
        };
      }

      const { user, session } = result.value;

      await saveSession(session);

      setAuth(user);
      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error.message);
      const errorMsg = error.message || "Login failed";
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const result = await signOut();
      if (!result?.ok) {
        throw new Error(result?.error?.message || "Sign out failed");
      }

      await clearSession();
      setAuth(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const result = await requestPasswordReset({ email });

      if (!result?.ok) {
        return {
          success: false,
          error: result?.error?.message || "Failed to request password reset",
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to request password reset",
      };
    } finally {
      setLoading(false);
    }
  };

  const validateRecoveryCode = async (email, code) => {
    try {
      setLoading(true);
      const result = await verifyRecoveryCode({ email, code });

      if (!result?.ok) {
        return {
          success: false,
          error: result?.error?.message || "Invalid code",
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Invalid code",
      };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (password) => {
    try {
      setLoading(true);
      const result = await updatePassword({ password });

      if (!result?.ok) {
        return {
          success: false,
          error: result?.error?.message || "Failed to update password",
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to update password",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    forgotPassword,
    validateRecoveryCode,
    changePassword,
  };
};
