'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import Cookies from 'js-cookie'

export type ConsentType = 'all' | 'essential' | null

interface CookieConsentContextType {
  consent: ConsentType
  hasConsented: boolean
  showBanner: boolean
  showModal: boolean
  acceptAll: () => void
  acceptEssential: () => void
  updateConsent: (type: 'all' | 'essential') => void
  openSettings: () => void
  closeSettings: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

const COOKIE_NAME = 'cookie_consent'
const COOKIE_EXPIRY_DAYS = 365

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentType>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Read cookie on mount
  useEffect(() => {
    const savedConsent = Cookies.get(COOKIE_NAME) as ConsentType
    if (savedConsent === 'all' || savedConsent === 'essential') {
      setConsent(savedConsent)
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
    setMounted(true)
  }, [])

  const saveConsent = useCallback((type: 'all' | 'essential') => {
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'

    Cookies.set(COOKIE_NAME, type, {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'Lax',
      secure: isSecure,
    })

    setConsent(type)
    setShowBanner(false)
    setShowModal(false)

    // Dispatch custom event when analytics consent is granted
    if (type === 'all') {
      window.dispatchEvent(new CustomEvent('cookieConsentGranted', { detail: { type } }))
    }
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent('all')
  }, [saveConsent])

  const acceptEssential = useCallback(() => {
    saveConsent('essential')
  }, [saveConsent])

  const updateConsent = useCallback((type: 'all' | 'essential') => {
    saveConsent(type)
  }, [saveConsent])

  const openSettings = useCallback(() => {
    setShowModal(true)
  }, [])

  const closeSettings = useCallback(() => {
    setShowModal(false)
  }, [])

  const hasConsented = consent !== null

  // Don't render banner until mounted to avoid hydration mismatch
  const contextValue: CookieConsentContextType = {
    consent,
    hasConsented,
    showBanner: mounted && showBanner,
    showModal,
    acceptAll,
    acceptEssential,
    updateConsent,
    openSettings,
    closeSettings,
  }

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
