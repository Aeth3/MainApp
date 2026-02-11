/**
 * HTTP Client Service Contract
 * Defines the interface and expected behavior of the HTTP client
 */

/**
 * HTTP Request Configuration
 * @typedef {Object} HttpRequestConfig
 * @property {string} url - Request URL or path
 * @property {string} [method] - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @property {Object} [data] - Request body payload
 * @property {Object} [params] - Query parameters
 * @property {Object} [headers] - Custom headers
 * @property {number} [timeout] - Request timeout in ms
 */

/**
 * HTTP Response contract
 * @typedef {Object} HttpResponseContract
 * @property {*} data - Response body data
 * @property {number} status - HTTP status code (200, 404, 500, etc.)
 * @property {string} statusText - HTTP status text
 * @property {Object} headers - Response headers
 * @property {HttpRequestConfig} config - Request configuration
 */

/**
 * HTTP Error Response contract
 * @typedef {Object} HttpErrorResponseContract
 * @property {Object} response - Response object if available
 * @property {number} [response.status] - HTTP status code
 * @property {*} [response.data] - Error response body
 * @property {string} message - Error message
 * @property {string} [code] - Error code (e.g., ECONNABORTED, ENOTFOUND)
 */

/**
 * HTTP Client interface contract
 * @typedef {Object} HttpClientContract
 * @property {Function} get - GET request method
 * @property {Function} post - POST request method
 * @property {Function} put - PUT request method
 * @property {Function} patch - PATCH request method
 * @property {Function} delete - DELETE request method
 * @property {Function} request - Generic request method
 */

/**
 * Validate HTTP response structure
 * @param {*} response - Response to validate
 * @returns {{valid: boolean, error: string | null}}
 */
export const validateHttpResponse = (response) => {
    if (!response || typeof response !== "object") {
        return { valid: false, error: "Response must be an object" };
    }

    if (typeof response.status !== "number") {
        return { valid: false, error: "Response must have numeric status" };
    }

    return { valid: true, error: null };
};

/**
 * Check if HTTP response indicates success
 * @param {number} status - HTTP status code
 * @returns {boolean}
 */
export const isSuccessStatus = (status) => {
    return status >= 200 && status < 300;
};

/**
 * Check if HTTP response indicates client error (4xx)
 * @param {number} status - HTTP status code
 * @returns {boolean}
 */
export const isClientError = (status) => {
    return status >= 400 && status < 500;
};

/**
 * Check if HTTP response indicates server error (5xx)
 * @param {number} status - HTTP status code
 * @returns {boolean}
 */
export const isServerError = (status) => {
    return status >= 500 && status < 600;
};

/**
 * Check if error is due to network/timeout
 * @param {Error|HttpErrorResponseContract} error - Error to check
 * @returns {boolean}
 */
export const isNetworkRelatedError = (error) => {
    if (!error) return false;

    const message = String(error?.message || "").toLowerCase();
    const code = String(error?.code || "").toLowerCase();

    const networkCodes = [
        "econnaborted",
        "enotfound",
        "econnrefused",
        "etimedout",
        "ehostunreach",
    ];

    return (
        networkCodes.some((code) => message.includes(code)) ||
        networkCodes.includes(code) ||
        message.includes("network") ||
        message.includes("timeout")
    );
};

/**
 * Extract error message from HTTP error response
 * @param {Error|HttpErrorResponseContract} error - Error to parse
 * @returns {string}
 */
export const extractHttpErrorMessage = (error) => {
    if (!error) return "Unknown error occurred";

    // Try response data message first
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    // Try response data error field
    if (error?.response?.data?.error) {
        return error.response.data.error;
    }

    // Fall back to error message
    return error?.message || "Unknown error occurred";
};

/**
 * Map HTTP status code to user-friendly message
 * @param {number} status - HTTP status code
 * @returns {string}
 */
export const getHttpStatusMessage = (status) => {
    const messages = {
        400: "Invalid request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not found",
        408: "Request timeout",
        429: "Too many requests",
        500: "Server error",
        502: "Bad gateway",
        503: "Service unavailable",
        504: "Gateway timeout",
    };

    return messages[status] || "HTTP error";
};
