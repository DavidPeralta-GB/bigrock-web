---
description: Implement new features with codebase exploration and architecture planning
---

Help me implement a new feature for the BigRock website. Follow this workflow:

---

## Phase 1: Discovery & Exploration

Analyze the existing codebase before planning:

1. Search for existing patterns related to the requested feature
2. Review relevant components in `components/sections/`
3. Check existing GROQ queries in `app/page.tsx` or `lib/sanity.ts`
4. Understand how similar features are implemented

**Key files to review:**
- `CLAUDE.md` - Sanity schema documentation and conventions
- `lib/sanity.ts` - Sanity client and image URL helper
- `app/page.tsx` - Main landing page with GROQ queries
- `components/sections/` - Existing section components

---

## Phase 2: Architecture & Planning

Design the implementation:

1. **Determine if Sanity schema changes are needed:**
   - Does this require new content types?
   - Does an existing content type need new fields?
   - Document required schema changes (to be made in Sanity Studio)

2. **Plan component structure:**
   - Will this be a new section component?
   - Does it need sub-components?
   - What props will it receive?

3. **Plan data fetching:**
   - What GROQ query is needed?
   - Where should the query live?
   - What TypeScript types are needed?

**Create a detailed implementation plan including:**
- Specific files to create/modify (with paths)
- Sanity schema changes needed (document type, fields)
- Component hierarchy and props
- GROQ query structure
- Build sequence and dependencies

**Wait for user approval before proceeding to implementation.**

---

## Phase 3: Implementation

After approval, implement the feature following project conventions:

**Project patterns:**
- **Components:** Server components by default, client components only when needed
- **Styling:** Tailwind CSS with `cn()` helper for conditional classes
- **Images:** Use `urlFor()` from `lib/sanity.ts` for Sanity images
- **Icons:** Use Lucide React icons (`import { IconName } from 'lucide-react'`)
- **Data:** Fetch from Sanity using GROQ queries

**Component conventions:**
```tsx
// components/sections/NewSection.tsx
import { cn } from '@/lib/utils'

interface NewSectionProps {
  data: SectionData | null
}

export function NewSection({ data }: NewSectionProps) {
  if (!data) return null

  return (
    <section className="py-20">
      {/* content */}
    </section>
  )
}
```

**GROQ query pattern:**
```typescript
// In app/page.tsx or lib/queries.ts
const query = groq`{
  "newData": *[_type == "newType"] | order(order asc) {
    _id,
    title,
    description,
    // ... fields
  }
}`
```

**If Sanity schema changes needed:**
- Document the exact schema changes
- User must add them in Sanity Studio at https://bigrock.sanity.studio/

---

## Phase 4: Review & Verification

Verify the implementation:

1. **TypeScript check:**
   ```bash
   npx tsc --noEmit
   ```

2. **ESLint check:**
   ```bash
   npm run lint
   ```

3. **Build verification:**
   ```bash
   npm run build
   ```

4. **Manual testing:**
   - Verify feature works with CMS data
   - Test with missing/null data (defensive rendering)
   - Check responsive design
   - Verify accessibility basics

**Address any issues before proceeding.**

---

## Phase 5: Commit & Deploy

1. **Commit with conventional commit format:**
   ```bash
   git add .
   git commit -m "feat: <description>

   <optional details about what was added>

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
   ```

2. **Push changes:**
   ```bash
   git push
   ```

3. **If Sanity schema was changed:**
   - Remind user to publish changes in Sanity Studio
   - Remind user to add content for new document types

---

What feature would you like to add?
