# TS@BigRock Website

This is a Next.js frontend for the TS@BigRock timesheet management SaaS product. It fetches content from a Sanity CMS backend.

## Project Overview

TS@BigRock is a timesheet management application for teams. The website serves as the marketing/landing page and potentially the application frontend.

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
  useCdn: true, // Use CDN for production reads
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
