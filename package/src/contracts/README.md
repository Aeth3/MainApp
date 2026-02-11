# Contracts Layer Documentation

## Overview

The **Contracts Layer** is a specification/interface layer that sits between the entire application and external services (Supabase, HTTP clients, storage, etc.). It defines the expected shape of data and behaviors for all external integrations.

This layer ensures:
- ✅ **Type Safety** - Expected data structures are validated at boundaries
- ✅ **Consistency** - All layers follow the same error and response patterns
- ✅ **Testability** - Clear contracts make mocking easier and more realistic
- ✅ **Documentation** - Contracts serve as living documentation for API responses
- ✅ **Maintainability** - Changes to external APIs are isolated and tracked in one place

## Architecture

```
src/contracts/
├── api/                          # External API response shapes
│   ├── supabaseAuth.contract.js  # Supabase Auth API responses
│   └── supabaseDatabase.contract.js  # Supabase Database API responses
├── services/                     # External service interfaces
│   ├── httpClient.contract.js    # HTTP client service contract
│   └── storageService.contract.js # Storage service contract
├── errors/                       # Standardized error definitions
│   └── ApiErrors.js              # Error codes and utilities
└── index.js                      # Barrel export for all contracts
```

## Layer Responsibilities

### 1. Error Contracts (`errors/ApiErrors.js`)

Defines standardized error codes and utilities for handling errors across the application.

**Usage:**
```javascript
import { ApiErrorCode, createApiError, isNetworkError } from "../contracts";

// Create a standardized error
const error = createApiError(
  ApiErrorCode.INVALID_CREDENTIALS,
  "Email or password is incorrect",
  { statusCode: 401 }
);

// Check error type
if (isNetworkError(error)) {
  // Handle network error
}
```

**Key Exports:**
- `ApiErrorCode` - Enum of all possible error codes
- `createApiError()` - Factory function to create standardized errors
- `isNetworkError()` - Check if error is network-related
- `isValidationError()` - Check if error is validation-related
- `mapHttpStatusToErrorCode()` - Convert HTTP status to error code

### 2. Supabase Auth Contract (`api/supabaseAuth.contract.js`)

Defines the shape of Supabase authentication API responses and provides validators.

**Usage:**
```javascript
import {
  validateSupabaseAuthResponse,
  extractSupabaseUserMetadata,
} from "../contracts";

// In AuthRepositoryImpl
const response = await supabase.auth.signUp({...});

// Validate response matches contract
const validation = validateSupabaseAuthResponse(response);
if (!validation.valid) {
  throw new Error(validation.error);
}

// Extract metadata safely
const metadata = extractSupabaseUserMetadata(response.data.user);
```

**Key Functions:**
- `validateSupabaseUser()` - Validate user object structure
- `validateSupabaseSession()` - Validate session object structure
- `validateSupabaseAuthResponse()` - Validate entire auth response
- `extractSupabaseUserMetadata()` - Extract metadata with fallbacks

### 3. Supabase Database Contract (`api/supabaseDatabase.contract.js`)

Defines the shape of Supabase database query responses.

**Usage:**
```javascript
import {
  validateSupabaseDatabaseResponse,
  extractDatabaseData,
  validateLoanRecord,
} from "../contracts";

const response = await supabase.from("loans").select();

// Validate response structure
const validation = validateSupabaseDatabaseResponse(response);

// Extract data safely
const loans = extractDatabaseData(response);

// Validate individual records
loans.forEach(loan => {
  if (validateLoanRecord(loan)) {
    // Use loan
  }
});
```

**Key Functions:**
- `validateSupabaseDatabaseResponse()` - Validate database response structure
- `validateLoanRecord()` - Validate loan record structure
- `extractDatabaseData()` - Extract array safely from response
- `getFirstRecord()` - Get first record from response
- `getDatabaseRowCount()` - Get row count from response

### 4. HTTP Client Contract (`services/httpClient.contract.js`)

Defines the HTTP client service interface and response handling.

**Usage:**
```javascript
import {
  isSuccessStatus,
  isNetworkRelatedError,
  extractHttpErrorMessage,
} from "../contracts";

try {
  const response = await apiClient.get("/users");
  if (isSuccessStatus(response.status)) {
    // Use response.data
  }
} catch (error) {
  if (isNetworkRelatedError(error)) {
    console.log("Network error");
  }
  const message = extractHttpErrorMessage(error);
}
```

**Key Functions:**
- `validateHttpResponse()` - Validate response structure
- `isSuccessStatus()` - Check if status is 2xx
- `isClientError()` - Check if status is 4xx
- `isServerError()` - Check if status is 5xx
- `isNetworkRelatedError()` - Check if error is network-related
- `extractHttpErrorMessage()` - Extract error message from response
- `getHttpStatusMessage()` - Get user-friendly message for status code

### 5. Storage Service Contract (`services/storageService.contract.js`)

Defines the storage service interface and prevents typos with key constants.

**Usage:**
```javascript
import { StorageKeys, validateSessionStorage } from "../contracts";

// Use constants to prevent typos
await storage.setItem(StorageKeys.SESSION_ACCESS_TOKEN, token);

// Validate session storage has required data
const sessionData = {
  [StorageKeys.SESSION_ACCESS_TOKEN]: token,
  [StorageKeys.SESSION_USER_ID]: userId,
};

const validation = validateSessionStorage(sessionData);
if (!validation.valid) {
  console.log("Missing keys:", validation.missing);
}
```

**Key Exports:**
- `StorageKeys` - Enum of all storage key constants
- `validateSessionStorage()` - Validate session data has required keys
- `isValidStorageKey()` / `isValidStorageValue()` - Validate storage input
- `normalizeStorageError()` - Convert storage errors to readable messages

## Integration Pattern

### Step 1: Import Contracts in Data Layer

```javascript
import { validateSupabaseAuthResponse } from "../../contracts";

export class AuthRepositoryImpl extends AuthRepository {
  async signUp({ email, password }) {
    const response = await supabase.auth.signUp({ email, password });
    
    // Validate against contract
    const validation = validateSupabaseAuthResponse(response);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    return response.data;
  }
}
```

### Step 2: Domain Layer Receives Clean Data

The domain layer receives data that matches contracts and can proceed with business logic without re-validating.

```javascript
export const makeSignUp = ({ authRepository }) => {
  return async ({ email, password }) => {
    // Data from repository is guaranteed to match contract
    const authResult = await authRepository.signUp({ email, password });
    // Use authResult safely
  };
};
```

## Adding New Contracts

When integrating a new external service:

1. **Create a contract file** in the appropriate directory
2. **Document the data shape** using JSDoc `@typedef`
3. **Add validator functions** for common validations
4. **Export from contracts/index.js**
5. **Use validators in repositories** before returning data to domain layer

Example:
```javascript
// src/contracts/api/newService.contract.js

export const validateNewResponse = (response) => {
  // Validation logic
  return { valid: true, error: null };
};

// src/contracts/index.js - Add export
export * from "./api/newService.contract";

// In repository
import { validateNewResponse } from "../../contracts";

const response = await externalService.call();
const validation = validateNewResponse(response);
```

## Best Practices

1. **Validate at boundaries** - Always validate external data entering the system
2. **Use error codes** - Map errors to standardized codes for consistent handling
3. **Document JSDoc types** - Type definitions help developers and IDE autocomplete
4. **Fail fast** - Throw errors immediately if contract validation fails
5. **Test contracts** - Create tests for validator functions
6. **Keep contracts stable** - Avoid frequent changes; version if needed

## Testing Contracts

```javascript
import { validateSupabaseAuthResponse } from "../../contracts";

describe("validateSupabaseAuthResponse", () => {
  it("returns valid=true for correct response", () => {
    const response = {
      data: {
        user: { id: "123", email: "user@example.com" },
        session: { access_token: "token" },
      },
      error: null,
    };

    const result = validateSupabaseAuthResponse(response);
    expect(result.valid).toBe(true);
  });

  it("returns valid=false for missing user", () => {
    const response = {
      data: { user: null },
      error: null,
    };

    const result = validateSupabaseAuthResponse(response);
    expect(result.valid).toBe(false);
  });
});
```

## Summary

The Contracts Layer is a critical part of clean architecture that:
- Isolates external service integration details
- Provides validation at system boundaries
- Documents expected data structures
- Makes the codebase more testable and maintainable
- Enables safe refactoring of external integrations

By consistently using contracts, your team ensures that data crossing layer boundaries is valid, documented, and testable.
