import { getLandingPageData, getSiteSettings } from "@/lib/queries"
import {
  Navigation,
  Hero,
  Features,
  HowItWorks,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components/sections"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch all landing page data from Sanity
  const [data, siteSettings] = await Promise.all([
    getLandingPageData().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)]">
      {/* Navigation */}
      <Navigation siteName={siteSettings?.siteName} logo={siteSettings?.logo} />

      {/* Hero Section */}
      <Hero
        headline={data?.hero?.headline}
        subheadline={data?.hero?.subheadline}
        ctaPrimary={data?.hero?.ctaPrimary}
        ctaSecondary={data?.hero?.ctaSecondary}
        stats={data?.hero?.stats}
      />

      {/* Features Section */}
      <Features
        title={data?.settings?.featuresTitle}
        subtitle={data?.settings?.featuresSubtitle}
        features={data?.features}
      />

      {/* How It Works Section */}
      <HowItWorks
        title={data?.settings?.howItWorksTitle}
        steps={data?.howItWorks}
      />

      {/* Pricing Section */}
      <Pricing
        title={data?.settings?.pricingTitle}
        subtitle={data?.settings?.pricingSubtitle}
        tiers={data?.pricingTiers}
      />

      {/* Testimonials Section */}
      <Testimonials
        title={data?.settings?.testimonialsTitle}
        testimonials={data?.testimonials}
      />

      {/* FAQ Section */}
      <FAQ
        title={data?.settings?.faqTitle}
        faqs={data?.faqs}
      />

      {/* CTA Section */}
      <CTA
        title={data?.settings?.ctaTitle}
        description={data?.settings?.ctaDescription}
        buttonText={data?.settings?.ctaButtonText}
        buttonLink={data?.settings?.ctaButtonLink}
      />

      {/* Footer */}
      <Footer
        siteName={siteSettings?.siteName}
        tagline={siteSettings?.tagline}
        logo={siteSettings?.logo}
        contact={siteSettings?.contact}
        social={siteSettings?.social}
        footerSections={siteSettings?.footerSections}
      />
    </main>
  )
}
