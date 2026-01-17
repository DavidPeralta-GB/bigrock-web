# TS@BigRock Website

This is a Next.js frontend for the TS@BigRock timesheet management SaaS product. It fetches content from a Sanity CMS backend.

## Project Overview

TS@BigRock is a timesheet management application for teams. The website serves as the marketing/landing page and potentially the application frontend.

## AWS Amplify Deployment

- **Region**: `eu-west-2` (London)
- **App ID**: `d3lmgtu84t40iu`
- **Production URL**: https://bigrock.uk.com
- **Amplify URL**: https://master.d3lmgtu84t40iu.amplifyapp.com
- **Branch**: `master` (auto-deploy enabled)

### Environment Variables (configured in Amplify Console)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |
| `SANITY_WEBHOOK_SECRET` | Secret for validating Sanity webhook requests |

### Revalidation Webhook

Content updates from Sanity trigger on-demand revalidation via:
- **Endpoint**: `https://master.d3lmgtu84t40iu.amplifyapp.com/api/revalidate`
- **Route**: `app/api/revalidate/route.ts`

Configure this webhook in Sanity at: https://www.sanity.io/manage → API → Webhooks

## Caching Architecture

Content flows through multiple cache layers:

```
Sanity Studio → Sanity API → Sanity CDN → Next.js Server Cache → Amplify CDN → Browser
```

### Cache Invalidation

When content is published in Sanity:
1. Sanity webhook fires to `/api/revalidate`
2. Next.js invalidates its server cache via `revalidatePath('/', 'layout')`
3. Next page request fetches fresh data from Sanity API

**Important:** The Sanity client uses `useCdn: false` to bypass Sanity's CDN cache. This ensures revalidation fetches fresh content immediately. Do not change this to `true` or content updates will be delayed.

### Troubleshooting: Content Not Appearing

If changes made in Sanity Studio don't appear on the live site:

1. **Verify the change is published** - Draft changes won't appear. Click "Publish" in Sanity Studio.

2. **Check the Sanity API directly** - Confirm the change exists:
   ```bash
   curl "https://yj6cjjt2.api.sanity.io/v2024-01-01/data/query/production?query=*[_id==\"hero\"][0]"
   ```

3. **Test the webhook endpoint**:
   ```bash
   curl -X POST "https://master.d3lmgtu84t40iu.amplifyapp.com/api/revalidate"
   # Should return {"message":"Invalid signature"} (401) - this confirms the endpoint is working
   ```

4. **Verify webhook configuration in Sanity**:
   - Go to https://www.sanity.io/manage → your project → API → Webhooks
   - Ensure webhook URL is `https://master.d3lmgtu84t40iu.amplifyapp.com/api/revalidate`
   - Ensure the secret matches `SANITY_WEBHOOK_SECRET` in Amplify

5. **Force a full cache clear** - Trigger a new Amplify deployment:
   ```bash
   git commit --allow-empty -m "chore: trigger deployment" && git push
   ```

## Sanity CMS Configuration

- **Project ID**: `yj6cjjt2`
- **Dataset**: `production`
- **Studio URL**: https://bigrock.sanity.studio/

## Content Schema

The Sanity CMS provides the following content types:

### Singleton Documents (single instance)

#### `siteSettings` (ID: `siteSettings`)
Global site configuration:
- `siteName` (string, required) - Site name
- `tagline` (string) - Site tagline
- `logo` (image with hotspot) - Site logo with alt text
- `contact` (object) - Contact info: email, phone, address
- `social` (object) - Social links: linkedin, twitter, facebook (URLs)
- `seo` (object) - Default SEO: metaTitle, metaDescription, ogImage
- `footer` (object) - Footer: copyrightText, additionalLinks array

#### `hero` (ID: `hero`)
Hero section content:
- `headline` (string, required) - Main headline
- `subheadline` (text) - Supporting text
- `ctaPrimary` (object) - Primary button: text, link
- `ctaSecondary` (object) - Secondary button: text, link
- `backgroundImage` (image with hotspot)
- `stats` (array of objects) - Each with value and label (e.g., "500+", "Companies")

#### `landingPage` (ID: `landingPage`)
Section titles and CTA configuration:
- Section titles: `featuresTitle`, `featuresSubtitle`, `howItWorksTitle`, `pricingTitle`, `pricingSubtitle`, `testimonialsTitle`, `faqTitle`
- CTA section: `ctaTitle`, `ctaDescription`, `ctaButtonText`, `ctaButtonLink`

### Collection Documents (multiple instances)

#### `feature`
Product features:
- `title` (string, required)
- `description` (text)
- `icon` (string) - Lucide icon name (e.g., "clock", "shield", "zap")
- `order` (number) - Display order

#### `howItWorks`
How it works steps:
- `stepNumber` (number, required, min: 1)
- `title` (string, required)
- `description` (text)
- `icon` (string) - Lucide icon name

#### `pricingTier`
Pricing plans:
- `name` (string, required) - Plan name
- `price` (string, required) - e.g., "$29/mo", "Free", "Custom"
- `description` (text)
- `features` (array of strings) - Feature list
- `ctaText` (string) - Button text (default: "Get Started")
- `ctaLink` (string) - Button link
- `isPopular` (boolean) - Highlight as recommended
- `order` (number) - Display order

#### `testimonial`
Customer testimonials:
- `quote` (text, required)
- `author` (string, required) - Author name
- `role` (string) - Job title
- `company` (string)
- `avatar` (image with hotspot)
- `order` (number) - Display order

#### `faq`
FAQs:
- `question` (string, required)
- `answer` (array of blocks) - Portable Text content
- `category` (string) - One of: "general", "services", "pricing", "support"
- `order` (number) - Display order

#### `page`
Generic content pages:
- `title` (string, required)
- `slug` (slug, required) - URL path
- `metaDescription` (text, max 160 chars)
- `content` (array) - Portable Text with blocks and images

#### `service`
Service offerings:
- `title` (string, required)
- `slug` (slug, required) - URL path
- `shortDescription` (text, required, max 200 chars)
- `icon` (string) - Lucide icon name
- `featuredImage` (image with hotspot and required alt)
- `content` (array) - Portable Text with blocks and images
- `order` (number) - Display order

## GROQ Query Examples

### Fetch all landing page data
```groq
{
  "siteSettings": *[_id == "siteSettings"][0],
  "hero": *[_id == "hero"][0],
  "landingPage": *[_id == "landingPage"][0],
  "features": *[_type == "feature"] | order(order asc),
  "howItWorks": *[_type == "howItWorks"] | order(stepNumber asc),
  "pricingTiers": *[_type == "pricingTier"] | order(order asc),
  "testimonials": *[_type == "testimonial"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc)
}
```

### Fetch page by slug
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  metaDescription,
  content
}
```

### Fetch service by slug
```groq
*[_type == "service" && slug.current == $slug][0]{
  title,
  shortDescription,
  icon,
  featuredImage,
  content
}
```

### Fetch all services for listing
```groq
*[_type == "service"] | order(order asc) {
  title,
  slug,
  shortDescription,
  icon,
  featuredImage
}
```

## Recommended Setup

### Dependencies
```bash
npm install @sanity/client @sanity/image-url next-sanity
```

### Sanity Client Configuration
```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'yj6cjjt2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disabled to ensure fresh content on revalidation
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yj6cjjt2
NEXT_PUBLIC_SANITY_DATASET=production
```

## Icon Library

The CMS uses Lucide icon names for features, services, and how-it-works steps. Install and use Lucide React:

```bash
npm install lucide-react
```

```tsx
import * as LucideIcons from 'lucide-react'

function DynamicIcon({ name }: { name: string }) {
  const Icon = LucideIcons[name as keyof typeof LucideIcons]
  if (!Icon) return null
  return <Icon />
}
```

## Portable Text Rendering

For FAQ answers, page content, and service content, use `@portabletext/react`:

```bash
npm install @portabletext/react
```

```tsx
import { PortableText } from '@portabletext/react'

// Custom components for images, etc.
const components = {
  types: {
    image: ({ value }) => <img src={urlFor(value).url()} alt={value.alt} />,
  },
}

<PortableText value={content} components={components} />
```

## Recommended Page Structure

```
app/
  page.tsx              # Landing page (fetches hero, features, pricing, etc.)
  layout.tsx            # Root layout with header/footer from siteSettings
  [slug]/
    page.tsx            # Dynamic pages from 'page' type
  services/
    page.tsx            # Services listing
    [slug]/
      page.tsx          # Individual service pages
```

## Claude Commands

The following slash commands are available to help with development:

| Command | Description |
|---------|-------------|
| `/bugfix` | Investigate and fix bugs with root cause analysis |
| `/feature` | Implement new features with exploration and planning |
| `/review` | Review code for bugs, security, and best practices |
| `/monitor_build` | Run build and auto-fix any failures |
| `/update_docs` | Update documentation to reflect code changes |
| `/update_tests` | Add or update test cases (test setup guide included) |

### Usage

Type the command name to invoke it:
```
/bugfix
/feature
/review
```

### Workflow Recommendations

1. **Adding features**: Use `/feature` to get a structured workflow with exploration, planning, and implementation phases
2. **Fixing bugs**: Use `/bugfix` for systematic root cause analysis before fixing
3. **After changes**: Use `/review` to check code quality, then `/monitor_build` to verify the build passes
4. **Documentation**: Use `/update_docs` after significant changes to keep CLAUDE.md current
