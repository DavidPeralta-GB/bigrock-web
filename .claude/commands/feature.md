---
description: Implement new features with codebase exploration and architecture planning
---

Help me implement a new feature for the timesheet application. Follow this workflow:

---

## Phase 0: Branch Setup (REQUIRED)

**All feature development MUST happen on the `dev` branch.**

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

## Phase 1: Discovery & Exploration

Use the **code-explorer** agent to analyze the existing codebase before planning:

1. Search for existing patterns related to the requested feature
2. Map current data flows and state transitions
3. Identify relevant database tables, API routes, and components
4. Find UI patterns and conventions already in use
5. Note any existing validation, security, or multi-tenant patterns

**Key files to review:**
- `CLAUDE.md` - Architecture, patterns, and conventions
- `docs/DATABASE_SCHEMA.md` - Database schema
- `docs/SPECIFICATION.md` - Full application specification
- `prisma/schema.prisma` - Complete database relationships

---

## Phase 2: Architecture & Planning

Use the **code-architect** agent to design the implementation:

1. Analyze existing patterns and conventions from Phase 1
2. Design data model changes (Prisma schema updates if needed)
3. Plan component hierarchy (server vs client components)
4. Create API route structure with proper authentication
5. Map user flows and state transitions
6. Identify security considerations

**Create a detailed implementation blueprint including:**
- Specific files to create/modify (with paths)
- Database schema changes (new tables, fields, relations)
- Component designs and interactions
- API endpoint specifications (routes, methods, payloads)
- Multi-tenant scoping requirements (company_code filtering)
- Role-based access control needs
- **Navigation changes** (does feature need a link in main nav bar?)
- **Help chatbot updates** (page names, help content routing, documentation)
- Build sequence and dependencies

**Wait for user approval before proceeding to implementation.**

---

## Phase 3: Implementation

After approval, implement the feature following project conventions:

**Apply domain-specific skills:**
- `/prisma-multi-tenant` - For database queries and tenant isolation
- `/nextjs-app-router` - For pages, components, and API routes
- `/timesheet-workflow` - For timesheet state transitions and validation
- `/aws-cognito-auth` - For authentication and session handling
- `/aws-s3-uploads` - For file uploads if needed

**Security requirements:**
- Use `requireAuth()`, `requireCompanyAccess()`, etc. from `lib/api-auth.ts`
- Use `getTenantPrisma(companyCode)` for automatic company_code filtering
- Validate all input with Zod schemas from `lib/schemas.ts`
- Never expose `is_system_admin` in API responses

**Internationalization (i18n) requirements:**
- All user-facing text MUST use translation keys from `messages/*.json`
- Use the `useTranslations` hook in client components
- Use `getTranslations` in server components
- When adding/modifying UI text, update ALL language files:
  - `messages/en.json` (English - primary)
  - `messages/es.json` (Spanish)
  - `messages/fr.json` (French)
  - `messages/de.json` (German)
  - `messages/pt.json` (Portuguese)
- Never hardcode user-facing strings in components

**Navigation requirements (if feature needs menu access):**
- Add link to `components/Navigation.tsx` navLinks array
- Add translation key to `common.navigation` in all 5 language files
- Consider visibility rules (all users, managers only, admins only)

**Help chatbot requirements (ALWAYS update for new pages):**
- Add page names to `lib/help/context-builder.ts` getPageName()
- Add route mappings to `lib/help/help-content.ts` getRelevantSlugs()
- Create help content file in `content/help/<feature>.md` with:
  - Frontmatter (title, description, keywords, order)
  - User-friendly documentation for the feature

---

## Phase 4: Update Tests

Run `/update_tests` to add or update test cases for the new feature:

1. **Analyze changes** - Identify what was modified
2. **Plan test cases** - Determine what needs testing:
   - Happy path tests
   - Authorization tests (role-based access)
   - Error handling tests
   - Edge cases
3. **Update seed data** if new entities/roles introduced
4. **Write tests** following existing patterns in `tests/`
5. **Run tests** to verify they pass

**Test locations:**
- API tests: `tests/api/`
- E2E tests: `tests/e2e/`
- Settings tests: `tests/e2e/settings/`
- Workflow tests: `tests/e2e/workflow/`

**Run tests:**
```bash
npm run test:e2e          # All E2E tests
npm run test:api          # API tests
npx playwright test path/to/test.spec.ts  # Specific test
```

---

## Phase 5: Review & Verification

Use the **code-reviewer** agent to verify the implementation:

1. Review all changes for security vulnerabilities
2. Check type safety and error handling
3. Verify multi-tenant isolation (company_code scoping)
4. Validate role-based access control
5. Check code quality and adherence to project conventions
6. Identify performance concerns
7. **Verify translations are complete for all 5 languages** (en, es, fr, de, pt)

**Translation checklist:**
- [ ] All new UI text uses translation keys (no hardcoded strings)
- [ ] `messages/en.json` updated with new keys
- [ ] `messages/es.json` updated with Spanish translations
- [ ] `messages/fr.json` updated with French translations
- [ ] `messages/de.json` updated with German translations
- [ ] `messages/pt.json` updated with Portuguese translations

**Navigation & Help checklist:**
- [ ] Navigation link added if feature needs menu access
- [ ] Navigation translation keys added to all 5 language files
- [ ] Page names added to `lib/help/context-builder.ts`
- [ ] Route mappings added to `lib/help/help-content.ts`
- [ ] Help content file created in `content/help/`

**Address any critical issues before proceeding.**

---

## Phase 6: Build Verification

**Run TypeScript build before committing:**
```bash
npx tsc --noEmit
```

**Common issues to check:**
- When adding fields to shared types (e.g., `TimeOffCompanySettings`), ensure ALL files using those types are updated
- Check all API routes that construct settings objects include new fields
- Verify Prisma select queries include new fields where needed

**Fix any build errors before proceeding to documentation.**

---

## Phase 7: Pre-Commit Checklist (MANDATORY)

**STOP! Before committing, verify ALL items below. Do NOT skip this phase.**

Use TodoWrite to track these items and mark each as completed:

### Code Changes
- [ ] Feature code implemented and working
- [ ] TypeScript build passes (`npx tsc --noEmit`)

### Tests
- [ ] Test cases added/updated for new functionality
- [ ] All tests pass (`npm run test:e2e` or specific test file)
- [ ] Authorization tests included (who can/cannot access)

### Translations (if UI text added/changed)
- [ ] All UI text uses translation keys (no hardcoded strings)
- [ ] All 5 language files updated: en.json, es.json, fr.json, de.json, pt.json

### Help Documentation (ALWAYS check for settings/feature pages)
- [ ] Page name added to `lib/help/context-builder.ts` getPageName()
- [ ] Route mapping added to `lib/help/help-content.ts` getRelevantSlugs()
- [ ] Help content added/updated in `content/help/*.md`

### Navigation (if feature needs menu access)
- [ ] Link added to `components/Navigation.tsx`
- [ ] Navigation translation keys added to all 5 language files

### Specification
- [ ] `docs/SPECIFICATION.md` updated with new behavior

**Only proceed to commit after ALL applicable items are verified.**

---

## Phase 8: Commit & Deployment

1. Run `/update_docs` to update all documentation:
   - `docs/SPECIFICATION.md` - Add new fields, UI changes, business rules
   - `docs/DATABASE_SCHEMA.md` - Document new database fields
   - `README.md` - Update if features section needs changes

2. Commit and push to `dev` branch:
   ```bash
   git add .
   git commit -m "feat: <description>"
   git push origin dev
   ```

3. Run `/monitor_build` to verify Amplify deployment succeeds

**Promotion workflow (when ready):**
- **Dev → QA:** `git checkout qa && git merge dev && git push origin qa`
- **QA → Main:** Create a Pull Request from `qa` to `main` (requires approval)

---

What feature would you like to add?