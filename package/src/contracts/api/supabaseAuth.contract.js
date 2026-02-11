/**
 * Supabase Auth API Response Contracts
 * Defines expected response shapes from Supabase Auth endpoints
 */

/**
 * Supabase User object contract
 * @typedef {Object} SupabaseUserContract
 * @property {string} id - User UUID
 * @property {string} email - User email
 * @property {string} [phone] - User phone (optional)
 * @property {boolean} email_confirmed_at - Email confirmation timestamp
 * @property {Object} [user_metadata] - User metadata from auth
 * @property {Object} [raw_user_meta_data] - Raw user metadata
 * @property {string} [created_at] - User creation timestamp
 * @property {string} [updated_at] - User update timestamp
 */

/**
 * Supabase Session object contract
 * @typedef {Object} SupabaseSessionContract
 * @property {string} access_token - JWT access token
 * @property {string} refresh_token - Refresh token for renewing session
 * @property {number} expires_in - Token expiration in seconds
 * @property {string} token_type - Token type (e.g., "bearer")
 * @property {string} [user_id] - Associated user ID
 */

/**
 * Supabase Auth Response contract
 * @typedef {Object} SupabaseAuthResponseContract
 * @property {Object} data - Response data
 * @property {SupabaseUserContract} [data.user] - User object after auth operation
 * @property {SupabaseSessionContract} [data.session] - Session object if created
 * @property {Object} [error] - Error object if operation failed
 * @property {string} [error.message] - Error message
 */

/**
 * Validate Supabase user response
 * @param {*} user - User object to validate
 * @returns {boolean}
 */
export const validateSupabaseUser = (user) => {
    if (!user || typeof user !== "object") return false;

    return (
        typeof user.id === "string" &&
        typeof user.email === "string" &&
        user.id.trim().length > 0 &&
        user.email.trim().length > 0
    );
};

/**
 * Validate Supabase session response
 * @param {*} session - Session object to validate
 * @returns {boolean}
 */
export const validateSupabaseSession = (session) => {
    if (!session || typeof session !== "object") return false;

    return (
        typeof session.access_token === "string" &&
        typeof session.token_type === "string" &&
        session.access_token.trim().length > 0
    );
};

/**
 * Validate Supabase auth response
 * @param {*} response - Response object to validate
 * @returns {{valid: boolean, error: string | null}}
 */
export const validateSupabaseAuthResponse = (response) => {
    if (!response || typeof response !== "object") {
        return { valid: false, error: "Response must be an object" };
    }

    if (!("data" in response)) {
        return { valid: false, error: "Response must have 'data' property" };
    }

    const { data, error } = response;

    // If error exists, auth failed
    if (error) {
        return {
            valid: false,
            error: error.message || "Auth operation failed",
        };
    }

    // For successful auth, must have user
    if (!data?.user) {
        return { valid: false, error: "Response data must contain user object" };
    }

    const userValid = validateSupabaseUser(data.user);
    if (!userValid) {
        return {
            valid: false,
            error: "User object structure is invalid",
        };
    }

    return { valid: true, error: null };
};

/**
 * Extract user metadata with fallbacks
 * @param {SupabaseUserContract} supabaseUser - Supabase user object
 * @returns {Object} Normalized metadata
 */
export const extractSupabaseUserMetadata = (supabaseUser) => {
    if (!supabaseUser) {
        return { first_name: "", last_name: "" };
    }

    const userMetadata = supabaseUser?.user_metadata || {};
    const rawMetadata = supabaseUser?.raw_user_meta_data || {};

    return {
        first_name: userMetadata.first_name || rawMetadata.first_name || "",
        last_name: userMetadata.last_name || rawMetadata.last_name || "",
        ...userMetadata,
        ...rawMetadata,
    };
};
