import Cookies from 'js-cookie'

const COOKIE_NAME = 'cookie_consent'

/**
 * Check if the user has granted analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return Cookies.get(COOKIE_NAME) === 'all'
}

/**
 * Initialize analytics - placeholder for future analytics setup
 * This should be called when analytics consent is granted
 */
export function initAnalytics(): void {
  if (!hasAnalyticsConsent()) return

  // Placeholder for analytics initialization
  // Example: Google Analytics, Plausible, etc.
  // gtag('config', 'GA-XXXXXXX')
  console.log('[Analytics] Initialized with user consent')
}

/**
 * Track a page view - gated behind consent
 */
export function trackPageView(url: string): void {
  if (!hasAnalyticsConsent()) return

  // Placeholder for page view tracking
  // Example: gtag('event', 'page_view', { page_path: url })
  console.log('[Analytics] Page view:', url)
}

/**
 * Track a custom event - gated behind consent
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (!hasAnalyticsConsent()) return

  // Placeholder for event tracking
  // Example: gtag('event', action, { event_category: category, event_label: label, value })
  console.log('[Analytics] Event:', { action, category, label, value })
}

/**
 * Set up listener for consent changes to initialize analytics
 * Call this once in your app initialization
 */
export function setupAnalyticsConsentListener(): void {
  if (typeof window === 'undefined') return

  // Initialize if consent already granted
  if (hasAnalyticsConsent()) {
    initAnalytics()
  }

  // Listen for future consent grants
  window.addEventListener('cookieConsentGranted', () => {
    initAnalytics()
  })
}
