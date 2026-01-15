---
description: --
---

Help me fix a bug in the BigRock website. Follow this workflow:

---

## Phase 1: Bug Investigation

**Goal: Reproduce the issue and gather information.**

1. **Understand the reported behavior:**
   - What is the user expecting to happen?
   - What is actually happening?
   - What are the steps to reproduce?

2. **Reproduce the issue:**
   - Check browser console for errors
   - Check Next.js dev server logs
   - Note any error messages verbatim

3. **Identify affected code paths:**
   - Which pages/components are involved?
   - Is this a Sanity CMS data issue or frontend code issue?
   - Check if data is being fetched correctly from Sanity

4. **Check for existing context:**
   - Review recent commits to affected files
   - Check if this is a regression from recent changes

---

## Phase 2: Root Cause Analysis

**Goal: Find the actual source of the bug, not just the symptom.**

1. **Trace the data flow:**
   - Is data coming correctly from Sanity CMS?
   - Is the GROQ query returning expected results?
   - Is the component rendering the data correctly?

2. **Identify the root cause:**
   - Is it a logic error in the component?
   - Is it a type mismatch or null/undefined issue?
   - Is it a Sanity schema/query mismatch?
   - Is it a styling/CSS issue?
   - Is it a missing null check for optional CMS fields?

3. **Assess the scope:**
   - Is this bug isolated or does it affect other areas?
   - Are there similar patterns elsewhere that might have the same issue?

4. **Document your findings:**
   - State the root cause clearly
   - Explain why the bug occurs

**Present your analysis to the user before proceeding to the fix.**

---

## Phase 3: Fix Planning

**Goal: Determine the right approach to fix the bug.**

1. **Choose fix strategy:**
   - **Surgical fix:** Minimal change to address the specific issue
   - **Defensive coding:** Add null checks for optional CMS fields
   - **Query fix:** Update GROQ query if data isn't being fetched correctly

2. **Identify all changes needed:**
   - List specific files to modify
   - Note if Sanity schema needs updating (in separate studio project)

3. **Assess regression risk:**
   - What other functionality might be affected?
   - What manual testing should be done?

**Present your fix plan to the user and wait for approval before proceeding.**

---

## Phase 4: Implementation

**Only proceed after user has approved the fix plan.**

**Key patterns to follow:**
- Use `urlFor()` from `lib/sanity.ts` for image URLs
- Handle optional CMS fields with null checks (e.g., `field?.property`)
- Use TypeScript types that match Sanity schema
- Follow existing component patterns in `components/sections/`

**Keep changes minimal:**
- Fix the bug, don't refactor unrelated code
- Don't add features while fixing bugs
- Preserve existing behavior except for the bug

---

## Phase 5: Verification

**Ensure the fix works and doesn't break anything else.**

1. **Run TypeScript check:**
   ```bash
   npx tsc --noEmit
   ```

2. **Run ESLint:**
   ```bash
   npm run lint
   ```

3. **Test the fix:**
   - Verify the original bug is resolved
   - Test the component still works with various CMS data states
   - Check for regressions in related functionality

4. **Test the build:**
   ```bash
   npm run build
   ```

**Fix any issues found before proceeding.**

---

## Phase 6: Commit

**Document the fix and commit the changes.**

1. **Commit with conventional commit format:**
   ```bash
   git add .
   git commit -m "fix: <brief description>

   <optional longer explanation of what was wrong and how it was fixed>

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
   ```

2. **Push changes:**
   ```bash
   git push
   ```

---

What bug would you like me to help fix?
