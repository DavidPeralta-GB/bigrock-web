--
description: Investigate and fix bugs with root cause analysis and verification
---

Help me fix a bug in the timesheet application. Follow this workflow:

---

## Phase 0: Branch Setup (REQUIRED)

**All bug fixes MUST happen on the `dev` branch.**

1. Check current branch: `git branch --show-current`
2. If NOT on `dev`:
   - Stash any uncommitted changes: `git stash`
   - Switch to dev: `git checkout dev`
   - Pull latest: `git pull origin dev`
   - Apply stash if needed: `git stash pop`
3. If on `dev`: Pull latest changes: `git pull origin dev`

**Branch workflow:**
- `dev` → Active development (you are here)
- `qa` → Testing/staging (merge dev → qa when ready for QA)
- `main` → Production (requires PR with approval)

**Do NOT commit directly to `main` or `qa` branches.**

---

## Phase 1: Bug Investigation

**Goal: Reproduce the issue and gather information.**

1. **Understand the reported behavior:**
   - What is the user expecting to happen?
   - What is actually happening?
   - What are the steps to reproduce?

2. **Reproduce the issue:**
   - Follow the reproduction steps
   - Check browser console for errors
   - Check server logs if applicable
   - Note any error messages verbatim

3. **Identify affected code paths:**
   - Which pages/components are involved?
   - Which API routes are called?
   - Which database queries execute?

4. **Check for existing context:**
   - Search `docs/FIXES.md` for similar past issues
   - Check if this is a regression from recent changes
   - Review recent commits to affected files

---

## Phase 2: Root Cause Analysis

**Goal: Find the actual source of the bug, not just the symptom.**

Use the **code-explorer** agent if needed to trace the issue:

1. **Trace the data flow:**
   - Where does the data originate?
   - How is it transformed along the way?
   - Where does it fail or become incorrect?

2. **Identify the root cause:**
   - Is it a logic error?
   - Is it a type mismatch or null/undefined issue?
   - Is it a race condition or timing issue?
   - Is it a missing validation or edge case?
   - Is it a multi-tenant scoping issue (missing company_code)?

3. **Assess the scope:**
   - Is this bug isolated or does it affect other areas?
   - Are there similar patterns elsewhere that might have the same issue?
   - Is this a symptom of a deeper architectural problem?

4. **Document your findings:**
   - State the root cause clearly
   - Explain why the bug occurs
   - Note any related issues discovered

**Present your analysis to the user before proceeding to the fix.**

---

## Phase 3: Fix Planning

**Goal: Determine the right approach to fix the bug.**

1. **Choose fix strategy:**
   - **Surgical fix:** Minimal change to address the specific issue
   - **Refactor:** Broader changes needed if the code structure is fundamentally flawed
   - **Workaround:** Temporary fix if proper fix requires more investigation

2. **Identify all changes needed:**
   - List specific files to modify
   - Note any database changes required
   - Consider if translations need updating

3. **Assess regression risk:**
   - What other functionality might be affected?
   - Are there existing tests that cover this area?
   - What manual testing should be done?

4. **Plan test cases:**
   - How will you verify the fix works?
   - What edge cases should be tested?
   - Should automated tests be added?

**⚠️ STOP: Present your fix plan to the user and wait for explicit approval before proceeding to Phase 4.**

---

## Phase 4: Implementation

**Only proceed after user has approved the fix plan.**

**Apply the fix following project conventions.**

**Security requirements (always verify):**
- Use `requireAuth()`, `requireCompanyAccess()`, etc. from `lib/api-auth.ts`
- Use `getTenantPrisma(companyCode)` for automatic company_code filtering
- Validate all input with Zod schemas from `lib/schemas.ts`

**If updating UI text:**
- Use translation keys from `messages/*.json`
- Update ALL 5 language files: en, es, fr, de, pt

**Keep changes minimal:**
- Fix the bug, don't refactor unrelated code
- Don't add features while fixing bugs
- Preserve existing behavior except for the bug

---

## Phase 5: Verification

**Ensure the fix works and doesn't break anything else.**

1. **Run TypeScript build:**
   ```bash
   npx tsc --noEmit
   ```

2. **Test the fix:**
   - Verify the original bug is resolved
   - Test the happy path still works
   - Test edge cases identified in Phase 3
   - Check for regressions in related functionality

3. **Run relevant tests (if available):**
   ```bash
   npm run test:e2e -- --grep "relevant test pattern"
   ```

4. **Use code-reviewer agent** for complex fixes:
   - Security vulnerability check
   - Multi-tenant isolation verification
   - Type safety review

**Fix any issues found before proceeding.**

---

## Phase 6: Pre-Commit Checklist

**Before committing, verify these items:**

- [ ] TypeScript build passes (`npx tsc --noEmit`)
- [ ] Bug is verified fixed
- [ ] No regressions introduced
- [ ] `docs/FIXES.md` updated with root cause and solution
- [ ] If fix changes user-facing behavior documented in `content/help/*.md`, update help content
- [ ] If fix affects troubleshooting guidance, update `content/help/troubleshooting.md`

---

## Phase 7: Commit & Deploy

**Document the fix and commit the changes.**

1. **Update `docs/FIXES.md`** with:
   ```markdown
   ## [Date] - Brief description

   **Symptom:** What the user experienced
   **Root Cause:** Why it happened
   **Solution:** What was changed to fix it
   **Files Changed:** List of modified files
   ```

2. **Commit with conventional commit format:**
   ```bash
   git add .
   git commit -m "fix: <brief description>

   <optional longer explanation of what was wrong and how it was fixed>

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
   ```

3. **Push to dev branch:**
   ```bash
   git push origin dev
   ```

4. **Run `/monitor_build`** to verify Amplify deployment succeeds

**Promotion workflow (when ready):**
- **Dev → QA:** `git checkout qa && git merge dev && git push origin qa`
- **QA → Main:** Create a Pull Request from `qa` to `main` (requires approval)

---

What bug would you like me to help fix?