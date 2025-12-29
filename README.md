# TS@BigRock Website

Marketing and landing page for the TS@BigRock timesheet management application. Built with [Next.js](https://nextjs.org) and [Sanity.io](https://sanity.io) CMS.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Sanity CMS

Content is managed through Sanity Studio:

- **Studio URL**: https://bigrock.sanity.studio/
- **Project ID**: `yj6cjjt2`
- **Dataset**: `production`

### Content Types

| Type | Description |
|------|-------------|
| `siteSettings` | Global site configuration (logo, contact, SEO) |
| `hero` | Hero section content |
| `landingPage` | Section titles and CTA configuration |
| `feature` | Product features |
| `howItWorks` | Step-by-step guide |
| `pricingTier` | Pricing plans |
| `testimonial` | Customer testimonials |
| `faq` | Frequently asked questions |
| `page` | Generic content pages |
| `service` | Service offerings |

See [CLAUDE.md](./CLAUDE.md) for detailed schema documentation and GROQ query examples.

## Getting Started

### Prerequisites

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yj6cjjt2
NEXT_PUBLIC_SANITY_DATASET=production
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Related Projects

- **Sanity Studio**: [bigrock-cms](../bigrock-cms) - Content management studio
- **Timesheet App**: https://ts.bigrock.uk.com/

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com). Connect this repository and it will auto-deploy on push.
