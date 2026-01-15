---
description: Update documentation files to reflect recent code changes
---

Update all application documentation to reflect recent changes. Follow this checklist:

## Documentation Files to Review and Update:

### 1. docs/SPECIFICATION.md (MASTER SPECIFICATION - UPDATE FIRST)
Review and update:
- **Database Architecture**: Update table definitions, add new tables/fields
- **Pages and Navigation**: Add new pages, update page descriptions and features
- **Database Migrations**: Add new migration to the numbered list
- **Critical Fixes**: Document any major issues solved
- **Design Guidelines**: Update if UI patterns changed
- **Known Limitations**: Add any new limitations discovered
- **Future Enhancements**: Update planned features

### 2. README.md
Review and update:
- **Features section**: Add new features, update existing feature descriptions
- **Project Structure**: Add new directories, pages, or components
- **Database Schema list**: Add new tables or update table descriptions
- **Key Features Explained**: Add new workflows, update role descriptions
- **Tech Stack**: Update if dependencies changed

### 3. docs/DATABASE_SCHEMA.md
Review and update:
- **Tables section**:
  - Add new tables with complete field definitions
  - Update existing tables with new fields
  - Add comments explaining field purposes
- **Indexes section**: Add new indexes for new fields/tables
- **Key Relationships**: Document new foreign key relationships
- **Functions & Triggers**: Document new database functions

### 4. DEPLOYMENT.md (if needed)
Update if:
- New environment variables added
- New services/integrations added
- Deployment steps changed
- New configuration required

### 5. AI Help Agent Content (content/help/*.md)
The in-app AI help agent uses markdown files in `content/help/` to answer user questions.

**Files to review:**
- `getting-started.md` - New user onboarding, basic navigation
- `time-entry.md` - Timesheet entry instructions, templates
- `approvals.md` - Manager approval workflow
- `admin-settings.md` - Settings page documentation
- `project-codes.md` - Projects and WBS subcodes
- `overtime-rules.md` - Overtime configuration and calculation
- `time-off.md` - Time off requests and balances
- `troubleshooting.md` - Common issues and solutions

**When to update:**
- New features added that users might ask about
- Workflow changes that affect user instructions
- New settings or configuration options
- Bug fixes that users previously reported

**Format:** Each file uses frontmatter with `title`, `description`, `keywords`, and `order` fields.

**Related code:**
- `lib/help/help-content.ts` - Maps pages to relevant help files (update `pathMap` if new pages added)
- `lib/help/context-builder.ts` - Builds AI context with user/company info

## Process:
1. Review recent git commits to identify all changes made
2. Review recent database migrations for schema changes
3. Check each documentation file systematically
4. Update with clear, concise descriptions
5. Ensure consistency across all documentation files
6. Update help agent content if user-facing features changed

What changes need to be documented?