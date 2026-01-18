'use client'

import Link from 'next/link'
import { useCookieConsent } from './CookieConsentProvider'

export function CookieConsentBanner() {
  const { showBanner, acceptAll, acceptEssential } = useCookieConsent()

  if (!showBanner) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
    >
      <div className="bg-[var(--bg-canvas-subtle)] border-t border-[var(--border-default)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Text content */}
            <div className="flex-1">
              <h2
                id="cookie-banner-title"
                className="text-sm font-semibold text-[var(--fg-default)] mb-1"
              >
                Cookie preferences
              </h2>
              <p
                id="cookie-banner-description"
                className="text-sm text-[var(--fg-muted)]"
              >
                We use essential cookies to make this site work. We&apos;d also like to use
                analytics cookies to understand how visitors use our site so we can improve it.{' '}
                <Link
                  href="/cookies"
                  className="text-[var(--accent-emphasis)] hover:underline"
                >
                  Learn more
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={acceptEssential}
                className="btn-secondary text-sm px-4 py-2 w-full sm:w-auto"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="btn-primary text-sm px-4 py-2 w-full sm:w-auto"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
