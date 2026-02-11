/**
 * Supabase Database API Response Contracts
 * Defines expected response shapes from Supabase Database operations
 */

/**
 * Supabase Database Response contract (for SELECT, INSERT, UPDATE, DELETE)
 * @typedef {Object} SupabaseDatabaseResponseContract
 * @property {Array} data - Array of returned records
 * @property {Object} [error] - Error object if operation failed
 * @property {string} [error.message] - Error message
 * @property {number} [count] - Row count for certain operations
 * @property {number} [status] - HTTP status code
 */

/**
 * Loan record contract from database
 * @typedef {Object} LoanRecord
 * @property {string} id - Loan UUID
 * @property {string} user_id - Associated user ID
 * @property {number} amount - Loan amount
 * @property {string} [description] - Loan description
 * @property {string} status - Loan status (pending, approved, rejected)
 * @property {string} created_at - Creation timestamp
 * @property {string} [updated_at] - Update timestamp
 */

/**
 * Validate Supabase database response structure
 * @param {*} response - Response object to validate
 * @returns {{valid: boolean, error: string | null}}
 */
export const validateSupabaseDatabaseResponse = (response) => {
    if (!response || typeof response !== "object") {
        return { valid: false, error: "Response must be an object" };
    }

    // Response must have either data property or error property
    if (!("data" in response) && !("error" in response)) {
        return {
            valid: false,
            error: "Response must have 'data' or 'error' property",
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate loan record structure
 * @param {*} record - Record to validate
 * @returns {boolean}
 */
export const validateLoanRecord = (record) => {
    if (!record || typeof record !== "object") return false;

    return (
        typeof record.id === "string" &&
        typeof record.user_id === "string" &&
        typeof record.amount === "number" &&
        typeof record.status === "string" &&
        record.id.trim().length > 0 &&
        record.user_id.trim().length > 0 &&
        record.amount >= 0
    );
};

/**
 * Check if database response contains errors
 * @param {SupabaseDatabaseResponseContract} response - Database response
 * @returns {boolean}
 */
export const hasDatabaseError = (response) => {
    if (!response) return true;
    return !!(response.error && response.error.message);
};

/**
 * Extract data safely from database response
 * @param {SupabaseDatabaseResponseContract} response - Database response
 * @returns {Array}
 */
export const extractDatabaseData = (response) => {
    if (!response || hasDatabaseError(response)) {
        return [];
    }

    return Array.isArray(response.data) ? response.data : [];
};

/**
 * Get first record from database response
 * @param {SupabaseDatabaseResponseContract} response - Database response
 * @returns {*|null}
 */
export const getFirstRecord = (response) => {
    const data = extractDatabaseData(response);
    return data.length > 0 ? data[0] : null;
};

/**
 * Get row count from database response
 * @param {SupabaseDatabaseResponseContract} response - Database response
 * @returns {number}
 */
export const getDatabaseRowCount = (response) => {
    if (!response) return 0;
    return response.count || 0;
};
