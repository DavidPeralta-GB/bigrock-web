---
description: Check Amplify build status and auto-fix failures
---

# Monitor AWS Amplify Build and Auto-Debug Failures

Check the status of the latest AWS Amplify build for this project.

**Your task:**

1. Run the build status check script:
   ```bash
   bash .claude/hooks/check-amplify-build.sh
   ```

2. Analyze the output:
   - If build succeeded: Inform the user the deployment is live
   - If build is in progress: Tell the user to wait and check again
   - If build failed: Proceed to step 3

3. **If build failed**, automatically debug and fix:

   a. Read the error logs from `.claude/.amplify-build-error.log`

   b. Analyze the errors and identify the root cause:
      - TypeScript compilation errors
      - Missing dependencies or type definitions
      - Configuration issues
      - Environment variable problems
      - Build script failures

   c. Implement fixes:
      - For missing types: Install appropriate @types packages
      - For TypeScript errors: Fix the code issues
      - For config issues: Update amplify.yml or next.config.js
      - For dependency issues: Update package.json and install

   d. Test the fix locally:
      ```bash
      npm run build
      ```

   e. If local build succeeds, commit and push:
      ```bash
      git add .
      git commit -m "Fix: [description of what you fixed]

      🤖 Generated with [Claude Code](https://claude.com/claude-code)

      Co-Authored-By: Claude <noreply@anthropic.com>"
      git push
      ```

   f. Inform the user that fixes have been applied and deployed

4. Provide a summary of:
   - Build status
   - Any errors found
   - Fixes applied (if any)
   - Next steps for the user

**Important**: Always verify that fixes work locally before pushing to avoid repeated failed deployments.