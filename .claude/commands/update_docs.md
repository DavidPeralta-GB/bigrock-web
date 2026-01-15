---
description: Update documentation files to reflect recent code changes
---

Update the project documentation to reflect recent changes. Follow this checklist:

## Documentation Files to Review and Update:

### 1. CLAUDE.md (PRIMARY DOCUMENTATION)

This is the main documentation file that describes the Sanity CMS schema and project conventions.

Review and update:
- **Content Schema**: Update document type definitions if schema changed
- **GROQ Query Examples**: Add new query patterns used
- **Recommended Setup**: Update if new dependencies or patterns added
- **Page Structure**: Update if new pages or routes added

### 2. README.md

Review and update:
- **Project description**: Update if scope changed
- **Getting started**: Update setup instructions if needed
- **Features list**: Add new features implemented

## Process:

1. Review recent git commits to identify all changes made:
   ```bash
   git log --oneline -10
   ```

2. Check each documentation file systematically

3. Update with clear, concise descriptions

4. Ensure CLAUDE.md schema documentation matches actual Sanity schema

## When to Update CLAUDE.md Schema:

If new Sanity document types or fields were added in Sanity Studio, update:
- Document type definition under "Content Schema"
- Add new GROQ query examples if needed
- Update field descriptions and types

**Note:** The Sanity schema is managed in Sanity Studio (https://bigrock.sanity.studio/), but CLAUDE.md should document the schema for reference.

---

What changes need to be documented?
