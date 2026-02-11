# Contracts Quick Reference

## One-Minute Overview

The **Contracts Layer** validates data at system boundaries. Use it in repositories to ensure external API responses are valid before sending them to business logic.

## Imports

```javascript
// All contracts available from single import
import {
  // Errors
  ApiErrorCode,
  createApiError,
  isNetworkError,
  
  // Supabase Auth
  validateSupabaseAuthResponse,
  extractSupabaseUserMetadata,
  
  // Supabase Database
  validateSupabaseDatabaseResponse,
  extractDatabaseData,
  validateLoanRecord,
  
  // HTTP Client
  isSuccessStatus,
  isNetworkRelatedError,
  extractHttpErrorMessage,
  
  // Storage
  StorageKeys,
  validateSessionStorage,
} from "../../contracts";
```

## Common Patterns

### Pattern 1: Validate API Response

```javascript
// In repository
const response = await supabase.auth.signUp({...});

const validation = validateSupabaseAuthResponse(response);
if (!validation.valid) {
  throw new Error(validation.error);
}

return response.data; // Now guaranteed valid
```

### Pattern 2: Check Error Type

```javascript
try {
  const response = await supabase.auth.signIn({...});
} catch (error) {
  if (isNetworkError(error)) {
    console.log("Network problem");
  } else {
    console.log("Auth error");
  }
}
```

### Pattern 3: Use Storage Keys

```javascript
import { StorageKeys } from "../../contracts";

// Never type storage keys manually!
await storage.setItem(StorageKeys.SESSION_ACCESS_TOKEN, token);
await storage.setItem(StorageKeys.SESSION_USER_ID, userId);

const validation = validateSessionStorage({
  [StorageKeys.SESSION_ACCESS_TOKEN]: token,
  [StorageKeys.SESSION_USER_ID]: userId,
});
```

### Pattern 4: Extract HTTP Error

```javascript
try {
  const response = await httpClient.get("/api/data");
} catch (error) {
  const message = extractHttpErrorMessage(error);
  console.log(message); // "Invalid request" or actual API message
}
```

### Pattern 5: Database Response

```javascript
const response = await supabase.from("loans").select();

const validation = validateSupabaseDatabaseResponse(response);
if (!validation.valid) throw new Error(validation.error);

const loans = extractDatabaseData(response);
loans.forEach(loan => {
  if (validateLoanRecord(loan)) {
    // Use loan safely
  }
});
```

## Error Codes

```javascript
ApiErrorCode = {
  // Auth
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
  USER_ALREADY_EXISTS,
  SESSION_EXPIRED,
  
  // Validation
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALIDATION_ERROR,
  
  // Network
  NETWORK_ERROR,
  REQUEST_TIMEOUT,
  SERVICE_UNAVAILABLE,
  
  // Server
  SERVER_ERROR,
  NOT_FOUND,
  CONFLICT,
  
  // Generic
  UNKNOWN_ERROR,
}
```

## Storage Keys

```javascript
StorageKeys = {
  SESSION_ACCESS_TOKEN,      // "session:access_token"
  SESSION_REFRESH_TOKEN,     // "session:refresh_token"
  SESSION_USER_ID,           // "session:user_id"
  SESSION_EXPIRY,            // "session:expiry"
  
  USER_PROFILE,              // "user:profile"
  USER_PREFERENCES,          // "user:preferences"
  USER_THEME,                // "user:theme"
  
  APP_FIRST_LAUNCH,          // "app:first_launch"
  APP_VERSION,               // "app:version"
  APP_LAST_SYNC,             // "app:last_sync"
  
  OFFLINE_REQUESTS_QUEUE,    // "offline:requests_queue"
}
```

## Validator Functions Reference

| Function | Purpose | Returns |
|----------|---------|---------|
| `validateSupabaseAuthResponse(response)` | Validate auth response | `{valid: bool, error: string}` |
| `validateSupabaseUser(user)` | Validate user object | `boolean` |
| `validateSupabaseSession(session)` | Validate session object | `boolean` |
| `extractSupabaseUserMetadata(user)` | Extract metadata | `{first_name, last_name, ...}` |
| `validateSupabaseDatabaseResponse(response)` | Validate DB response | `{valid: bool, error: string}` |
| `validateLoanRecord(record)` | Validate loan record | `boolean` |
| `extractDatabaseData(response)` | Extract array from response | `Array` |
| `getFirstRecord(response)` | Get first record or null | `Object\|null` |
| `validateHttpResponse(response)` | Validate HTTP response | `{valid: bool, error: string}` |
| `isSuccessStatus(status)` | Check if 2xx | `boolean` |
| `isClientError(status)` | Check if 4xx | `boolean` |
| `isServerError(status)` | Check if 5xx | `boolean` |
| `isNetworkRelatedError(error)` | Check if network error | `boolean` |
| `extractHttpErrorMessage(error)` | Get error message | `string` |
| `isNetworkError(error)` | Check if network error | `boolean` |
| `isValidationError(error)` | Check if validation error | `boolean` |
| `validateSessionStorage(data)` | Validate session data | `{valid: bool, missing: []}` |

## Testing with Contracts

```javascript
describe("MyRepository", () => {
  it("validates response before returning", async () => {
    const mockResponse = {
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    };
    
    // Mocked service
    supabase.auth.signUp = jest.fn().mockResolvedValue(mockResponse);
    
    const result = await repository.signUp({...});
    
    // Response was validated
    expect(result.user).toBeDefined();
  });
  
  it("throws for invalid service response", async () => {
    const invalidResponse = {
      data: { user: null }, // Invalid!
      error: null,
    };
    
    supabase.auth.signUp = jest.fn().mockResolvedValue(invalidResponse);
    
    await expect(repository.signUp({...})).rejects.toThrow();
  });
});
```

## When to Add New Contracts

1. Integrating a new external API? → Create `contracts/api/newService.contract.js`
2. Adding a new service? → Create `contracts/services/newService.contract.js`
3. New error scenario? → Add to `ApiErrorCode` enum
4. New storage key? → Add to `StorageKeys` enum

## Full Documentation

See [package/src/contracts/README.md](./package/src/contracts/README.md) for complete details.

---

**Golden Rule:** Always validate external data at system boundaries using contracts. 🎯
