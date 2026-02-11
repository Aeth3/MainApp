import { asyncStorageAdapter as storage } from "../src/infra/storage/asyncStorageAdapter";

/**
 * Save a value to storage
 * @param {string} key
 * @param {any} value
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await storage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`[Storage] Error saving ${key}:`, error);
  }
};

/**
 * Retrieve a value from storage
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export const getData = async (key) => {
  try {
    const jsonValue = await storage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`[Storage] Error getting ${key}:`, error);
    return null;
  }
};

/**
 * Remove a specific key from storage
 * @param {string} key
 */
export const removeData = async (key) => {
  try {
    await storage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing ${key}:`, error);
  }
};

/**
 * Clear all data in storage
 */
export const clearStorage = async () => {
  try {
    await storage.clear();
  } catch (error) {
    console.error("[Storage] Error clearing storage:", error);
  }
};

// SAVE
export const saveItem = async (key, value) => {
  try {
    const storedValue = typeof value === "object" ? JSON.stringify(value) : value;
    await storage.setItem(key, storedValue);
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

export const saveAuthToken = async (token) => {
  try {
    await storage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveBarangayId = async (id) => {
  try {
    await storage.setItem("barangayId", id);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveUsername = async (username) => {
  try {
    await storage.setItem("username", username);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveQuestionnaires = async (questions) => {
  try {
    await storage.setItem("questions", JSON.stringify(questions));
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// FETCH
export const getItem = async (key) => {
  try {
    const value = await storage.getItem(key);
    if (!value) return null;

    try {
      const parsedValue = JSON.parse(value);
      if (typeof parsedValue === "object" && parsedValue !== null) {
        return parsedValue;
      }
    } catch (error) {
      // stored value is not JSON
    }

    return value;
  } catch (error) {
    console.error("Error retrieving item:", error);
    return null;
  }
};

export const getAuthToken = async () => {
  try {
    return await storage.getItem("authToken");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getBarangayId = async () => {
  try {
    return await storage.getItem("barangayId");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getUsername = async () => {
  try {
    return await storage.getItem("username");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getQuestionnaires = async () => {
  try {
    const storedData = await storage.getItem("questions");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// REMOVE
export const removeAuthToken = async () => {
  try {
    await storage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
