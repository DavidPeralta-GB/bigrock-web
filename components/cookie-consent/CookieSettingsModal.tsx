'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { X } from 'lucide-react'
import { useCookieConsent } from './CookieConsentProvider'

export function CookieSettingsModal() {
  const { showModal, closeSettings, consent, updateConsent } = useCookieConsent()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent === 'all')

  // Update local state when consent changes
  useEffect(() => {
    setAnalyticsEnabled(consent === 'all')
  }, [consent])

  // Focus trap
  useEffect(() => {
    if (!showModal) return

    const modal = modalRef.current
    if (!modal) return

    // Focus the close button when modal opens
    closeButtonRef.current?.focus()

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSettings()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [showModal, closeSettings])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeSettings()
      }
    },
    [closeSettings]
  )

  const handleSave = useCallback(() => {
    updateConsent(analyticsEnabled ? 'all' : 'essential')
  }, [analyticsEnabled, updateConsent])

  const toggleAnalytics = useCallback(() => {
    setAnalyticsEnabled((prev) => !prev)
  }, [])

  if (!showModal) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={handleBackdropClick}
      role="presentation"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
        className="relative bg-[var(--bg-canvas-subtle)] border border-[var(--border-default)] rounded-lg shadow-xl w-full max-w-md mx-4 animate-slide-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-default)]">
          <h2
            id="cookie-settings-title"
            className="text-base font-semibold text-[var(--fg-default)]"
          >
            Cookie Settings
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeSettings}
            className="text-[var(--fg-muted)] hover:text-[var(--fg-default)] transition-colors p-1 rounded-md hover:bg-[var(--bg-canvas)]"
            aria-label="Close cookie settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Essential Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[var(--fg-default)]">
                Essential Cookies
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">
                Required for the website to function. Cannot be disabled.
              </p>
            </div>
            <div
              role="switch"
              aria-checked="true"
              aria-label="Essential cookies (always on)"
              tabIndex={0}
              className="toggle-switch opacity-50 cursor-not-allowed"
            >
              <span className="toggle-switch-thumb translate-x-6" />
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[var(--fg-default)]">
                Analytics Cookies
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">
                Help us understand how visitors interact with our website.
              </p>
            </div>
            <button
              role="switch"
              aria-checked={analyticsEnabled}
              aria-label="Analytics cookies"
              onClick={toggleAnalytics}
              className="toggle-switch"
            >
              <span
                className={`toggle-switch-thumb ${
                  analyticsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[var(--border-default)]">
          <button
            onClick={closeSettings}
            className="btn-secondary text-sm px-4 py-2"
          >
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-4 py-2">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
