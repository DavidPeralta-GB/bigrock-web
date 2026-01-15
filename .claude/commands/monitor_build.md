---
description: Check Amplify build status and auto-fix failures
---

# Verify Build and Auto-Fix Failures

Run the Next.js build and automatically debug any failures.

**Your task:**

1. **Run the production build:**
   ```bash
   npm run build
   ```

2. **Analyze the output:**
   - If build succeeded: Inform the user the build is ready
   - If build failed: Proceed to step 3

3. **If build failed**, automatically debug and fix:

   a. Analyze the errors and identify the root cause:
      - TypeScript compilation errors
      - ESLint errors
      - Missing dependencies
      - Import/export issues
      - Sanity query or type issues

   b. Implement fixes:
      - For TypeScript errors: Fix type issues in the code
      - For missing types: Add proper TypeScript interfaces
      - For import errors: Fix import paths or add missing exports
      - For Sanity issues: Check GROQ queries and null handling

   c. Run the build again to verify the fix:
      ```bash
      npm run build
      ```

   d. If build succeeds, commit and push:
      ```bash
      git add .
      git commit -m "fix: <description of what you fixed>

      Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
      git push
      ```

4. **Provide a summary of:**
   - Build status
   - Any errors found
   - Fixes applied (if any)
   - Next steps for the user

**Important**: Always verify fixes work before pushing to avoid repeated failed deployments.
