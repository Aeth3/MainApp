# Unit Test Plan (Priority Order)

## Scope
This plan focuses on high-risk business logic first: auth, network/offline handling, and dynamic rendering.

## Phase 1 (Critical)

### 1) `package/src/domain/entities/Email.js`
- Given a valid email, when `createEmail` is called, then it returns normalized lowercase/trimmed value.
- Given invalid email inputs (`""`, malformed), when called, then it throws/returns validation failure as expected.

### 2) `package/src/domain/usecases/SignInWithPassword.js`
- Given valid inputs and repo success, when invoked, then returns `ok` with user+session.
- Given missing password, when invoked, then returns `fail("VALIDATION_ERROR", ...)`.
- Given repo error, when invoked, then returns `fail("AUTH_ERROR", ...)`.

### 3) `package/src/domain/usecases/SignUp.js`
- Given valid payload, when repo succeeds, then returns `ok`.
- Given missing password, then returns validation failure.
- Given repo returns no user, then returns auth failure.

### 4) `package/src/presentation/hooks/useAuth.js`
- `login`: sets loading true/false, returns success on `ok`, returns normalized error on failure.
- `logout`: calls signout + clear session + setAuth(null).
- `forgotPassword`, `validateRecoveryCode`, `changePassword`: success and failure branches.

### 5) `package/src/data/repositories/AuthRepositoryImpl.js`
- Mocks Supabase methods and verifies:
- `signInWithPassword` maps user/session correctly.
- `signUp` maps user and optional session.
- `requestPasswordReset`, `verifyRecoveryCode`, `updatePassword` call correct Supabase API args.
- Network-like errors are converted to friendly error via `normalizeNetworkError`.

## Phase 2 (High)

### 6) `package/src/infra/http/apiClient.js`
- Uses correct base URL resolution by `HTTP_BASE_TARGET`.
- Request interceptor attaches bearer token when provider returns one.
- Response interceptor maps axios errors into normalized shape.

### 7) `package/src/infra/http/offlineRequestQueue.js`
- Enqueue writes item with `requestId`/`queuedAt`.
- `flushOfflineQueue` removes successful requests.
- Keeps network-like failures in queue; drops non-network permanent failures.

### 8) `package/src/infra/http/offlineHttp.js`
- Offline GET returns cached data when available.
- Offline write returns queued response.
- Online success writes GET cache.
- Network-like online failure falls back to cache/queue correctly.

### 9) `package/src/infra/http/apiHandler.js`
- Handles `response.success === false` path.
- Handles 401 unauthorized path with optional logout hooks.
- Shows success/error flow behavior (mock toast).

### 10) `package/components/DynamicRenderer.js`
- Unknown type returns fallback component.
- Invalid item/type/config returns expected fallback.
- Valid type dispatches correct renderer from `componentRegistry`.

## Phase 3 (Medium)

### 11) Auth controllers
- `package/src/presentation/auth/Login/controllers/LoginController.js`
- `package/src/presentation/auth/SignUp/controllers/SignUpController.js`
- `package/src/presentation/auth/ForgotPassword/controllers/ForgotPasswordController.js`
- `package/src/presentation/auth/EnterCode/controllers/EnterCodeController.js`
- `package/src/presentation/auth/ChangePassword/controllers/ChangePasswordController.js`
- Test modal state, navigation calls, and input validation branches.

### 12) Loans feature logic
- `package/features/Loans/models/LoansModel.js`
- `package/features/Loans/controllers/LoansController.js`
- Test filtering/sorting/derived model outputs and API error handling.

## Suggested Test File Layout
- `__tests__/domain/*.test.js`
- `__tests__/infra/http/*.test.js`
- `__tests__/presentation/auth/controllers/*.test.js`
- `__tests__/features/loans/*.test.js`

## Recommended Execution Order
1. Domain/usecases
2. Auth hook/repositories
3. Offline HTTP layer
4. Dynamic renderer
5. Controllers and Loans feature

## Definition of Done
- All critical modules have success + failure test coverage.
- No untested branches in auth and offline flow.
- `npm test` passes in CI and locally.
