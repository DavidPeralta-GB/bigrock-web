import { client } from './sanity'

// Hero Section
export async function getHero() {
  return client.fetch(`
    *[_id == "hero"][0]{
      headline,
      subheadline,
      ctaPrimary,
      ctaSecondary,
      backgroundImage,
      stats
    }
  `)
}

// Features
export async function getFeatures() {
  return client.fetch(`
    *[_type == "feature"] | order(order asc){
      _id,
      title,
      description,
      icon,
      order
    }
  `)
}

// How It Works
export async function getHowItWorks() {
  return client.fetch(`
    *[_type == "howItWorks"] | order(stepNumber asc){
      _id,
      stepNumber,
      title,
      description,
      icon
    }
  `)
}

// Pricing Tiers
export async function getPricingTiers() {
  return client.fetch(`
    *[_type == "pricingTier"] | order(order asc){
      _id,
      name,
      price,
      description,
      features,
      ctaText,
      ctaLink,
      isPopular,
      order
    }
  `)
}

// Testimonials
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(order asc){
      _id,
      quote,
      author,
      role,
      company,
      avatar
    }
  `)
}

// FAQs
export async function getFAQs() {
  return client.fetch(`
    *[_type == "faq"] | order(order asc){
      _id,
      question,
      answer,
      category
    }
  `)
}

// Landing Page Settings
export async function getLandingPageSettings() {
  return client.fetch(`
    *[_id == "landingPage"][0]{
      featuresTitle,
      featuresSubtitle,
      howItWorksTitle,
      pricingTitle,
      pricingSubtitle,
      testimonialsTitle,
      faqTitle,
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink
    }
  `)
}

// Site Settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0]{
      siteName,
      tagline,
      "logo": logo.asset->url,
      contact,
      socialLinks[]{
        _key,
        platform,
        url
      },
      seo,
      footer,
      "footerSections": footer.footerSections
    }
  `)
}

// Get all landing page data in one query
export async function getLandingPageData() {
  return client.fetch(`{
    "hero": *[_id == "hero"][0]{
      headline,
      subheadline,
      ctaPrimary,
      ctaSecondary,
      backgroundImage,
      stats
    },
    "features": *[_type == "feature"] | order(order asc){
      _id,
      title,
      description,
      icon
    },
    "howItWorks": *[_type == "howItWorks"] | order(stepNumber asc){
      _id,
      stepNumber,
      title,
      description,
      icon
    },
    "pricingTiers": *[_type == "pricingTier"] | order(order asc){
      _id,
      name,
      price,
      description,
      features,
      ctaText,
      ctaLink,
      isPopular
    },
    "testimonials": *[_type == "testimonial"] | order(order asc){
      _id,
      quote,
      author,
      role,
      company,
      avatar
    },
    "faqs": *[_type == "faq"] | order(order asc){
      _id,
      question,
      answer,
      category
    },
    "settings": *[_id == "landingPage"][0]{
      featuresTitle,
      featuresSubtitle,
      howItWorksTitle,
      pricingTitle,
      pricingSubtitle,
      testimonialsTitle,
      faqTitle,
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink,
      showTestimonials
    },
    "siteSettings": *[_type == "siteSettings"][0]{
      siteName,
      tagline,
      "logo": logo.asset->url,
      contact,
      socialLinks[]{
        _key,
        platform,
        url
      },
      footer
    }
  }`)
}

// Get page by slug (for dynamic routes like /privacy-policy)
export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      metaDescription,
      content
    }`,
    { slug }
  )
}

// Get all page slugs (for static generation)
export async function getAllPageSlugs() {
  return client.fetch(`
    *[_type == "page" && defined(slug.current)]{
      "slug": slug.current
    }
  `)
}
