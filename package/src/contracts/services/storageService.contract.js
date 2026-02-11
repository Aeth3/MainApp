/**
 * Storage Service Contract
 * Defines the interface for storage operations (AsyncStorage, Supabase Storage, etc.)
 */

/**
 * Storage service interface contract
 * @typedef {Object} StorageServiceContract
 * @property {Function} getItem - Retrieve item from storage
 * @property {Function} setItem - Store item in storage
 * @property {Function} removeItem - Remove item from storage
 * @property {Function} clear - Clear all items from storage
 */

/**
 * Validate storage key format
 * @param {*} key - Key to validate
 * @returns {boolean}
 */
export const isValidStorageKey = (key) => {
    return typeof key === "string" && key.trim().length > 0;
};

/**
 * Validate storage value format
 * @param {*} value - Value to validate
 * @returns {boolean}
 */
export const isValidStorageValue = (value) => {
    if (value === null) return true; // null is valid (used for deletion)
    return typeof value === "string" && value.trim().length >= 0;
};

/**
 * Define storage key constants to prevent typos
 * @enum {string}
 */
export const StorageKeys = {
    // Session storage
    SESSION_ACCESS_TOKEN: "session:access_token",
    SESSION_REFRESH_TOKEN: "session:refresh_token",
    SESSION_USER_ID: "session:user_id",
    SESSION_EXPIRY: "session:expiry",

    // User storage
    USER_PROFILE: "user:profile",
    USER_PREFERENCES: "user:preferences",
    USER_THEME: "user:theme",

    // App state
    APP_FIRST_LAUNCH: "app:first_launch",
    APP_VERSION: "app:version",
    APP_LAST_SYNC: "app:last_sync",

    // Offline queue
    OFFLINE_REQUESTS_QUEUE: "offline:requests_queue",
};

/**
 * Get default value for a storage key
 * @param {string} key - Storage key
 * @returns {string|null}
 */
export const getDefaultStorageValue = (key) => {
    const defaults = {
        [StorageKeys.SESSION_EXPIRY]: "0",
        [StorageKeys.APP_FIRST_LAUNCH]: "false",
        [StorageKeys.OFFLINE_REQUESTS_QUEUE]: "[]",
    };

    return defaults[key] || null;
};

/**
 * Validate session storage has required keys
 * @param {Object} storageData - Storage data map
 * @returns {{valid: boolean, missing: string[]}}
 */
export const validateSessionStorage = (storageData) => {
    const required = [
        StorageKeys.SESSION_ACCESS_TOKEN,
        StorageKeys.SESSION_USER_ID,
    ];

    const missing = required.filter((key) => !storageData?.[key]);

    return {
        valid: missing.length === 0,
        missing,
    };
};

/**
 * Normalize storage error
 * @param {Error} error - Storage error
 * @returns {string}
 */
export const normalizeStorageError = (error) => {
    if (!error) return "Unknown storage error";

    const message = String(error?.message || "").toLowerCase();

    if (message.includes("quota")) {
        return "Storage quota exceeded";
    }

    if (message.includes("permission")) {
        return "Storage access denied";
    }

    return error?.message || "Storage operation failed";
};
