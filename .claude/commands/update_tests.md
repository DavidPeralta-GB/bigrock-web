---
description: Add or update test cases for recent code changes
---

Help me update the test suite for recent code changes. Follow this workflow:

---

## Phase 1: Analyze Changes

First, identify what was changed that needs testing:

1. **Check git status** for modified/added files:
   ```bash
   git diff --name-only HEAD~5
   git status --short
   ```

2. **Categorize changes** by type:
   - **API routes** (`app/api/`) → Need API tests
   - **Pages/Components** (`app/`, `components/`) → Need E2E tests
   - **Server Actions** (`actions.ts`) → Need API or E2E tests
   - **Database schema** (`prisma/schema.prisma`) → May need seed data updates
   - **Auth/Permissions** → Need authorization tests

3. **Review test README** for patterns:
   - `tests/README.md` - Test architecture and conventions

---

## Phase 2: Identify Test Files to Update

Based on the changes, identify which test files need updates:

| Change Type | Test Location | Test Type |
|-------------|---------------|-----------|
| API routes | `tests/api/` | API tests |
| Settings pages | `tests/e2e/settings/` | E2E tests |
| Timesheet entry | `tests/e2e/timesheet/` | E2E tests |
| Workflow (submit/approve) | `tests/e2e/workflow/` | E2E tests |
| Authentication | `tests/e2e/auth/` | E2E tests |
| Profile | `tests/e2e/profile/` | E2E tests |

**Key test helpers:**
- `tests/fixtures/authenticated-page.ts` - Pre-authenticated page fixtures
- `tests/fixtures/seed-data.ts` - Test data definitions
- `tests/helpers/scenario-builder.ts` - Create test scenarios
- `tests/helpers/api-client.ts` - Authenticated API client
- `tests/helpers/test-data.ts` - Test constants

---

## Phase 3: Plan Test Cases

For each changed feature, plan specific test cases:

### For New Features:
1. **Happy path** - Feature works as expected
2. **Edge cases** - Boundary conditions, empty states
3. **Error handling** - Invalid input, API errors
4. **Authorization** - Role-based access (admin, manager, user)
5. **Multi-tenant** - Company isolation if applicable

### For Bug Fixes:
1. **Regression test** - Verify the bug is fixed
2. **Related scenarios** - Similar conditions that might fail

### For Refactoring:
1. **Existing tests still pass** - No behavioral changes
2. **Coverage for new code paths** - If any

---

## Phase 4: Update Seed Data (if needed)

If new entities or roles are introduced, update seed data:

1. **`tests/fixtures/seed-data.ts`** - Add new test entities
2. **`tests/helpers/test-data.ts`** - Add constants for new data
3. **`tests/helpers/scenario-builder.ts`** - Add new scenarios

Example for adding a new role:
```typescript
// In seed-data.ts
export const TEST_USERS = {
  // ... existing users
  proxy: {
    email: 'test-proxy@timesheet.test',
    password: 'TestProxy123!',
    firstName: 'Test',
    surname: 'Proxy',
    role: 'proxy'
  }
}
```

---

## Phase 5: Write/Update Tests

Follow existing patterns in the codebase:

### E2E Test Pattern:
```typescript
import { test, expect } from '../../fixtures/authenticated-page'
import { scenarios } from '../../helpers/scenario-builder'
import { cleanup } from '../../helpers/cleanup'

test.describe('Feature Name', () => {
  test.beforeEach(async () => {
    await cleanup.allTestUserTimesheets()
  })

  test('should do expected behavior', async ({ adminPage }) => {
    // Arrange - set up test data
    const timesheet = await scenarios.createDraftTimesheet()

    // Act - perform the action
    await adminPage.goto('/path/to/feature')
    await adminPage.click('button:has-text("Action")')

    // Assert - verify the result
    await expect(adminPage.locator('.success-message')).toBeVisible()
  })

  test('should deny access to unauthorized users', async ({ userPage }) => {
    await userPage.goto('/admin-only-path')
    await expect(userPage.locator('text=Access Denied')).toBeVisible()
  })
})
```

### API Test Pattern:
```typescript
import { test, expect } from '@playwright/test'
import { createAuthenticatedClient } from '../../helpers/api-client'
import { scenarios } from '../../helpers/scenario-builder'

test.describe('API Name', () => {
  let adminClient, userClient

  test.beforeAll(async ({ request }) => {
    adminClient = await createAuthenticatedClient(request, 'admin')
    userClient = await createAuthenticatedClient(request, 'user')
  })

  test('should return data for authorized users', async () => {
    const response = await adminClient.get('/api/endpoint')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('expectedField')
  })

  test('should deny access to unauthorized users', async () => {
    const response = await userClient.get('/api/admin-endpoint')
    expect(response.status()).toBe(403)
  })
})
```

---

## Phase 6: Run Tests

Verify tests pass:

```bash
# Run specific test file
npx playwright test tests/e2e/settings/users.spec.ts

# Run all E2E tests
npm run test:e2e

# Run API tests
npm run test:api

# Run with visible browser (debugging)
npx playwright test --headed tests/e2e/path/to/test.spec.ts

# Run in debug mode
npx playwright test --debug tests/e2e/path/to/test.spec.ts
```

---

## Phase 7: Test Coverage Checklist

Before completing, verify:

- [ ] All new features have happy path tests
- [ ] Authorization is tested (who can/cannot access)
- [ ] Error states are tested where applicable
- [ ] Tests follow existing patterns and conventions
- [ ] Tests are isolated (don't depend on other tests)
- [ ] Seed data updated if new entities introduced
- [ ] All tests pass locally

---

## Common Test Scenarios

### Testing a new role:
1. Add user with new role to seed data
2. Test that role can access intended features
3. Test that role cannot access restricted features
4. Test role-specific UI elements appear/hidden

### Testing proxy/delegation:
1. Test proxy can act on behalf of another user
2. Test non-proxy cannot use delegation features
3. Test audit trail records correct user
4. Test original user can still access their data

### Testing new settings:
1. Admin can view/edit settings
2. Non-admin cannot access settings
3. Settings persist after save
4. Invalid input is rejected

---

What changes need test coverage?