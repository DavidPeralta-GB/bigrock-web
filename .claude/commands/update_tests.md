---
description: Add or update test cases for recent code changes
---

Help me add or update tests for recent code changes.

---

## Current Status

This project does not currently have a test suite configured. To add tests, consider:

### Option 1: Vitest (Recommended for unit tests)

```bash
npm install -D vitest @testing-library/react @testing-library/dom jsdom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

### Option 2: Playwright (For E2E tests)

```bash
npm install -D @playwright/test
npx playwright install
```

Add to `package.json`:
```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

---

## When Tests Are Configured

Once tests are set up, this command will help:

1. **Analyze changes** - Identify what was modified
2. **Plan test cases** - Determine what needs testing:
   - Component rendering tests
   - Data fetching tests (mocking Sanity)
   - User interaction tests
3. **Write tests** following project patterns
4. **Run tests** to verify they pass

---

Would you like me to help set up a test framework?
